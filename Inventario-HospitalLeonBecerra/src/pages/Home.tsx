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
  RouteComponentProps
} from 'react-router';

const HomePage: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class="grid">
          <IonRow  class="row">
            <IonCol  size="6">     
              <IonButton color="primary" class="boton" routerLink="/inventarios" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/inventory.png"} className="responsive" alt="" /><br/><br/><IonLabel>Inventario</IonLabel>   
              </div> 
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton class="boton" routerLink="/tabs" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/asignacion.png"} className="responsive"  alt="" /><br/><br/><IonLabel>Asignación</IonLabel>   
              </div>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow class="row">
            <IonCol size="6">
              <IonButton class="boton" routerLink="/formImpresora" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/solicitud.png"} className="responsive" alt="" /><br/><br/><IonLabel>Solicitudes</IonLabel>   
              </div>
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton class="boton" expand="block" size="large">
              <div className="margen">
                <img src={process.env.PUBLIC_URL + "/assets/img/historial.png"} className="responsive"  alt="" /><br/><br/>
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
