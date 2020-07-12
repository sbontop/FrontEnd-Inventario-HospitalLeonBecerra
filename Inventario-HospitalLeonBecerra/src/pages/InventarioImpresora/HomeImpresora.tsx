/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonToolbar, IonButton, IonRefresher, IonRefresherContent, IonPopover, IonList, IonItem, IonAlert, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonTitle, IonHeader,IonSearchbar,IonPage, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonLoading, IonIcon /*IonRippleEffect,   IonItemDivider*/} from '@ionic/react';
import AxiosImpresora from '../../services/AxiosImpresora';
import { RefresherEventDetail } from '@ionic/core';
import { options,add/*,clipboard*/, home } from 'ionicons/icons';
import { withIonLifeCycle } from '@ionic/react';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import ListaImpresoras from '../../components/impresoraComponents/ListaImpresoras';
import SelectOptionEstado from '../../components/SelectOptionEstado';
//import AxiosAutenticacion from '../../services/AxiosAutenticacion';

interface IState {
  size: any,
  estado:any,
  opcion_buscar_codigo: any;
  opcion_buscar_filtro: any;
  opcion_buscar_general: any;
  pageNumber:any;
  aplicar: any;
  page_number_busqueda_codigo:any;
  page_number_buscar_filtro:any;
  disable_Infinite_Scroll:any;
  confirmacion:any;
  eliminar:any;
  lista:any
  redirectTo:any;
  cargando:any;
  eliminando:any;
  error_servidor:any;
  marcas_impresoras:any;
  impresoras:any;
  mostrando_datos:any;
  popOver: any;
  filtro_marca: any;
  filtro_fecha: any;
  codigo:any;
  id_equipo_eliminar:any;
  busqueda_codigo :any;
}

