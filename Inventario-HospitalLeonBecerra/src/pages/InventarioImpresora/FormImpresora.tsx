/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonList, IonButton, IonLoading, IonIcon} from '@ionic/react';
import { Redirect, RouteProps } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {trash} from 'ionicons/icons'


//import AxiosImpresora from '../../services/AxiosImpresora';
import AxiosImpresora from '../../services/AxiosImpresora';


//import ToggleBox from "./ToggleBox";


interface IState {
  ip_anterior:any,
  id_ip_anterior:any,
  marca_anterior:any,
  confirmacion_eliminar:any,
  id_marca_anterior:any,
  seleccion:any,
  expanded: any;
  setExpanded: any;
  eliminar:any;
  eliminando:any;
  data:any;
  data_impresora_by_id:any;
  confirmacion:any;
  guardar:any;
  redirectTo:any;
  incompleto:any;
  auxi:any;
  redireccionar:any;
  cargando:any;
  campos_incompletos:any;
  error_servidor:any;
  marcas:any;
  see:any;
  childVisible:any;
  tipo_seleccion:any;
  matricial:any;
  brazalete:any;
  multifuncional:any;
  impresora:any;
  escaner:any;
  estado_anterior:any;
  existe_repetido:any;
  lista_direcciones_ip:any;
  lista_empleados:any;
  id_impresora_editar: any;
  category:any;
  cambio_datos:any;
  value:any
}



type Item = {
  src: string;
  text: string;
};

var mat1=false;

const tiposImpresoras = [{id: 'Multifuncional'},
  {
    id: 'Matricial'
  },
  {
    id: 'Brazalete'
  },
  {
   id: 'Impresora'
  },
  {
    id: 'Escáner',
  }
];

