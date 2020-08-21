import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime,
  IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, withIonLifeCycle
} from '@ionic/react';
import React from 'react';
import { options, add, arrowBack } from 'ionicons/icons';
import ListaCorreos from '../../components/correoComponents/ListaCorreos';
import AxiosCorreo from '../../services/Axios.services';
import SelectOptionDepartamento from '../../components/correoComponents/SelectOptionDepartamento';
import Respuesta from '../../components/Respuesta';
import { Redirect } from 'react-router';

class HomeCorreo extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      mostrar_pop: false,
      datos: [] as any,
      mostrar_load: false,
      mostrar_scroll: false,
      parametros: { page_size: 10, page_index: 0, estado: "" }
    }
  }

  /**
   * Función auxiliar para asignar al objeto parametros los valores de búsqueda al momento
   * de filtrar los datos
   * @param name tipo de parámetro, como page_size, page_index, estado: Fecha de asignación,
   *  estado del correo, departamento
   * @param value El valor que tomará el parámetro.
   */
  asignar_parametros = (name: any, value: any) => {
    this.setState({ parametros: { ...this.state.parametros, [name]: value } });
  }


  /**
   * Función auxiliar para asignar los valores de filtrado por defecto en el objeto parametros. 
   */
  limpiar_filtros() {
    this.setState({ parametros: { page_size: 10, page_index: 0, estado: "" } });
  }

  /**
   * Función utilizada para cargar datos al momento de realizar la acción "arrastrar y soltar" y
   * al activarse la opción Infinitive Scroll.
   * @param e 
   * @param newPageIndex número referente al paginado
   */
  refrescar = (e: any, newPageIndex: number) => {
    this.asignar_parametros("page_index", newPageIndex);
    setTimeout(() => {
      this.cargar_correos(newPageIndex === 0);
      if (newPageIndex === 0) {
        e.detail.complete();
      } else {
        e.target.complete();
      }
    }, 1000);
  }

  ionViewWillEnter() {
    this.setState({ mostrar_load: true })
    this.cargar_correos(true);
  }

  /**
   * Función que hace requerimientos a la base de datos utilizando el API
   * @param newLoad true si se trata de una búsqueda donde page_index es 0.
   */
  cargar_correos(newLoad: boolean) {
    let parametros: any = {};
    parametros = this.state.parametros;
    if (newLoad) {
      parametros.page_index = 0;
    }
    AxiosCorreo.filtrar_correos(parametros).then(res => {
      this.setState({ datos: newLoad ? res.data.resp : [...this.state.datos, ...res.data.resp] });
      this.setState({ mostrar_load: false, mostrar_scroll: this.state.datos.length === res.data.itemSize });
    }).catch(err => {
      this.setState({ mostrar_load: false });
    });
  }

  /**
   * Función para filtrar por nombre de empleados.
   */
  buscar_empleado = (e: any) => {
    this.asignar_parametros("empleado", e.target.value)
    this.asignar_parametros("page_index", 0);
    this.setState({ mostrar_load: true });
    this.cargar_correos(true);
  }

  onClear = () => {
    this.cargar_correos(true);
  }

  /**
   * Función para cargar los datos según los filtros seleccionados.
   */
  aplicar_filtros = () => {
    this.asignar_parametros("page_index", 0);
    this.setState({ mostrar_pop: false, mostrar_load: true })
    this.cargar_correos(true);
  }

  /**
   * Función para generar la lista de los usurios con sus respectivos datos.
   */
  generar_lista = () => {
    return (this.state.datos.map((dato: any) => {
      return (
        <ListaCorreos key={dato.correo} id_correo={dato.id_correo} nombres={dato.nombre} apellidos={dato.apellido} departamento={dato.departamento}
          correo={dato.correo} estado={dato.estado} fecha_asignacion={dato.asignacion} bspi_punto={dato.bspi_punto} handle={this} />
      )
    }))
  }


  render() {

    if (localStorage.userdata === undefined){
      return (<Redirect to="/iniciarsesion" />)
    }

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
              <IonButton onClick={() => this.setState({ mostrar_pop: true })}><IonIcon icon={options}></IonIcon></IonButton>
            </IonButtons>
            <IonPopover
              isOpen={this.state.mostrar_pop}
              onDidDismiss={e => this.setState({ mostrar_pop: false })}>
              <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
              <IonList>
                <IonItem>
                  <IonLabel>Departamento</IonLabel>
                  <IonSelect placeholder="Todos" value={this.state.parametros.departamento} okText="Ok" cancelText="Cancelar" name="departamento"
                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)}>
                    <IonSelectOption value="Todos">Todos</IonSelectOption>
                    <SelectOptionDepartamento />
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Estado</IonLabel>
                  <IonSelect placeholder="En uso" value={this.state.parametros.estado} okText="Ok" cancelText="Cancelar" name="estado"
                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)}>
                    <IonSelectOption value="EU">En uso</IonSelectOption>
                    <IonSelectOption value="I">Inactivo</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Fecha de <br /> asignación</IonLabel>
                  <IonDatetime value={this.state.parametros.fecha} doneText="Ok" cancelText="Cancelar" name="fecha"
                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.detail.value! ? e.detail.value.substring(0, 10) : "")}
                    placeholder="Fecha" displayFormat="DD/MM/YYYY"
                  ></IonDatetime>
                </IonItem>
              </IonList>
              <div className="ion-text-center ion-margin">
                <IonButton expand="block" onClick={() => this.aplicar_filtros()}>Aplicar</IonButton>
                <IonButton expand="block" onClick={() => this.limpiar_filtros()} >Limpiar</IonButton>
                <IonButton expand="block" onClick={() => this.setState({ mostrar_pop: false })}>Cancelar</IonButton>
              </div >
            </IonPopover>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <IonRefresher slot="fixed" onIonRefresh={(e: any) => this.refrescar(e, 0)}>
            <IonRefresherContent refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>

          <IonSearchbar placeholder={"Buscar por empleado"}
            onIonChange={(e: any) => this.buscar_empleado(e)}
            onIonClear={() => { this.onClear() }}>
          </IonSearchbar>

          <IonLoading
            isOpen={this.state.mostrar_load}
            message={'Cargando datos. Espere por favor...'}
          />

          <Respuesta informacion={this.state.datos.length}></Respuesta>

          <IonList>{this.generar_lista()} </IonList>

          <IonInfiniteScroll disabled={this.state.mostrar_scroll} threshold="100px"
            onIonInfinite={(e: any) => this.refrescar(e, this.state.parametros.page_index + 1)}
            ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Cargando más registros">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  }
}

export default  withIonLifeCycle(HomeCorreo);