class HomeImpresora extends Component<{lista:any}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        size:10,
        confirmacion: false,
        redirectTo: false,
        //estado:'Disponible',
        estado:'Todas',
        cargando:false,
        error_servidor:false,
        aplicar: false,
        marcas_impresoras:[],
        impresoras:[],
        mostrando_datos:false,
        popOver:false,
        //filtro_marca: "Todos",
        filtro_marca: 'Todas',
        //filtro_fecha: new Date().toISOString().substring(0, 10),
        filtro_fecha: 'Todas',
        codigo: "",
        eliminar:false,
        eliminando:false,
        id_equipo_eliminar:"",
        pageNumber:1,
        disable_Infinite_Scroll:false,
        lista:{},
        busqueda_codigo: "",
        page_number_busqueda_codigo: 0,
        page_number_buscar_filtro: 1,
        opcion_buscar_codigo : false,
        opcion_buscar_filtro: false,
        opcion_buscar_general: false
    }
  }

  ionViewWillEnter() {
    this.getMarcas();
    this.getImpresoras(10);

    
    
  }

  onSubmit=() => {
    //e.preventDefault()



    





}
  
  ionViewWillLeave() {
    this.setState({
      impresoras:[],
      pageNumber: 1,
      disable_Infinite_Scroll:false
    });
  }

  verificar =() =>{
    this.setState({eliminar:true})
  } 

  clearReload = () => {
    this.setState({ popOver: false});
    this.getImpresoras(10);

    this.setState({
      estado: 'Todas',
      filtro_marca: 'Todas',
      filtro_fecha: 'Todas'
    })
    
  } 

  getMarcas=()=>{
    AxiosImpresora.mostrar_marcas().then((res:any) => {
      let marcas = res.data;
      this.setState({
        marcas_impresoras:marcas
      }); 
    }).catch((err:any) => {
      this.setState({
        cargando:false,
        mostrando_datos: false,
        error_servidor:true,
      });
    });
  }

  _remove(position:any){
    this.setState({
      id_equipo_eliminar:position
    })
    this.verificar();
  }

  eliminar = () =>{
    let info:any;
    if (this.state.opcion_buscar_general){
      console.log('opcion_buscar_general');
      info = {"tipo":"general","size":(this.state.pageNumber)*10};
      this.setState({
        page_number_busqueda_codigo : 0,
        page_number_buscar_filtro:1,
        busqueda_codigo: "",
        opcion_buscar_codigo:false,
        opcion_buscar_filtro:false,
        codigo: ""
      })
    }else if(this.state.opcion_buscar_codigo){
      console.log('opcion_buscar_codigo');
      info = {"tipo":"codigo","codigo":this.state.busqueda_codigo,"size":(this.state.page_number_busqueda_codigo)*10};
      this.setState({
        page_number_buscar_filtro:1,
        pageNumber:1,
        opcion_buscar_general: false,
        opcion_buscar_filtro:false,
      })
    }else if(this.state.opcion_buscar_filtro){
      console.log('opcion_buscar_filtro');
      info = {"tipo":"filtro","fecha":this.state.filtro_fecha,"marca":this.state.filtro_marca,"size":(this.state.opcion_buscar_filtro)*10};
      this.setState({
        page_number_busqueda_codigo:0,
        pageNumber:1,
        opcion_buscar_general: false,
        opcion_buscar_codigo:false,
      })
    }
    this.setState({
      eliminar:false,
      eliminando:true
    });
    this.setState({
      //impresoras: res.data.data,
      //eliminando:false,
      confirmacion:false
    });
    AxiosImpresora.eliminar_impresora(this.state.id_equipo_eliminar,info).then((res:any) => {
      this.setState({
        impresoras: res.data.data,
        eliminando:false,
        confirmacion:true
      });
      this.setState({
        disable_Infinite_Scroll : res.data.total === this.state.impresoras.length
      })
    }).catch((err:any) => {
      this.setState({
        //cargando:false,
        error_servidor:true,
      });
    });
  }

  getConsultar=()=>{    
    if (this.state.codigo!==this.state.busqueda_codigo && this.state.codigo!==""){
      this.setState({
        mostrando_datos:true,
        page_number_busqueda_codigo : 0,
        impresoras : [],
        busqueda_codigo : this.state.codigo,
        opcion_buscar_filtro: false
      })
    }
    this.setState({
      codigo : this.state.busqueda_codigo,
      page_number_buscar_filtro: 1
    })
    if (this.state.busqueda_codigo!==""){
      this.setState({
        page_number_busqueda_codigo : this.state.page_number_busqueda_codigo + 1,
        opcion_buscar_general: false,
        opcion_buscar_codigo: true,
      })
    }
    if (this.state.busqueda_codigo!==""){
      AxiosImpresora.mostrar_datos_impresora_by_id_paginado(this.state.busqueda_codigo, this.state.page_number_busqueda_codigo,this.state.page_number_busqueda_codigo*10).then((res:any) => {  
          if (this.state.page_number_busqueda_codigo ===1){
            this.setState({
              mostrando_datos:false,
              impresoras : res.data.data,
            });
          }else{
            this.setState({
              impresoras:[...this.state.impresoras, ...res.data.data],
            })
          }
          this.setState({
            disable_Infinite_Scroll : res.data.total === this.state.impresoras.length,
            codigo : this.state.busqueda_codigo
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

getImpresoras=(size:any)=>{
  this.setState({
    page_number_busqueda_codigo : 0,
    page_number_buscar_filtro:1,
    disable_Infinite_Scroll:false,
    busqueda_codigo: "",
    opcion_buscar_general: true,
    codigo: ""
  })

  this.setState({
    mostrando_datos:true,
    opcion_buscar_codigo: false,
    opcion_buscar_filtro: false,
  });
  setTimeout(() => {
    AxiosImpresora.mostrar_datos_impresoras_paginado(this.state.size,this.state.pageNumber).then((res:any) => {
      this.setState({
        impresoras:res.data.data,
        lista:res.data.data,
        mostrando_datos:false,
      }); 
      this.setState({
        disable_Infinite_Scroll: res.data.total === this.state.impresoras.length
      })
    }).catch((err:any) => {
      console.log('Option2');
      this.setState({
        cargando:false,
        mostrando_datos:false,
        error_servidor:true,
        page_number_busqueda_codigo : 0,
      });
    });
  }, 1000);
}

getImpresorasNext=(e:any)=>{
  this.setState({
    pageNumber: this.state.pageNumber + 1,
  })
  setTimeout(() => {
    if(this.state.opcion_buscar_codigo){
      console.log('Buscar code');
      this.getConsultar();
    }else if (this.state.opcion_buscar_filtro){
      console.log('Buscar filter ');
      this.setState({
        page_number_buscar_filtro : this.state.page_number_buscar_filtro + 1,
      })
      this.setState({aplicar:false, codigo: ""});
      this.aplicar_filtros(true,this.state.page_number_buscar_filtro);
    }else if (this.state.opcion_buscar_general){
      this.setState({codigo: ""});
      console.log('Buscar default     ');
      AxiosImpresora.mostrar_datos_impresoras_paginado(10,this.state.pageNumber).then((res:any) => {
        this.setState({
          impresoras:[...this.state.impresoras, ...res.data.data]
        }); 
        this.setState({
          disable_Infinite_Scroll: res.data.total === this.state.impresoras.length
        })
      }).catch((err:any) => {
        this.setState({
          cargando:false,
          error_servidor:true,
          page_number_busqueda_codigo : 0,
        });
      });
    }
    e.target.complete();
  }, 1000);  
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
        this.getConsultar();
      }else if (this.state.opcion_buscar_filtro){
        this.aplicar_filtros(false,1);
        this.setState({
          busqueda_codigo: "",
          codigo: ""
        });
      }else if (this.state.opcion_buscar_general){
        this.setState({
          busqueda_codigo: "",
          codigo: ""
        });
        this.getImpresoras(10);
      }
      event.detail.complete();
    }, 1000);
  }
  
  accion = () =>{
    this.getImpresoras(10);    
  }
  change_option_filter = () => {
    this.setState((state)=>{
      return {opcion_buscar_filtro : true}
    });
  }

  aplicar_filtros = (load: boolean, page?:any) => {
    this.setState({
      page_number_busqueda_codigo:0,
      codigo:"",
      busqueda_codigo:""
    })

  console.log("Elementos: ",this.state.filtro_marca, this.state.filtro_fecha, this.state.estado);

  AxiosImpresora.filtrar_impresoras_paginado(page, this.state.filtro_marca, this.state.filtro_fecha, this.state.estado,10).then((res:any) => {
        console.log('Respuest: ',res.data);
        console.log('Respuest: ',res.data.data);
        if (page ===1){
          console.log('Uno f');
          this.setState({
            mostrando_datos:false,
            impresoras : res.data.data,
          });
        }else{
          console.log('Dos f');
          this.setState({
            impresoras:[...this.state.impresoras, ...res.data.data],
            mostrando_datos:false,
          })
        }
        this.setState({
          disable_Infinite_Scroll : res.data.total === this.state.impresoras.length,
        })
      }).catch((err:any) => {
        this.setState({
          cargando:false,
          mostrando_datos: false,
          error_servidor:true,
        });
      });
  }

  cambiar_estado = (e:any) => {
    this.setState({
      estado: e.target.value
    });
  }

  change_marca = (e:any) => {
    this.setState({
      filtro_marca: e.target.value,
    });
    if (this.state.aplicar){
      this.setState({
        page_number_buscar_filtro: 1
      })
    }
    //console.log('M:  ',this.state.filtro_marca);
  }

  change_fecha = (e:any) => {
    this.setState({
      filtro_fecha: e.target.value.substring(0, 10),
    });
    if (this.state.aplicar){
      this.setState({
        page_number_buscar_filtro: 1
      })
    }
    console.log('F:  ',this.state.filtro_fecha);
  }
  
  handler =() =>{
    this.getImpresoras(10);
    this.setState({pageNumber:1});
  }

  render(){//Start    
    return (
    <div>     
    <IonPage>
    <br/>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle >Impresoras</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/FormImpresora"><IonIcon icon={add}></IonIcon></IonButton>
            <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
            {/*<IonButton onClick={this.accion} ><IonIcon icon={clipboard}></IonIcon></IonButton>*/}
          </IonButtons>
          <IonPopover
            isOpen={this.state.popOver}
            onDidDismiss={e => this.setState({ popOver: false })}>
            <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
            <IonList>
              <IonItem>
              <IonLabel>Marca</IonLabel>
                <IonSelect name="printer.marca" value ={this.state.filtro_marca} onIonChange={this.change_marca } >
                  <IonSelectOption selected>Todas</IonSelectOption>

                {this.state.marcas_impresoras.map((object:any, i:any) => {
                  return (
                    <IonSelectOption key={object.marca} value={object.marca}>
                      {object.marca}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Estado operativo</IonLabel>
                  <IonSelect value ={this.state.estado} onIonChange={this.cambiar_estado }>

                  <SelectOptionEstado/>

                  
                </IonSelect>    
              </IonItem>
                

              <IonItem>
                <IonLabel>Fecha registro</IonLabel>
                <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                  value={this.state.filtro_fecha} onIonChange={this.change_fecha}
                  placeholder="Fecha" displayFormat="DD/MM/YYYY"
                ></IonDatetime>
              </IonItem>
            </IonList>
            <div className="ion-text-center ion-margin">

              <IonButton expand="block" onClick={(e:any)=>{ if(1){  this.setState({popOver: false, mostrando_datos: true, page_number_buscar_filtro: 1, opcion_buscar_filtro: true, aplicar: true, opcion_buscar_codigo:false, opcion_buscar_general:false}) 
              this.aplicar_filtros(false,1)}}}>Aplicar</IonButton>
              <IonButton expand="block" onClick={() =>  this.clearReload()} >Limpiar</IonButton>
              <IonButton expand="block" onClick={() => this.setState({ popOver: false }) } >Cancelar</IonButton>
              
            </div >
      
      
          </IonPopover>
        </IonToolbar>
      </IonHeader>
                <IonItem lines = "none">
                <IonSearchbar value = {this.state.codigo} placeholder={"Buscar por código"} 
              onIonChange={(e) => this.setState({codigo:(e.target as HTMLInputElement).value})} 
              onIonCancel={this.getConsultar} 
              cancelButtonIcon="md-search" 
              showCancelButton="focus"
            >              
                </IonSearchbar>   
                <IonButton size="large" shape="round" color="danger" class="bp2" hidden={(!this.state.opcion_buscar_codigo && !this.state.opcion_buscar_filtro)?true:false} fill="clear" onClick={this.handler}><IonIcon icon={home}></IonIcon></IonButton>
                </IonItem>
<IonContent>
<IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
    <IonRefresherContent
      pullingIcon="arrow-dropdown"
      pullingText="Pull to refresh"
      refreshingSpinner="circles"
      refreshingText="Actualizando...">
    </IonRefresherContent>
  </IonRefresher>
  {this.state.impresoras.length === 0 && this.state.mostrando_datos===false?
<div key="sin datos">
                   <IonLabel className="ion-margin">
                    <p className="ion-text-center ion-margin">No hay datos que mostrar</p>
                    <p className="ion-text-center">
                        <img src="./assets/img/sinResultados.png" alt=":(" />
                    </p>
                </IonLabel>
  </div>:null
  }
    {this.state.impresoras.map((dato: any) => {
          return (
            //`${r.id_router}`
            //dato.id_impresora
            <ListaImpresoras key={dato.id_equipo} //key={`${dato.id_impresora}` } 
            id_impresora={dato.id_impresora}
            numero_serie={dato.numero_serie}
            tipo={dato.tipo}
            toner={dato.toner}
            cinta={dato.cinta}
            rollo={dato.rollo}
            rodillo={dato.rodillo}
            marca={dato.marca}
            codigo={dato.codigo} 
            estado_operativo={dato.estado_operativo} 
            modelo={dato.modelo}
            tinta={dato.tinta}
            cartucho={dato.cartucho}
            ip={dato.ip}
            asignado={dato.asignado}
            descripcion={dato.descripcion}
            nombre ={dato.nombre}
            apellido ={dato.apellido}
            direccion_ip ={dato.direccion_ip}
            id_equipo = {dato.id_equipo}
            onRemove = {() =>this._remove(dato.id_equipo)}
             />
          )
        })
        }
        <IonLoading
        isOpen={this.state.mostrando_datos}
        message={'Cargando datos. Espere por favor...'}
      />

<IonLoading
        isOpen={this.state.eliminando}
        message={'Eliminando registro. Espere por favor...'}
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
      <IonInfiniteScroll disabled={this.state.disable_Infinite_Scroll} threshold="100px"                        
                        onIonInfinite={ (e:any) => { this.getImpresorasNext(e)  }}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent
                            //loadingSpinner="bubbles"
                            loadingSpinner = {!this.state.disable_Infinite_Scroll?'bubbles':null}
                            //loadingText="Cargando más registros"
                            loadingText = {!this.state.disable_Infinite_Scroll?'Cargando más registros':'No hay más registros que mostrar'}>
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
          {(this.state.disable_Infinite_Scroll && this.state.impresoras.length!==0) ?
      <div className="ion-margin">
        <IonItem lines="none">
          <br></br>
          <IonLabel color="medium" class="ion-text-center">No hay más registros que mostrar</IonLabel>
          <br></br>
        </IonItem>
      </div>
      :null
    }

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
    </IonContent>
    </IonPage>
    </div>);
  }//END
}

export default withIonLifeCycle(HomeImpresora);