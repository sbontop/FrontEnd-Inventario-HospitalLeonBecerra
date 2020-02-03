/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonToolbar, IonButton, IonRefresher, IonRefresherContent, IonPopover, IonListHeader,IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonTitle, IonHeader,IonSearchbar,IonPage, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonLoading, IonIcon} from '@ionic/react';
import { Redirect } from 'react-router';
import AxiosImpresora from '../../services/AxiosImpresora';
import { RefresherEventDetail } from '@ionic/core';
import { options,add/*,clipboard*/ } from 'ionicons/icons';


import ListaImpresoras from '../../components/impresoraComponents/ListaImpresoras';

interface IState {
  data:any;
  confirmacion:any;
  guardar:any;
  redirectTo:any;
  incompleto:any;
  auxi:any;
  redireccionar:any;
  cargando:any;
  campos_incompletos:any;
  error_servidor:any;
  marcas_impresoras:any;
  impresoras:any;
  mostrando_datos:any;
  buscando_datos:any;
  popOver: any;
  filtro_marca: any;
  filtro_fecha: any;
  datos: any;
  codigo:any;
  busqueda:any;
  hay_datos:any;
  refrescar:any;
}


type Item = {
  src: string;
  text: string;
};


export default class HomeImpresora extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        data:{},
        confirmacion: false,
        redirectTo: false,
        guardar:false,
        incompleto:false,
        auxi: Number,
        redireccionar: false,
        cargando:false,
        campos_incompletos:"",
        error_servidor:false,
        marcas_impresoras:[],
        impresoras:[],
        mostrando_datos:false,
        popOver:false,
        filtro_marca: String,
        filtro_fecha: new Date().toISOString(),
        datos: [] as any,
        codigo: String,
        busqueda:[],
        buscando_datos: false,
        hay_datos:false,
        refrescar:false
    }
  }

  componentDidMount = () => {
    //this.state.marcas_impresoras.push({marca:"Todos"})
    AxiosImpresora.mostrar_marcas_impresoras().then((res:any) => {
      let marcas = res.data;
      //marcas.push(res.data);
      //marcas.unshift({marca:"Todos"});
      console.log("RESPUESTA:",res.data);
      //console.log("RESPUESTA 4:",departamentosCustodia);

      this.setState({
        marcas_impresoras:marcas
      }); 

      //console.log("DATA:",this.state.marcas_impresoras);

    }).catch((err:any) => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
      });
    });

    this.getImpresoras();

  }

  getConsultar=()=>{
    
    this.setState({
      mostrando_datos:true
    });

    if(this.state.codigo !== ""){
      console.log("CONSULTANDO DATOS codi");
    console.log("CODIGO A CONSULTAR:",this.state.codigo);
    AxiosImpresora.impresoras_codigo(this.state.codigo).then((res:any) => {
      //let marcas = [];
      //marcas.push(res.data);
      //console.log("RESPUESTA:",res.data);
      //console.log("RESPUESTA 4:",departamentosCustodia);
      console.log("RESPUESTA DE codi: ",res.data);
      this.setState({
        impresoras:res.data,
        mostrando_datos:false,
        hay_datos:true

      }); 

      //console.log("DATA:",this.state.impresoras);

    }).catch((err:any) => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
        hay_datos:false
      });
    });
    }else{
      this.setState({
        impresoras:[],
        mostrando_datos:false,
        hay_datos:false

      });
    }
  }
  
   getImpresoras=()=>{
    this.setState({
      mostrando_datos:true
    });
    AxiosImpresora.mostrar_datos_impresoras().then((res:any) => {
      //let marcas = [];
      //marcas.push(res.data);
      console.log("RESPUESTA:",res.data);
      //console.log("RESPUESTA 4:",departamentosCustodia);

      this.setState({
        impresoras:res.data,
        mostrando_datos:false,
        hay_datos:true
        
      }); 

      console.log("DATA:",this.state.impresoras);

    }).catch((err:any) => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
        hay_datos:false
      });
    });
  }

  valores = (e:any)=>{
    console.log("FILTRO MARCA: ",this.state.filtro_marca);
    console.log("FILTRO FECHA: ",this.state.filtro_fecha);
  }

  onChangeInput = (e:any) =>{
    const { name, value } = e.target;
    let val = name.split(".");
    this.setState({
        data:{
            ...this.state.data,
            [val[0]]:{
                ...this.state.data[val[0]],
                [val[1]]: value
            }
        }
    });
    
  }

  doRefresh=(event: CustomEvent<RefresherEventDetail>)=> {
    
    console.log('Begin async operation');

    this.setState({
      refrescar:true
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getImpresoras();
      event.detail.complete();
      //this.setState({
      //  refrescar:false
      //});
    }, 2000);
  }

  imprimir=()=>{
    console.log("Valor cod: ",this.state.codigo);
  }

  op=()=>{
    console.log("Valor cod: ",this.state.codigo);
    this.getConsultar();
  }

  
  
  
  accion = () =>{
    this.setState({
      //mostrando_datos:true
      refrescar:false
    })
    this.getImpresoras();
    
  }

  aplicar_filtros = () => {
    this.setState({
      mostrando_datos:true,
      popOver:false
    });
    console.log("MARCAS", this.state.marcas_impresoras);
    let correo: any[] = [];
    if (this.state.filtro_marca !== "Todos" && this.state.filtro_fecha === "") {
      console.log("Se ha activado el filtro por dpto");
      AxiosImpresora.filtrar_impresoras(this.state.filtro_marca).then((res:any) => {
        correo.push(res.data);
        this.setState({
          impresoras:res.data,
          mostrando_datos:false,
          hay_datos:true
        })
      }).catch((err:any) => {
        this.setState({
          cargando:false,
          error_servidor:true,
          hay_datos:false
        });
      });

    } else if (this.state.filtro_marca === "Todos" && this.state.filtro_fecha.substring(0, 10) !== "") {
      console.log("Se ha activado el filtro por fecha y todos");
      
      AxiosImpresora.filtrar_impresoras(this.state.filtro_fecha.substring(0, 10),'Todos').then((res:any) => {
        correo.push(res.data);
        this.setState({
          impresoras:res.data,
          mostrando_datos:false,
          hay_datos:true
        })
      }).catch((err:any) => {
        console.log(err);
        this.setState({
          cargando:false,
          error_servidor:true,
          hay_datos:false
        });
      });


    } else if (this.state.filtro_marca !== "Todos" && this.state.filtro_fecha.substring(0, 10) !== "") {
      console.log("Se ha activado el filtro por fecha y un dpto especifico");
      console.log("FILTRO MARCA CASE: ",this.state.filtro_marca);

    console.log("FILTRO FECHA CASE: ",this.state.filtro_fecha);
    console.log("FILTRO FECHA CASE: ",this.state.filtro_fecha.substring(0, 10));

    console.log("UPDATE VALUE FILTER:",this.state.filtro_marca);

      AxiosImpresora.filtrar_impresoras(this.state.filtro_marca, this.state.filtro_fecha.substring(0, 10)).then((res:any) => {
        correo.push(res.data);
        this.setState({
          impresoras:res.data,
          mostrando_datos:false,

        })
      }).catch((err:any) => {
        console.log(err);
        this.setState({
          cargando:false,
          error_servidor:true,
          hay_datos:false
        });
      });


    } else {
      console.log("Se ha activado el filtro por defecto, sin tener en cuenta la fecha y todod");
      AxiosImpresora.filtrar_impresoras().then((res:any) => {
        this.setState({ datos: res.data, impresoras:res.data });
        console.log(this.state.datos);
      }).catch((err:any) => {
        console.log(err);
        this.setState({
          cargando:false,
          error_servidor:true,
          hay_datos:false
        });
      });


    }
    console.log(this.state.filtro_marca, this.state.filtro_fecha.substring(0, 10));

    this.setState({ datos: correo });
    console.log(this.state.datos);

  }

  render(){//Start
    if (this.state.confirmacion===false && this.state.redireccionar===true) {
      return (<Redirect to="/Equipos" />);
    }
    
    if (this.state.mostrando_datos && this.state.refrescar!==true){
      console.log("INICIOOOOOOOOO",this.state.refrescar);
      return (      
        <IonPage>     
          <IonToolbar color="danger">
            <IonButtons slot="start">
                <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
            <IonTitle>Registro Impresoras</IonTitle>
          </IonToolbar>
          <IonContent fullscreen>
          <IonLoading
            isOpen={this.state.mostrando_datos}
            message={'Cargando datos. Espere por favor...'}
          />
          </IonContent>
        </IonPage>
      );

    }else if(this.state.impresoras.length === 0){
      return (      
        <IonPage>     
                  <br/>

          <IonHeader>
            <IonToolbar color="primary">
              <IonButtons slot="start">
                <IonBackButton defaultHref="home" />
              </IonButtons>
              <IonTitle >Inventario de Impresoras</IonTitle>
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
                    <IonSelect name="printer.marca" onIonChange={(e) => this.setState({filtro_marca:(e.target as HTMLInputElement).value})} >
                    
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
                    <IonLabel>Fecha de <br /> asignación</IonLabel>
                    <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                      value={this.state.filtro_fecha} onIonChange={(e) => this.setState({ filtro_fecha: e.detail.value })}
                      placeholder="Fecha" displayFormat="DD/MM/YYYY"
                    ></IonDatetime>
                  </IonItem>
                </IonList>
                <div className="ion-text-center ion-margin">
                  <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                  {/*<IonButton onClick={() => this.aplicar_filtros()}>Aplicar</IonButton>*/}

                  <IonButton onClick={this.aplicar_filtros}>Aplicar</IonButton>

                </div >
              </IonPopover>
            </IonToolbar>
          </IonHeader>
  
          <IonContent fullscreen>
          <IonSearchbar type="text" placeholder="Ingrese código" onIonBlur={this.op} onIonChange={(e) => this.setState({codigo:(e.target as HTMLInputElement).value})} showCancelButton="always"></IonSearchbar>

          <IonList >
            <IonListHeader>
              No hay ningún resultado
            </IonListHeader>
          </IonList>
          </IonContent>
        </IonPage>
      );
    }else if (this.state.impresoras.length !== 0 || this.state.codigo===""){
      return (      
        <IonPage>
        <br/>
        {/*
        <IonHeader translucent>
        <IonToolbar color="danger">
          <IonButtons slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Registro Impresoras</IonTitle>
        </IonToolbar>
        </IonHeader>
        */}
  
          <IonHeader>
            <IonToolbar color="primary">
              <IonButtons slot="start">
                <IonBackButton defaultHref="home" />
              </IonButtons>
              <IonTitle >Inventario de Impresoras</IonTitle>
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
                    <IonSelect name="printer.marca" onIonChange={(e) => this.setState({filtro_marca:(e.target as HTMLInputElement).value})} >
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
                    <IonLabel>Fecha de <br /> asignación</IonLabel>
                    <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                      value={this.state.filtro_fecha} onIonChange={(e) => this.setState({ filtro_fecha: e.detail.value })}
                      placeholder="Fecha" displayFormat="DD/MM/YYYY"
                    ></IonDatetime>
                  </IonItem>
                </IonList>
                <div className="ion-text-center ion-margin">
                  <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                  {/*<IonButton onClick={() => this.aplicar_filtros()}>Aplicar</IonButton>*/}

                  {/*<IonButton onClick={this.valores}>Aplicar</IonButton>*/}
                  <IonButton onClick={this.aplicar_filtros}>Aplicar</IonButton>

                </div >
              </IonPopover>
            </IonToolbar>
          </IonHeader>
  
          
  
  
  {/*-- Searchbar with cancel button always shown --*/}
  {/*<IonSearchbar type="text" placeholder="Ingrese código" onIonBlur={this.op} onIonChange={(e) => this.setState({codigo:(e.target as HTMLInputElement).value})} showCancelButton="always"></IonSearchbar>*/}
  {/*<IonSearchbar type="text" placeholder="Ingrese código" onIonChange={(e) => {this.op; this.setState({codigo:(e.target as HTMLInputElement).value})} } showCancelButton="never"></IonSearchbar>*/}
  
  <IonSearchbar placeholder={"Buscar por código"} 
                  //onIonChange={(e) => this.setState({codigo:(e.target as HTMLInputElement).value})} 
                  onIonChange={(e:any)=>{this.setState({
                    codigo:e.target.value,
                    
                          })
                      }
                  }
                  onIonCancel={(e: any) => { this.op() }} 
                  cancelButtonIcon="md-search" 
                  showCancelButton="focus"
                >
                    </IonSearchbar>
  
  <IonContent>

  <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
        <IonRefresherContent
          pullingIcon="arrow-dropdown"
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Actualizando...">
        </IonRefresherContent>
      </IonRefresher>
        {this.state.impresoras.map((dato: any) => {
              return (
                //`${r.id_router}`
                //dato.id_impresora
                <ListaImpresoras key={dato.id_impresora} //key={`${dato.id_impresora}`} 
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
                tinta={dato.modelo}
                cartucho={dato.cartucho}
                descripcion={dato.descripcion}
                />
                /*
                id_impresora:string,
                numero_serie:string;
                tipo: string;
                marca: string;
                codigo: string;
                estado_operativo: string;
                modelo: string,
                tinta: string,
                cartucho: string,
                descripcion: string
                */
              )
            })
            }
            
  
        </IonContent>
        </IonPage>
      );
    }
  



    
  }//END
  
      
}

