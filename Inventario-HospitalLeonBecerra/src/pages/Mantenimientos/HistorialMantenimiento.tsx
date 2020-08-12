import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
    IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, withIonLifeCycle, IonItemDivider, IonLabel
} from '@ionic/react';
import React from 'react';
import { add, arrowBack } from 'ionicons/icons';
import Respuesta from '../../components/Respuesta';
import AxiosMantenimiento from '../../services/AxiosMantenimiento'
import ListaMantenimiento from '../../components/mantenimientoComponents/ListaMantenimientos';
import Auxiliar from '../../components/mantenimientoComponents/Auxilar';

class HistorialMantenimiento extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            historial: [],
            mostrar_load: false,
            mostrar_scroll: false,
            parametros: { page_size: 10, page_index: 0, codigo_equipo: "" },
            tipo_equipo: "",
            estado_operativo: "",
            mensaje: "",
            id_mantenimiento: ""
        }
    }


    ionViewWillEnter() {
        this.setState({ mostrar_load: true });
        const { codigo_equipo, tipo_equipo, estado_operativo } = this.props.match.params;
        this.setState({ tipo_equipo: tipo_equipo, estado_operativo: estado_operativo })
        this.asignar_parametros("codigo_equipo", codigo_equipo);
        this.cargar_mantenimientos(true);
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
     * Función utilizada para cargar datos al momento de realizar la acción "arrastrar y soltar" y
     * al activarse la opción Infinitive Scroll.
     * @param e 
     * @param newPageIndex número referente al paginado
     */
    refrescar = (e: any, newPageIndex: number) => {
        this.asignar_parametros("page_index", newPageIndex);
        setTimeout(() => {
            this.cargar_mantenimientos(newPageIndex === 0);
            if (newPageIndex === 0) {
                e.detail.complete();
            } else {
                e.target.complete();
            }
        }, 1000);
    }


    cargar_mantenimientos(newLoad: boolean) {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        AxiosMantenimiento.mostrar_mantenimientos(parametros).then(res => {
            this.setState({ historial: newLoad ? res.data.resp : [...this.state.historial, ...res.data.resp] });
            this.setState({ mostrar_load: false, mostrar_scroll: this.state.historial.length === res.data.itemSize });
        }).catch(err => {
            this.setState({ mostrar_load: false });
            console.log(err);
        });
    }

    /**
   * Función para generar la lista de los usurios con sus respectivos datos.
   */
    generar_lista_mantenimientos = () => {
        return (this.state.historial.map((dato: any) => {
            return (
                <ListaMantenimiento key={dato.id_mantenimiento} id_mantenimiento={dato.id_mantenimiento} titulo={dato.titulo} tipo={dato.tipo} fecha_inicio={dato.fecha_inicio}
                    realizado_por={dato.realizado_por} codigo_equipo={dato.codigo} estado_operativo={dato.estado_operativo} tipo_equipo={dato.tipo_equipo}
                    handle={this}/>
            )
        }))
    }


    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/homemantenimientos" ><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle >Mantenimiento de equipos</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink={"/formulariomantenimiento/" +
                                this.state.parametros.codigo_equipo + "/" +
                                this.state.tipo_equipo + "/" + this.state.estado_operativo}
                            ><IonIcon icon={add}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(e: any) => this.refrescar(e, 0)}>
                        <IonRefresherContent refreshingSpinner="circles">
                        </IonRefresherContent>
                    </IonRefresher>

                    <IonLoading
                        isOpen={this.state.mostrar_load}
                        message={'Cargando datos. Espere por favor...'} />


                    <div className="ion-margin-top ion-text-center">
                        <img src={Auxiliar.avatar(this.state.tipo_equipo, this.state.estado_operativo)} alt="Equipo"
                            width="64" height="64" />
                    </div>
                    <p className="ion-text-center"><b>{this.state.parametros.codigo_equipo}</b></p>
                    <IonItemDivider color="light">
                        <IonLabel>
                            Historial de Mantenimientos realizados
                     </IonLabel>
                    </IonItemDivider>
                    <Respuesta informacion={this.state.historial.length}></Respuesta>
                    {this.generar_lista_mantenimientos()}

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

export default withIonLifeCycle(HistorialMantenimiento);