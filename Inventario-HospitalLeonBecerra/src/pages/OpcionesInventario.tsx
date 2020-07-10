import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonThumbnail, IonRippleEffect, IonListHeader } from '@ionic/react';
import './InventarioPC/style.css';
export default class OpcionesInventario extends Component <{history:any}, any>{



    render() {
        return (
            <IonList>
                <IonListHeader>Principal</IonListHeader>
                <IonItem className = "ion-activatable"  onClick={() => {this.props.history.push('/homeIp')}}>
                    <IonRippleEffect></IonRippleEffect>
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/ip.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Direcciones IP</h2>
                    </IonLabel>
                </IonItem>
                <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/homeCorreo')}}>
                    <IonRippleEffect></IonRippleEffect>
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/email2.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Correo electrónico</h2>
                    </IonLabel>
                </IonItem>
                <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/tiposequiposinventario')}}>
                    <IonRippleEffect></IonRippleEffect>
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/website.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Equipos informáticos</h2>
                    </IonLabel>
                </IonItem>
                <IonListHeader>Extra</IonListHeader>
                <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/homeprograma')}}>
                    <IonRippleEffect />
                    <IonThumbnail slot="start">
                        <img src="./assets/img/programa/sw1.png" alt="imagen" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Programas</h2>
                    </IonLabel>
                </IonItem>

                <IonItem className = "ion-activatable" onClick={() => {this.props.history.push('/homemarcas')}}>
                    <IonRippleEffect />
                    <IonThumbnail slot="start">
                        <img src={process.env.PUBLIC_URL+"/assets/img/tag.png"} alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>Marcas</h2>
                    </IonLabel>
        
                </IonItem>
                
            </IonList>

            /* Feliz Noche Buena :D */

        );
    }
}