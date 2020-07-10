import React from 'react';
import { trash, menu, create, eye } from 'ionicons/icons';
import {
  IonItem, IonLabel, IonRippleEffect,
  IonPopover, IonTitle, IonAvatar,
  IonList, IonIcon, IonButton
} from '@ionic/react';
import { Redirect } from 'react-router';

export interface IpInterface {
  id_ip: number,
  fecha_asignacion: string,
  direccion_ip: string,
  estado: string
  hostname: string,
  subred: string,
  fortigate: string,
  observacion: string,
  maquinas_adicionales: string,
  nombre_usuario: string,
  encargado_registro: string,
}

interface estados {
  ventanaDetalle: boolean,
  ventanaOpciones: boolean,
  mounted: boolean,
  redirectToEditIp: boolean,
  showAlertConfirm: boolean,
  showLoading: boolean,
}

class ListIps extends React.Component<IpInterface, estados, { history: any }>  {
  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      ventanaOpciones: false,
      mounted: true,
      redirectToEditIp: false,
      showAlertConfirm: false,
      showLoading: false,
    }
  }

  render() {
    if (this.state.redirectToEditIp) {
      let path_ = `ip/edit/${this.props.id_ip}`;
      console.log(path_);
      return <Redirect to={path_}/>
    }
    return (
      <IonList>
        <IonItem className="ion-activatable" onClick={() => this.setState({ ventanaOpciones: true })}>
          <IonLabel key={this.props.id_ip}>
            <h2><b>{this.props.direccion_ip}</b></h2>
            <h3>Estado: {this.props.estado}</h3>
            <p>Usuario: {this.props.nombre_usuario}</p>
            <IonRippleEffect />
          </IonLabel>
          <IonAvatar slot="start"><img src="./assets/img/wifi.png" alt="imagen" /></IonAvatar>
          {/* <IonButton onClick={() => console.log("Acción editar")} color="secondary" >
            <div><img src="./assets/icon/edit.png"  alt="" /></div>
          </IonButton> */}
          {/* <IonButton onClick={() => console.log("Acción eliminar")} color="primary"> */}
          <IonIcon icon={menu}></IonIcon>
          {/* </IonButton> */}
        </IonItem>

        <IonPopover
          isOpen={this.state.ventanaOpciones}
          onDidDismiss={e => { if (this.state.mounted) this.setState({ ventanaOpciones: false }) }}>
          <IonTitle className="ion-margin-top" color="warn">{"Opciones: " + this.props.direccion_ip}</IonTitle>
          <IonList>
            <IonItem onClick={() => { if (this.state.mounted) this.setState({ ventanaOpciones: false, ventanaDetalle: true }) }}>
              <IonLabel>
                Ver Detalles
              </IonLabel>
              <IonIcon icon={eye}></IonIcon>
            </IonItem>
            <IonItem onClick={() => { this.setState({ redirectToEditIp: true })}}>
              <IonLabel>
                Editar Informacion
              </IonLabel>
              <IonIcon icon={create}></IonIcon>
            </IonItem>
            <IonItem onClick={() => { if (this.state.mounted) this.setState({ ventanaOpciones: false, showAlertConfirm: true }) }}>
              <IonLabel>
                Eliminar Equipo
              </IonLabel>
              <IonIcon icon={trash}></IonIcon>
            </IonItem>
          </IonList>
        </IonPopover>


        <IonPopover
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonTitle className="ion-margin-top">Detalle del equipo</IonTitle>
          <IonList>
            <IonItem>
              <IonLabel>Id: {this.props.id_ip}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Direccion IP: {this.props.direccion_ip}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Estado: {`${this.props.estado}`}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Usuario: {this.props.nombre_usuario}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Hostname: {this.props.hostname}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Subred: {this.props.subred}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Fortigate: {this.props.fortigate}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Maquinas Adicionales: {this.props.maquinas_adicionales}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Observacion: {this.props.observacion}</IonLabel>
            </IonItem>
          </IonList>
          <div className="ion-text-center ion-margin">
            <IonButton onClick={() => this.setState({ ventanaDetalle: false, ventanaOpciones: true })}>Cerrar</IonButton>
          </div>
        </IonPopover>
      </IonList>
    );
  }
}

export default ListIps;