import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, IonButton, IonContent, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime
  } from '@ionic/react';
  import React from 'react';
  /*import ListaCorreos from '../../components/correoComponents/ListaCorreos';*/
  import SelectOptionDepartamento from '../../components/correoComponents/SelectOptionDepartamento';
  
  
  interface estados {
    popOver: boolean,
    filtro_dpto: any,
    filtro_fecha: any
  };
  
  class HomeCorreo extends React.Component<any, estados> {
  
    constructor(props: any) {
      super(props);
      this.state = {
        popOver: false,
        filtro_dpto: String,
        filtro_fecha: new Date().toISOString()
      }
    }
  
  
    render() {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
              <IonButtons slot="start">
                <IonBackButton defaultHref="h" />
              </IonButtons>
              <IonTitle size="small">Inventario de correo</IonTitle>
              <IonButtons slot="end">
                <IonButton routerLink="/formularioCorreo">Nuevo</IonButton>
                <IonButton onClick={() => this.setState({ popOver: true })}>OP</IonButton>
              </IonButtons>
              <IonPopover
                isOpen={this.state.popOver}
                onDidDismiss={e => this.setState({ popOver: false })}>
                <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                <IonList>
                  <IonItem>
                    <IonLabel>Departamento</IonLabel>
                    <IonSelect value={this.state.filtro_dpto} okText="Ok" cancelText="Cancelar" name="departamento"
                       onIonChange={(e) => this.setState({ filtro_dpto: e.detail.value })}>
                      <IonSelectOption selected>Todos</IonSelectOption>
                      <SelectOptionDepartamento />
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Fecha de <br /> asignación</IonLabel>
                    <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                      value={this.state.filtro_fecha} onIonChange={(e) => this.setState({ filtro_fecha: e.detail.value })}
                      placeholder="Fecha" displayFormat="DD/MM/YYYY"
                    ></IonDatetime>
                  </IonItem>
                </IonList>
                <div className="ion-text-center ion-margin">
                  <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                  <IonButton onClick={() => console.log(this.state.filtro_dpto, this.state.filtro_fecha.substring(0, 10))}>Aplicar</IonButton>
                </div >
  
              </IonPopover>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          </IonContent>
        </IonPage>
      );
    }
  };
  
  export default HomeCorreo;