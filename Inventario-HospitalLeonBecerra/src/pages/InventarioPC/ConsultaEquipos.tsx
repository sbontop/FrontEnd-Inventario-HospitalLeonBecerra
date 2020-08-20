import { IonContent, IonToolbar, IonTitle, IonInput, IonSelectOption, IonSelect, IonDatetime, IonRefresherContent, IonRefresher, 
    IonLoading, IonHeader, IonPage, IonPopover, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonBackButton, 
    IonText, IonList } from '@ionic/react';
import React from 'react';
import { add, search } from 'ionicons/icons';
import AxiosPC from '../../services/AxiosPC'
import { Redirect } from 'react-router-dom';
import './style.css';
import ItemEquipo from "../../components/EqComponents/ItemEquipo"
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';

interface IStateEq {
    equipos: any;
    marcas: any;
    data: any;
    popOver: any
    backAction: any;
    solicitando_datos: any;
    detalle: any;
    disable_load: any;
    page_index: any;
    page_size: any;
    editarEquipo: any;
    mounted: any;
}

export default class ConsultarDesktop extends React.Component<{ tipo: any }, IStateEq> {
    constructor(props: any) {
        super(props);
        this.state = {
            equipos: [],
            marcas: [],
            detalle: false,
            page_size: 10,
            page_index: 0,
            data: this.generateBasicData(),
            disable_load: false,
            backAction: false,
            popOver: false,
            solicitando_datos: false,
            editarEquipo: false,
            mounted: true,

        }
    }

    generateBasicData() {
        return {
            tipo: this.props.tipo,
            page_size: 10,
            page_index: 0
        }
    }

    onChangeInput = (name: any, value: any) => {
        if (this.state.mounted) this.setState({ data: { ...this.state.data, [name]: value } });
    }

    // doRefresh(event: CustomEvent<RefresherEventDetail>) {
    //     this.setState({ page_index: 0 });
    //     this.onChangeInput("page_index", this.state.page_index);
    //     setTimeout(() => {
    //         this.getEquipos(true);
    //         event.detail.complete();
    //     }, 2000);
    // }

    // loadMoreData(e: any) {
    //     this.setState({ page_index: this.state.page_index + 1 })
    //     this.onChangeInput("page_index", this.state.page_index);
    //     setTimeout(() => {
    //         this.getEquipos(false);
    //         e.target.complete();
    //     }, 2000);
    // }

    loadRefresh(e: any, newPageIndex: number) {
        if (this.state.mounted) {
            this.setState({ page_index: newPageIndex })
            this.onChangeInput("page_index", this.state.page_index);
            setTimeout(() => {
                this.getEquipos(newPageIndex === 0);
                if (newPageIndex === 0) {
                    e.detail.complete();
                } else {
                    e.target.complete();
                }
            }, 1000);
        }


    }

    clearReload() {
        if (this.state.mounted) this.setState({ data: this.generateBasicData(), popOver: false });
    }

    componentDidMount = () => {
        this.setState({
            solicitando_datos: true,
            mounted: true
        })
        this.getMarcas();
        this.getEquipos(true);
    }
    componentWillUnmount() {
        console.log("unmounted")
        this.setState({
            mounted: false
        })
    }

    generateContent = () => {
        if (this.state.mounted) {
            if (this.state.solicitando_datos && this.state.mounted) {
                return (
                    <div key="loading">
                        <IonLoading
                            isOpen={this.state.solicitando_datos}
                            message={'Cargando datos. Espere por favor...'} />
                    </div >
                );
            }
            else if (this.state.equipos.length === 0 && this.state.mounted) {
                return (
                    <div key="sin datos">
                        <IonLabel className="ion-margin">
                            <p className="ion-text-center ion-margin">No hay datos que mostrar</p>
                            <p className="ion-text-center">
                                <img src="./assets/img/sinResultados.png" alt=":(" />
                            </p>
                        </IonLabel>
                    </div>
                )
            }
            //principal={this}
            else if (this.state.mounted) {
                return this.state.equipos.map((value: any, index: any) => {
                    return (
                        <div key={index}>
                            <ItemEquipo tipo={this.props.tipo} principal={this} info={value}></ItemEquipo>
                        </div>
                    );
                });
            }
        }


    }

    getEquipos = (newLoad: boolean) => {

        if (this.state.mounted) {
            console.log(this.state.data)
            AxiosPC.getEquipos(this.state.data).then(response => {
                if (this.state.mounted) {
                    this.setState({
                        equipos: newLoad ? response.data.result : [...this.state.equipos, ...response.data.result],
                        solicitando_datos: false,
                    })
                    this.setState({
                        disable_load: this.state.equipos.length === response.data.ItemSize
                    })
                    console.log(response.data.result)
                }

            }).catch(err => {
                if (this.state.mounted) {
                    this.setState({
                        solicitando_datos: false
                    })
                    console.log(err);
                }

            })
        }

    }

    getMarcas() {
        if (this.state.mounted) {
            AxiosPC.mostrar_marcas().then((res: any) => {
                if (this.state.mounted) {
                    this.setState({
                        marcas: res.data
                    });
                }
            }).catch((err: any) => {
                console.log(err.response.data);
            });
        }

    }



