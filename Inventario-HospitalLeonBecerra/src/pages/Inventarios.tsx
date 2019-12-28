import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import OpcionesInventario from './OpcionesInventario'
import React from 'react';
import {
  RouteComponentProps
} from 'react-router';
const Inventarios: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>

        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
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
