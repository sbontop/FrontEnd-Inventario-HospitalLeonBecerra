/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonToolbar, IonSelect, IonHeader, IonSelectOption, IonGrid, IonRow, IonCol, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonList, IonButton} from '@ionic/react';
import { Redirect, /*RouteProps*/ } from 'react-router';
//import { RouteComponentProps } from 'react-router-dom';
import { withIonLifeCycle } from '@ionic/react';
import AxiosAutenticacion from '../../services/AxiosAutenticacion';


class RegistrarUsuario extends Component<any , any> {
  private id:any;
  constructor(props: any) {
    super(props);
    this.state = {
        //datos_usuario:{},
        //first_name: '',
        //last_name: '',
        mensaje :'',
        validacion_usuario: false,
        incompleto:false,
        //email: '',
        campos_incompletos:"",
        password: '',
        username: '',
        id_departamento: '',
        id_rol:'',
        cedula: '',
        nombre: '',
        apellido: '',
        errors: {},
        departamentos:[],
        roles: [],
        confirmacion: false
    }

    /* this.iniciarSesion = this.iniciarSesion.bind(this);   */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }


  

  ionViewWillEnter() {
    this.cargar_departamentos();
    this.cargar_roles();
  }

  private urlParameters: Array<any> = [];
  obtenerImpresoraById = () =>{
  }

  asignar_parametros = (name: any, value: any) => {
    this.setState({ parametros: { ...this.state.parametros, [name]: value } });
  }

  obtener_id_impresora_editar =()=>{

  }

 

  onChange = (e:any) => {
    this.setState({
      [e.target.name]:e.target.value
    });
    console.log("Login data: ", this.state);
    //console.log("Login data: ", this.state.contraseña);

  }


  onSubmit () {

    const newUser = {
        //name: this.state.first_name + ' ' + this.state.last_name,
        //email: this.state.email,
        //password: this.state.password,
        password: this.state.password,
        username: this.state.username,
        id_departamento: this.state.id_departamento,
        id_rol: this.state.id_rol,
        cedula: this.state.cedula,
        nombre: this.state.nombre,
        apellido: this.state.apellido,
    }

    console.log("newser: ",newUser);

    AxiosAutenticacion.register(newUser).then(res => {

        console.log("In the mehotd: ",res.data);

        if (res.data.log === -1){
          this.setState({
            mensaje: "El usuario y cédula ya se encuentran registrados",
            validacion_usuario: true
          })
        }else if(res.data.log === -2){
          this.setState({
            mensaje: "La cédula ya se encuentra registrada",
            validacion_usuario: true
          })
        }else if (res.data.log === -3){
          this.setState({
            mensaje: "El usuario ya se encuentra registrado",
            validacion_usuario: true
          })
        }else{
          this.setState({
            confirmacion:true
          })
          this.props.history.push(`/iniciarsesion`)

        }
    })
}

  cargar_departamentos =() =>{
    AxiosAutenticacion.mostrar_departamentos().then(res => {
      this.setState({
        departamentos : res.data
      });
  })
  }

  cargar_roles =() =>{
    AxiosAutenticacion.mostrar_roles().then(res => {
      this.setState({
        roles : res.data
      });
  })
  }


  onChangeInput = (e:any) =>{
    const { name, value } = e.target;
    let val = name.split(".");
    this.setState({
      datos_usuario:{
          ...this.state.datos_usuario,
              ...this.state.datos_usuario[val[0]],
              [val[1]]: value
      }
    });

    

  //console.log("Datos: ",this.state.datos_usuario);

  }

  mostrar_direcciones_ip_libres() {
  }

mostrar_marcas() {
}

mostrar_empleados() {
}