let estadosImpresoras = [{id: 'Operativa'},
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

const tipo_tinta = [{id: 'Epson'},
  {
    id: 'HP'
  },
  {
    id: 'Canon'
  },
  {
    id: 'Brother'
  },
  {
    id: 'Samsung'
  },
  {
    id: 'Xerox'
  },
  {
    id: 'Dell'
  }
  
];

//const puntos = [{id: 'Hogar Ines Chambers'},
//  {
//    id: 'Hospital León Becerra',
//  },
//];

//const axios = require('axios').default;




export default class FormImpresora extends Component<{} , IState> {
  private id:any;
  private c = false;
  constructor(props: any) {
    super(props);

    //this.onChangeInput = this.onChangeInput.bind(this);


    this.state = {
        expanded: Number,
        setExpanded: false,
        data:{},
        confirmacion_eliminar:false,
        data_impresora_by_id:[],
        confirmacion: false,
        redirectTo: false,
        guardar:false,
        incompleto:false,
        auxi: Number,
        redireccionar: false,
        eliminando: false,
        cargando:false,
        campos_incompletos:"",
        error_servidor:false,
        marcas:[],
        see:false,
        childVisible:false,
        tipo_seleccion:"",
        matricial:false,
        brazalete:false,
        multifuncional:false,
        impresora:false,
        escaner:false,
        existe_repetido: false,
        lista_direcciones_ip:[],
        lista_empleados: [],
        //id: this.props.match.params.id_equipo
        //id: (this.props.match.params.id as any).id
        id_impresora_editar:"",
        category:"",
        cambio_datos:true,
        value:"",
        ip_anterior:"",
        id_ip_anterior:"",
        estado_anterior:"",
        seleccion: false,
        marca_anterior: "",
        id_marca_anterior: "",
        eliminar:false
    }

  }

  
  componentDidMount = () => {
    AxiosImpresora.mostrar_marcas().then((res:any) => {
      //let marcas = [];
      //marcas.push(res.data);
      console.log("RESPUESTA:",res.data);
      console.log("RESPUESTA 4:",departamentosCustodia);

      this.setState({
        marcas:res.data
      }); 

      console.log("DATA:",this.state.marcas);

      console.log('Types: ',res.data);

    }).catch((err:any) => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
      });
      console.log('Error 1');
    });
    this.mostrar_direcciones_ip_libres();
    this.mostrar_empleados();

  
    this.fn();
    
    //console.log('Direccion 6: ',this.id_impresora_editar);
    
    //alert(this.id);
    console.log(this.id+"");


    console.log('hand: ',this.state.id_impresora_editar);

    if (this.id !== undefined){
      console.log('this.id');
      this.obtenerImpresoraById();
    }


    console.log('Marca anterior 96: ',this.state.marca_anterior);

    if(this.id !== undefined){
      //this.onClick();
    }


    console.log('this.state.data.printer 6: ',this.state.data.printer);


  }

  private urlParameters: Array<any> = [];
  //private url:any = document.URL+"";

  obtenerImpresoraById = () =>{

    this.setState({
      cargando: true
    });

    console.log('Metodo');
    console.log(this.id);
    AxiosImpresora.mostrar_dato_impresora_by_id(this.id).then((res:any) => {
      //console.log("RESPUESTA:",res.data);
      
      /*
      if (res.data[0].estado_operativo === 'D'){
        this.setState({estado_anterior: 'Disponible' });
      }else if (res.data[0].estado_operativo === 'B'){
        this.setState({estado_anterior: 'De baja' });
      }else if (res.data[0].estado_operativo === 'R'){
        this.setState({estado_anterior: 'Reparado' });
        console.log('estado_anterior',this.state.estado_anterior);

      }else if (res.data[0].estado_operativo === 'ER'){
        this.setState({estado_anterior: 'En revisión' });
      }else if (res.data[0].estado_operativo === 'O'){
        this.setState({estado_anterior: 'Operativa' });
      }*/
  

      

      this.setState({
        estado_anterior: (() => {
          switch (res.data[0].estado_operativo) {
            case 'D':   return 'Disponible';
            case 'ER': return  'En revisión';
            case 'O':  return  'Operativa';
            case 'R':  return  'Reparado';
            case 'B':  return  'De baja';
          }
        })()
      })

      let data_id = res.data[0];
      data_id.estado_operativo = this.state.estado_anterior;

      this.setState({
        data_impresora_by_id: data_id,
        //data:res.data[0],
        data:{'printer': res.data[0]},
        cargando:false,
        value: res.data[0].numero_serie,
        ip_anterior: res.data[0].ip,
        id_ip_anterior: res.data[0].id_ip,
        marca_anterior: res.data[0].nombre,
        id_marca_anterior: res.data[0].id_marca,
        
        /*estado_anterior: (() => {
          switch (res.data[0].estado_operativo) {
            case 'D':   return 'Disponible';
            case 'ER': return  'En revisión';
            case 'O':  return  'Operativo';
            case 'R':  return  'Reparado';
            case 'B':  return  'De baja';
          }
        })(),*/
        
        //tipo_seleccion: this.state.data_impresora_by_id.tipo
        //eliminando:false,
        //confirmacion:true,
      });



      console.log('estado_anterior ', this.state.estado_anterior);
      console.log('Ip value: ',this.state.ip_anterior);

      //this.state.data_impresora_by_id.estado_operativo = this.state.estado_anterior;

      for (var i=0; i<estadosImpresoras.length; i++){
        if (estadosImpresoras[i].id === this.state.estado_anterior){
          estadosImpresoras.splice(i,1);
        }
      }

      for (var j=0; j<estadosImpresoras.length; j++){
        if (this.state.marcas[j].marca === this.state.marca_anterior){
          this.state.marcas.splice(j,1);
        }
      }

      /*
      for(let i in this.state.marcas){
        
        if(this.state.marcas[i].marca === this.state.data_impresora_by_id.id_marca){
          console.log('En for');
          this.setState({
            id_marca_anterior: this.state.marcas[i].id_marca,
            marca_anterior: this.state.marcas[i].marca
          });

          console.log('marca_anterior: ',this.state.marca_anterior);
          console.log('id_marca_anterior: ',this.state.id_marca_anterior);

        }


      }*/

      
      

      console.log('Array: ',this.state.marcas);


      console.log('Marca: ',this.state.data_impresora_by_id.id_marca)

      console.log('Service: ',this.state.value)


      console.log('data_impresora_by_id: ',this.state.data_impresora_by_id);
      console.log('data_impresora_by_id: ',this.state.data_impresora_by_id.numero_serie);
      console.log('data_impresora_by_id: ',this.state.data_impresora_by_id['numero_serie']);
      console.log('Util: ',this.state.data.printer.numero_serie);
      console.log('Obteniendo por id '+this.id+" ", this.state.data);

      //console.log("DATA:",res.data);

    }).catch((err:any) => {

      this.setState({
        //cargando:false,
        //error_servidor:true,
      });
    });

  }


  fn =()=>{
  

    console.log('Direccion: ',document.URL.split("/").length);


    if (document.URL.indexOf("edit") > 0) {
      let splitURL = document.URL.split("/");
      this.id= splitURL[splitURL.length-1];
      this.setState({
        id_impresora_editar:splitURL[splitURL.length-1]
      })
      //let splitParams = splitURL[1].split("&");
      /*
      let i: any;
      for (i in splitParams){
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == "category"){
          this.category = singleURLParam[1];
        }
        if (singleURLParam[0] == "id"){
          this.id = singleURLParam[1];
        }
        let urlParameter = {
        'name': singleURLParam[0],
        'value': singleURLParam[1]
      };
      this.urlParameters.push(urlParameter);
      }*/
    }

    //console.log('Value: ',this.state.id_impresora_editar);


  }

  onChange = (e:any) => {
    this.setState({
      value : e.target.value
    })

    console.log("Valor ss: ",this.state.value);

  }

  /*onChangeInput = (e:any) =>{
    
    this.setState({
      cambio_datos:false
    })
    
    console.log('Modified: ',e.target);

    const { name, value } = e.target;
    let val = name.split(".");
    console.log('name: ',name);
    console.log('value: ',value);
    this.setState({
        data:{
            ...this.state.data,
            [val[0]]:{
                ...this.state.data[val[0]],
                [val[1]]: value
            }
        }
      
    });
   this.setState({
//     tipo_seleccion:this.state.data
   }) 
  }*/

  onChangeInput = (e:any) =>{
    let m = this.state.data_impresora_by_id.id_marca;
    console.log('Out: ',this.state.data_impresora_by_id.id_marca);

    

    console.log('Modified: ',e.target);


    const { name, value } = e.target;
    let val = name.split(".");
    console.log('name: ',name);
    console.log('value: ',value);
    
    if (val[1] === 'ip' && value === this.state.ip_anterior){
      this.setState({
        seleccion:true
      })
    }else if (val[1] === 'ip' && value !== this.state.ip_anterior){
      this.setState({
        seleccion:false
      })
    }


    this.setState({
        data_impresora_by_id:{
            ...this.state.data_impresora_by_id,

                ...this.state.data_impresora_by_id[val[0]],
                [val[1]]: value
        }
      
    });
   this.setState({
//     tipo_seleccion:this.state.data
   })
   //value = {this.state.data_impresora_by_id.asignado}
   console.log('Pl: ',this.state.data_impresora_by_id);
   
  }


  mostrar_direcciones_ip_libres() {
    AxiosImpresora.mostrar_direcciones_ip_libres().then((res: any) => {
        this.setState({
          lista_direcciones_ip : res.data
        });
        console.log("DATA:", res.data);
    }).catch((err: any) => {
        console.log(err);
    });
}

