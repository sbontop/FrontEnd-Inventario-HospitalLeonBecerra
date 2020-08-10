import React from 'react';
import { IonItem, IonLabel, IonRippleEffect, IonAvatar, IonList, IonIcon, IonButton } from '@ionic/react';
import Auxiliar from './Auxilar'
import { eye } from 'ionicons/icons';

class ListaEquipos extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            ventanaDetalle: false
        }
    }

    render() {
        return (
            <IonList>
                <IonItem className="ion-activatable" >
                    <IonLabel key={this.props.codigo}>
                        <h2><b>{this.props.codigo}</b></h2>
                        <h3 color="secondary">Tipo de equipo: {this.props.tipo_equipo}</h3>
                        <IonRippleEffect></IonRippleEffect>
                    </IonLabel>

                    <IonAvatar slot="start">
                        {
                            <img src={Auxiliar.avatar(this.props.tipo_equipo, this.props.estado_operativo)} alt="Avatar" />
                        }
                    </IonAvatar>

                    <>
                        <IonButton size="default" fill="clear"
                            routerLink={"/homehistorial/" + this.props.codigo + "/" + this.props.tipo_equipo + "/" + this.props.estado_operativo}
                            color="secondary" >
                            <IonIcon color="medium" icon={eye}></IonIcon>
                        </IonButton>
                    </>

                </IonItem>
            </IonList>
        );
    }
}

export default ListaEquipos;