  verificar=(e:any)=>{

    /*
    password: '',
    username: '',
    id_departamento: '',
    id_rol:'',
    cedula: '',
    nombre: '',
    apellido: '',
    */

   let lista_nombres_campos_usuario:any=["Nombre", "Apellido","Cédula","Departamento","Rol","Usuario","Contraseña"];
   let lista_campos_usuario:any=["nombre","apellido","cedula","id_departamento","id_rol","username","password"];
   let lista_campos_ingresados:any =["nombre","apellido","cedula","id_departamento","id_rol","username","password"];
   let lista_valores_imgresados:any = [this.state.nombre, this.state.apellido, this.state.cedula, this.state.id_departamento, this.state.id_rol, this.state.username, this.state.password];

   console.log("Verificar input  ");
   let texto:string="";
     let valor_indice:number;
     let campo:string="";
     let campo_nombre_completo:string="";
     let valor_vacio: string="";

   if( this.state.hasOwnProperty('nombre')!==true || (this.state.nombre+'').trim()=== '' || this.state.nombre === undefined || this.state.nombre === '' || 
       this.state.hasOwnProperty('apellido')!==true || (this.state.apellido+'').trim()=== '' || this.state.apellido === undefined || this.state.apellido === '' ||
       this.state.hasOwnProperty('cedula')!==true || (this.state.cedula+'').trim()=== '' || this.state.cedula === undefined || this.state.cedula === '' ||
       this.state.hasOwnProperty('id_departamento')!==true || (this.state.id_departamento+'').trim()=== '' || this.state.id_departamento === undefined || this.state.id_departamento === '' ||
       this.state.hasOwnProperty('id_rol')!==true || (this.state.id_rol+'').trim()=== '' || this.state.id_rol === undefined || this.state.id_rol === '' ||
       this.state.hasOwnProperty('username')!==true || (this.state.username+'').trim()=== '' || this.state.username === undefined || this.state.username === '' ||
       this.state.hasOwnProperty('password')!==true || (this.state.password+'').trim()=== '' || this.state.password === undefined || this.state.password === ''){
         
         for(let i in lista_campos_usuario){
           campo = lista_campos_usuario[i]; //marca
           campo_nombre_completo = lista_nombres_campos_usuario[i];
           valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
           valor_vacio = (lista_valores_imgresados[valor_indice]+'').trim();  
           if (valor_indice<0 || valor_vacio==='' || lista_valores_imgresados[valor_indice] === undefined){ //Si el valor índice es menor que cero
                                // no está ingresado ese campo
               texto = texto+" "+campo_nombre_completo+",";
           }
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
     this.onSubmit();
   }


  }

  accion = () =>{
    //this.setState({eliminar:true});
  }

  eliminar = () =>{
    
  }

  copiar_json( obj:any ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = this.copiar_json( obj[ key ] );
    }
    return temp;
}

  enviar=()=> {
  }  

  render(){
    //if (this.state.confirmacion===false && this.state.redireccionar===true) {
    //  return (<Redirect to="/Consulta" />);      
    //}

    if (localStorage.usertoken){
      return (<Redirect to = "/Home"/>)
    }

    return (      
      <IonPage> 
      
      <IonHeader>
      
      <IonToolbar color="danger">
      <IonButtons slot="start">
            <IonBackButton defaultHref="iniciarsesion" />
          </IonButtons>
      <IonTitle >Registrar Usuario</IonTitle>
      </IonToolbar>
      </IonHeader>    
      <IonContent fullscreen>
        <form>        
        <IonGrid>
          <IonRow class="ion-text-center">
            <IonCol size="12">
              <img src="./assets/img/correo/EU.png"  width="150" height="150" alt="imagen" />
            </IonCol>
          </IonRow>
          <IonRow class="ion-text-center">
            <IonCol>            
              <IonList>
              <IonItem>
                <IonLabel position="stacked">Nombre <IonText color="danger"></IonText></IonLabel>
                <IonInput required type="text" name="nombre"  onIonChange={this.onChange} ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Apellido <IonText color="danger"></IonText></IonLabel>
                <IonInput required type="text" name="apellido"  onIonChange={this.onChange} ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Cédula <IonText color="danger"></IonText></IonLabel>
                <IonInput required type="text" name="cedula"  onIonChange={this.onChange} ></IonInput>
              </IonItem>

              <IonItem>
              <IonLabel position="stacked">Departamento</IonLabel>
                  

                  <IonSelect onIonChange={this.onChange} name="id_departamento" >                    
                    
                    {this.state.departamentos.map((object:any, i:any) => {
                      return (
                        <IonSelectOption key={object.id_departamento} value={object.id_departamento}>
                          {object.nombre}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>

              </IonItem>

              
              <IonItem>
              <IonLabel position="stacked">Rol</IonLabel>
                  

                  <IonSelect onIonChange={this.onChange} name="id_rol" >                    
                    
                    {this.state.roles.map((object:any, i:any) => {
                      return (
                        <IonSelectOption key={object.id_rol} value={object.id_rol}>
                          {object.nombre}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>

              </IonItem>


              <IonItem>
                <IonLabel position="stacked">Usuario <IonText color="danger"></IonText></IonLabel>
                <IonInput required type="text" name="username"  onIonChange={this.onChange} ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Contraseña <IonText color="danger"></IonText></IonLabel>
                <IonInput required type="password" name="password"  onIonChange={this.onChange} ></IonInput>
              </IonItem>

              </IonList>
            </IonCol>
          </IonRow>  

          <IonRow class="ion-text-center">
            <IonCol>
              <IonButton expand="block" color="primary" onClick={this.verificar} class="ion-no-margin">Registar</IonButton>
              
            </IonCol>
          </IonRow>
            
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

        </IonGrid>

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

      <IonAlert
        isOpen={this.state.validacion_usuario}
        subHeader={'Información repetida'}
        message={this.state.mensaje}
        buttons={[          
          {
            text: 'Ok',
            handler: () => {
              console.log('Aceptar');
              this.setState({
                mensaje:"",
                validacion_usuario:false                
              });
            }
          },
        ]}
      />

        </form>
      </IonContent>
      </IonPage>
    );
  }        
}

export default withIonLifeCycle(RegistrarUsuario);