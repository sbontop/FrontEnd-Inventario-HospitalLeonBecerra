import React from 'react';
import { IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonButton, IonPopover, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, 
    IonAlert,IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, withIonLifeCycle} from '@ionic/react';
import ListRouters from '../../../components/ProgramaComponents/ListProgramas';
import { add, options, arrowBack } from 'ionicons/icons';
import AxiosPrograma from '../../../services/AxiosPrograma';
import Respuesta from '../../../components/Respuesta';
import { Redirect } from 'react-router';

class HomePrograma extends React.Component<any, any> {
    constructor(props: any) {
    super(props);
    this.state = 
        {
            programas: [] as any,
            id_programa_equipo: "",
            editores: [] as any,
            showPopover: false,
            showLoading: false,
            alerta: false,
            mensaje: "",
            showAlertConfirm: false,
            disable_load: false,
            parametros: { page_size: 10, page_index: 0 }
        }
    }

    asignar_parametros = (name: any, value: any) => {
        this.setState({ parametros: { ...this.state.parametros, [name]: value } });
    }

    clearReload() {
        this.setState({ parametros: { page_size: 10, page_index: 0}, showPopover: false });
        this.cargar_programas(true);
        this.cargar_editores();
    }

    ionViewWillEnter = () => {
        this.setState({ showLoading: true, mensaje:"Cargando datos, espere por favor..." })
        this.cargar_programas(true);
        this.cargar_editores();
    }

    buscar = (e: any) => {
        let nombre = e.target.value;
        if (nombre) {
            AxiosPrograma.buscar_programa(nombre).then(res => {
                this.setState({programas: res.data});
            }).catch(err => {
                console.log(err);
            });
        }
    }

    _eliminar(position:any){
        this.setState({
          id_programa_equipo: position
        })
        this.setState({showAlertConfirm:true})
    }

    eliminar() {
        this.setState({
            showLoading: true,
            showAlertConfirm: true,
            mensaje: "Eliminando registro, espere un momento...",
        })
        AxiosPrograma.eliminar_programa(this.state.id_programa_equipo).then(() => {    
            this.setState({
                showLoading: false,
                mensaje: "Registro eliminado satisfactoriamente",
                alerta: true
            })
            this.cargar_programas(true);
        }).catch(error => {
            console.log(error)
            this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
        }); 
    } 

    onClear = (e: any) => {
        this.cargar_programas(true);
    }

    cargar_editores = () => {
        AxiosPrograma.editores().then((res: any) => {
            console.log('e', res.data)
            this.setState({editores: res.data});  
        })
    }

    cargar_programas(newLoad: boolean) {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        console.log("Parametros dentro de cargar routers", parametros)
        AxiosPrograma.filtrar_programas(parametros).then(res => {
            this.setState({ programas: newLoad ? res.data.resp : [...this.state.programas, ...res.data.resp]});
            this.setState({ showLoading: false, mensaje:"Cargando datos, espere por favor", disable_load: this.state.programas.length === res.data.itemSize }); 
        }).catch(err => {
            this.setState({ showLoading: false, mensaje:"Cargando datos, espere por favor" });
            console.log(err);
        }); 
    }

    doRefresh = (e: any, newPageIndex: number) => {
        this.asignar_parametros("page_index", newPageIndex);
        console.log("parametros dentro doRefresh", this.state.parametros)
        setTimeout(() => {
        this.cargar_programas(newPageIndex === 0);
            if (newPageIndex === 0) {
                e.detail.complete();
            } else {
                e.target.complete();
            }
        }, 1000);
    }

    handle_aplicar = () => {
        this.asignar_parametros("page_index", 0);
        this.setState({ showPopover: false, showLoading: true, mensaje: "Cargando datos, espere por favor..."  })
        this.cargar_programas(true);
    }

    render() {

        if (localStorage.userdata === undefined){
            return (<Redirect to="/iniciarsesion" />)
          }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/inventarios"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Programas</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink="/formularioprograma"><IonIcon icon={add}></IonIcon></IonButton>
                            <IonButton onClick={(e) => this.setState({showPopover: true})}><IonIcon icon={options}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
       
                <IonSearchbar placeholder="Buscar programa"
                    onIonChange={(e: any) => { this.buscar(e) }} 
                    onIonClear={(e: any) => { this.onClear(e) }}>
                </IonSearchbar>  

                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(e: any) =>  this.doRefresh(e, 0)}>
                        <IonRefresherContent refreshingSpinner="bubbles"></IonRefresherContent>
                    </IonRefresher>
                    <IonLoading
                        isOpen={this.state.showLoading}
                        message={this.state.mensaje}
                    />
                    <Respuesta informacion={this.state.programas.length}></Respuesta>
                    <IonList>{this.state.programas.map((r: any)=>{
                        return (             
                            <ListRouters key={`${r.id_programa}`} 
                            id_programa={r.id_programa} 
                            codigo={r.codigo}
                            nombre={r.nombre} 
                            version={r.version} 
                            editor={r.editor}
                            encargado_registro={r.encargado_registro}
                            observacion={r.observacion === null ? 'Ninguna' : r.observacion}
                            eliminar = {() =>this._eliminar(r.id_programa)} />
                        )
                        })}
                    </IonList>
                    <IonInfiniteScroll disabled={this.state.disable_load} threshold="100px"
                        onIonInfinite={(e: any) =>  this.doRefresh(e, this.state.parametros.page_index + 1)}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Cargando mas registros"></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent>

                    <IonAlert
                    isOpen={this.state.showAlertConfirm}
                    header={"Eliminar Programa"}
                    message={'¿Está seguro de que desea eliminar este programa?. Tenga en cuenta que se eliminará definitivamente'}
                    buttons={[
                        {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                            handler: () => {
                                this.setState({ showAlertConfirm: false });
                            }
                        },
                        {
                        text: 'Si',
                            handler: () => {
                                this.eliminar()
                            }
                        }
                    ]}
                    />
                    <IonAlert
                    isOpen={this.state.alerta}
                    onDidDismiss={() => { this.setState({ alerta: false, showAlertConfirm:false  }) }}
                    header={this.state.mensaje}
                    buttons={['Aceptar']}
                    />
                <IonPopover      
                    isOpen={this.state.showPopover}
                    onDidDismiss={() => this.setState({ showPopover: false})}>
                    <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                    <IonList>
                        <IonItem>
                            <IonLabel>Editor</IonLabel>
                            <IonSelect multiple={true} name="editor" value={this.state.parametros.editor} 
                            onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)} okText="Aceptar" cancelText="Cancelar" >
                            {/* <IonSelectOption selected>Todas</IonSelectOption> */}
                            {this.state.editores.map((m:any, i:number) => {
                            return (
                                <IonSelectOption key={i} value={m.editor}>
                                {m.editor} 
                                </IonSelectOption>
                            );
                            })}
                        </IonSelect>   
                        </IonItem>
                    </IonList>
                    <div className="ion-text-center ion-margin">
                        <IonButton expand="block" onClick={() => this.handle_aplicar()}>Aplicar</IonButton>
                        <IonButton expand="block" onClick={() =>  this.clearReload()} >Limpiar</IonButton>
                        <IonButton expand="block" onClick={() => this.setState({showPopover: false})}>Cancelar</IonButton>
                    </div > 
                </IonPopover>

            </IonPage>  
        );
    }
}

export default withIonLifeCycle(HomePrograma);
