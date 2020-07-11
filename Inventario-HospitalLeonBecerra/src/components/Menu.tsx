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
      console.log("Función obtener 99");
      console.log('In of method');
      console.log("Read: ",res.status);
      
      if (res.status === 'Token is Expired'){
        console.log('En la condición');
        localStorage.removeItem('usertoken');
        setRedireccionar(true);
      }else{
        console.log('Part 6');
        setUsername(res.user.username);
        AxiosAutenticacion.obtener_datos_usuario(res.user.username).then( (res:any) => {  
          console.log('Into slide: ',res);
          console.log('res.data.nombre',res.data[0].nombre);
          setNombre(res.data[0].nombre);
          setApellido(res.data[0].apellido);
          setCedula(res.data[0].cedula)
        }).catch((err:any) => {
          console.log('Eroor data');
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
    console.log("Verificar 200");
    //localStorage.removeItem('usertoken');
    console.log("Veri: ",err);
  });
    
  }
  


  useEffect(() => {
    console.log("execute");
    //console.log("user: ",username);
    //console.log("nombre: ", nombre);
    //console.log("apellido: ",apellido);
    //console.log("cedula: ",cedula);

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
    
    
    
                <h3>Nombre: {nombre} Apellido: {apellido}</h3>
                <p>Usuario: {username}</p>
                <p>Cédula: {cedula}</p>
    
              </IonLabel>
            </IonItem>
    
            <br/>

        <IonList>
          {appPages.map((appPage, index) => {
            if (appPage.title === 'Cerrar sesión'){
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem routerLink={appPage.url} onClick ={(e:any) => {localStorage.removeItem('usertoken')}} routerDirection="none">
                    <IonIcon slot="start" icon={appPage.icon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }else if (appPage.url+'' !== 'nombre' && appPage.url+'' !== 'username'&& appPage.url+'' !== 'cedula'){
              return (              
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem routerLink={appPage.url} routerDirection="none">
                    <IonIcon slot="start" icon={appPage.icon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  
  
    );
  }else{
    return (<Redirect to="/iniciarsesion" />); 
  }

  



}
  

export default withRouter(Menu);
