import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonButtons, IonButton, IonSegment, IonSegmentButton, withIonLifeCycle, IonList, IonItem, IonLabel, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonRow, IonCol, IonNote, IonLoading, IonAlert } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import ListaRecordatorios from '../../components/recordatoriosComponents/ListaRecordatorios';
import { Redirect } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';

import AxiosRecordatorios from '../../services/AxiosRecordatorios';
import styles from './styles.module.css';


class RecordatoriosActualesHome extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
            
            disable_infinite_scroll:false,
            recordatorios: [],
            page_number_busqueda_codigo: 0,
            busqueda_codigo: "",
            opcion_buscar_general: false,
            opcion_buscar_codigo : false,
            codigo_recordatorio: "",
            pageNumber:1,
            mostrando_datos:false,
            size:10,
            error_servidor:false,
            eliminar:false,
            eliminando:false,
            confirmacion: false,
            id_recordatorio_eliminar: ""
        }
    }

    //Estado inicial
    ionViewWillEnter() {
        this.cargar_recordatorios();
    }

    getRecordatoriosNext=(e:any)=>{
        this.setState({
          pageNumber: this.state.pageNumber + 1,
        })
        setTimeout(() => {
          if(this.state.opcion_buscar_codigo){
            console.log('Buscar code');
            this.getConsultar(this.state.busqueda_codigo);
          }else if (this.state.opcion_buscar_general){
            this.setState({codigo: ""});
            console.log('Buscar default     ');
            console.log("Default: ",this.state.recordatorios);
            AxiosRecordatorios.mostrar_recordatorios_paginado(10,this.state.pageNumber).then((res:any) => {
                let fecha_anterior:any = "";
                let info:any = [...this.state.recordatorios, ...res.data.data];              
                for (let i in info){
                      if (i === '0'){
                          fecha_anterior = info[i].fecha_recordatorio;
                      }
                      if(info[i].fecha_recordatorio !== fecha_anterior){
                          info[i].indicador = 'Jump range';
                          fecha_anterior = info[i].fecha_recordatorio;
                      }
                }
                this.setState({
                  recordatorios:info,
                  //mostrando_datos:false,
                }); 
                this.setState({
                  disable_infinite_scroll: res.data.total === this.state.recordatorios.length
                })
              }).catch((err:any) => {
                console.log(err);
                this.setState({
                  cargando:false,
                  mostrando_datos:false,
                  error_servidor:true,
                  page_number_busqueda_codigo : 0,
                });
              });            
          }
          e.target.complete();
        }, 1000);  
      }

    getConsultar=(codigo_buscar:any)=>{  
        this.setState({
          opcion_buscar_general: false,
          opcion_buscar_codigo: true,
        })
        this.setState({
          busqueda_codigo:codigo_buscar
        })
        if (codigo_buscar===""){
          console.log("Opcion start");
          this.cargar_recordatorios_iniciales();
        }else{
          AxiosRecordatorios.recordatorios_codigo(codigo_buscar).then((res:any) => {
            let fecha_anterior:any = "";
            let info:any = res.data;
          
            for (let i in info){
                if (i === '0'){
                    console.log("True");
                    fecha_anterior = info[i].fecha_recordatorio;
                    console.log(info[i].fecha_recordatorio);
                }

                if(info[i].fecha_recordatorio !== fecha_anterior){
                    info[i].indicador = 'Jump range';
                    fecha_anterior = info[i].fecha_recordatorio;
                    console.log("Para update  ");
                    console.log("Cambia: ",info[i]);
                    
                }
              //console.log(+i+". ",info[i]);
          }


          this.setState({
            recordatorios: info,
            
          });
              this.setState({
                disable_infinite_scroll : true,
                codigo_recordatorio : this.state.busqueda_codigo
              })
              }).catch((err:any) => {
                this.setState({
                  cargando:false,
                  mostrando_datos: false,
                  error_servidor:true,
                });
              });
          }
      }

      eliminar = () =>{

        this.setState({
          eliminar:false,
          eliminando:true
        });
        this.setState({
          //eliminando:false,
          confirmacion:false
        });
        AxiosRecordatorios.eliminar_recordatorio_actual(this.state.id_recordatorio_eliminar).then((res:any) => {
          this.setState({
            recordatorios: res.data,
            eliminando:false,
            confirmacion:true
          });
          this.setState({
            disable_infinite_scroll : res.data.total === this.state.recordatorios.length
          })
        }).catch((err:any) => {
          this.setState({
            //cargando:false,
            error_servidor:true,
          });
        });
      }

      _remove(position:any){
        this.setState({
            id_recordatorio_eliminar:position
        })
        this.verificar();
    }
    
    verificar =() =>{
        this.setState({eliminar:true})
    }

    cargar_recordatorios = () => {
        this.setState({
            page_number_busqueda_codigo : 0,
            disable_infinite_scroll:false,
            busqueda_codigo: "",
            opcion_buscar_general: true,
            codigo_recordatorio: "",
            pageNumber:1
          })
          this.setState({
            mostrando_datos:true,
            opcion_buscar_codigo: false,
          });

            AxiosRecordatorios.recordatorios_actuales().then((res:any) => {
              console.log(res.data);
              this.setState({
                recordatorios:res.data,
                mostrando_datos:false,
              }); 
              this.setState({
                disable_infinite_scroll: res.data.total === this.state.recordatorios.length
              })
            }).catch((err:any) => {
              console.log(err);
              this.setState({
                cargando:false,
                mostrando_datos:false,
                error_servidor:true,
                page_number_busqueda_codigo : 0,
              });
            });
    }

    handler =() =>{
        this.cargar_recordatorios();
        this.setState({pageNumber:1});
      }

      cargar_recordatorios_iniciales = () => {
        this.setState({
            page_number_busqueda_codigo : 0,
            disable_infinite_scroll:false,
            busqueda_codigo: "",
            opcion_buscar_general: true,
            codigo_recordatorio: "",
            pageNumber:1
          })
          this.setState({
            //mostrando_datos:true,
            opcion_buscar_codigo: false,
          });

            AxiosRecordatorios.mostrar_recordatorios_paginado(this.state.size,this.state.pageNumber).then((res:any) => {
              
              console.log("Recordatorios: ", res.data.data);
              console.log("Changed: ",this.state.recordatorios);
              //let fecha_actual:any = "";
              let fecha_anterior:any = "";
              let info:any = res.data.data;
              
              for (let i in info){
                    if (i === '0'){
                        //console.log("True");
                        //fecha_actual = info[i].fecha_recordatorio;
                        fecha_anterior = info[i].fecha_recordatorio;
                        //console.log(info[i].fecha_recordatorio);
                    }

                    if(info[i].fecha_recordatorio !== fecha_anterior){
                        info[i].indicador = 'Jump range';
                        fecha_anterior = info[i].fecha_recordatorio;
                        //console.log("Para update  ");
                        //console.log("Cambia: ",info[i]);   
                    }
                  //console.log(+i+". ",info[i]);
              }

              this.setState({
                recordatorios:info,
                //mostrando_datos:false,
              }); 
              this.setState({
                disable_infinite_scroll: res.data.total === this.state.recordatorios.length
              })
            }).catch((err:any) => {
              console.log(err);
              this.setState({
                cargando:false,
                //mostrando_datos:false,
                error_servidor:true,
                page_number_busqueda_codigo : 0,
              });
            });
    }

    doRefresh=(event: CustomEvent<RefresherEventDetail>)=> {
        this.setState({
          pageNumber: 1,
          page_number_buscar_filtro: 1,
          page_number_busqueda_codigo: 0,
          disable_Infinite_Scroll: false,
        });
        setTimeout(() => {
          if (this.state.opcion_buscar_codigo){
            this.getConsultar(this.state.busqueda_codigo);
          }else if (this.state.opcion_buscar_filtro){
            this.setState({
              busqueda_codigo: "",
              codigo_recordatorio: ""
            });
          }else if (this.state.opcion_buscar_general){
            this.setState({
              busqueda_codigo: "",
              codigo_recordatorio: ""
            });
            this.cargar_recordatorios();
          }
          event.detail.complete();
        }, 1000);
      }
    



    tab_historial = () => {
        this.setState({
            tab: "Historial",
            titulo: "Mantenimientos de equipos"
        })
    }

    tab_recordatorio = () => {
        this.setState({
            tab: "Recordatorio",
            titulo: "Recordatorios"
        })
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
                            <IonButton routerLink="/home"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <h4>Recordatorios para hoy</h4>
                        
                    </IonToolbar>
                    
                </IonHeader>
                <IonContent>
                    <br/>  


                    <IonRow hidden={this.state.recordatorios.length === 0 && this.state.mostrando_datos===false?true:false} class="ion-text-center" className={styles.fondo_recordatorio}>
                      <IonCol >
                      <IonNote className="ion-text-cemter" color="light">Tiene pendiente el/los siguiente/s mantenimientos, por favor realizarlo/s lo antes posible. Gracias.</IonNote>
                      </IonCol>
                    </IonRow>                    
                    <div hidden= {this.state.recordatorios.length === 0 && this.state.mostrando_datos===false?true:false} className="ion-margin-top ion-text-center">
                        <img src="./assets/img/mantenimiento/warning.png" alt="Equipo"
                            width="64" height="64" />
                    </div>


                    <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
                        <IonRefresherContent
                        pullingIcon="arrow-dropdown"
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Actualizando...">
                        </IonRefresherContent>
                    </IonRefresher>
                    {this.state.recordatorios.map((dato: any, index:any) => {
                        

                        return (
                            <div key={dato.id_recordatorio}>
                            <ListaRecordatorios key={dato.id_recordatorio+dato.titulo}  
                            id_recordatorio={dato.id_recordatorio}
                            hora_recordatorio={dato.hora_recordatorio}
                            fecha_recordatorio={dato.fecha_recordatorio}
                            estado={dato.estado}
                            id_mantenimiento={dato.id_mantenimiento}
                            codigo={dato.codigo}
                            titulo={dato.titulo}
                            creado={dato.created_at}
                            id_equipo= {dato.id_equipo}
                            tipo_equipo = {dato.tipo_equipo}
                            estado_operativo = {dato.estado_operativo}
                            onRemove = {() =>this._remove(dato.id_recordatorio)}
                            />
                            </div>

                            )
                        })
                        }

                        {/* <IonItem>
                            Recordatorio 1
                        </IonItem>
                        <IonItem>
                            Recordatorio 2
                        </IonItem>
                        <IonItem>
                            Recordatorio 3
                        </IonItem>
                        <IonItem>
                            Recordatorio 4
                        </IonItem>
                        <IonItem>
                            Recordatorio 5
                        </IonItem>
                        <IonItem>
                            Recordatorio 6
                        </IonItem> */}
                    
                    <IonLoading
                        isOpen={this.state.mostrando_datos}
                        message={'Cargando datos. Espere por favor...'}
                    />
                    
                    <IonAlert
                        isOpen={this.state.error_servidor}
                        subHeader={'Error en el servidor'}
                        message={'Intente de nuevo o más trade'}
                        buttons={[{
                            cssClass: 'success',
                            text: 'OK',
                            handler: () => {
                            console.log('ERROR 46');
                            this.setState({
                                error_servidor:false
                            });
                            }
                        }
                        ]}
                    />

                    <IonAlert
                        isOpen={this.state.eliminar}
                        header={'Confirmación'}
                        message={'¿Está seguro de eliminar este registro?'}
                        buttons={[         
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'danger',
                            handler: (blah:any) => {
                            this.setState({
                                eliminar:false
                            });
                            }
                        },
                        {
                            cssClass: 'success',
                            text: 'Aceptar',
                            handler: () => {
                            this.eliminar();              
                            }
                        }        
                        ]}
                    />

                    <IonAlert
                            isOpen={this.state.confirmacion}
                            header={'Registro eliminado'}
                            message={'El registro ha sido eliminado satisfactoriamente'}
                            buttons={[              
                            {
                                cssClass: 'success',
                                text: 'Aceptar',
                                handler: () => {
                                this.setState({ confirmacion: false});
                                }
                            },
                            ]}
                    />

                    <IonLoading
                            isOpen={this.state.eliminando}
                            message={'Eliminando registro. Espere por favor...'}
                    />

                    {/* <IonInfiniteScroll disabled={this.state.disable_infinite_scroll} threshold="100px"                        
                        onIonInfinite={ (e:any) => { this.getRecordatoriosNext(e)  }}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent
                            //loadingSpinner="bubbles"
                            loadingSpinner = {!this.state.disable_infinite_scroll?'bubbles':null}
                            //loadingText="Cargando más registros"
                            loadingText = {!this.state.disable_infinite_scroll?'Cargando más registros':'No hay más registros que mostrar'}>
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll> */}

                    

                    {this.state.recordatorios.length === 0 && this.state.mostrando_datos===false?
                    <div key="sin datos">
                                    <IonLabel className="ion-margin">
                                        <p className="ion-text-center ion-margin">No hay datos que mostrar</p>
                                        <p className="ion-text-center">
                                            <img src="./assets/img/sinResultados.png" alt=":(" />
                                        </p>
                                    </IonLabel>
                    </div>:null
                    }                    
                </IonContent>
            </IonPage >
        )
    }
}
export default withIonLifeCycle(RecordatoriosActualesHome);






