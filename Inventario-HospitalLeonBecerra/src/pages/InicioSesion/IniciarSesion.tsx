/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { Component } from 'react';
import {
  IonContent, IonToolbar, IonGrid, IonRow, IonCol,
  IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, IonButtons, /*, IonFooter,
   IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/ IonButton, IonLoading, IonIcon
} from '@ionic/react';
import { Redirect, /*RouteProps*/ } from 'react-router';
//import { RouteComponentProps } from 'react-router-dom';
import { withIonLifeCycle } from '@ionic/react';
import AxiosAutenticacion from '../../services/AxiosAutenticacion';
import Autenticacion from './Autenticacion';
//import AxiosNotificacion from '../../services/AxiosNotificacion';
import { trash } from 'ionicons/icons'
//import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
//const { PushNotifications } = Plugins;





class IniciarSesion extends Component<any, any> {
  private id: any;
  private username_ingresado = true;
  private password_ingresado = true;
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: false,
      //datos_usuario:{},
      username_ingresado: true,
      password_ingresado: true,
      username: "",
      incompleto: false,
      password: "",
      errors: {},
      campos_incompletos: "",
      error_credenciales: false,
      cargando: true,
      error_servidor: false
    }

    /* this.iniciarSesion = this.iniciarSesion.bind(this);   */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  ionViewWillEnter() {

    //this.obtener_pefil();
    if (localStorage.userdata) {
      this.setState({
        redirect: true
      });
    }

  }


  obtener_pefil() {
    AxiosAutenticacion.getProfile().then((res: any) => {
      //console.log("Función obtener 99");
      //console.log('In of method');
      //console.log("Read ss : ",res.status);

      //console.log("Respuesta login: ",res.status);

      if (res.status === 'Token is Expired') {
        //console.log('En la condición');
        //console.log("Perf 1");
        localStorage.removeItem('usertoken');
        //setRedireccionar(true);
      } else if (res.status === 'Token is Invalid') {
        //console.log("Perf 2");
        localStorage.removeItem('usertoken');
        //console.log('Not valid');
        //console.log("Al ultimooooooooo222222222222222222222222");
      } else {
        //console.log("Perf 3");
        this.setState({
          redirect: true
        })
      }
    }).catch((err: any) => {
      //console.log("Verificar 200");
      //localStorage.removeItem('usertoken');
      //console.log("Veri: ",err);
    });
  }


  /**
     * Función para recibir notificaciones.
     * Código basado en: https://medium.com/enappd/firebase-push-notification-in-ionic-react-app-using-capacitor-b6726c71bda4
     * Más información en: https://medium.com/@brankofuenzalida/entendiendo-el-plugin-push-notifications-de-capacitor-8ca84cdd8d38
     * @param usuario, recibe el username del usuario que para almacenar el token 
     */
 /* configurar_notificaciones(usuario: any) {

    PushNotifications.register();

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        let datos = {
          username: usuario,
          token: token.value
        }
        AxiosNotificacion.actualizar_token(datos).then().catch(() => {
          alert('UPS! Parece que su dispositivo no podrá recibir notificaciones: ');
        });
      }
    );
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('UPS! Parece que su dispositivo no podrá recibir notificaciones: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert(notification.title + '\n' + notification.body);
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert(notification.notification.title + '\n' + notification.notification.body);
      }
    );

  }*/







  private urlParameters: Array<any> = [];
  obtenerImpresoraById = () => {
  }

  obtener_id_impresora_editar = () => {

  }

  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log("Login data: ", this.state);
    //console.log("Login data: ", this.state.contraseña);

  }



  onSubmit() {
    //e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    //console.log('user: ',user);
    this.setState({
      cargado: true
    })
    AxiosAutenticacion.login(user).then((res: any) => {
      this.setState({
        cargado: false
      })
      //console.log("Verificar 20");
      //console.log("res9999",res);
      if ((res + '').length > 0 && !(res + '').includes('400') && !(res + '').includes('Network Error')) {
        //console.log("Pa 1 ");
        //console.log('Login: ',res.data);
        Autenticacion.authenticate(res.data);
        this.props.history.push(`/Home`)
        //this.configurar_notificaciones(this.state.username)
      } else if ((res + '').includes('400')) {
        console.log("Pa 2 ");
        this.setState({
          cargando: false,
          error_credenciales: true,
        });
      }
      else {
        console.log("Pa 6 ");
        //console.log("Pw: ",res);
        this.setState({
          cargando: false,
          error_servidor: true,
        });
      }
    }).catch((err: any) => {
      //console.log("Verificar 100");
      this.setState({
        cargando: false,
        error_servidor: true,
      });
    });





  }

  onChangeInput = (e: any) => {
    const { name, value } = e.target;
    let val = name.split(".");
    this.setState({
      datos_usuario: {
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

  verificar = (e: any) => {
    /* console.log("Verificar input  ");
    if( this.state.hasOwnProperty('username')!==true || (this.state.username+'').trim() || this.state.username === undefined || this.state.username === ""){
      this.setState({
        username_ingresado:false
      })      
    }else{
      this.setState({
        username_ingresado:true
      })
    }
    if( this.state.hasOwnProperty('password')!==true || (this.state.password+'').trim() || this.state.password === undefined || this.state.username === ""){
      this.setState({
        password_ingresado: false
      })
    }else{
      this.setState({
        password_ingresado: true
      })
    }

    if (this.state.password_ingresado === true && this.state.username_ingresado===true){
      this.onSubmit();
    } */


    let lista_nombres_campos_usuario: any = ["Usuario", "Contraseña"];
    let lista_campos_usuario: any = ["username", "password"];
    let lista_campos_ingresados: any = ["username", "password"];
    let lista_valores_imgresados: any = [this.state.username, this.state.password];

    //console.log("Verificar input  ");
    let texto: string = "";
    let valor_indice: number;
    let campo: string = "";
    let campo_nombre_completo: string = "";
    let valor_vacio: string = "";

    if (this.state.hasOwnProperty('username') !== true || (this.state.username + '').trim() === '' || this.state.username === undefined || this.state.username === '' ||
      this.state.hasOwnProperty('password') !== true || (this.state.password + '').trim() === '' || this.state.password === undefined || this.state.password === '') {

      for (let i in lista_campos_usuario) {
        campo = lista_campos_usuario[i]; //marca
        campo_nombre_completo = lista_nombres_campos_usuario[i];
        valor_indice = lista_campos_ingresados.indexOf(campo); // 2 veo si ese campo está en la lista,
        valor_vacio = (lista_valores_imgresados[valor_indice] + '').trim();
        if (valor_indice < 0 || valor_vacio === '' || lista_valores_imgresados[valor_indice] === undefined) { //Si el valor índice es menor que cero
          // no está ingresado ese campo
          texto = texto + " " + campo_nombre_completo + ",";
        }
        //console.log('Valor vacio: ',valor_vacio);
      }
      if (texto.slice(-1) === ',') {
        texto = texto.slice(0, -1);
      }
      this.setState({
        campos_incompletos: texto,
        incompleto: true
      })

    } else {
      this.onSubmit();
    }

  }

  accion = () => {
    //this.setState({eliminar:true});
  }

  eliminar = () => {

  }

  copiar_json(obj: any) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    var temp = obj.constructor();
    for (var key in obj) {
      temp[key] = this.copiar_json(obj[key]);
    }
    return temp;
  }

  enviar = () => {
  }



  render() {
    if (this.state.redirect) {
      return (<Redirect to="/Home" />);
      //this.props.history.push(`/Home`)
    }
    return (



      <IonPage>
        <IonToolbar color="danger">


          <IonButtons slot="end">
            <IonButton hidden={this.id === undefined ? true : false} onClick={this.onSubmit} ><IonIcon icon={trash}></IonIcon></IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent fullscreen>





          <form>
            <IonGrid>

              <IonRow>

                <img src="./assets/img/hlb.jpg" alt="" />

              </IonRow>

              <IonRow class="ion-text-center">



                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Usuario <IonText color="danger"></IonText></IonLabel>
                    <IonInput required type="text" name="username" onIonChange={this.onChange} ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow class="ion-text-center">
                <IonCol>
                  <IonText hidden={this.username_ingresado} color="danger">Ingresar usuario</IonText>
                </IonCol>
              </IonRow>

              <IonRow class="ion-text-center">
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Contraseña <IonText color="danger"></IonText></IonLabel>
                    <IonInput required type="password" name="password" onIonChange={this.onChange} ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow class="ion-text-center">
                <IonCol>
                  <IonText hidden={this.password_ingresado} color="danger">Ingresar contraseña</IonText>
                </IonCol>
              </IonRow>






              <br />
              <IonRow class="ion-text-center">
                <IonCol>
                  <IonButton expand="block" color="primary" onClick={this.verificar} class="ion-no-margin">Iniciar Sesión</IonButton>

                </IonCol>
              </IonRow>
              <br />
              <IonRow class="ion-text-center">
                <IonCol size="12">
                  <a href="/registrarusuario">Registar usuario</a>

                </IonCol>


              </IonRow>
            </IonGrid>
          </form>

          <IonLoading
            isOpen={this.state.cargado}
            message={'Verificando usuario. Espere por favor...'}
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
                  error_servidor: false
                });
              }
            }
            ]}
          />

          <IonAlert
            isOpen={this.state.error_credenciales}
            subHeader={'Error de credenciales'}
            message={'Las credenciales proporcionadas son incorrectas'}
            buttons={[{
              cssClass: 'success',
              text: 'OK',
              handler: () => {
                console.log('ERROR 46');
                this.setState({
                  error_credenciales: false
                });
              }
            }
            ]}
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
                    campos_incompletos: "",
                    incompleto: false
                  });
                }
              },
            ]}
          />

        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(IniciarSesion);