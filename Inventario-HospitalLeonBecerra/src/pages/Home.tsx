import {
  IonButtons,
  IonCard,
  IonCardContent,

  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
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
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton routerLink="/inventarios" expand="full" size="large" color="danger">Full Button</IonButton>
                </IonCol>
                <IonCol  size="6">
                <IonButton routerLink="/tabs" expand="full" size="large" color="danger">crear PC</IonButton>
                  </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonButton routerLink="/formImpresora" expand="full" size="large" color="danger">crear impresora</IonButton>
                </IonCol>
                <IonCol size="6">CUATRO</IonCol>
              </IonRow>
            </IonGrid>
            {/* <IonMenu side="start" menuId="first">
              <IonHeader>
                <IonToolbar color="primary">
                  <IonTitle>Start Menu</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonList>
                  <IonItem>Menu Item</IonItem>
                  <IonItem>Menu Item</IonItem>
                  <IonItem>Menu Item</IonItem>
                  <IonItem>Menu Item</IonItem>
                  <IonItem>Menu Item</IonItem>
                </IonList>
              </IonContent>
            </IonMenu> */}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
