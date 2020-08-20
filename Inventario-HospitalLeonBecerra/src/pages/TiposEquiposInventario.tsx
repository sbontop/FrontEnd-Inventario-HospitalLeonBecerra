import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonContent, IonThumbnail, IonRippleEffect, IonHeader, IonPage, 
         IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import './InventarioPC/style.css';
import { arrowBack } from 'ionicons/icons';
import { Redirect } from 'react-router';

export default class TiposEquiposInventario extends Component <{history:any}, any>{
    render() {

        if (localStorage.userdata === undefined){
            return (<Redirect to="/iniciarsesion" />)
        }

        return (
            <IonPage>
                <IonHeader> 
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/inventarios"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>

                        <IonTitle>Equipos</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList>
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/consultdesk')}}>
                            <IonRippleEffect></IonRippleEffect> 
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/pc.png"} alt="" />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>Computador desktop</h2>
                            </IonLabel> 
                        </IonItem>
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/consultlaptop')}}>   
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/laptop.png"} alt="" />
                            </IonThumbnail>
                            <IonRippleEffect></IonRippleEffect>
                            <IonLabel>
                                <h2>Laptop</h2>
                            </IonLabel>
                        </IonItem>
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/consulta')}}>
                            <IonRippleEffect></IonRippleEffect>
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/printer.png"} alt="" />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>Impresora</h2>
                            </IonLabel> 
                        </IonItem>
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('../homerouter')}}>
                            <IonRippleEffect></IonRippleEffect>
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/router/router.png"} alt="" />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>Router</h2>
                            </IonLabel> 
                        </IonItem>
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/consultaOtrosEquiposHome')}}>
                            <IonRippleEffect></IonRippleEffect>
                            <IonThumbnail slot="start">
                                <img src={process.env.PUBLIC_URL + "/assets/img/otros.png"} alt="" />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>Otros equipos</h2>
                            </IonLabel> 
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}