mostrar_empleados() {
  AxiosImpresora.mostrar_empleados().then((res: any) => {
      this.setState({
        lista_empleados : res.data
      });
      console.log("DATA:", res.data);
  }).catch((err: any) => {
      console.log(err);
  });
}

  verificar=()=>{
    console.log("Información printer:",this.state.data.printer);
    //console.log("Información printer arreglo:",this.state.data.printer);
    //console.log("TYPE OF PRINTER",this.state.tipo_seleccion);
    //console.log("SAVE:",this.state.data.printer);
    //console.log("SAVE:",this.state.data.printer.tipo);

    //let valor =false;
    let cantidad=0;    

    //let json=this.state.data.printer;

    let json = this.state.data_impresora_by_id;

/*    
    let json = {numero_serie: "PQWR",
    tipo: "Brazalete",
    marca: "Ricoh",
    codigo: "ZXCD",
    estado_operativo: "Disponible",
    modelo: "KLUJ",
    rollo: "HBPI",
    descripcion: "ASNO"};
*/    

    console.log(json);

    /*
    if(json === undefined ){
      console.log("Incompleto");
      console.log(Object.keys(json).length-1);
    }

    if(json.hasOwnProperty('descripcion')){
      //valor=true;
      cantidad=Object.keys(json).length-1;
    }else{
      //valor=true;
      cantidad=Object.keys(json).length;
    }*/

    if(json === undefined){
      //valor=true;
      cantidad=0;
    }else{
      //valor=true;
      cantidad=Object.keys(json).length;
    }

    //Si no tiene normal
    

    console.log("Sin eliminar: ", json);
    //delete json['descripcion'];
    console.log("Eliminado : ",json);
    //let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Usuario","Tinta","Cartucho","BSPI-Punto","Encargado del registro","Observación"];
    //let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","usuario","tinta","cartucho","bspi","encargado_registro","descripcion"];

    //let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Usuario","Tinta","Cartucho","BSPI-Punto","Observación"];
    //let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","usuario","tinta","cartucho","bspi","descripcion"];

    //let lista_nombres_campos:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Departamento en custodia","Tinta","Cartucho","BSPI-Punto"];    
    //let lista_campos_completos:any=["numero_serie","tipo","marca","codigo","estado_operativo","modelo","departamento","tinta","cartucho","bspi"];

    let lista_nombres_campos_impresora_defecto:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo"];    
    let lista_nombres_campos_impresora:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Tinta","Cartucho",];    
    let lista_nombres_campos_brazalete:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Rollo"];    
    let lista_nombres_campos_multifuncional:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Tinta","Cartucho","Toner"];    
    let lista_nombres_campos_matricial:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Cinta"];    
    let lista_nombres_campos_escaner:any=["Número de serie","Tipo","Marca","Código","Estado Operativo","Modelo","Rodillo"];    

    let lista_campos_completos_impresora_defecto:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo"];
    let lista_campos_completos_impresora:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","tinta","cartucho"];
    let lista_campos_completos_brazalete:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","rollo"];
    let lista_campos_completos_multifuncional:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","tinta","cartucho","toner"];
    let lista_campos_completos_matricial:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","cinta"];
    let lista_campos_completos_escaner:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","rodillo"];


    if(json!==undefined){
      let lista_campos_ingresados: any=Object.keys(json);
      let lista_valores_imgresados: any=Object.values(json);
      let texto:String="";
      let valor_indice:number;
      let campo:String="";
      let campo_nombre_completo:String="";
      let valor_vacio: String="";
      if(this.state.data_impresora_by_id.tipo==="Impresora"){
        console.log('Condición 1');
          // 8!==8 cantidad: 8         9-1!==8 cantidad: 9
          // let lista_campos_completos_impresora:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","tinta","cartucho"];

          if ((json.hasOwnProperty('numero_serie')!==true || (json.numero_serie+'').trim()==='' ||  json.numero_serie=== undefined) || (json.hasOwnProperty('tipo')!==true || (json.tipo+'').trim()==='') || 
          (json.hasOwnProperty('id_marca')!==true || (json.id_marca+'').trim()==='') || (json.hasOwnProperty('codigo')!==true || (json.codigo+'').trim()==='' || json.codigo=== undefined) || 
          (json.hasOwnProperty('estado_operativo')!==true || (json.estado_operativo+'').trim()==='') || (json.hasOwnProperty('modelo')!==true || (json.modelo+'').trim()==='' || json.modelo=== undefined) || 
          (json.hasOwnProperty('tinta')!==true || (json.tinta+'').trim()==='') || (json.hasOwnProperty('cartucho')!==true || (json.cartucho+'').trim()==='')){
            console.log('Condición96');
            //let text:String=json.rodillo+''.replace(/^\s+|\s+$/g, '');
            //let text:String=(json.rodillo+'').trim();
            //console.log('Espacios: ',json.rodillo+''.replace(/^\s+|\s+$/g, ""));
            //console.log('Espacios 2:',(json.rodillo+'').trim().length);
            //console.log('Espacios 4: ',text+'z');
  
  
            console.log('L:',lista_valores_imgresados);
            console.log('Clave: ',lista_campos_ingresados);
            console.log('Valor: ',lista_valores_imgresados);
            console.log('CamposCompletos: ',lista_campos_completos_impresora);
            //let lista_campos_faltantes: String[]=[];
  
  
  
            for(let i in lista_campos_completos_impresora){
              campo = lista_campos_completos_impresora[i]; //marca
              campo_nombre_completo = lista_nombres_campos_impresora[i];
              valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
              valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
  
              if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice]===undefined){ //Si el valor índice es menor que cero
                                   // no está ingresado ese campo
                  texto = texto+" "+campo_nombre_completo+",";
              }
              //valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
              console.log('Valor vacio: ',valor_vacio);
  
            }
  
            if(texto.slice(-1)===','){
              texto=texto.slice(0,-1);
            }
            this.setState({
              campos_incompletos:texto,
              incompleto:true
            })
  
  
          }else{
          this.setState({guardar:true})
        }

      }else if(this.state.data_impresora_by_id.tipo==="Matricial"){

        //     let lista_campos_completos_matricial:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","cinta"];

        if ((json.hasOwnProperty('numero_serie')!==true || (json.numero_serie+'').trim()==='' || json.numero_serie=== undefined) || (json.hasOwnProperty('tipo')!==true || (json.tipo+'').trim()==='') || 
          (json.hasOwnProperty('id_marca')!==true || (json.id_marca+'').trim()==='') || (json.hasOwnProperty('codigo')!==true || (json.codigo+'').trim()==='' || json.codigo === undefined) || 
          (json.hasOwnProperty('estado_operativo')!==true || (json.estado_operativo+'').trim()==='') || (json.hasOwnProperty('modelo')!==true || (json.modelo+'').trim()==='' || json.modelo === undefined) || 
          (json.hasOwnProperty('cinta')!==true || (json.cinta+'').trim()==='')){
            console.log('Condición96');
            //let text:String=json.rodillo+''.replace(/^\s+|\s+$/g, '');
            //let text:String=(json.rodillo+'').trim();
            //console.log('Espacios: ',json.rodillo+''.replace(/^\s+|\s+$/g, ""));
            //console.log('Espacios 2:',(json.rodillo+'').trim().length);
            //console.log('Espacios 4: ',text+'z');
  
  
            console.log('L:',lista_valores_imgresados);
            console.log('Clave: ',lista_campos_ingresados);
            console.log('Valor: ',lista_valores_imgresados);
            console.log('CamposCompletos: ',lista_campos_completos_matricial);
            //let lista_campos_faltantes: String[]=[];
  
  
  
            for(let i in lista_campos_completos_matricial){
              campo = lista_campos_completos_matricial[i]; //marca
              campo_nombre_completo = lista_nombres_campos_matricial[i];
              valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
              valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
  
              if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice]===undefined){ //Si el valor índice es menor que cero
                                   // no está ingresado ese campo
                  texto = texto+" "+campo_nombre_completo+",";
              }
              //valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
              console.log('Valor vacio: ',valor_vacio);
  
            }
  
            if(texto.slice(-1)===','){
              texto=texto.slice(0,-1);
            }
            this.setState({
              campos_incompletos:texto,
              incompleto:true
            })
  
  
          }else{
          this.setState({guardar:true})
        }

      }else if(this.state.data_impresora_by_id.tipo==="Brazalete"){

//        let lista_campos_completos_brazalete:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","rollo"];


        if ((json.hasOwnProperty('numero_serie')!==true || (json.numero_serie+'').trim()==='' || json.numero_serie=== undefined) || (json.hasOwnProperty('tipo')!==true || (json.tipo+'').trim()==='') || 
          (json.hasOwnProperty('id_marca')!==true || (json.id_marca+'').trim()==='') || (json.hasOwnProperty('codigo')!==true || (json.codigo+'').trim()==='' || json.codigo=== undefined) || 
          (json.hasOwnProperty('estado_operativo')!==true || (json.estado_operativo+'').trim()==='') || (json.hasOwnProperty('modelo')!==true || (json.modelo+'').trim()==='' || json.modelo=== undefined) || 
          (json.hasOwnProperty('rollo')!==true || (json.rollo+'').trim()==='')){
            console.log('Condición96');
            //let text:String=json.rodillo+''.replace(/^\s+|\s+$/g, '');
            //let text:String=(json.rodillo+'').trim();
            //console.log('Espacios: ',json.rodillo+''.replace(/^\s+|\s+$/g, ""));
            //console.log('Espacios 2:',(json.rodillo+'').trim().length);
            //console.log('Espacios 4: ',text+'z');
  
  
            console.log('L:',lista_valores_imgresados);
            console.log('Clave: ',lista_campos_ingresados);
            console.log('Valor: ',lista_valores_imgresados);
            console.log('CamposCompletos: ',lista_campos_completos_brazalete);
            //let lista_campos_faltantes: String[]=[];
  
  
  
            for(let i in lista_campos_completos_brazalete){
              campo = lista_campos_completos_brazalete[i]; //marca
              campo_nombre_completo = lista_nombres_campos_brazalete[i];
              valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
              valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
  
              if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice]===undefined){ //Si el valor índice es menor que cero
                                   // no está ingresado ese campo
                  texto = texto+" "+campo_nombre_completo+",";
              }
              //valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
              console.log('Valor vacio: ',valor_vacio);
  
            }
  
            if(texto.slice(-1)===','){
              texto=texto.slice(0,-1);
            }
            this.setState({
              campos_incompletos:texto,
              incompleto:true
            })
  
  
          }else{
          this.setState({guardar:true})
        }

      }else if(this.state.data_impresora_by_id.tipo==="Multifuncional"){

        //  let lista_campos_completos_multifuncional:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo","tinta","cartucho","toner"];


        if ((json.hasOwnProperty('numero_serie')!==true || (json.numero_serie+'').trim()==='' || json.numero_serie=== undefined ) || (json.hasOwnProperty('tipo')!==true || (json.tipo+'').trim()==='') || 
          (json.hasOwnProperty('id_marca')!==true || (json.id_marca+'').trim()==='') || (json.hasOwnProperty('codigo')!==true || (json.codigo+'').trim()==='' || json.codigo=== undefined) || 
          (json.hasOwnProperty('estado_operativo')!==true || (json.estado_operativo+'').trim()==='') || (json.hasOwnProperty('modelo')!==true || (json.modelo+'').trim()==='' || json.modelo=== undefined) || 
          (json.hasOwnProperty('tinta')!==true || (json.tinta+'').trim()==='') || (json.hasOwnProperty('cartucho')!==true || (json.cartucho+'').trim()==='') ||
          (json.hasOwnProperty('toner')!==true || (json.toner+'').trim()==='')){
            console.log('Condición96');
            //let text:String=json.rodillo+''.replace(/^\s+|\s+$/g, '');
            //let text:String=(json.rodillo+'').trim();
            //console.log('Espacios: ',json.rodillo+''.replace(/^\s+|\s+$/g, ""));
            //console.log('Espacios 2:',(json.rodillo+'').trim().length);
            //console.log('Espacios 4: ',text+'z');
  
  
            console.log('L:',lista_valores_imgresados);
            console.log('Clave: ',lista_campos_ingresados);
            console.log('Valor: ',lista_valores_imgresados);
            console.log('CamposCompletos: ',lista_campos_completos_multifuncional);
            //let lista_campos_faltantes: String[]=[];
  
  
  
            for(let i in lista_campos_completos_multifuncional){
              campo = lista_campos_completos_multifuncional[i]; //marca
              campo_nombre_completo = lista_nombres_campos_multifuncional[i];
              valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
              valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
  
              if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice] === undefined){ //Si el valor índice es menor que cero
                                   // no está ingresado ese campo
                  texto = texto+" "+campo_nombre_completo+",";
              }
              //valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
              console.log('Valor vacio: ',valor_vacio);
  
            }
  
            if(texto.slice(-1)===','){
              texto=texto.slice(0,-1);
            }
            this.setState({
              campos_incompletos:texto,
              incompleto:true
            })
  
  
          }else{
          this.setState({guardar:true})
        }

      }else if(this.state.data_impresora_by_id.tipo==="Escaner"){
        //console.log('Tipo: Escaner ');
        //console.log('Sm: ',json.hasOwnProperty('id_marca'));
        if ((json.hasOwnProperty('numero_serie')!==true || (json.numero_serie+'').trim()==='' || json.numero_serie=== undefined) || (json.hasOwnProperty('tipo')!==true || (json.tipo+'').trim()==='') || 
            (json.hasOwnProperty('codigo')!==true || (json.codigo+'').trim()==='' || json.codigo=== undefined) || (json.hasOwnProperty('estado_operativo')!==true || (json.estado_operativo+'').trim()==='') || 
            (json.hasOwnProperty('modelo')!==true || (json.modelo+'').trim()==='' || json.modelo=== undefined) || (json.hasOwnProperty('rodillo')!==true || (json.rodillo+'').trim()==='') || 
            (json.hasOwnProperty('id_marca')!==true || (json.id_marca+'').trim()==='')){
          console.log('Condición96');
          //let text:String=json.rodillo+''.replace(/^\s+|\s+$/g, '');
          //let text:String=(json.rodillo+'').trim();
          //console.log('Espacios: ',json.rodillo+''.replace(/^\s+|\s+$/g, ""));
          //console.log('Espacios 2:',(json.rodillo+'').trim().length);
          //console.log('Espacios 4: ',text+'z');


          console.log('L:',lista_valores_imgresados);
          console.log('Clave: ',lista_campos_ingresados);
          console.log('Valor: ',lista_valores_imgresados);
          console.log('CamposCompletos: ',lista_campos_completos_escaner);
          //let lista_campos_faltantes: String[]=[];



          for(let i in lista_campos_completos_escaner){
            campo = lista_campos_completos_escaner[i]; //marca
            campo_nombre_completo = lista_nombres_campos_escaner[i];
            valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
            valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();

            if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice]===undefined){ //Si el valor índice es menor que cero
                                 // no está ingresado ese campo
                texto = texto+" "+campo_nombre_completo+",";
            }
            //valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
            console.log('Valor vacio: ',valor_vacio);

          }

          if(texto.slice(-1)===','){
            texto=texto.slice(0,-1);
          }
          this.setState({
            campos_incompletos:texto,
            incompleto:true
          })


        }else{
          this.setState({guardar:true})
          //console.log('Función: ', this.state.data.printer.numero_serie);
        }
 
          

      }else{
        
//        let lista_campos_completos_impresora_defecto:any=["numero_serie","tipo","id_marca","codigo","estado_operativo","modelo"];

        console.log('Revisar');
        
        if ((json.hasOwnProperty('numero_serie')!==true || (json.numero_serie+'').trim()==='' || json.numero_serie=== undefined) || (json.hasOwnProperty('tipo')!==true || (json.tipo+'').trim()==='') || 
          (json.hasOwnProperty('id_marca')!==true || (json.id_marca+'').trim()==='') || (json.hasOwnProperty('codigo')!==true || (json.codigo+'').trim()==='' || json.codigo=== undefined) || 
          (json.hasOwnProperty('estado_operativo')!==true || (json.estado_operativo+'').trim()==='') || (json.hasOwnProperty('modelo')!==true || (json.modelo+'').trim()==='' || json.modelo=== undefined )){
            console.log('Condición96');
            //let text:String=json.rodillo+''.replace(/^\s+|\s+$/g, '');
            //let text:String=(json.rodillo+'').trim();
            //console.log('Espacios: ',json.rodillo+''.replace(/^\s+|\s+$/g, ""));
            //console.log('Espacios 2:',(json.rodillo+'').trim().length);
            //console.log('Espacios 4: ',text+'z');
  
            // lista_nombres_campos_impresora_defecto
  
            console.log('L:',lista_valores_imgresados);
            console.log('Clave: ',lista_campos_ingresados);
            console.log('Valor: ',lista_valores_imgresados);
            console.log('CamposCompletos: ',lista_campos_completos_impresora_defecto);
            //let lista_campos_faltantes: String[]=[];
  
  
  
            for(let i in lista_campos_completos_impresora_defecto){
              campo = lista_campos_completos_impresora_defecto[i]; //marca
              campo_nombre_completo = lista_nombres_campos_impresora_defecto[i];
              valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
              valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
  
              if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice] === undefined){ //Si el valor índice es menor que cero
                                   // no está ingresado ese campo
                  texto = texto+" "+campo_nombre_completo+",";
              }
              //valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();
              console.log('Valor vacio: ',valor_vacio);
  
            }
  
            if(texto.slice(-1)===','){
              texto=texto.slice(0,-1);
            }
            this.setState({
              campos_incompletos:texto,
              incompleto:true
            })
  
  
          }else{
          this.setState({guardar:true})
        }

        

      
      
      }
      

    }else{
      
      let texto:String="";
      for (let indice in lista_nombres_campos_impresora){
        texto=texto+" "+lista_nombres_campos_impresora[indice]+",";
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


  onClick=()=> {
    console.log("INGRESOOOOOO");
    console.log("TIPO DE SELECCIÓN:",this.state.tipo_seleccion);
    //console.log("TIPO DE SELECCIÓN:",this.state.data.printer.tipo);
    //mat1=this.state.data.printer.tipo;
    //mat1=true;
    console.log("Var: ",mat1);
    if(this.state.data_impresora_by_id.tipo==="Matricial"){
      console.log("En el if");
      this.setState({
        matricial:true,
        brazalete:false,
        multifuncional:false,
        impresora:false,
        escaner:false
      });

    }else if(this.state.data_impresora_by_id.tipo==="Brazalete"){
      this.setState({
        matricial:false,
        brazalete:true,
        multifuncional:false,
        impresora:false,
        escaner:false
      });
    }else if(this.state.data_impresora_by_id.tipo==="Multifuncional"){
      this.setState({
        matricial:false,
        brazalete:false,
        multifuncional:true,
        impresora:false,
        escaner:false
      });
    }else if(this.state.data_impresora_by_id.tipo==="Impresora"){
      this.setState({
        matricial:false,
        brazalete:false,
        multifuncional:false,
        impresora:true,
        escaner:false
      });
    }else if(this.state.data_impresora_by_id.tipo==="Escaner"){
      this.setState({
        matricial:false,
        brazalete:false,
        multifuncional:false,
        impresora:false,
        escaner:true
      });
    }


    
  }

  accion = () =>{
    this.setState({eliminar:true});
  }

  eliminar = () =>{

    this.setState({
      eliminar:false,
      eliminando:true
    });
    console.log('Delete: ',this.id);
    AxiosImpresora.eliminar_impresora(this.state.data_impresora_by_id.id_equipo).then((res:any) => {
      console.log("RESPUESTA:",res.data);
      this.setState({
        eliminando:false,
        confirmacion_eliminar:true,
      });
      console.log('Delete completed: ',this.id);

      //console.log("DATA:",this.state.impresoras);

    }).catch((err:any) => {

      this.setState({
        //cargando:false,
        //error_servidor:true,
      });
    });

  }

  cambiar_estado=()=>{
    
  }

   clone( obj:any ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = this.clone( obj[ key ] );
    }
 
    return temp;
}

  enviar=()=> {
    this.setState({
      guardar:false,
      cargando:true
    });



    //let json=this.state.data.printer;

    let json = this.state.data_impresora_by_id;
    

    /*
    let json = {numero_serie: "PQWR",
    tipo: "Brazalete",
    marca: "Ricoh",
    codigo: "AAAA22",
    estado_operativo: "D",
    modelo: "KLUJ",
    rollo: "HBPI",
    descripcion: "Not exits"};
    */
    console.log("JSON ACTUALIZADO:",json);
    console.log("Longitud:",Object.keys(json).length);
    

    let json_datos_editados = this.clone(json);
    console.log('Before: ',json_datos_editados);
    //json_datos_editados.numero_serie='AAXX';
    console.log('After: ',json_datos_editados);

    if (json.estado_operativo === 'Disponible'){
      json_datos_editados.estado_operativo = 'D';
    }else if (json.estado_operativo === 'De baja'){
      json_datos_editados.estado_operativo = 'B';
    }else if (json.estado_operativo === 'Reparado'){
      json_datos_editados.estado_operativo = 'R';
    }else if (json.estado_operativo === 'En revisión'){
      json_datos_editados.estado_operativo = 'ER';
    }else if (json.estado_operativo === 'Operativa'){
      json_datos_editados.estado_operativo = 'O';
    }



    if(this.id===undefined){

      console.log('Creando impresora');

    AxiosImpresora.crear_impresora_nueva(json_datos_editados).then(res => {
      

      if (res.data.log === 1){
        if (this.state.cargando===true){
          this.setState({
            confirmacion:false
          });          
        }
        this.setState({
          cargando:false,
          confirmacion:true,
        });
      }else if (res.data.log === -1){
        console.log('Condicion -1');
        this.setState({
          cargando:false,
          existe_repetido:true,
        });
      }
      console.log('Impresora: ',res.data.length);
      console.log('Impresora: ',res.data.log);

    }).catch(err => {
      //console.log(err);
      this.setState({
        cargando:false,
        error_servidor:true,
      });
      console.log('Error 2');

    });

  }else if(this.id!==undefined){
  
    
    console.log('Editando impresora');
    //json.property = 'ppp4';
    json_datos_editados.key = json.id_impresora;
    //console.log('Actualizando: ',json);
    //json.descripcion = 'Actualizado';
    //console.log('Actualizando2: ',json);

    console.log('Actualizar: ',json_datos_editados);

    AxiosImpresora.editar_impresora(json_datos_editados).then(res => {  
        this.setState({
          cargando:false,
          confirmacion:true,
        });
      console.log('Impresora: ',res.data.length);
      console.log('Impresora: ',res.data.log);

    }).catch(err => {
      this.setState({
        cargando:false,
        error_servidor:true,
      });
      console.log('Error 2');

    });
  }

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
      return (<Redirect to="/Consulta" />);      
    }
    
    

    return (      
      <IonPage>     
      <IonToolbar color="danger">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
        <IonTitle >Registro Impresoras</IonTitle>
        <IonButtons slot="end">
        
        <IonButton hidden = {this.id===undefined?true:false} onClick = {this.accion} ><IonIcon icon={trash}></IonIcon></IonButton>

        </IonButtons>
      </IonToolbar>
      <IonContent fullscreen>

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
          console.log('Aceptar');
          this.eliminar();              
        }
      }        
    ]}
  />


      <IonAlert
            isOpen={this.state.existe_repetido}
            header={'Información repetida'}
            message={'El código/numero de serie ya existen en la base de datos'}
            buttons={[              
              {
                cssClass: 'success',
                text: 'Aceptar',
                handler: () => {
                  console.log('Aceptar');
                  this.setState({ existe_repetido: false});
                }
              },
            ]}
          />

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
                  this.setState({ confirmacion: false, redireccionar:true });
                }
              },
            ]}
          />

