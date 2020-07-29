import React from 'react';
import { IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonButton, IonPopover, IonAlert, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, 
         IonList, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, withIonLifeCycle} from '@ionic/react';
import ListRouters from '../../components/RouterComponents/ListRouters';
import { add, options, arrowBack } from 'ionicons/icons';
import AxiosRouter from '../../services/AxiosRouter';
import SelectOptionEstado from '../../components/SelectOptionEstado';
import Respuesta from '../../components/Respuesta';

class HomeRouter extends React.Component<any, any> {
    constructor(props: any) {
    super(props);
    this.state = 
        {
            routers: [] as any,
            id_equipo_router: "",
            marcas: [] as any,
            showPopover: false,
            showLoading: false,
            alerta: false,
            mensaje: "",
            showAlertConfirm: false,
            disable_load: false,
            parametros: { page_size: 10, page_index: 0, estado:"" }
        }
    }

    asignar_parametros = (name: any, value: any) => {
        this.setState({ parametros: { ...this.state.parametros, [name]: value } });
    }

    clearReload() {
        this.setState({ parametros: { page_size: 10, page_index: 0, estado:"" }, showPopover: false });
        this.cargar_routers(true);
    }

    ionViewWillEnter() {
        this.setState({ showLoading: true, mensaje:"Cargando datos, espere por favor..." })
        this.cargar_routers(true);
        this.cargar_marcas();
    }

    buscar = (e: any) => {
        let codigo = e.target.value;
        if (codigo) {
            AxiosRouter.buscar_router(codigo).then(res => {
                this.setState({routers: res.data});
            }).catch(err => {
                console.log(err);
            });
        }
    }

    _eliminar(position:any){
        this.setState({
          id_equipo_router:position
        })
        this.setState({showAlertConfirm:true})
    }

    eliminar() {
        this.setState({
            showAlertConfirm: true,
            showLoading: true,
            mensaje: "Eliminando registro, espere un momento...",
        })
        AxiosRouter.eliminar_router(this.state.id_equipo_router).then(res => {    
            this.setState({
                showLoading: false,
                mensaje: "Registro eliminado satisfactoriamente",
                alerta: true
            })
           this.cargar_routers(true);
        }).catch(error => {
            console.log(error)
            this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
        }); 
    } 

    onClear = (e: any) => {
        this.cargar_routers(true);
    }

    cargar_marcas = () => {
        AxiosRouter.marcas_routers().then((res: any) => {
            this.setState({marcas: res.data});  
        })
    }

    cargar_routers(newLoad: boolean) {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        // console.log("Parametros dentro de cargar routers", parametros)
        AxiosRouter.filtrar_routers(parametros).then(res => {
            this.setState({ routers: newLoad ? res.data.resp : [...this.state.routers, ...res.data.resp]});
            this.setState({ showLoading: false, mensaje:"Cargando datos, espere por favor", disable_load: this.state.routers.length === res.data.itemSize }); 
        }).catch(err => {
            this.setState({ showLoading: false, mensaje:"Cargando datos, espere por favor" });
            console.log(err);
        }); 
    }

    doRefresh = (e: any, newPageIndex: number) => {
        this.asignar_parametros("page_index", newPageIndex);
        // console.log("parametros dentro doRefresh", this.state.parametros)
        setTimeout(() => {
        this.cargar_routers(newPageIndex === 0);
            if (newPageIndex === 0) {
                e.detail.complete();
            } else {
                e.target.complete();
            }
        }, 1000);
    }

    handle_aplicar = () => {
        this.asignar_parametros("page_index", 0);
        this.setState({ showPopover: false, showLoading: true, mensaje: "Cargando datos, espere por favor" })
        // console.log("parametros dentro de handle aplicar", this.state.parametros)
        this.cargar_routers(true);
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/tiposequiposinventario"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Routers</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink="/formulariorouter"><IonIcon icon={add}></IonIcon></IonButton>
                            <IonButton onClick={(e) => this.setState({showPopover: true})}><IonIcon icon={options}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
       
                <IonSearchbar placeholder="Buscar router por código"
                    onIonChange={(e: any) => { this.buscar(e) }} 
                    onIonClear={(e: any) => { this.onClear(e) }}>
                </IonSearchbar>  
                <IonLoading
                    isOpen={this.state.showLoading}
                    message={this.state.mensaje}
                />
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(e: any) =>  this.doRefresh(e, 0)}>
                        <IonRefresherContent refreshingSpinner="circles"></IonRefresherContent>
                    </IonRefresher>
                    
