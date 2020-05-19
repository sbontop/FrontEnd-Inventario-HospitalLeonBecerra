import {
  IonItem, IonLabel, IonAvatar, IonIcon, IonList, IonModal, IonTitle, IonButton, IonAlert, IonLoading, IonText, IonToolbar,
  IonButtons, IonNote, IonContent
} from '@ionic/react';
import { trash, create, close, mailOpen, person, business, locate, calendar, speedometer } from 'ionicons/icons';
import React from 'react';  
import Axios from '../../services/Axios.services';

class ListaCorreos extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      mensaje: "",
      alerta: false,
      showAlertConfirm: false,
      showLoading: false
    }
  }

  handle_eliminar() {
    this.setState({
      showLoading: true,
      showAlertConfirm: false
    })
    Axios.eliminar_correo(this.props.id_correo).then(res => {    
      this.setState({
        showLoading: false,
        mensaje: "Registro eliminado satisfactoriamente",
        alerta: true
      })
      this.props.handle.cargar_correos(true);
    }).catch(error => {
      console.log(error)
      this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
    }); 
  }  
  
  render() {
    return (
      <div>
        <IonItem>
          <IonLabel onClick={() => this.setState({ ventanaDetalle: true })}>
            <IonText color={this.props.estado === "I" ? `danger` : `dark`}><h2><b>USUARIO: {this.props.nombres} {this.props.apellidos}</b></h2></IonText>
            <h3>Departamento: {this.props.departamento}</h3>
            <small>{this.props.correo}</small>
          </IonLabel>
          <IonAvatar slot="start"><img src="./assets/img/miniuser.svg" alt="imagen" /></IonAvatar>
         <IonButton  size="default" fill="clear" routerLink={"/formularioCorreo/edit/" + this.props.id_correo}><IonIcon slot="end" color="warning"  icon={create} ></IonIcon> </IonButton> 
         <IonButton  size="default" fill="clear" onClick={() => this.setState({ showAlertConfirm: true })}><IonIcon slot="end" color="danger" icon={trash} ></IonIcon> </IonButton>
        </IonItem>

        <IonModal
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonToolbar color="primary">
            <IonTitle>Detalle del correo</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() =>this.setState({ ventanaDetalle: false })}><IonIcon icon={close}></IonIcon></IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={mailOpen}></IonIcon>
                <IonLabel>Correo</IonLabel>
                <IonNote slot="end">{this.props.correo}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={person}></IonIcon>
                <IonLabel>Empleado</IonLabel>
                <IonNote slot="end">{this.props.nombres} {this.props.apellidos}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={business}></IonIcon>
                <IonLabel>Departamento</IonLabel>
                <IonNote slot="end">{this.props.departamento}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={locate}></IonIcon>
                <IonLabel>Punto </IonLabel>
                <IonNote slot="end">{this.props.bspi_punto}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={speedometer}></IonIcon>
                <IonLabel>Estado </IonLabel>
                <IonNote slot="end">{this.props.estado === "EU" ? "En uso" : "Inactivo"}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={calendar}></IonIcon>
                <IonLabel>Asignado</IonLabel>
                <IonNote slot="end"> {this.props.fecha_asignacion}</IonNote>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>

        <IonLoading
          isOpen={this.state.showLoading}
          message={'Eliminando correo. Espere por favor...'}
        />

        <IonAlert
          isOpen={this.state.showAlertConfirm}
          header={"Eliminar Correo"}
          message={'¿Esta seguro de eliminar este correo?'}
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                this.setState({ showAlertConfirm: false });
              }
            },
            {
              text: 'Si',
              handler: () => {
                 this.handle_eliminar()
              }
            }
          ]}
        />
        <IonAlert
          isOpen={this.state.alerta}
          onDidDismiss={() => this.setState({ alerta: false }) }
          header={this.state.mensaje}
          buttons={['Aceptar']}
        />
      </div >
    );
  }
}


export default ListaCorreos;