import {

    IonContent, IonToolbar, IonAvatar, IonTitle, IonInput,IonText, IonSelectOption,IonSelect,IonDatetime, IonRefresherContent, IonRefresher, IonLoading, IonHeader, IonPage, IonPopover, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonBackButton, IonList


} from '@ionic/react';
import React from 'react';
import { options, add, trash } from 'ionicons/icons';
import AxiosPC from '../../services/AxiosPC'
import { Redirect } from 'react-router-dom';
import { RefresherEventDetail } from '@ionic/core';
import './style.css';

interface IStateEq {
    equipos: any;
    item_select:any;
    marcas:any;
    data: any;
    filtro: any;
    filtro_fecha: any;
    busqueda: any
    popOver: any
    backAction: any;
    solicitando_datos: any;
    detalle:any;

}

export default class ConsultarDesktop extends React.Component<{ tipo: any }, IStateEq> {
    constructor(props: any) {
        super(props);
        this.state = {
            equipos: [],
            marcas:[],
            item_select:false,
            detalle:false,
            data: {
                tipo: this.props.tipo
            },
            backAction: false,
            popOver: false,
            filtro: "codigo",
            busqueda: "",
            filtro_fecha: "",
            solicitando_datos: false
        }



    }

    onChangeInput = (name:any, value:any) => {
        
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    }

    doRefresh(event: CustomEvent<RefresherEventDetail>) {
        

        setTimeout(() => {
            this.getEquipos();
            event.detail.complete();

        }, 2000);
    }
    componentDidMount = () => {
        console.log(this.props.tipo)
        this.setState({
            solicitando_datos: true
        })
        this.getMarcas();
        this.getEquipos();

        
    }

    generateContent = () => {
        if (this.state.solicitando_datos) {
            return (
                <div key="loading">
                    <IonLoading
                        isOpen={this.state.solicitando_datos}
                        message={'Cargando datos. Espere por favor...'}
                    />

                </div >
            );
        }
        else if (this.state.equipos.length === 0) {
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
        else {
            return this.state.equipos.map((value: any, index: any) => {
                return (
                    <div key={index}>
                    <IonItem  onClick={() => this.setState({ detalle: true })} >
                        <IonAvatar slot="start">
                            <img src={process.env.PUBLIC_URL + "/assets/img/" + this.props.tipo + ".png"} alt="" />
                        </IonAvatar>

                        <IonLabel color="dark">
                            <h2><b>{value.tipo_equipo.toUpperCase() + ": " + value.codigo}</b></h2>
                            <h3>{"Usuario: " + value.encargado_registro}</h3>
                            <p>{"Fecha. Reg: " + value.fecha_registro}</p>
                        </IonLabel>



                        <IonIcon icon={trash}></IonIcon>
                    </IonItem>
                    <IonPopover
                    isOpen={this.state.detalle}
                    onDidDismiss={e => this.setState({ detalle: false })}>
                      <IonTitle className="ion-margin-top">Detalle del equipo</IonTitle>
                        <IonList>
                          <IonItem>
                            <IonLabel>Id: {value.id_equipo}</IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>Codigo: {value.codigo}</IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>Descripcion: {value.descripcion}</IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>Encargado Registro: {value.encargado_registro}</IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>Estado: {value.estado_operativo}</IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>Fecha Registro: {value.fecha_registro}</IonLabel>       
                          </IonItem>
                        </IonList>
                        <div className="ion-text-center ion-margin">
                        <IonButton onClick={() => this.setState({ detalle: false })}>Cerrar</IonButton>
                        </div>
                  </IonPopover>
                  </div>
                );
            });
        }

    }

    getEquipos = () => {


        console.log(this.state.data)
        AxiosPC.getEquipos(this.state.data).then(response => {
            console.log(response)
            this.setState({
                equipos: response.data,
                solicitando_datos: false
            })
        }).catch(err => {
            this.setState({

                solicitando_datos: false
            })
            console.log(err.response.data);
        })
    }

     getMarcas() {
        AxiosPC.mostrar_marcas().then((res: any) => {


            this.setState({
                marcas: res.data
            });

            console.log("DATA:", this.state.marcas);

        }).catch((err: any) => {
            console.log(err.response.data);

        });
    }

    render() {

        if (this.state.backAction) {
            return (<Redirect to="/tiposequiposinventario" />);
        }
        


        return (


            <IonPage>
                <br />
                <IonHeader translucent>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <div onClick={(e: any) => { this.setState({ backAction: true }) }}> <IonBackButton defaultHref="/home" ></IonBackButton></div>
                        </IonButtons>
                        <IonTitle>{"Equipos " + (this.props.tipo !== "desktop"?"Laptop": "Desktop")}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink={this.props.tipo === "desktop" ? "/formdesktop" : "/formlaptop"}><IonIcon icon={add}></IonIcon></IonButton>
                            <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
                        </IonButtons>
                        <IonPopover
                            isOpen={this.state.popOver}
                            onDidDismiss={e => this.setState({ popOver: false })}>
                            <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                            <IonList>
                                <IonItem >
                                    <IonList >
                                    
                                        <IonItem >
                                            <IonLabel position="floating">Codigo del Equipo</IonLabel>
                                            <IonInput required type="text" className="root" name='codigo' onIonChange={(e: any) => { this.onChangeInput(e.target.name,e.target.value) }}></IonInput>
                                        </IonItem>
                                        <IonItem hidden = {true}>
                                            <IonLabel position="floating">Num Serie</IonLabel>
                                            <IonInput required type="text" className="root" name='num_serie' onIonChange={(e: any) => { this.onChangeInput(e.target.name,e.target.value) }}></IonInput>
                                        </IonItem>
                                        <IonItem hidden = {true}>
                                            <IonLabel position="floating">Usuario Registra</IonLabel>
                                            <IonInput required type="text" className="root" name='user' onIonChange={(e: any) => { this.onChangeInput(e.target.name,e.target.value) }}></IonInput>
                                        </IonItem>
                                    </IonList>

                                </IonItem>
                                <IonItem hidden = {this.props.tipo!=="laptop"}>
                                <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect name='marca' onIonChange={(e: any) => { this.onChangeInput(e.target.name,e.target.value) }}>
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
                                    <IonLabel>Fecha de <br /> asignación</IonLabel>
                                    <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                                        onIonChange={(e) => {
                                            this.onChangeInput("fecha",e.detail.value!==null && e.detail.value!==undefined?e.detail.value.split("T")[0]:"");
                                        }}
                                        placeholder="Fecha" displayFormat="DD/MM/YYYY"
                                    ></IonDatetime>
                                </IonItem>
                            </IonList>
                            <div className="ion-text-center ion-margin">
                                <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                                <IonButton onClick={(e: any) => {

                                    this.setState({ popOver: false,solicitando_datos: true  })
                                    
                                      
                                        this.getEquipos();
                                    

                                }}>Aplicar</IonButton>
                            </div >
                        </IonPopover>
                    </IonToolbar>

                </IonHeader>

                <IonContent >


                    <IonRefresher slot="fixed" onIonRefresh={(e: any) => this.doRefresh(e)}>
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Suelte para refrescar la lista..."
                            refreshingSpinner="circles"
                            refreshingText="Actualizando...">
                        </IonRefresherContent>
                    </IonRefresher>




                    <IonList>
                        {

                            this.generateContent()

                        }
                    </IonList>
                </IonContent >
            </IonPage>
        );

    }



}