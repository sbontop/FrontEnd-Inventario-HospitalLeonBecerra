import {
    IonItem, IonLabel, IonIcon, IonText, IonChip
} from '@ionic/react';
import { trendingDown, trendingUp, flash, remove } from 'ionicons/icons';
import React from 'react';
/* import Axios from '../../services/Axios.services'; */

class ListaSolicitudes extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    /**
   * Esta función permite obtener la ruta del icono de acuerdo a la prioridad
   * de la solicitud.
   * @param prioridad  A: Alta, B: Baja, M: Media, C: Crítica. 
   */
    icono_prioridad(prioridad: string) {
        if (prioridad === 'A') {
            return <IonIcon color="alto" slot="start" icon={trendingUp}></IonIcon>;
        }
        if (prioridad === 'B') {
            return <IonIcon color="bajo" slot="start" icon={trendingDown}></IonIcon>;
        }
        if (prioridad === 'M') {
            return <IonIcon color="medio" slot="start" icon={remove}></IonIcon>;
        }
        if (prioridad === 'CT') {
            return <IonIcon color="critico" slot="start" icon={flash}></IonIcon>;
        }
    }

    transformar_prioridad(prioridad: string) {
        if (prioridad === 'A') {
            return "Alta";
        }
        if (prioridad === 'B') {
            return "Baja";
        }
        if (prioridad === 'M') {
            return "Media";
        }
        if (prioridad === 'CT') {
            return "Crítica";
        }
    }


    transformar_estado(estado: string) {
        if (estado === 'EP') {
            return <IonChip color="secondary">En progreso</IonChip>
        }
        if (estado === 'P') {
            return <IonChip color="pendiente">Pendiente</IonChip>
        }
        if (estado === 'C') {
            return <IonChip color="success">Completada</IonChip>
        }
        if (estado === 'R') {
            return <IonChip color="danger">Rechazada</IonChip>
        }
    }


    transformar_tipo(tipo: string) {
        return tipo === "ST" ? "Servicio Técnico" : "Asignación de equipo";
    }


    render() {
        return (
            <IonItem>
                {this.icono_prioridad(this.props.prioridad)}
                <IonLabel>
                    <IonText><h2><b>{this.props.usuario}</b></h2></IonText>
                    <h3>Prioridad: {this.transformar_prioridad(this.props.prioridad)}</h3>
                    <h3>Tipo: {this.transformar_tipo(this.props.tipo)}</h3>
                    <small>{this.props.fecha_realizacion}  {this.props.hora_realizacion}</small>
                </IonLabel>
                {this.transformar_estado(this.props.estado)}

            </IonItem>

        )
    }
}

export default ListaSolicitudes;