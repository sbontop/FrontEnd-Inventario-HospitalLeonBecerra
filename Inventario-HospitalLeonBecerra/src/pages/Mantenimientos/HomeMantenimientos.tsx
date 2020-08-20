import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonButtons, IonButton, IonSegment, IonSegmentButton, withIonLifeCycle, IonList, IonItem, IonLabel, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { arrowBack, add } from 'ionicons/icons';
import ListaEquipos from '../../components/mantenimientoComponents/ListaEquipos';
import AxiosMantenimiento from '../../services/AxiosMantenimiento'
import { Redirect } from 'react-router';

class HomeMantenimientos extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tab: "",
            titulo: "Recordatorios",
            mostrar_load: false,
            mostrar_scroll: false,
            parametros: { page_size: 10, page_index: 0 },
            codigo: "",
            equipos: []
        }
    }

    //Estado inicial
    ionViewWillEnter() {

    }

    asignar_parametros = (name: any, value: any) => {
        this.setState({ parametros: { ...this.state.parametros, [name]: value } });
    }


    /**
     * Función auxiliar que permite cargar una lista de equipos
     * cuyo código sea similar al que el usuario está escribiendo 
     * en el componente IonSearchbar.
     * @param newLoad 
     */
    buscar_equipos = (newLoad: boolean) => {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        AxiosMantenimiento.equipos_por_codigo(parametros).then(res => {
            this.setState({ equipos: newLoad ? res.data.resp : [...this.state.equipos, ...res.data.resp] });
            this.setState({ mostrar_load: false, mensaje: "Cargando datos, espere por favor", mostrar_scroll: this.state.equipos.length === res.data.itemSize });
        }).catch(err => {
            this.setState({ mostrar_load: false, mensaje: "Cargando datos, espere por favor" });
            console.log(err);
        });
    }

    /*
    * Función para generar la lista de equipos coincidentes.
    */
    generar_lista_equipos = () => {
        return (this.state.equipos.map((dato: any) => {
            return (
                <ListaEquipos key={dato.codigo} tipo_equipo={dato.tipo_equipo}
                    codigo={dato.codigo} estado_operativo={dato.estado_operativo} />
            )
        }))
    }


    /*
    * Función auxiliar que se ejecuta con el evento onIonChange de IonSearchbar.
    * que utiliza la función auxiliar buscar_equipos para realizar la
    * búsqueda.
    */
    busqueda = (e: any) => {
        let codigo = e.target.value;
        if (codigo) {
            this.asignar_parametros("codigo", e.target.value);
            this.buscar_equipos(true);
        }

    }

    /*
    * Función auxiliar que se ejecuta con el evento onIonClear de IonSearchbar
    * que se ejecuta cuando el usuario elimina el texto de IonSearchbar.
    */
    onClear = (e: any) => {
        this.asignar_parametros("codigo", "");
        this.buscar_equipos(true);
    }

    mantenimientos_pendientes() {

    }

    refrescar = (e: any, newPageIndex: number) => {

    }

    limpiar_filtros = () => {
        this.setState({ parametros: { page_size: 10, page_index: 0 } });
    }

    aplicar_filtros = () => {

    }


    tab_historial = () => {
        this.setState({
            tab: "Historial",
            titulo: "Mantenimientos de equipos"
        })
    }

    tab_recordatorio = () => {
        this.setState({
            tab: "Recordatorio",
            titulo: "Recordatorios"
        })
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
                            <IonButton routerLink="/home"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <h4>{this.state.titulo}</h4>
                        <IonButtons slot="end">
                            <IonButton hidden={!(this.state.tab === "Recordatorio") ? true : false}><IonIcon icon={add}></IonIcon></IonButton>
                            {/*<IonButton onClick={this.accion} ><IonIcon icon={clipboard}></IonIcon></IonButton>*/}
                        </IonButtons>
                    </IonToolbar>
                    <IonToolbar color="dragon ">
                        <IonSegment >
                            <IonSegmentButton onClick={(e: any) => { this.tab_historial() }}>
                                <IonLabel>Mantenimiento</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton onClick={(e: any) => { this.tab_recordatorio() }}>
                                <IonLabel>Recordatorios</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonSearchbar hidden={!(this.state.tab === "Historial") ? true : false} placeholder="Buscar equipo por código"
                        onIonChange={(e: any) => { this.busqueda(e) }}
                        onIonClear={(e: any) => { this.onClear(e) }}>
                    </IonSearchbar>

                    {this.generar_lista_equipos()}

                    <IonList hidden={!(this.state.tab === "Historial") ? true : false}>

                    </IonList>
                    <IonList hidden={!(this.state.tab === "Recordatorio") ? true : false}>
                        <IonItem>
                            Recordatorio 1
                    </IonItem>
                        <IonItem>
                            Recordatorio 2
                    </IonItem>
                        <IonItem>
                            Recordatorio 3
                    </IonItem>
                        <IonItem>
                            Recordatorio 4
                    </IonItem>
                        <IonItem>
                            Recordatorio 5
                    </IonItem>
                        <IonItem>
                            Recordatorio 6
                    </IonItem>
                    </IonList>
                    <IonInfiniteScroll disabled={this.state.mostrar_scroll} threshold="100px"
                        onIonInfinite={(e: any) => this.refrescar(e, this.state.parametros.page_index + 1)}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Cargando más registros">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent>
            </IonPage >
        )
    }
}
export default withIonLifeCycle(HomeMantenimientos);






