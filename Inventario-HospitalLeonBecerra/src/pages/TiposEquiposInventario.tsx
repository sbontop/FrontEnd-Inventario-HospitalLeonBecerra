import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonContent, IonThumbnail, IonRippleEffect, IonHeader, IonPage, 
         IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import './InventarioPC/style.css';

export default class TiposEquiposInventario extends Component <{history:any}, any>{
    render() {
        return (
            <IonPage>
                <IonHeader> 
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home"></IonBackButton>
                        </IonButtons>
                        <IonTitle>Nuevo Equipo</IonTitle>
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
                        <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/formImpresora')}}>
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
                                <img src={process.env.PUBLIC_URL + "/assets/img/router1.png"} alt="" />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>Router</h2>
                            </IonLabel> 
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}