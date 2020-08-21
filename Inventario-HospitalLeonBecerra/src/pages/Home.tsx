import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonLabel,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
import React from 'react';
import './Home.css';
import {
  RouteComponentProps,Redirect
} from 'react-router';
//import MenuLateral from '../components/Menu_Lateral';


const HomePage: React.FC<RouteComponentProps> = (props) => {
  
  if (localStorage.userdata === undefined){
    return (<Redirect to="/iniciarsesion" />)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
          <IonMenuButton hidden={JSON.parse(localStorage.userdata).token?false:true} />
          </IonButtons>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class="grid">
          <IonRow  class="row">
            <IonCol  size="12">     
              <IonButton color="primary" class="boton" routerLink="/inventarios" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/main/inventory.png"} className="responsive" alt="" /><br/><br/><IonLabel>Inventario</IonLabel>   
              </div> 
              </IonButton>
            </IonCol>
            {/* <IonCol size="6">
              <IonButton class="boton" routerLink="/tabs" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/asignacion.png"} className="responsive"  alt="" /><br/><br/><IonLabel>Asignación</IonLabel>   
              </div>
              </IonButton>
            </IonCol> */}
          </IonRow>
          <IonRow class="row">
            <IonCol size="12">
              <IonButton color="primary" routerLink="/homesolicitudes" class="boton" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/main/solicitud.png"} className="responsive" alt="" /><br/><br/><IonLabel>Solicitudes</IonLabel>   
              </div>
              </IonButton>
            </IonCol>
            </IonRow>
            <IonRow class="row">
            <IonCol size="12">
              <IonButton color="primary" routerLink="/homemantenimientos" class="boton" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/main/historial.png"} className="responsive"  alt="" /><br/><br/>
                <IonLabel>Mantenimiento</IonLabel>   
              </div>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
