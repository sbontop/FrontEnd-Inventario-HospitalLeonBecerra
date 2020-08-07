import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonButtons, IonButton, IonSegment, IonSegmentButton,withIonLifeCycle, IonList, IonItem, IonLabel} from '@ionic/react';
import { arrowBack, add} from 'ionicons/icons';

class HomeMantenimientos extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tab : "",
            titulo: "Recordatorios"
        }
    }

    //Estado inicial
    ionViewWillEnter() {
        
    }

    cargar_mantenimientos(newLoad: boolean) {
        
    }

    mantenimientos_pendientes() {
        
    }

    refrescar = (e: any, newPageIndex: number) => {
        
    }

    limpiar_filtros = () => {
        
    }

    aplicar_filtros = () => {
        
    }

    generar_lista_mantenimientos = () => {
        
    }

    tab_historial = () =>{
        this.setState({
            tab: "Historial",
            titulo: "Mantenimientos de equipos"
        })
    }

    tab_recordatorio = () =>{
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
                            <IonButton hidden={!(this.state.tab==="Recordatorio")?true:false}><IonIcon icon={add}></IonIcon></IonButton>
                            {/*<IonButton onClick={this.accion} ><IonIcon icon={clipboard}></IonIcon></IonButton>*/}
                        </IonButtons>
                    </IonToolbar>
                    <IonToolbar color="dragon ">
                        <IonSegment >
                            <IonSegmentButton onClick = {(e:any)=>{this.tab_historial()}}>
                                <IonLabel>Historial</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton onClick = {(e:any)=>{this.tab_recordatorio()}}>
                                <IonLabel>Recordatorios</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    
                <IonList hidden={!(this.state.tab === "Historial")?true:false}>
                    <IonItem>
                        Historial 1
                    </IonItem>
                    <IonItem>
                        Historial 2
                    </IonItem>
                    <IonItem>
                        Historial 3
                    </IonItem>
                    <IonItem>
                        Historial 4
                    </IonItem>
                    <IonItem>
                        Historial 5
                    </IonItem>
                    <IonItem>
                        Historial 6
                    </IonItem>
                </IonList>
                <IonList hidden={!(this.state.tab === "Recordatorio")?true:false}>
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
                </IonContent>
            </IonPage>
        )
    }
}
export default withIonLifeCycle(HomeMantenimientos);






