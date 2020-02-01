import {
  IonItem, IonLabel, IonAvatar, IonIcon, IonList, IonPopover, IonTitle, IonButton
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React from 'react';

interface ICorreo {
  nombres: string;
  apellidos: string;
  departamento: string;
  correo: string;
  estado: string;
  fecha_asignacion: string;
  bspi_punto: string;
}

class ListaCorreos extends React.Component<ICorreo, any>  {
  constructor(props: ICorreo) {
    super(props);
    this.state = {
      ventanaDetalle: false
    }
  }

  render() {
    return (
      <IonList >
        <IonItem onClick={() => this.setState({ ventanaDetalle: true })}>
          <IonLabel>
            <h2><b>Usuario: {this.props.nombres} {this.props.apellidos}</b></h2>
            <h3>Departamento: {this.props.departamento}</h3>
            <p>Correo: {this.props.correo}</p>
          </IonLabel>
          <IonAvatar slot="start"><img src="./assets/img/miniuser.svg" alt="imagen" /></IonAvatar>
          <IonIcon slot="end" icon={trash} ></IonIcon>
        </IonItem>

        <IonPopover
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonTitle className="ion-margin-top">Detalle</IonTitle>
          <IonList>
            <IonItem>
              <IonLabel>Nombres: {this.props.nombres}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Apellidos: {this.props.apellidos}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Departamento: {this.props.departamento}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Punto: {this.props.bspi_punto}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Estado: {this.props.estado}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Asignado: {this.props.fecha_asignacion}</IonLabel>
            </IonItem>
          </IonList>
          <div className="ion-text-center ion-margin">
            <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>Cerrar</IonButton>
          </div>
        </IonPopover>

      </IonList>
    );
  }
};


export default ListaCorreos;