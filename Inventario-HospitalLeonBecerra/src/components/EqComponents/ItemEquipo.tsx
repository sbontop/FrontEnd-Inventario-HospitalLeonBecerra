import {
  IonItem, IonLabel, IonLoading, IonAlert, IonAvatar, IonIcon, IonList,
  IonToolbar, IonContent, IonTitle, IonButton, IonButtons, IonModal, IonText
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { trash, create } from 'ionicons/icons';
import React from 'react';
import AxiosPC from '../../services/AxiosPC';
import DescriptionLaptop from "./DescriptionLaptop";
import DescriptionDesktop from "./DescriptionDesktop";

export default class ItemEquipo extends React.Component<{ info: any, tipo: any, principal: any }, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      ventanaOptions: false,
      showLoading: false,
      showAlertConfirm: false,
      showAlertSuccess: false,
      mounted: true,
      changePage: false
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
  }

  componentWillUnmount() {
    console.log("unmounted")
    this.setState({
      mounted: false
    })
  }

  deleteEquipo = () => {
    if (this.state.mounted) {
      this.setState({
        showLoading: true,
        showAlertConfirm: false
      })
      AxiosPC.deleteEquipo(this.props.info.original.general.id_equipo, this.props.tipo).then((response: any) => {
        if (this.state.mounted) {
          this.setState({
            showLoading: false,
            showAlertSuccess: true
          })
          this.props.principal.setState({ page_index: 0 })
          this.props.principal.getEquipos(true);
          console.log(response);
        }

      }, err => {
        if (this.state.mounted) {
          this.setState({
            showLoading: false
          })
          console.log(err);
        }

      })
    }

  }

  render() {
    if (this.state.changePage) {
      let path_ = (this.props.info.original.general.ip === null ? "/form-" + this.props.tipo + "/edit/" + this.props.info.original.general.id_equipo : "/form-" + this.props.tipo + "-2/edit-2/" + this.props.info.original.general.id_equipo + "/" + this.props.info.original.general.ip);
      return <Redirect to={path_} />
    }
    return (
      <div key={this.props.info.original.general.id_equipo}>
        <IonItem >
          <IonAvatar slot="start">
            {/* <img src={process.env.PUBLIC_URL + "/assets/img/" + this.props.tipo + ".png"} alt="" /> */}
            {
              this.props.info.original.general.estado_operativo === 'D' ? <img src={"./assets/img/" + this.props.tipo + "/D.png"} alt="D" /> :
                this.props.info.original.general.estado_operativo === 'R' ? <img src={"./assets/img/" + this.props.tipo + "/R.png"} alt="R" /> :
                  this.props.info.original.general.estado_operativo === 'ER' ? <img src={"./assets/img/" + this.props.tipo + "/ER.png"} alt="ER" /> :
                    this.props.info.original.general.estado_operativo === 'O' ? <img src={"./assets/img/" + this.props.tipo + "/O.png"} alt="O" /> :
                      <img src={"./assets/img/" + this.props.tipo + "/B.png"} alt="B" />
            }
          </IonAvatar>

          <IonLabel onClick={() => { if (this.state.mounted) this.setState({ ventanaOptions: false, ventanaDetalle: true }) }} color="dark">
            <IonText color={this.props.info.original.general.estado_operativo === "B" ? `danger` : `dark`}><h2><b>{this.props.info.original.general.tipo_equipo.toUpperCase() + ": " + this.props.info.original.general.codigo}</b></h2></IonText>
            <h3>{"Usuario Reg: " + this.props.info.original.general.encargado_registro}</h3>
            <p>{"Fecha. Reg: " + this.props.info.original.general.fecha_registro}</p>
          </IonLabel>

          {/* <IonIcon icon={menu}></IonIcon> */}
          <IonButton disabled={this.props.info.original.general.estado_operativo === "B"} size="default" fill="clear" onClick={() => { this.setState({ changePage: true }) }} color="secondary" >
            <IonIcon  color="medium" icon={create}></IonIcon>
          </IonButton>
          <IonButton disabled={this.props.info.original.general.estado_operativo === "B"} size="default" fill="clear" onClick={() => { if (this.state.mounted) this.setState({ ventanaOptions: false, showAlertConfirm: true }) }} color="primary">
            <IonIcon color="medium" icon={trash}></IonIcon>
          </IonButton>

        </IonItem>
        <IonLoading
          isOpen={this.state.showLoading}
          message={'Eliminando Equipo. Espero por favor...'}
        />
        <IonAlert
          isOpen={this.state.showAlertConfirm}

          header={"Eliminar Equipo"}

          message={'¿Esta seguro de eliminar este equipo?'}
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
                if (this.state.mounted) this.deleteEquipo()
              }
            }
          ]}
        />

        <IonAlert
          isOpen={this.state.showAlertSuccess}

          header={'Eliminacion Exitosa'}

          message={'El equipo se elimino exitosamente!'}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                if (this.state.mounted) {
                  this.setState({
                    showAlertSuccess: false
                  })
                }
              }
            }
          ]}
        />

        <IonContent>
          <IonModal
            isOpen={this.state.ventanaDetalle}
            onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
            <IonToolbar color="primary">
              <IonTitle>{"Detalle de " + (this.props.tipo !== "desktop" ? "Laptop" : "Desktop")}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>
                  <IonIcon name="close" slot="icon-only"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonContent>
              <IonList>
                {this.props.tipo === "laptop" ? <DescriptionLaptop obj={this.props.info.original}></DescriptionLaptop> : <DescriptionDesktop obj={this.props.info.original}></DescriptionDesktop>}
              </IonList>
            </IonContent>
          </IonModal>

        </IonContent>
      </div>
    )
  }


}