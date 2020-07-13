import React from 'react';
import { trash, create, eye, key, locate, pricetag, medical, business, person, speedometer, informationCircle, barcode, reorder, globe, logIn, card, keypad, calendar, laptop, gitNetwork, cloudy } from 'ionicons/icons';
import {
  IonItem, IonLabel, IonRippleEffect,
  IonPopover, IonTitle, IonAvatar,
  IonList, IonIcon, IonButton,
  IonContent, IonModal, IonToolbar, IonButtons, IonListHeader, IonLoading, IonAlert, IonNote
} from '@ionic/react';
import { Redirect } from 'react-router';
import AxiosIp from '../../services/AxiosIp';

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
  mensaje: string,
  alerta: boolean,
  redirectToHomeIp: boolean,
}

class ListIps extends React.Component<IpInterface, estados, { history: any }>  {
  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      ventanaOpciones: false,
      mounted: true,
      redirectToEditIp: false,
      redirectToHomeIp: false,
      showAlertConfirm: false,
      showLoading: false,
      mensaje: "",
      alerta: false,
    }
  }

  handle_eliminar() {
    this.setState({
        showLoading: true,
        showAlertConfirm: false
    })
    AxiosIp.eliminar_ip(this.props.id_ip).then(res => {   
      console.log(res);
      this.setState({
          showLoading: false,
          mensaje: "Registro eliminado satisfactoriamente",
          alerta: true,
      })
    }).catch(error => {
        console.log(error)
        this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
    }); 
} 

  render() {
    if (this.state.redirectToEditIp) {
      let path_ = `ip/edit/${this.props.id_ip}`;
      console.log(path_);
      return <Redirect to={path_} />
    } else if (this.state.redirectToHomeIp) {
      let path_ = `homeip`
      return <Redirect to={path_} />
    }
    return (
      <IonList>
        <IonItem className="ion-activatable" onClick={() => this.setState({ ventanaDetalle: true })}>

          <IonAvatar slot="start">
            {
              this.props.estado === 'L' ?
                <img src="./assets/img/ip/L.png" alt="L" /> :
                <img src="./assets/img/ip/EU.png" alt="EU" />
            }
          </IonAvatar>

          <IonLabel key={this.props.id_ip}>
            <h2><b>{this.props.direccion_ip}</b></h2>
            <h3>Estado: {this.props.estado === 'L' ? " Libre" : " En uso"} </h3>
            <p>Usuario: {this.props.nombre_usuario}</p>
            <IonRippleEffect />
          </IonLabel>

          <IonButton size="default" fill="clear" onClick={() => this.setState({redirectToEditIp: true,})}  color="secondary" >
            <IonIcon color="medium" icon={create}></IonIcon>
          </IonButton>

          <IonButton size="default" fill="clear" onClick={() => this.setState({ showAlertConfirm: true })} color="primary" >
            <IonIcon color="medium" icon={trash}></IonIcon>
          </IonButton>
          {/* <IonIcon icon={menu}></IonIcon> */}
          {/* </IonButton> */}
        </IonItem>

        <IonContent>
          <IonModal
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}
          >
            <IonToolbar color="primary">
                <IonTitle>Detalle de router</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>
                        <IonIcon name="close" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent>
              <IonList>
                <IonListHeader>Información general</IonListHeader>
                <IonItem>
                    <IonIcon slot="start" icon={globe}> </IonIcon>
                    Direción IP <IonNote slot="end">{this.props.direccion_ip}</IonNote>
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={speedometer} />
                  Estado
                  <IonNote color="dark" slot="end">
                      { this.props.estado === 'EU' ? "En Uso" : null }
                      { this.props.estado === 'L' ? "Libre" : null }
                  </IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={person}> </IonIcon>
                    Usuario <IonNote slot="end">{this.props.nombre_usuario}</IonNote>
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={cloudy}> </IonIcon>
                  Hostname <IonNote slot="end">{this.props.hostname}</IonNote>
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={gitNetwork}> </IonIcon>
                  Subred <IonNote slot="end">{this.props.subred}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={logIn}> </IonIcon>
                    Puerta enlace <IonNote slot="end">{this.props.fortigate}</IonNote>
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={laptop}> </IonIcon>
                  Maquinas Adicionales <IonNote slot="end">{this.props.maquinas_adicionales}</IonNote>
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={eye}> </IonIcon>
                  Observacion <IonNote slot="end">{this.props.observacion}</IonNote>
                </IonItem>
              </IonList>
            </IonContent>
          </IonModal>
          <IonLoading
            isOpen={this.state.showLoading}
            message={'Eliminando IP. Espere por favor...'}
          />
          <IonAlert
            isOpen={this.state.showAlertConfirm}
            header={"Eliminar IP"}
            message={'¿Esta seguro de eliminar esta IP?'}
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
            onDidDismiss={() => { this.setState({ alerta: false }) }}
            header={this.state.mensaje}
            buttons={[{
              text: 'Aceptar',
              handler: () => {
                this.setState({
                  redirectToHomeIp: true,
                });
              }
            }]}
          />
        </IonContent>
      </IonList>
    );
  }
}

export default ListIps;
