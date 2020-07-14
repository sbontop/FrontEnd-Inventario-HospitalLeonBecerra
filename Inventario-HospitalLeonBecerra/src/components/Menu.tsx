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
import { home, desktop, logOut, list, pricetag } from 'ionicons/icons';

import React, {useState, useEffect} from 'react';
import { RouteComponentProps, withRouter,Redirect } from 'react-router-dom';
import { AppPage } from '../declarations';
import AxiosAutenticacion from '../services/AxiosAutenticacion';


interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FC<MenuProps> = ({ appPages }) => {

  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [redireccionar, setRedireccionar] = useState(Boolean);


  function obtener_pefil(){
  
    AxiosAutenticacion.getProfile().then(  (res:any) => {
      //console.log("Función obtener 99");
      //console.log('In of method');
      //console.log("Read: ",res.status);
      
      if (res.status === 'Token is Expired'){
        //console.log('En la condición');
        localStorage.removeItem('usertoken');
        setRedireccionar(true);
      }else{
        //console.log('Part 6');
        setUsername(res.user.username);
        AxiosAutenticacion.obtener_datos_usuario(res.user.username).then( (resp:any) => {  
          //console.log('Into slide: ',res);
          //console.log('res.data.nombre',res.data[0].nombre);
          setNombre(resp.data[0].nombre);
          setApellido(resp.data[0].apellido);
          setCedula(resp.data[0].cedula)
        }).catch((err:any) => {
          console.log(err);
          
        });
      }
      
      //setEmail(res.user.email);
      //console.log('User: ',res.user.username);
      //console.log(res.user.name);
      //console.log(res.user.email);
      /* if (res) {
          console.log("Res: ",res);
      }else{ 
          console.log("Error");
      } */
  }).catch((err:any) => {
    //console.log("Verificar 200");
    //localStorage.removeItem('usertoken');
    console.log(err);
  });
    
  }
  


  useEffect(() => {
    obtener_pefil();     
  });




  if (!redireccionar){
    return (

      <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      <IonItem>
              <IonAvatar slot="start">
              <img src="./assets/img/avatar.svg" alt=""/>
              </IonAvatar>
              <IonLabel>
    
    
    
                <h3>Nombre: {nombre}</h3>
                <h3>Apellido: {apellido}</h3>
                <p>Usuario: {username}</p>
                <p>Cédula: {cedula}</p>
    
              </IonLabel>
            </IonItem>
    
            <br/>

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
          <IonItem routerLink='/iniciarsesion' onClick ={ (e:any) => {localStorage.removeItem('usertoken')} } routerDirection="none">
            <IonIcon slot="start" icon={logOut} />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonMenuToggle>

      </IonList>

      </IonContent>
    </IonMenu>
  
  
    );
  }else{
    return (<Redirect to="/iniciarsesion" />); 
  }

  



}
  

export default withRouter(Menu);
