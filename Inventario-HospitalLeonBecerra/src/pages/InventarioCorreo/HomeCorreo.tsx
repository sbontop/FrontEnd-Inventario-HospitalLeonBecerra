import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, IonButton, IonContent, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime,
  IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar
} from '@ionic/react';
import React from 'react';
import { options, add } from 'ionicons/icons';
import ListaCorreos from '../../components/correoComponents/ListaCorreos';
import AxiosCorreo from '../../services/Axios.services';
import { RefresherEventDetail } from '@ionic/core';
import SelectOptionDepartamento from '../../components/correoComponents/SelectOptionDepartamento';
import Respuesta from '../../components/Respuesta';

class HomeCorreo extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      popOver: false,
      filtro_dpto: "Todos",
      filtro_fecha: "",
      datos: [] as any,
      showLoading: false,
      filtro_empleado: ""
    }
  }


  componentDidMount = () => {
    this.cargar_correos();
  }


  cargar_correos() {
    this.setState({ showLoading: true });
    AxiosCorreo.mostrar_correos().then(res => {
      this.setState({ datos: res.data, showLoading: false });
    }).catch(err => {
      console.log(err);
    });
  }


  doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      this.cargar_correos();
      event.detail.complete();
    }, 2000);
  }


  aplicar_filtros = () => {
    this.setState({ showLoading: true });
    AxiosCorreo.correo_por_filtro(this.state.filtro_dpto, this.state.filtro_fecha.substring(0, 10)).then(res => {
      this.setState({ datos: res.data, showLoading: false });
    }).catch(err => {
      console.log(err);
    });
  }


  buscar_por_empleado = () => {
    this.setState({ showLoading: true });
    AxiosCorreo.empleado_por_filtro(this.state.filtro_empleado).then(res => {
      this.setState({ datos: res.data, showLoading: false });
    }).catch(err => {
      console.log(err);
    });
  }


  handle_aplicar = () => {
    this.aplicar_filtros();
    this.setState({ popOver: false })
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/inventarios" />
            </IonButtons>
            <IonTitle >Inventario de correo</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/formularioCorreo"><IonIcon icon={add}></IonIcon></IonButton>
              <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
            </IonButtons>
            <IonPopover
              isOpen={this.state.popOver}
              onDidDismiss={e => this.setState({ popOver: false })}>
              <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
              <IonList>
                <IonItem>
                  <IonLabel>Departamento</IonLabel>
                  <IonSelect okText="Ok" cancelText="Cancelar" name="departamento"
                    onIonChange={(e) => this.setState({ filtro_dpto: e.detail.value })}>
                    <IonSelectOption selected>Todos</IonSelectOption>
                    <SelectOptionDepartamento />
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Fecha de <br /> asignación</IonLabel>
                  <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha" onIonChange={(e) => this.setState({ filtro_fecha: e.detail.value })}
                    placeholder="Fecha" displayFormat="DD/MM/YYYY"
                  ></IonDatetime>
                </IonItem>
              </IonList>
              <div className="ion-text-center ion-margin">
                <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                <IonButton onClick={() => this.handle_aplicar()}>Aplicar</IonButton>
              </div >
            </IonPopover>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
            <IonRefresherContent refreshingSpinner="bubbles">
            </IonRefresherContent>
          </IonRefresher>
          <IonSearchbar placeholder={"Buscar por empleado"} onIonBlur={this.buscar_por_empleado} onIonChange={(e) => this.setState({ filtro_empleado: (e.target as HTMLInputElement).value })}
            cancelButtonIcon="md-search" showCancelButton="focus">
          </IonSearchbar>

          <IonLoading
            isOpen={this.state.showLoading}
            message={'Cargando datos. Espere por favor...'}
          />
          <Respuesta informacion={this.state.datos.length}></Respuesta>
          {this.state.datos.map((dato: any) => {
            return (
              <ListaCorreos key={dato.correo} nombres={dato.nombre} apellidos={dato.apellido} departamento={dato.departamento}
                correo={dato.correo} estado={dato.estado} fecha_asignacion={dato.asignacion} bspi_punto={dato.bspi_punto} />
            )
          })
          }
        </IonContent>
      </IonPage>
    );
  }
}

export default HomeCorreo;