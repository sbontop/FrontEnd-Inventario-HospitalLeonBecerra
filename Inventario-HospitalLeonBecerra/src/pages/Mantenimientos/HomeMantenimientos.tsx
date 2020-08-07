import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonButtons, IonButton, IonSegment, IonSegmentButton, withIonLifeCycle, IonList, IonItem, IonLabel, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonFab, IonFabButton } from '@ionic/react';
import { arrowBack, add } from 'ionicons/icons';
import ListaMantenimiento from '../../components/mantenimientoComponents/ListaMantenimientos'
import AxiosMantenimiento from '../../services/AxiosMantenimiento'

class HomeMantenimientos extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tab: "",
            titulo: "Recordatorios",
            historial: [],
            mostrar_load: false,
            mostrar_scroll: false,
            mensaje: "",
            parametros: { page_size: 10, page_index: 0 },
            codigo: ""
        }
    }

    //Estado inicial
    ionViewWillEnter() {
        this.setState({ historial: [] });
    }

    asignar_parametros = (name: any, value: any) => {
        this.setState({ parametros: { ...this.state.parametros, [name]: value } });
    }

    cargar_mantenimientos(newLoad: boolean) {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        AxiosMantenimiento.mostrar_mantenimientos(parametros).then(res => {
            this.setState({ historial: newLoad ? res.data.resp : [...this.state.historial, ...res.data.resp] });
            this.setState({ mostrar_load: false, mensaje: "Cargando datos, espere por favor", mostrar_scroll: this.state.mantenimientos.length === res.data.itemSize });
        }).catch(err => {
            this.setState({ mostrar_load: false, mensaje: "Cargando datos, espere por favor" });
            console.log(err);
        });
    }

    busqueda = (e: any) => {
        this.asignar_parametros("codigo_equipo", e.target.value)
        this.cargar_mantenimientos(true)
    }

    onClear = (e: any) => {
        this.setState({ historial: [] });
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

    generar_lista_mantenimientos = () => {
        return (this.state.historial.map((dato: any) => {
            return (
                <ListaMantenimiento key={dato.id_mantenimiento} id_mantenimiento={dato.id_mantenimiento} titulo={dato.titulo} tipo={dato.tipo} fecha_inicio={dato.fecha_inicio}
                    realizado_por={dato.realizado_por} codigo={dato.codigo} estado_equipo={dato.estado_operativo} tipo_equipo={dato.tipo_equipo} />

            )
        }))
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
                                <IonLabel>Historial</IonLabel>
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
                        onIonClear={(e: any) => { this.onClear(e) }} >
                    </IonSearchbar>
                    {/*-- fab placed to the bottom end --*/}
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton color="dragon" routerLink={"/formulariomantenimiento/" + this.state.parametros.codigo_equipo}>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>


                    <IonList hidden={!(this.state.tab === "Historial") ? true : false}>
                        {this.generar_lista_mantenimientos()}
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






