import {
  IonItem, IonLabel, IonLoading, IonAlert, IonAvatar, IonIcon, IonList, IonPopover, IonTitle, IonButton
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { menu, eye, trash, create } from 'ionicons/icons';
import React from 'react';
import AxiosPC from '../../services/AxiosPC';

export default class ItemEquipo extends React.Component<{ info: any, tipo:any, principal: any }, any> {
  //principal: any
  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      ventanaOptions: false,
      showLoading: false,
      showAlertConfirm: false,
      showAlertSuccess: false,
      mounted: true,
      changePage:false
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
      AxiosPC.deleteEquipo(this.props.info.id_equipo).then((response: any) => {
        if(this.state.mounted)
        {
          this.setState({
            showLoading: false,
            showAlertSuccess: true
          })
          this.props.principal.setState({ page_index: 0 })
          this.props.principal.getEquipos(true);
          console.log(response);
        }
        
      }, err => {
        if(this.state.mounted){
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
            return (this.props.tipo === 'laptop' ? <Redirect to={"/form-laptop/edit/"+this.props.info.id_equipo} /> : <Redirect to={"/form-desktop/edit/"+this.props.info.id_equipo} />);
    }
    return (
      <div>
        <IonItem onClick={() =>{  if(this.state.mounted)this.setState({ ventanaOptions: true })}} >
          <IonAvatar slot="start">
            <img src={process.env.PUBLIC_URL + "/assets/img/" + this.props.tipo + ".png"} alt="" />
          </IonAvatar>

          <IonLabel color="dark">
            <h2><b>{this.props.info.tipo_equipo.toUpperCase() + ": " + this.props.info.codigo}</b></h2>
            <h3>{"Usuario: " + this.props.info.encargado_registro}</h3>
            <p>{"Fecha. Reg: " + this.props.info.fecha_registro}</p>
          </IonLabel>

          <IonIcon icon={menu}></IonIcon>

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
                if(this.state.mounted)this.setState({ showAlertConfirm: false });
              }
            },
            {
              text: 'Si',
              handler: () => {
                if(this.state.mounted) this.deleteEquipo()
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
                if(this.state.mounted){this.setState({
                  showAlertSuccess: false
                })}
              }
            }
          ]}
        />
        <IonPopover
          isOpen={this.state.ventanaOptions}
          onDidDismiss={e =>{if(this.state.mounted) this.setState({ ventanaOptions: false })}}>
          <IonTitle className="ion-margin-top" color="warn">{"Opciones: " + this.props.info.codigo}</IonTitle>
          <IonList>
            <IonItem onClick={() => { if(this.state.mounted) this.setState({ ventanaOptions: false, ventanaDetalle: true }) }}>
              <IonLabel>
                Ver Detalles
              </IonLabel>
              <IonIcon icon={eye}></IonIcon>
            </IonItem>
            <IonItem onClick={() => { 
              if(this.state.mounted)
              
              this.setState({ changePage: true })
              //this.props.principal.setState({ editarEquipo: true }) 
              
              }}>
              <IonLabel>
                Editar Informacion
              </IonLabel>
              <IonIcon icon={create}></IonIcon>
            </IonItem>
            <IonItem onClick={() => { if(this.state.mounted) this.setState({ ventanaOptions: false, showAlertConfirm: true }) }}>
              <IonLabel>
                Eliminar Equipo
              </IonLabel>
              <IonIcon icon={trash}></IonIcon>
            </IonItem>
          </IonList>
        </IonPopover>
        <IonPopover
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e =>{  if(this.state.mounted)this.setState({ ventanaDetalle: false })}}>
          <IonTitle className="ion-margin-top" color="warn">Detalle del equipo</IonTitle>
          <IonList>
            <IonItem>
              <IonLabel>Id: {this.props.info.id_equipo}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Codigo: {this.props.info.codigo}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Descripcion: {this.props.info.descripcion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Encargado Registro: {this.props.info.encargado_registro}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Estado: {this.props.info.estado_operativo}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Fecha Registro: {this.props.info.fecha_registro}</IonLabel>
            </IonItem>
          </IonList>
          <div className="ion-text-center ion-margin">
            <IonButton onClick={() => { if(this.state.mounted)this.setState({ ventanaDetalle: false })}}>Cerrar</IonButton>
          </div>
        </IonPopover>
      </div>
    )
  }


}