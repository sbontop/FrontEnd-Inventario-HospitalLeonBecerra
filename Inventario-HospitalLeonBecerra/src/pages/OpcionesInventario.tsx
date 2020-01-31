import React, { Component } from 'react';
import { IonList, IonItem, IonLabel,IonThumbnail,IonRippleEffect } from '@ionic/react';
import './InventarioPC/style.css';
export default class OpcionesInventario extends Component <{history:any}, any>{



    render() {
        return (

            <IonList>
                <IonItem className = "ion-activatable">
                    <IonRippleEffect></IonRippleEffect>
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/ip.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Inventario por IP asignada</h2>
                    </IonLabel>
                </IonItem>
                <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/homeCorreo')}}>
                    <IonRippleEffect></IonRippleEffect>
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/email.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Inventario por Correo de Usuario</h2>
                    </IonLabel>
                </IonItem>
                <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/opinveqinfo')}}>
                    <IonRippleEffect></IonRippleEffect>
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/website.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Inventario de Equipos Informáticos</h2>
                    </IonLabel>
                    
                </IonItem>
            </IonList>

            /* Feliz Noche Buena :D */

        );
    }
}