    render() {

        if (localStorage.userdata === undefined){
            return (<Redirect to="/iniciarsesion" />)
        }

        if (this.state.backAction) {
            return (<Redirect to="/tiposequiposinventario" />);
        }

        // if (this.state.editarEquipo) {
        //     return (this.props.tipo === 'laptop' ? <Redirect to="/formlaptop" /> : <Redirect to="/formdesktop" />);
        // }
        // if(this.state.editarEquipo&&this.props.tipo === 'laptop'){
        //     return (<Redirect to="/formlaptop" />);
        // }
        // if(this.state.editarEquipo&&this.props.tipo === 'desktop'){
        //     return (<Redirect to="/formdesktop" />);
        // }
        return (
            <IonPage>
                <br />
                <IonHeader translucent>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <div onClick={(e: any) => { if (this.state.mounted) this.setState({ backAction: true }) }}> <IonBackButton defaultHref="/home" ></IonBackButton></div>
                        </IonButtons>
                        <IonTitle>{"Equipos " + (this.props.tipo !== "desktop" ? "Laptop" : "Desktop")}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink={this.props.tipo === "desktop" ? "/formdesktop" : "/formlaptop"}><IonIcon icon={add}></IonIcon></IonButton>
                            <IonButton onClick={() => { if (this.state.mounted) this.setState({ popOver: true }) }}><IonIcon icon={search}></IonIcon></IonButton>
                        </IonButtons>
                        <IonPopover
                            isOpen={this.state.popOver}
                            onDidDismiss={e => { if (this.state.mounted) this.setState({ popOver: false }) }}>
                            <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                            <IonList>
                               

                                <IonItem >
                                    <IonLabel position="floating">Codigo del Equipo</IonLabel>
                                    <IonInput value={this.state.data.codigo} required type="text" className="root" name='codigo' onIonInput={(e: any) => {
                                        if (this.state.mounted) this.onChangeInput(e.target.name, e.target.value)
                                    }}></IonInput>
                                </IonItem>
                                <IonItem >
                                    <IonLabel position="floating">Num Serie</IonLabel>
                                    <IonInput value={this.state.data.num_serie} required type="text" className="root" name='num_serie' onIonChange={(e: any) => { if (this.state.mounted) this.onChangeInput(e.target.name, e.target.value) }}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Usuario Registra</IonLabel>
                                    <IonInput value={this.state.data.user} required type="text" className="root" name='user' onIonChange={(e: any) => { if (this.state.mounted) this.onChangeInput(e.target.name, e.target.value) }}></IonInput>
                                </IonItem>
                               
                                <IonItem>
                                    <IonLabel position="floating">Estado<IonText color="danger">*</IonText></IonLabel>
                                    <IonSelect  value={this.state.data.estado} name={'estado'} onIonChange={(e: any) => { this.onChangeInput(e.target.name, e.target.value)}}>
                                        <IonSelectOption value={"O"}>Operativo</IonSelectOption>
                                        <IonSelectOption value={"D"}>Disponible</IonSelectOption>
                                        <IonSelectOption value={"ER"}>En Revision</IonSelectOption>
                                        <IonSelectOption value={"R"}>Reparado</IonSelectOption>
                                        <IonSelectOption value={"B"}>De Baja</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                <IonItem hidden={this.props.tipo !== "laptop"}>
                                    <IonLabel position="floating">Marca</IonLabel>
                                    <IonSelect value={this.state.data.marca} name='marca' onIonChange={(e: any) => { if (this.state.mounted) this.onChangeInput(e.target.name, e.target.value) }}>
                                        {this.state.marcas.map((object: any, i: any) => {
                                            return (
                                                <IonSelectOption key={object.id_marca} value={object.id_marca}>
                                                    {object.nombre}
                                                </IonSelectOption>
                                            );
                                        })}
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Fecha de<br /> asignación (D)</IonLabel>
                                    <IonDatetime value={this.state.data.fecha_desde} doneText="Ok" cancelText="Cancelar" name="fecha"
                                        onIonChange={(e) => {

                                            if (this.state.mounted) this.onChangeInput("fecha_desde", e.detail.value !== null && e.detail.value !== undefined ? e.detail.value.split("T")[0] : "");
                                        }}
                                        placeholder="Desde" displayFormat="DD/MM/YYYY"
                                    ></IonDatetime>

                                </IonItem>
                                <IonItem >

                                    <IonLabel>Fecha de<br /> asignación (H)</IonLabel>
                                    <IonDatetime value={this.state.data.fecha_hasta} doneText="Ok" cancelText="Cancelar" name="fecha"
                                        onIonChange={(e) => {

                                            if (this.state.mounted) this.onChangeInput("fecha_hasta", e.detail.value !== null && e.detail.value !== undefined ? e.detail.value.split("T")[0] : "");
                                        }}
                                        placeholder="Hasta" displayFormat="DD/MM/YYYY"
                                    ></IonDatetime>
                                </IonItem>

                            </IonList>
                            <div className="ion-text-center ion-margin">
                                <IonButton expand="block" size="small" onClick={(e: any) => {
                                    if (this.state.mounted) {
                                        this.setState({ popOver: false, solicitando_datos: true, page_index: 0 })
                                        this.getEquipos(true);
                                    }
                                }}>Aplicar</IonButton>
                                <IonButton expand="block" size="small" onClick={() => {
                                    if (this.state.mounted) this.clearReload()
                                }} >Limpiar</IonButton>
                                <IonButton expand="block" size="small" onClick={() => { if (this.state.mounted) this.setState({ popOver: false }) }} >Cancelar</IonButton>

                            </div >
                        </IonPopover>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonRefresher slot="fixed" onIonRefresh={(e: any) => { if (this.state.mounted) this.loadRefresh(e, 0) }}>
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Suelte para refrescar la lista..."
                            refreshingSpinner="circles"
                            refreshingText="Actualizando...">
                        </IonRefresherContent>
                    </IonRefresher>
                    <IonList> {this.generateContent()} </IonList>

                    <IonInfiniteScroll disabled={this.state.disable_load} threshold="100px"
                        onIonInfinite={(e: any) => {
                            if (this.state.mounted) this.loadRefresh(e, this.state.page_index + 1);
                        }}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Cargando más registros">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent >
            </IonPage>
        );

    }



}


