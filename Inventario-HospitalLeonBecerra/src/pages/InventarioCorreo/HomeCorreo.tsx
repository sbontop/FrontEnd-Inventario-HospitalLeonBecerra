import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime,
  IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/react';
import React from 'react';
import { options, add, arrowBack } from 'ionicons/icons';
import ListaCorreos from '../../components/correoComponents/ListaCorreos';
import AxiosCorreo from '../../services/Axios.services';
import SelectOptionDepartamento from '../../components/correoComponents/SelectOptionDepartamento';
import Respuesta from '../../components/Respuesta';

class HomeCorreo extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      popOver: false,
      datos: [] as any,
      showLoading: false,
      disable_load: false,
      parametros: { page_size: 10, page_index: 0, estado:"" }
    }
  }

  asignar_parametros = (name: any, value: any) => {
    this.setState({ parametros: { ...this.state.parametros, [name]: value } });
  }

  clearReload() {
      this.setState({ parametros: { page_size: 10, page_index: 0, estado:"" }, popOver: false });
      this.cargar_correos(true);
  }

  componentDidMount = () => {
    this.setState({ showLoading: true })
    this.cargar_correos(true);
  }

  cargar_correos(newLoad: boolean) {
    let parametros: any = {};
    parametros = this.state.parametros;
    /* I have used this conditional because sometimes the state "page_index" didn't change its value. For example:
    If you scroll until the end (when no more data to charge) and later you use a filter, the result is no data to
    display. If you print the state you can see that... x'd.
    I don't know if I the only one with this problem or maybe I did something wrong xD
    */
    if (newLoad) {
      parametros.page_index = 0;
    }
    console.log("Parametros dentro de cargar correos")
    console.log(parametros)
    AxiosCorreo.filtrar_correos(parametros).then(res => {
      this.setState({ datos: newLoad ? res.data.resp : [...this.state.datos, ...res.data.resp]});
      this.setState({ showLoading: false, disable_load: this.state.datos.length === res.data.itemSize }); 
    }).catch(err => {
      this.setState({ showLoading: false });
      console.log(err);
    });
  }
  


  doRefresh = (e: any, newPageIndex: number) => {
      console.log("parametros dentro doRefresh")
      this.asignar_parametros("page_index", newPageIndex);
      console.log(this.state.parametros)
      setTimeout(() => {
        this.cargar_correos(newPageIndex === 0);
        if (newPageIndex === 0) {
          e.detail.complete();
        } else {
          e.target.complete();
        }
      }, 1000);
    }



  buscar_por_empleado = () => {
    this.asignar_parametros("page_index", 0);
    this.setState({ showLoading: true });
    this.cargar_correos(true);
  }

  handle_aplicar = () => {
    this.asignar_parametros("page_index", 0);
    this.setState({ popOver: false, showLoading: true })
    console.log("parametros dentro de handle aplicar")
    console.log(this.state.parametros)
    this.cargar_correos(true);
  }

  generar_lista = () => {
      return (this.state.datos.map((dato: any) => {
        return (
          <ListaCorreos key={dato.correo} id_correo={dato.id_correo} nombres={dato.nombre} apellidos={dato.apellido} departamento={dato.departamento}
            correo={dato.correo} estado={dato.estado} fecha_asignacion={dato.asignacion} bspi_punto={dato.bspi_punto} handle={this} />
        )
      }))
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton routerLink="/inventarios"><IonIcon icon={arrowBack}></IonIcon></IonButton>
            </IonButtons>
            <IonTitle >Inventario de correo</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/formularioCorreo"><IonIcon icon={add}></IonIcon></IonButton>
              <IonButton onClick={() =>  this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
            </IonButtons>
            <IonPopover
              isOpen={this.state.popOver}
              onDidDismiss={e => this.setState({ popOver: false })}>
              <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
              <IonList>
                <IonItem>
                  <IonLabel>Departamento</IonLabel>
                  <IonSelect value={this.state.parametros.departamento} okText="Ok" cancelText="Cancelar" name="departamento"
                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)}>
                    <IonSelectOption value="Todos">Todos</IonSelectOption>
                    <SelectOptionDepartamento />
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Estado</IonLabel>
                  <IonSelect value={this.state.parametros.estado} okText="Ok" cancelText="Cancelar" name="estado"
                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)}>
                    <IonSelectOption value="EU">En uso</IonSelectOption>
                    <IonSelectOption value="I">Inactivo</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Fecha de <br /> asignación</IonLabel>
                  <IonDatetime value={this.state.parametros.fecha} doneText="Ok" cancelText="Cancelar" name="fecha" onIonChange={(e: any) =>  this.asignar_parametros(e.target.name, e.target.value.substring(0, 10))}
                    placeholder="Fecha" displayFormat="DD/MM/YYYY"
                  ></IonDatetime>
                </IonItem>
              </IonList>
              <div className="ion-text-center ion-margin">
                <IonButton expand="block" size="small" onClick={() =>  this.handle_aplicar()}>Aplicar</IonButton>
                <IonButton expand="block" size="small" onClick={() =>  this.clearReload()} >Limpiar</IonButton>
                <IonButton expand="block" size="small" onClick={() =>  this.setState({ popOver: false })}>Cancelar</IonButton>
              </div >
            </IonPopover>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <IonRefresher slot="fixed" onIonRefresh={(e: any) =>  this.doRefresh(e, 0)}>
            <IonRefresherContent refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>

          <IonSearchbar placeholder={"Buscar por empleado"} onIonBlur={this.buscar_por_empleado} onIonChange={(e: any) => this.asignar_parametros("empleado", e.target.value)}
            cancelButtonIcon="md-search" showCancelButton="never">
          </IonSearchbar>

          <IonLoading
            isOpen={this.state.showLoading}
            message={'Cargando datos. Espere por favor...'}
          />

          <Respuesta informacion={this.state.datos.length}></Respuesta>

          <IonList>{this.generar_lista()} </IonList>

          <IonInfiniteScroll disabled={this.state.disable_load} threshold="100px"
            onIonInfinite={(e: any) =>  this.doRefresh(e, this.state.parametros.page_index + 1)}
            ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Cargando mas registros">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  }
}

export default HomeCorreo;