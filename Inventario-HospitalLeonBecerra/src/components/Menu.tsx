import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonAvatar
} from '@ionic/react';
import { home, desktop, logOut, list, pricetag, person } from 'ionicons/icons';

import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { AppPage } from '../declarations';
import AxiosAutenticacion from '../services/AxiosAutenticacion';
import Autenticacion from '../pages/InicioSesion/Autenticacion';
import AxiosNotificacion from '../services/AxiosNotificacion';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FC<MenuProps> = ({ appPages }) => {

  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [redireccionar, setRedireccionar] = useState(Boolean);

  function obtener_pefil_usuario() {
    setRedireccionar(false);
    let data = Autenticacion.getDataLog();

    if (localStorage.userdata){

      if (Object.keys(data).length > 0){
        setUsername(data.user.username);
        setNombre(data.user.nombre);
        setApellido(data.user.apellido);
        setCedula(data.user.cedula);
        setRedireccionar(false);
      }else{
        if ( document.URL.split("/")[3]==="registrarusuario"){
          setRedireccionar(false);
        }else{
          setRedireccionar(true);
        }
      }

    }else{
      setUsername("");
      setNombre("");
      setApellido("");
      setCedula("")
    }

  }

  useEffect(() => {
    //obtener_pefil();     
    obtener_pefil_usuario();
  });


  function cerrar_sesion() {
    let data = Autenticacion.getDataLog();
    let datos = {
      username: data.user.username,
      token: ""
    }
    AxiosNotificacion.actualizar_token(datos);
    localStorage.removeItem('userdata');

    


  }




  if (!redireccionar) {
    return (

      <IonMenu contentId="main" swipeGesture = {redireccionar?true:false} hidden = {localStorage.userdata?false:true} type="overlay">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <IonItem>
            <IonAvatar slot="start">
              <img src="./assets/img/avatar.svg" alt="" />
            </IonAvatar>
            <IonLabel>
              <h3>Nombre: {nombre}</h3>
              <h3>Apellido: {apellido}</h3>
              <p>Usuario: {username}</p>
              <p>Cédula: {cedula}</p>
            </IonLabel>
          </IonItem>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink='/home' routerDirection="none">
              <IonIcon slot="start" icon={person} />
              <IonLabel>Ver perfil</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonList>



            <IonMenuToggle autoHide={false}>
              <IonItem routerLink='/home' routerDirection="none">
                <IonIcon slot="start" icon={home} />
                <IonLabel>Menú principal</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem routerLink='/inventarios' routerDirection="none">
                <IonIcon slot="start" icon={list} />
                <IonLabel>Inventario</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem routerLink='/tiposequiposinventario' routerDirection="none">
                <IonIcon slot="start" icon={desktop} />
                <IonLabel>Registro de equipos</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem routerLink='/homemarcas' routerDirection="none">
                <IonIcon slot="start" icon={pricetag} />
                <IonLabel>Registro de Marcas</IonLabel>
              </IonItem>
            </IonMenuToggle>


            <IonMenuToggle autoHide={false}>
              <IonItem routerLink='/iniciarsesion' onClick={(e: any) => { cerrar_sesion() }} routerDirection="none">
                <IonIcon slot="start" icon={logOut} />
                <IonLabel>Cerrar sesión</IonLabel>
              </IonItem>
            </IonMenuToggle>

          </IonList>

        </IonContent>
      </IonMenu>


    );
  } else {
    return (<Redirect to="/iniciarsesion" />);
  }





}


export default withRouter(Menu);
