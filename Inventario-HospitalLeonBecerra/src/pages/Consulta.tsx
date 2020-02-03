/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonToolbar, IonButton,  IonPopover, IonListHeader,IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonTitle, IonHeader,IonSearchbar,IonPage, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonLoading, IonIcon} from '@ionic/react';
import { Redirect } from 'react-router';
import AxiosImpresora from '../services/AxiosImpresora';
import { options,add } from 'ionicons/icons';


import ListaImpresoras from '../components/correoComponents/ListaImpresoras';

interface IState {
  expanded: any;
  setExpanded: any;
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
}


type Item = {
  src: string;
  text: string;
};
/*
const tiposImpresoras = [{id: 'Multifuncional'},
  {
    id: 'Matricial'
  },
  {
    id: 'Bazaletes'
  },
  {
   id: 'Impresora'
  },
  {
    id: 'Escaner',
  }
];
*/

/*
const estadosImpresoras = [{id: 'Operativa'},
  {
    id: 'En revisión'
  },
  {
    id: 'Reparado'
  },
  {
    id: 'De baja',
  },
  {
    id: 'Disponible',
  }
];*/

/*
const departamentosCustodia = [{id: 'Coordinación'},
  {
    id: 'Dirección'
  },
  {
    id: 'Proveeduría'
  },
  {
    id: 'Activos fijos'
  },
  {
    id: 'Administración'
  },
  {
    id: 'Admisión',
  }
];
*/

/*
const puntos = [{id: 'Hogar Ines Chambers'},
  {
    id: 'Hospital León Becerra',
  },
];
*/

//const axios = require('axios').default;

