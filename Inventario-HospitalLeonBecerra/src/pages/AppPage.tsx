import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonTab, IonHeader, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonBadge, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';


export default class AppPage extends Component {
    render() {
        return (

            <IonPage>

                <IonHeader>

                    <IonToolbar color="danger">

                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home"></IonBackButton>
                        </IonButtons>
                        <IonTitle>Equipos Informáticos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <p>Hola</p>
                </IonContent>
            </IonPage>
        );
    }
}