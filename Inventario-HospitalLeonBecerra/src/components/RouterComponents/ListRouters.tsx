import React from 'react';
import { trash } from 'ionicons/icons';
import {IonItem,  IonLabel, IonRippleEffect, IonPopover, IonTitle, IonAvatar, IonList, IonIcon, IonButton} from '@ionic/react';

interface RouterInterface {
  id_router: number,
  nombre: string,
  pass: string,
  puerta_enlace: string,
  usuario: string,
  clave: string,
  id_equipo: number
}

interface estados {
  ventanaDetalle: boolean
}

class ListRouters extends React.Component<RouterInterface, estados, {history:any}>  {
  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false
    }
  }

  render(){
    return (
      <IonList>
        <IonItem className = "ion-activatable">
          <IonLabel key={this.props.id_router} onClick={() => this.setState({ ventanaDetalle: true })}>
            <p>{this.props.nombre}</p>
            <p><small>Puerta enlace: {this.props.puerta_enlace}</small></p>
            <p><small>Usuario: {this.props.usuario}</small></p>
            <IonRippleEffect></IonRippleEffect> 
          </IonLabel>
          <IonAvatar slot="start"><img src="./assets/img/wifi.png" alt="imagen" /></IonAvatar>
          {/* <IonButton onClick={() => console.log("Acción editar")} color="secondary" >
            <div><img src="./assets/icon/edit.png"  alt="" /></div>
          </IonButton> */}
          {/* <IonButton onClick={() => console.log("Acción eliminar")} color="primary"> */}
          <IonIcon icon={trash}></IonIcon>
          {/* </IonButton> */}
        </IonItem>
        
        <IonPopover
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
            <IonTitle className="ion-margin-top">Detalle del equipo</IonTitle>
              <IonList>
                <IonItem>
                  <IonLabel>Id: {this.props.id_router}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Nombre: {this.props.nombre}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Pass: {this.props.pass}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Puerta enlace: {this.props.puerta_enlace}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Usuario: {this.props.usuario}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Clave: {this.props.clave}</IonLabel>       
                </IonItem>
              </IonList>
              <div className="ion-text-center ion-margin">
              <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>Cerrar</IonButton>
              </div>
        </IonPopover>
      </IonList> 
    );
  }
}

export default ListRouters;