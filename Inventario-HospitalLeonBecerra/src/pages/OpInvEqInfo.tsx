import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonContent,IonThumbnail,IonRippleEffect ,IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import './style.css';

export default class OpInvEqInfo extends Component <{history:any}, any>{

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
                    <IonList>
                        <IonItem className = "ion-activatable">
                            <IonRippleEffect></IonRippleEffect>
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/clipboard.png"} alt="" />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>Registrar Nuevo Equipo</h2>
                            </IonLabel>
                            
                        </IonItem>
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/equipos')}}>
                       
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/loupe.png"} alt="" />
                            </IonThumbnail>
                            <IonRippleEffect></IonRippleEffect>
                            <IonLabel>
                                <h2>Consultar Equipo Registrado</h2>
                            </IonLabel>
                        </IonItem>

                    </IonList>
                </IonContent>
            </IonPage>


        );
    }
}