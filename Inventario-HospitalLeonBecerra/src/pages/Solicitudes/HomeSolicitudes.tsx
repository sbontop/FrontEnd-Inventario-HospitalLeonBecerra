import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonSegment, IonSegmentButton, IonBadge, IonList, IonPopover, IonItem, IonLabel, IonSelectOption, IonSelect, IonDatetime, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { time, globe, arrowBack, stats, options } from 'ionicons/icons';
import ListaSolicitudes from '../../components/solicitudesComponents/ListaSolicitudes';
import AxiosSolicitudes from '../../services/AxiosSolicitudes'
import Respuesta from '../../components/Respuesta';

class HomeSolicitudes extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            segmento: "",
            pendientes: 0,
            mostrar_pop: false,
            mostrar_load: false,
            mostrar_scroll: false,
            datos: [] as any,
            parametros: { page_size: 10, page_index: 0, estado: "P" }
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

    cambiar_estado(valor: any) {
        this.setState({ parametros: { page_size: 10, page_index: 0, estado: valor, filtro_estado: "C" } });
        console.log(this.state.parametros);
        this.cargar_solicitudes(true);
    }

    componentDidMount = () => {
        this.setState({ mostrar_load: true })
        this.cargar_solicitudes(true);
        this.solicitudes_pendientes();
    }

    cargar_solicitudes(newLoad: boolean) {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        AxiosSolicitudes.filtrar_solicitudes(parametros).then(res => {
            this.setState({ datos: newLoad ? res.data.resp : [...this.state.datos, ...res.data.resp] });
            this.setState({ mostrar_load: false, mostrar_scroll: this.state.datos.length === res.data.itemSize });
        }).catch(err => {
            this.setState({ mostrar_load: false });
        });
    }

    solicitudes_pendientes() {
        AxiosSolicitudes.contar_solicitudes().then(res => {
            this.setState({ pendientes: res.data });
        })
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
            this.cargar_solicitudes(newPageIndex === 0);
            if (newPageIndex === 0) {
                e.detail.complete();
            } else {
                e.target.complete();
            }
        }, 1000);
    }

    /**
    * Función auxiliar para asignar los valores de filtrado por defecto en el objeto parametros. 
    */
    limpiar_filtros() {
        this.setState({ parametros: { page_size: 10, page_index: 0, estado: "O", filtro_estado: "C" } });
    }

    cambiar_titulo() {
        let titulo = "Pendientes";
        if (this.state.parametros.estado === "EP")
            titulo = "En progreso";
        if (this.state.parametros.estado === "O")
            titulo = "Otras Solicitudes";
        return (
            <IonLabel color="medium" className="ion-margin-top">{titulo}</IonLabel>
        )
    }

    /**
    * Función para cargar los datos según los filtros seleccionados.
    */
    aplicar_filtros = () => {
        console.log("filtros");
        console.log(this.state.parametros)
        this.asignar_parametros("page_index", 0);
        this.setState({ mostrar_pop: false, mostrar_load: true })
        this.cargar_solicitudes(true);
    }


    generar_lista = () => {
        return (this.state.datos.map((dato: any) => {
            return (
                <ListaSolicitudes key={dato.id_solicitud} usuario={dato.id_usuario} prioridad={dato.prioridad}
                    estado={dato.estado} fecha_realizacion={dato.fecha_realizacion} hora_realizacion={dato.hora_realizacion}
                    tipo={dato.tipo} />
            )
        }))
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/home"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Solicitudes</IonTitle>
                    </IonToolbar>
                    <IonToolbar color="dragon ">
                        <IonSegment value={this.state.parametros.estado} onIonChange={(e: any) => this.cambiar_estado(e.detail.value)}>
                            <IonSegmentButton value="P" layout="icon-start"> {/*Pendientes */}
                                <IonIcon icon={time} />
                                <IonBadge color="light">{this.state.pendientes === 0 ? "" : this.state.pendientes}</IonBadge>
                            </IonSegmentButton>
                            <IonSegmentButton value="EP">  {/*En progreso */}
                                <IonIcon icon={stats} />
                            </IonSegmentButton>
                            <IonSegmentButton value="O">  {/*Otras solicitudes: Completadas y rechazadas */}
                                <IonIcon icon={globe} />
                            </IonSegmentButton>
                        </IonSegment>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem lines="none">
                        {this.cambiar_titulo()}
                        {this.state.parametros.estado === "O" ? <IonIcon slot="end" color="medium"
                            onClick={() => this.setState({ mostrar_pop: true })} icon={options}></IonIcon> : null}
                    </IonItem>

                    <Respuesta informacion={this.state.datos.length}></Respuesta>

                    <IonPopover
                        isOpen={this.state.mostrar_pop}
                        onDidDismiss={e => this.setState({ mostrar_pop: false })}>
                        <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                        <IonList>
                            <IonItem>
                                <IonLabel>Estado</IonLabel>
                                <IonSelect placeholder="Estado" value={this.state.parametros.filtro_estado} okText="Ok" cancelText="Cancelar"
                                    name="filtro_estado" onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)}>
                                    <IonSelectOption value="C">Completadas</IonSelectOption>
                                    <IonSelectOption value="R">Rechazadas</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Prioridad</IonLabel>
                                <IonSelect placeholder="Prioridad" value={this.state.parametros.prioridad} okText="Ok" cancelText="Cancelar" name="prioridad"
                                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)}>
                                    <IonSelectOption value="A">Alta</IonSelectOption>
                                    <IonSelectOption value="B">Baja</IonSelectOption>
                                    <IonSelectOption value="C">Crítica</IonSelectOption>
                                    <IonSelectOption value="M">Media</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Fecha de <br /> realización</IonLabel>
                                <IonDatetime value={this.state.parametros.fecha_realizacion} doneText="Ok" cancelText="Cancelar" name="fecha_realizacion"
                                    onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.detail.value! ? e.detail.value.substring(0, 10) : "")}
                                    placeholder="Fecha" displayFormat="DD/MM/YYYY"></IonDatetime>
                            </IonItem>
                        </IonList>
                        <div className="ion-text-center ion-margin">
                            <IonButton expand="block" onClick={() => this.aplicar_filtros()}>Aplicar</IonButton>
                            <IonButton expand="block" onClick={() => this.limpiar_filtros()} >Limpiar</IonButton>
                            <IonButton expand="block" onClick={() => this.setState({ mostrar_pop: false })}>Cancelar</IonButton>
                        </div >
                    </IonPopover>

                    <IonList>
                        {this.generar_lista()}
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
            </IonPage>
        )
    }
}
export default HomeSolicitudes;