export default class Consulta extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        expanded: Number,
        setExpanded: false,
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
        hay_datos:false
    }
  }

  componentDidMount = () => {
    this.state.marcas_impresoras.push({marca:"Todos"})
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

  imprimir=()=>{
    console.log("Valor cod: ",this.state.codigo);
  }

  op=()=>{
    console.log("Valor cod: ",this.state.codigo);
    this.getConsultar();
  }

  verificar=()=>{
    let json=this.state.data.printer;
    //let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Usuario","Tinta","Cartucho","BSPI-Punto","Encargado del registro","Observación"];
    //let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","usuario","tinta","cartucho","bspi","encargado_registro","descripcion"];

    let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Usuario","Tinta","Cartucho","BSPI-Punto","Observación"];
    let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","usuario","tinta","cartucho","bspi","descripcion"];


    if(json!==undefined){
      if(Object.keys(json).length!==lista_campos_completos.length){
        
        let lista_campos_ingresados: any=Object.keys(json);
        let lista_campos_faltantes: String[]=[];
        let texto:String="";
        for(let campo_registro in lista_campos_completos){
          if(!lista_campos_ingresados.includes(lista_campos_completos[campo_registro])){
            lista_campos_faltantes.push(lista_nombres_campos[campo_registro]);     
              texto=texto+" "+lista_nombres_campos[campo_registro]+",";
          }
        }  
        if(texto.slice(-1)===','){
          texto=texto.slice(0,-1);
        }
        this.setState({
          campos_incompletos:texto,
          incompleto:true
        })
      
      }else if(Object.keys(json).length===lista_campos_completos.length){
        this.setState({guardar:true})
      }

    }else{
      
      let texto:String="";
      for (let indice in lista_nombres_campos){
        texto=texto+" "+lista_nombres_campos[indice]+",";
      }
      if(texto.slice(-1)===','){
        texto=texto.slice(0,-1);
      }

      this.setState({
        campos_incompletos:texto,
        incompleto:true
      })
      
    }
  }

  enviar=()=> {
    this.setState({
      guardar:false,
      cargando:true
    });



    let json=this.state.data.printer;
    console.log("JSON ACTUALIZADO:",json);
    console.log("Longitud:",Object.keys(json).length);

    AxiosImpresora.crear_impresora(json).then(res => {
      this.setState({
        cargando:false,
        confirmacion:true,
      });
    }).catch(err => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
      });
    });

    /*
    axios.post('http://localhost:8000/api/impresora', json)
    .then((response: any) =>{
      console.log("JSON:",response);

      this.setState({
        cargando:false,
        confirmacion:true,
      });
      
    },(err:any) => {
      this.setState({
        cargando:false,
        error_servidor:true,
      });

  });*/

  }  

  /*
  sendData = () => {

    let json=this.state.data.printer;
    let am={"a":1};
    
    for(let j in am){
      console.log(j);
      console.log(typeof(j));
    }

    console.log(am);

    for(let i in json){
      console.log(i); // a, b, c
      console.log(typeof(i));
      //njson.String(i)=json[i];
    }
    console.log(json);
    axios.post('http://localhost:8000/api/impresora', json)
    .then(function (response:any) {
      console.log("JSON DE INFORMACION:",response);
    })
    .catch(function (error:any) {
      console.log("ERROR2:",error);
    });
  }*/
  

  aplicar_filtros = () => {
    this.setState({
      mostrando_datos:true
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
    
    if (this.state.mostrando_datos){
          
      return (      
        <IonPage>     
          <IonToolbar color="primary">
            <IonButtons slot="start">
                <IonBackButton defaultHref="/tiposequiposinventario"></IonBackButton>
            </IonButtons>
            <IonTitle>Inventario de Impresoras</IonTitle>
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
                <IonBackButton defaultHref="tiposequipos inventario" />
              </IonButtons>
              <IonTitle >Inventario de Impresoras</IonTitle>
              <IonButtons slot="end">
                <IonButton routerLink="/FormImpresora"><IonIcon icon={add}></IonIcon></IonButton>
                <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
              </IonButtons>
              <IonPopover
                isOpen={this.state.popOver}
                onDidDismiss={e => this.setState({ popOver: false })}>
                <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                <IonList>
                
                  <IonItem>
                    <IonLabel>Marca</IonLabel>
                    <IonSelect name="printer.marca" onIonChange={this.onChangeInput} >
                    <IonSelectOption key={"Todos"} value={"Todos"} selected>Todos</IonSelectOption>
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
                <IonBackButton defaultHref="tiposequiposinventario" />
              </IonButtons>
              <IonTitle >Inventario de Impresoras</IonTitle>
              <IonButtons slot="end">
                <IonButton routerLink="/FormImpresora"><IonIcon icon={add}></IonIcon></IonButton>
                <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
              </IonButtons>
              <IonPopover
                isOpen={this.state.popOver}
                onDidDismiss={e => this.setState({ popOver: false })}>
                <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                <IonList>
                
                  <IonItem>
                  <IonLabel>Marca</IonLabel>
                    <IonSelect name="printer.marca" onIonChange={(e) => this.setState({filtro_marca:(e.target as HTMLInputElement).value})} >
                    <IonSelectOption key={"Todos"} value={"Todos"} selected>Todos</IonSelectOption>
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
  
          
  
        <IonContent fullscreen>
  
  {/*-- Searchbar with cancel button always shown --*/}
  <IonSearchbar type="text" placeholder="Ingrese código" onIonBlur={this.op} onIonChange={(e) => this.setState({codigo:(e.target as HTMLInputElement).value})} showCancelButton="always"></IonSearchbar>
  {/*<IonSearchbar type="text" placeholder="Ingrese código" onClick={this.op} onIonChange={(e) => this.setState({codigo:(e.target as HTMLInputElement).value})} showCancelButton="never"></IonSearchbar>*/}
  
        {this.state.impresoras.map((dato: any) => {
              return (
                <ListaImpresoras key={dato.id_impresora} codigo={dato.codigo} estado_operativo={dato.estado_operativo} marca={dato.marca} />
              )
            })
            }
            
  
        </IonContent>
        </IonPage>
      );
    }
  



    
  }//END
  
      
}

