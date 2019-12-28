import {IonHeader, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import React, { Component } from 'react';


export default class AppPage extends Component {
    render() {
        return (

            <IonPage>

                <IonHeader>

                    <IonToolbar color="primary">

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