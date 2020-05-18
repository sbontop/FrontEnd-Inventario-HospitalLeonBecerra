import {
  IonItem, IonLabel, IonAvatar, IonIcon, IonList, IonPopover, IonModal, IonTitle, IonButton, IonAlert, IonLoading, IonText, /* IonRouterLink, */ IonToolbar,
  IonButtons,
  IonNote,
  IonContent
} from '@ionic/react';
import { trash, menu, eye, create, close, mailOpen, person, business, locate, calendar, speedometer } from 'ionicons/icons';
import React from 'react';
 import { Redirect } from 'react-router-dom';  
import Axios from '../../services/Axios.services';

class ListaCorreos extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      ventanaOptions: false,
      changePage: false,
      mensaje: "",
      alerta: false,
      showAlertConfirm: false,
      showLoading: false,
      mounted: true
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
  }

  componentWillUnmount() {
    this.setState({
      mounted: false
    })
  }

  handle_eliminar() {
    if(this.state.mounted){

    
    this.setState({
      showLoading: true,
      showAlertConfirm: false
    })
  }
    Axios.eliminar_correo(this.props.id_correo).then(res => {
      if(this.state.mounted){

     
      this.setState({
        showLoading: false,
        mensaje: "Registro eliminado satisfactoriamente",
        alerta: true
      })
    
      this.props.handle.cargar_correos(true);
    }
    }).catch(error => {
      if(this.state.mounted){

      
      console.log(error)
      this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });
      }
    });
  
  }

  render() {
     if (this.state.changePage) {
       let path_ = "/formularioCorreo/edit/" + this.props.id_correo;
       return <Redirect to={path_} />
     }  
    return (
      <div>
        <IonItem onClick={() => {if (this.state.mounted) this.setState({ ventanaOptions: true })}}>
          <IonLabel>
            <IonText color={this.props.estado === "I" ? `danger` : `dark`}><h2><b>Usuario: {this.props.nombres} {this.props.apellidos}</b></h2></IonText>
            <h3>Departamento: {this.props.departamento}</h3>
            <small>{this.props.correo}</small>
          </IonLabel>
          <IonAvatar slot="start"><img src="./assets/img/miniuser.svg" alt="imagen" /></IonAvatar>
          <IonIcon slot="end" icon={menu} ></IonIcon>
        </IonItem>

        <IonPopover
          isOpen={this.state.ventanaOptions}
         /*  onDidDismiss={e =>{ if (this.state.mounted) this.setState({ ventanaOptions: false })}} */>
          <IonTitle className="ion-margin-top" color="warn">Opciones</IonTitle>
          <IonList>
            <IonItem onClick={() =>{ if (this.state.mounted) this.setState({ ventanaOptions: false, ventanaDetalle: true })}}>
              <IonLabel>
                Ver Detalles
              </IonLabel>
              <IonIcon icon={eye}></IonIcon>
            </IonItem>
            <IonItem  onClick={() =>  {if (this.state.mounted) this.setState({ventanaOptions: false, changePage: true })} }>
              <IonLabel>
              Editar Informacion
                {/* <IonRouterLink color="dark" href={`/formularioCorreo/edit/${this.props.id_correo}`} >Editar Informacion</IonRouterLink> */}
              </IonLabel>
              <IonIcon icon={create}></IonIcon>
            </IonItem>
            <IonItem onClick={() => {if (this.state.mounted) this.setState({ ventanaOptions: false, showAlertConfirm: true })}}>
              <IonLabel>
                Eliminar Correo
              </IonLabel>
              <IonIcon icon={trash}></IonIcon>
            </IonItem>
          </IonList>
        </IonPopover>


        <IonModal
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => {if (this.state.mounted) this.setState({ ventanaDetalle: false })}}>
          <IonToolbar color="primary">
            <IonTitle className="ion-margin-top">Detalle del correo</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => {if (this.state.mounted) this.setState({ ventanaDetalle: false })}}><IonIcon icon={close}></IonIcon></IonButton>
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
                if (this.state.mounted) this.setState({ showAlertConfirm: false });
              }
            },
            {
              text: 'Si',
              handler: () => {
                if (this.state.mounted)  this.handle_eliminar()
              }
            }
          ]}
        />
        <IonAlert
          isOpen={this.state.alerta}
          onDidDismiss={() => {  if (this.state.mounted) this.setState({ alerta: false }) }}
          header={this.state.mensaje}
          buttons={['Aceptar']}
        />
      </div >
    );
  }
}


export default ListaCorreos;