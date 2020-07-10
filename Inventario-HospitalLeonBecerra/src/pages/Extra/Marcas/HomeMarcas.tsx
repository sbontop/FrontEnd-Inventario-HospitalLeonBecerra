import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/react';
import React from 'react';
import { add, arrowBack } from 'ionicons/icons';
import ListaMarcas from '../../../components/marcaComponents/ListaMarcas';
import Axios from '../../../services/AxiosMarcas';
import Respuesta from '../../../components/Respuesta';
import Pop from './Pop'

class HomeMarcas extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      datos: [] as any,
      mostrar_load: false,
      mostrar_scroll: false,
      marca: "",
      editionMode: false,
      parametros: { page_size: 20, page_index: 0 },
      open: false
    }
  }

  asignar_parametros = (name: any, value: any) => {
    this.setState({ parametros: { ...this.state.parametros, [name]: value } });
  }

  actualizar_parametros(){
    this.setState({ parametros: { page_size: 20, page_index: 0 }});
  }

  clearReload() {
    this.setState({ parametros: { page_size: 20, page_index: 0 } });
    this.cargar_marcas(true);
  }

  componentDidMount = () => {
    this.setState({ mostrar_load: true })
    this.cargar_marcas(true);
  }

  cargar_marcas(newLoad: boolean) {
    console.log("Parametros dentro de cargar marcas")
    console.log(this.state.parametros)
    Axios.filtrar_marcas(this.state.parametros).then(res => {
      this.setState({ datos: newLoad ? res.data.resp : [...this.state.datos, ...res.data.resp] });
      this.setState({ mostrar_load: false, mostrar_scroll: this.state.datos.length === res.data.itemSize });
    }).catch(err => {
      this.setState({ mostrar_load: false });
      console.log(err);
    });
  }


  refrescar = (e: any, newPageIndex: number) => {
    console.log("parametros dentro refrescar")
    this.asignar_parametros("page_index", newPageIndex);
    console.log(this.state.parametros)
    setTimeout(() => {
      this.cargar_marcas(newPageIndex === 0);
      if (newPageIndex === 0) {
        e.detail.complete();
      } else {
        e.target.complete();
      }
    }, 1000);
  }



  buscar_por_marca = () => {
    this.asignar_parametros("page_index", 0);
    this.asignar_parametros("marca", this.state.marca);
    this.setState({ mostrar_load: true });
    this.cargar_marcas(true);
  }

  generar_lista = () => {
    return (this.state.datos.map((dato: any) => {
      return (
        <ListaMarcas key={dato.id_marca} id={dato.id_marca} nombre={dato.nombre} handle={this} />
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
            <IonTitle >Inventario de marcas</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() =>  this.setState({ open: true })}><IonIcon icon={add}></IonIcon></IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <IonRefresher slot="fixed" onIonRefresh={(e: any) => this.refrescar(e, 0)}>
            <IonRefresherContent refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>

          <IonSearchbar placeholder={"Buscar una marca"} onIonBlur={this.buscar_por_marca} onIonChange={(e: any) => this.setState({ marca: e.target.value })}
            cancelButtonIcon="md-search" showCancelButton="always">
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
           <Pop prop={this} editionMode={false} handle={this} ></Pop> 
        </IonContent>
      </IonPage>
    );
  }
}

export default HomeMarcas;