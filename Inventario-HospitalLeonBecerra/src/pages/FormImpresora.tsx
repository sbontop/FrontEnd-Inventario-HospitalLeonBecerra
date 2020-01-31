/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonList, IonButton, IonLoading} from '@ionic/react';
import { Redirect } from 'react-router';
import AxiosImpresora from '../services/AxiosImpresora';


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
}


type Item = {
  src: string;
  text: string;
};

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
];

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

const puntos = [{id: 'Hogar Ines Chambers'},
  {
    id: 'Hospital León Becerra',
  },
];

//const axios = require('axios').default;

export default class FormImpresora extends Component<{}, IState> {
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
        marcas_impresoras:[]

    }
  }

  
  componentDidMount = () => {
    AxiosImpresora.mostrar_marcas_impresoras().then((res:any) => {
      //let marcas = [];
      //marcas.push(res.data);
      console.log("RESPUESTA:",res.data);
      console.log("RESPUESTA 4:",departamentosCustodia);

      this.setState({
        marcas_impresoras:res.data
      }); 

      console.log("DATA:",this.state.marcas_impresoras);

    }).catch((err:any) => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
      });
    });
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

  verificar=()=>{
    let json=this.state.data.printer;
    //let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Usuario","Tinta","Cartucho","BSPI-Punto","Encargado del registro","Observación"];
    //let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","usuario","tinta","cartucho","bspi","encargado_registro","descripcion"];

    //let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Usuario","Tinta","Cartucho","BSPI-Punto","Observación"];
    //let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","usuario","tinta","cartucho","bspi","descripcion"];

    let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Tinta","Cartucho","BSPI-Punto","Observación"];
    let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","tinta","cartucho","bspi","descripcion"];


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
  

  render(){
    if (this.state.confirmacion===false && this.state.redireccionar===true) {
      //return (<Redirect to="/Consulta" />);
      return (<Redirect to="/opinveqinfo" />);
      


    }
    
    

    return (      
      <IonPage>     
      <IonToolbar color="danger">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
        <IonTitle>Registro Impresoras</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>

          <IonAlert
            isOpen={this.state.confirmacion}
            header={'Guardado con éxito'}
            message={'El registro ha sido guardado satisfactoriamente'}
            buttons={[              
              {
                cssClass: 'success',
                text: 'Aceptar',
                handler: () => {
                  console.log('Aceptar');
                  this.setState({ confirmacion: false, redireccionar:true, });
                }
              },
            ]}
          />


      <IonAlert
        isOpen={this.state.guardar}
        header={'Confirmación'}
        message={'¿Está seguro de agregar este nuevo registro?'}
        buttons={[         
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger',
            handler: (blah:any) => {
              this.setState({
                guardar:false
              });
            }
          },
          {
            cssClass: 'success',
            text: 'Aceptar',
            handler: () => {
              console.log('Aceptar');
              this.enviar();              
            }
          }        
        ]}
      />

      <IonAlert
        isOpen={this.state.error_servidor}
        subHeader={'Error en el servidor'}
        message={'Intente de nuevo o más trade'}
        buttons={[
          
          {
            cssClass: 'success',
            text: 'OK',
            handler: () => {
              console.log('ERROR');
              this.setState({
                error_servidor:false
                
              });
            }
          }
        ]}
      />

      <IonLoading
          isOpen={this.state.cargando}
          message={'Registrando Información. Espere por favor...'}

      />

      <IonAlert
        isOpen={this.state.incompleto}
        subHeader={'Faltan ingresar este/os campo/s:'}
        message={this.state.campos_incompletos}
        buttons={[          
          {
            text: 'Ok',
            handler: () => {
              console.log('Aceptar');
              this.setState({
                campos_incompletos:"",
                incompleto:false                
              });

            }
          },
        ]}
      />

        <form>        
        <IonGrid>
          <IonRow class="ion-text-center">
            <IonCol>
              <img src={process.env.PUBLIC_URL+"/assets/img/printer.png"} alt=""/>
            </IonCol>
            <IonCol>            
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Número de serie <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required type="text" name="printer.numero_serie" onIonChange={this.onChangeInput} ></IonInput>
                </IonItem>               
              </IonList>
            </IonCol>
          </IonRow>
  
          <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="stacked">Tipo <IonText color="danger">*</IonText></IonLabel>
                <IonSelect name="printer.tipo" onIonChange={this.onChangeInput} >
                  {tiposImpresoras.map((object, i) => {
                    return (
                      <IonSelectOption key={object.id} value={object.id}>
                        {object.id} 
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <IonList lines="full" class="ion-no-margin ion-no-padding">
                <IonItem>
                  <IonLabel position="stacked">Marca <IonText color="danger">*</IonText></IonLabel>
                  
                  <IonSelect name="printer.marca" onIonChange={this.onChangeInput} >
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
                  <IonLabel position="stacked">Código <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.codigo" type="text" ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado <IonText color="danger">*</IonText></IonLabel>
                  <IonSelect name="printer.estado_operativo" onIonChange={this.onChangeInput} >
                    {estadosImpresoras.map((object, i) => {
                      return (
                        <IonSelectOption key={object.id} value={object.id}>
                          {object.id}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Modelo <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.modelo" type="text" ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Departamento en custodia <IonText color="danger">*</IonText></IonLabel>
                  <IonSelect name="printer.departamento" onIonChange={this.onChangeInput}>
                    {departamentosCustodia.map((object, i) => {
                      return (
                        <IonSelectOption key={object.id} value={object.id}>
                          {object.id} 
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                {/*
                <IonItem>
                  <IonLabel position="stacked">Usuario <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.usuario" type="text" ></IonInput>
                </IonItem>
                */}
                <IonItem>
                  <IonLabel position="stacked">Tinta <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.tinta" type="text" ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Cartucho <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.cartucho" type="text" ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">BSPI-Punto <IonText color="danger">*</IonText></IonLabel>
                  <IonSelect name="printer.bspi" onIonChange={this.onChangeInput}>
                    {puntos.map((object, i) => {
                      return (
                        <IonSelectOption key={object.id} value={object.id}>
                          {object.id} 
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                
                {/*
                <IonItem>
                  <IonLabel position="stacked">Encargado del registro <IonText color="danger">*</IonText></IonLabel>
                  <IonInput onIonChange={this.onChangeInput} name="printer.encargado_registro" required type="text" ></IonInput>
                </IonItem>
               
                */}
                 <IonItem>
                  <IonLabel position="stacked">Observación</IonLabel>
                  <IonTextarea onIonChange={this.onChangeInput} name="printer.descripcion"></IonTextarea>
                </IonItem>
            </IonList>
            </IonCol>
          </IonRow>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonButton onClick={this.verificar} color="success" class="ion-no-margin">Guardar</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={(e:any)=>{this.setState({guardar: true, redireccionar:true})}} color="danger" class="ion-no-margin">Cancelar</IonButton>          
            </IonCol>
          </IonRow>  
        </IonGrid>
        </form>

      </IonContent>
      </IonPage>
    );
  }
  
      
}