<IonAlert
        isOpen={this.state.confirmacion_eliminar}
        header={'Registro eliminado'}
        message={'El registro ha sido eliminado satisfactoriamente'}
        buttons={[              
          {
            cssClass: 'success',
            text: 'Aceptar',
            handler: () => {
              console.log('Aceptar');
              this.setState({ confirmacion_eliminar: false,redireccionar:true});
            }
          },
        ]}
      />

      <IonAlert
        isOpen={this.state.guardar}
        header={'Confirmación'}
        message={this.id!==undefined?'¿Desea guardar los nuevos cambios?':'¿Está seguro de agregar este nuevo registro?'}
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
              console.log('ERROR 46');
              this.setState({
                error_servidor:false
                
              });
            }
          }
        ]}
      />
      <IonLoading
          isOpen={this.state.cargando}
          message={this.id!==undefined?'Cargando datos. Espere por favor...':'Registrando Información. Espere por favor...'}

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
                  {/*<IonInput required type="text" value = {this.state.data_impresora_by_id.numero_serie} onIonChange={this.onChangeInput} ></IonInput>*/}
                  {/*<IonInput required type="text" value = {this.state.data.printer.numero_serie} onIonChange={this.onChangeInput} ></IonInput>*/}

                  {/*<IonInput required type="text" defaultValue="Numero" value = {this.state.data.printer.numero_serie} onIonChange={(e:any)=>{console.log(this.state.data.printer.numero_serie)}} ></IonInput>*/}

                  <IonInput required disabled = {this.id!==undefined?true:false} type="text" name="printer.numero_serie" value = {this.state.data_impresora_by_id.numero_serie} onIonChange={this.onChangeInput} ></IonInput>

                </IonItem>              
              </IonList>
            </IonCol>
          </IonRow>
  
          <IonRow>
            <IonCol>
            <IonItem>
                <IonLabel position="stacked">Tipo <IonText color="danger">*</IonText></IonLabel>
                  <IonSelect disabled = {this.id!==undefined?true:false} name="printer.tipo"
                            value = {this.state.data_impresora_by_id.tipo} 
                            onIonChange={(e:any)=>{this.onChangeInput(e);this.onClick()}}>
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
                  
                  <IonSelect name="printer.id_marca" value = {this.state.data_impresora_by_id.id_marca} onIonChange={this.onChangeInput} >
                    {this.id!==undefined?
                      <IonSelectOption value = {this.state.id_marca_anterior}>
                      {this.state.marca_anterior}
                    </IonSelectOption>:
                    null
                    }
                    
                    {this.state.marcas.map((object:any, i:any) => {
                      return (
                        <IonSelectOption key={object.marca} value={object.id_marca}>
                          {object.marca}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>

                </IonItem>




                <IonItem>
                  <IonLabel position="stacked">Código <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required disabled = {this.id!==undefined?true:false} value = {this.state.data_impresora_by_id.codigo} onIonChange={this.onChangeInput} name="printer.codigo" type="text" ></IonInput>
                </IonItem>
                
                




                <IonItem>
                  <IonLabel position="stacked">Modelo <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} value = {this.state.data_impresora_by_id.modelo} name="printer.modelo" type="text" ></IonInput>
                </IonItem>
                {/*
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
                *}
                {/*
                <IonItem>
                  <IonLabel position="stacked">Usuario <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.usuario" type="text" ></IonInput>
                </IonItem>
                */}
                {/*
                <IonItem>
                  <IonLabel position="stacked">Tinta <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.tinta" type="text" ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Cartucho <IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} name="printer.cartucho" type="text" ></IonInput>
                </IonItem>
                */}
                
                {/*
                <div>
                  <div onClick={() => this.onClick()}>
                    Parent - click me to show/hide my child
                  </div>
                  {
                    this.state.childVisible? <Child />: null
                  }
                </div>
                */}

                {/*
                <div>
                  <div onClick={() => this.onClick()}>
                    Parent - click me to show/hide my child
                  </div>

                {
                    this.state.childVisible? <Child />: null
                }

                  
                </div>
                */}
                {/*
                <div>
                  <div onClick={() => this.onClick()}>
                    Parent - click me to show/hide my child
                  </div>
                {
                    this.state.matricial? <Varios />: null
                } 
                </div>
              */}
                {/*
                <IonItem>

                {
                    this.state.childVisible? <Child />: null
                }

                </IonItem>
              */}

                <div>
                {/*  <div onClick={() => this.onClick()}>
                    Parent - click me to show/hide my child
            </div>*/}
                {
                    this.state.matricial? <IonItem>
                    <IonLabel position="stacked">Cinta <IonText color="danger">*</IonText></IonLabel>
                    <IonInput required value={this.state.data_impresora_by_id.cinta  } onIonChange={this.onChangeInput} name="printer.cinta" type="text" ></IonInput>
                  </IonItem>: null
                  
                } 
                {
                  this.state.brazalete? <IonItem>
                  <IonLabel position="stacked">Rollo-Brazalete<IonText color="danger">*</IonText></IonLabel>
                  <IonInput required value= {this.state.data_impresora_by_id.rollo} onIonChange={this.onChangeInput}  name="printer.rollo" type="text" ></IonInput>
                  </IonItem>: null
                }
                {/*Tinta, cartucho, toner*/}
                {
                  this.state.multifuncional?
                  <div>
                 <IonItem>
                  <IonLabel position="stacked">Tinta <IonText color="danger">*</IonText></IonLabel>
                  
                  <IonSelect name="printer.tinta" value = {this.state.data_impresora_by_id.tinta} onIonChange={this.onChangeInput} >

                    {this.state.marcas.map((object:any, i:any) => {
                      return (
                        <IonSelectOption key={object.marca} value={object.marca}>
                          {object.marca}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                  <IonItem>
                  <IonLabel position="stacked">Cartucho<IonText color="danger">*</IonText></IonLabel>
                  <IonInput required value= {this.state.data_impresora_by_id.cartucho} onIonChange={this.onChangeInput} name="printer.cartucho" type="text" ></IonInput>
                  </IonItem>
                  <IonItem>
                  <IonLabel position="stacked">Toner<IonText color="danger">*</IonText></IonLabel>
                  <IonInput required value = {this.state.data_impresora_by_id.toner} onIonChange={this.onChangeInput} name="printer.toner" type="text" ></IonInput>
                  </IonItem>
                  </div>
                  : null
                }
                {
                  this.state.escaner? <IonItem>
                  <IonLabel position="stacked">Rodillo<IonText color="danger">*</IonText></IonLabel>
                  <IonInput required onIonChange={this.onChangeInput} value = {this.state.data_impresora_by_id.rodillo} name="printer.rodillo" type="text" ></IonInput>
                  </IonItem>: null
                }
                {
                  this.state.impresora? 
                  <div>
                  {/*<IonItem>
                    <IonLabel position="stacked">Tinta <IonText color="danger">*</IonText></IonLabel>
                    <IonInput required onIonChange={this.onChangeInput} name="printer.tinta" type="text" ></IonInput>
                  </IonItem>
                  */}

                {/*<IonItem>
                  <IonLabel position="stacked">Tinta <IonText color="danger">*</IonText></IonLabel>
                  
                  <IonSelect name="printer.tinta" onIonChange={this.onChangeInput} >
                    {tipo_tinta.map((object:any, i:any) => {
                      return (
                        <IonSelectOption key={object.id} value={object.id}>
                          {object.id}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                  </IonItem>*/}



                <IonItem>
                  <IonLabel position="stacked">Tinta <IonText color="danger">*</IonText></IonLabel>
                  
                  <IonSelect name="printer.tinta" value = {this.state.data_impresora_by_id.tinta} onIonChange={this.onChangeInput} >
                    
                    {this.state.marcas.map((object:any, i:any) => {
                      return (
                        <IonSelectOption key={object.marca} value={object.marca}>
                          {object.marca}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>

                </IonItem>


                  <IonItem>
                    <IonLabel position="stacked">Cartucho <IonText color="danger">*</IonText></IonLabel>
                    <IonInput required value= {this.state.data_impresora_by_id.cartucho} onIonChange={this.onChangeInput} name="printer.cartucho" type="text" ></IonInput>
                  </IonItem>
                  </div>: null
                }

                </div>
                {/*
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
                  */}
                {/*
                <IonItem>
                  <IonLabel position="stacked">Encargado del registro <IonText color="danger">*</IonText></IonLabel>
                  <IonInput onIonChange={this.onChangeInput} name="printer.encargado_registro" required type="text" ></IonInput>
                </IonItem>
               
                */}


                {this.id!==undefined?

                  <IonItem>
                  <IonLabel position="stacked">Estado <IonText color="danger">*</IonText></IonLabel>
                    <IonSelect name="printer.estado_operativo" value = {this.state.data_impresora_by_id.estado_operativo} onIonChange={this.onChangeInput} >
                    
                    {this.id!==undefined?
                      <IonSelectOption value = {this.state.estado_anterior}>
                      {this.state.estado_anterior}
                      </IonSelectOption>:
                      null
                    }


                    {estadosImpresoras.map((object, i) => {
                      return (
                        <IonSelectOption key={object.id} value={object.id}>
                          {object.id}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                  </IonItem>:
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
                }
                              
  
                {
                  this.id===undefined?

                  <IonItem>
                    <IonLabel position="stacked">Dirección IP</IonLabel>
                    <IonSelect name="printer.ip" onIonChange={this.onChangeInput}>
                        <IonSelectOption value={null}>
                            Ninguno
                                </IonSelectOption>
                        {this.state.lista_direcciones_ip.map((object: any, i: any) => {
                            return (
                                <IonSelectOption key={object.id_ip} value={object.id_ip}>
                                    {object.direccion_ip}
                                </IonSelectOption>
                            );
                        })}
                    </IonSelect>
                </IonItem>:

                <IonItem>
                <IonLabel position="stacked">Dirección IP</IonLabel>
                <IonSelect name="printer.ip" value = {this.state.data_impresora_by_id.ip} onIonChange={this.onChangeInput}>
                      {
                        this.state.ip_anterior === null?

                        <IonSelectOption value ={null}>
                          Ninguno
                        </IonSelectOption>:
                        <div>
                          <IonSelectOption value={null}>
                            Ninguno
                          </IonSelectOption>
                          <IonSelectOption value={this.state.ip_anterior}>
                         {this.state.ip_anterior}
                        </IonSelectOption>
                        </div>
                        
                      }
                      
                    {this.state.lista_direcciones_ip.map((object: any, i: any) => {
                        return (
                            <IonSelectOption key={object.id_ip} value={object.direccion_ip}>
                                {object.direccion_ip}
                            </IonSelectOption>
                        );
                    })}
                </IonSelect>
            </IonItem>
                
                }
                
                

                <IonLoading
        isOpen={this.state.eliminando}
        message={'Eliminando registro. Espere por favor...'}
      />


                <IonItem>
                    <IonLabel position="stacked">Asignar equipo a empleado</IonLabel>
                    <IonSelect name="printer.asignado" value = {this.state.data_impresora_by_id.asignado} onIonChange={this.onChangeInput}>
                    <IonSelectOption value={null}>Ninguno</IonSelectOption>
                        {this.state.lista_empleados.map((object: any, i: any) => {
                            return (
                                <IonSelectOption key={object.id} value={object.id}>
                                    {object.nombre + " " + object.apellido}
                                </IonSelectOption>
                            );
                        })}
                    </IonSelect>
                </IonItem>



                 <IonItem>
                  <IonLabel position="stacked">Descripción</IonLabel>
                  <IonTextarea value = {this.state.data_impresora_by_id.descripcion} onIonChange={this.onChangeInput} name="printer.descripcion"></IonTextarea>
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

