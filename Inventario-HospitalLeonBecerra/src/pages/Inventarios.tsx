import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import OpcionesInventario from './OpcionesInventario'
import React from 'react';
import {
  RouteComponentProps, Redirect
} from 'react-router';
import { arrowBack } from 'ionicons/icons';
const Inventarios: React.FC<RouteComponentProps> = (props) => {

  if (localStorage.userdata === undefined){
    return (<Redirect to="/iniciarsesion" />)
  }
  
  return (
    <IonPage>
      <IonHeader>

        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton routerLink="/home"><IonIcon icon={arrowBack}></IonIcon></IonButton>
          </IonButtons>
          <IonTitle>Gestión de inventario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <OpcionesInventario history={props.history}></OpcionesInventario>
      </IonContent>
    </IonPage>
  );
};

export default Inventarios;