                    <Respuesta informacion={this.state.routers.length}></Respuesta>
                    <IonList>{this.state.routers.map((r: any)=>{
                        return (             
                            <ListRouters key={`${r.id_router}`} 
                            id_router={r.codigo} 
                            nombre={r.nombre} 
                            pass={r.pass} 
                            ip={r.direccion_ip === null ? 'No asignada' : r.direccion_ip}
                            punto={r.bspi_punto === null ? 'No asignado' : r.bspi_punto}
                            marca={r.marca}
                            modelo={r.modelo}
                            numero_serie={r.numero_serie}
                            fecha_registro={r.fecha_registro}
                            departamento={r.departamento === null|| r.departamento=== undefined ? 'No asignado' : r.departamento}
                            empleado={ r.nempleado=== null|| r.nempleado=== undefined? 'No asignado' : r.nempleado.concat(' ',r.apellido)}
                            puerta_enlace={r.puerta_enlace === null ? 'No asignada' : r.puerta_enlace}
                            estado={r.estado_operativo}
                            descripcion={r.descripcion === null ? 'Ninguna' : r.descripcion}
                            usuario={r.usuario} 
                            clave={r.clave} 
                            id_equipo={r.id_equipo}    
                            eliminar = {() =>this._eliminar(r.id_equipo)} />
                        )
                        })}
                    </IonList>

                    <IonInfiniteScroll disabled={this.state.disable_load} threshold="100px"
                        onIonInfinite={(e: any) =>  this.doRefresh(e, this.state.parametros.page_index + 1)}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Cargando más registros"></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
               </IonContent>

               <IonAlert
                    isOpen={this.state.showAlertConfirm}
                    header={"Eliminar Router"}
                    message={'¿Esta seguro de eliminar este router?'}
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
                                this.eliminar();
                            }
                        }
                    ]}
                    />
                    <IonAlert
                    isOpen={this.state.alerta}
                    onDidDismiss={() => { this.setState({ alerta: false, showAlertConfirm:false }) }}
                    header={this.state.mensaje}
                    buttons={['Aceptar']}
                    />

                <IonPopover      
                    isOpen={this.state.showPopover}
                    onDidDismiss={() => this.setState({ showPopover: false})}>
                    <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                    <IonList>
                        <IonItem>
                            <IonLabel>Marca</IonLabel>
                            <IonSelect name="marca" placeholder="Todas" value={this.state.parametros.marca} 
                            onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)} okText="Aceptar" cancelText="Cancelar" >
                            <IonSelectOption selected>Todas</IonSelectOption>
                            {this.state.marcas.map((m:any, i:number) => {
                            return (
                                <IonSelectOption key={i} value={m.nombre}>
                                {m.nombre} 
                                </IonSelectOption>
                            );
                            })}
                        </IonSelect>   
                        </IonItem>
                        <IonItem>
                            <IonLabel>Estado operativo</IonLabel>
                            <IonSelect name="estado" placeholder="Estado" value={this.state.parametros.estado} 
                            onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)} okText="Aceptar" cancelText="Cancelar" >
                            <SelectOptionEstado/>
                        </IonSelect>   
                        </IonItem>
                        <IonItem>
                            <IonLabel>Fecha registro</IonLabel>
                            <IonDatetime value={this.state.parametros.fecha} doneText="Ok" cancelText="Cancelar" name="fecha" onIonChange={(e: any) =>  this.asignar_parametros(e.target.name, e.target.value.substring(0, 10))}
                            placeholder="Fecha" displayFormat="DD/MM/YYYY"
                            ></IonDatetime>
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

export default withIonLifeCycle(HomeRouter);
