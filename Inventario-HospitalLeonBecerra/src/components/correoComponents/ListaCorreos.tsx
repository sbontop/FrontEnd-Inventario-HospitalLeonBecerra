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
      mostrar_modal: false,
      mensaje: "",
      alerta: false,
      mostrar_confirmacion: false,
      mostrar_load: false
    }
  }

  /**
   * Esta función permite manejar la eliminación de los items.
   */
  handle_eliminar() {
    this.setState({
      mostrar_load: true,
      mostrar_confirmacion: false
    })
    Axios.eliminar_correo(this.props.id_correo).then(res => {    
      this.setState({
        mostrar_load: false,
        mensaje: "Registro eliminado satisfactoriamente",
        alerta: true
      })
      this.props.handle.cargar_correos(true);
    }).catch(() => {
      this.setState({ mostrar_load: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
    }); 
  }  

  /**
   * Esta función permite obtener la ruta del icono de acuerdo al estado
   * del correo.
   * @param estado "I" para correos Inactivos, "EU" para aquellos que están En uso 
   */
  icono_estado(estado: string ){
   if(estado==='I'){
    return "./assets/img/correo/I.png";
   }
   return "./assets/img/correo/EU.png";
  }
  
  render() {
    return (
      <div>
        <IonItem>
          <IonLabel onClick={() => this.setState({ mostrar_modal: true })}>
            <IonText ><h2><b>{this.props.nombres} {this.props.apellidos}</b></h2></IonText>
            <h3>Departamento: {this.props.departamento}</h3>
            <small>{this.props.correo}</small>
          </IonLabel>
          <IonAvatar slot="start"><img src={this.icono_estado(this.props.estado)} alt="imagen" /></IonAvatar>
         <IonButton  size="default" fill="clear" routerLink={"/formularioCorreo/edit/" + this.props.id_correo}><IonIcon slot="end" color="medium"  icon={create} ></IonIcon> </IonButton> 
         <IonButton  size="default" disabled={this.props.estado === "I" ? true: false} fill="clear" onClick={() => this.setState({ mostrar_confirmacion: true })}><IonIcon slot="end" color="medium" icon={trash} ></IonIcon> </IonButton>
        </IonItem>

        <IonModal
          isOpen={this.state.mostrar_modal}
          onDidDismiss={e => this.setState({ mostrar_modal: false })}>
          <IonToolbar color="primary">
            <IonTitle>Detalle del correo</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() =>this.setState({ mostrar_modal: false })}><IonIcon icon={close}></IonIcon></IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={mailOpen}></IonIcon>
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
          isOpen={this.state.mostrar_load}
          message={'Eliminando correo. Espere por favor...'}
        />

        <IonAlert
          isOpen={this.state.mostrar_confirmacion}
          header={"Eliminar Correo"}
          message={'¿Está seguro de eliminar este correo?'}
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                this.setState({ mostrar_confirmacion: false });
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