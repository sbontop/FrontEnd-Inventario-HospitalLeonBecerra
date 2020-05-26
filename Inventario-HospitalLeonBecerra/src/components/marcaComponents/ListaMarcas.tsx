import {
    IonItem, IonLabel, IonButton, IonIcon, IonAlert, IonLoading
} from '@ionic/react';
import { create, pricetag, trash } from 'ionicons/icons';
import React from 'react';
import Axios from '../../services/AxiosMarcas';
import Pop from '../../pages/Extra/Marcas/Pop'

class ListaMarcas extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
            showAlertConfirm: false,
            showLoading: false
        }
    }

    handle_eliminar() {
        this.setState({
            showLoading: true,
            showAlertConfirm: false
        })
        Axios.eliminar_marca(this.props.id).then(res => {
            this.props.handle.actualizar_parametros();
            this.setState({showLoading: false})
            this.props.handle.cargar_marcas(true);
        }).catch(error => {
            console.log(error)
            this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });
        });
    }


    render() {
        return (
            <>
                <IonItem>
                    <IonIcon slot="start" icon={pricetag}></IonIcon>
                    <IonLabel>MARCA: {this.props.nombre}</IonLabel>
                    <IonButton size="default" fill="clear" onClick={() => this.setState({ open: true })}  ><IonIcon slot="end" color="warning" icon={create} ></IonIcon> </IonButton>
                    <IonButton size="default" fill="clear" onClick={() => this.setState({ showAlertConfirm: true })}><IonIcon slot="end" color="danger" icon={trash} ></IonIcon> </IonButton>
                </IonItem>
                <Pop prop={this} handle={this.props.handle} editionMode={true} id={this.props.id} nombre={this.props.nombre}></Pop>
                <IonAlert
                    isOpen={this.state.showAlertConfirm}
                    onDidDismiss={() => this.setState({ showAlertConfirm: false })}
                    header={"Eliminar Marca"}
                    message={'Tenga en cuenta que varios equipos pueden estar asociados a esta Marca. </br> ¿Está seguro de eliminar este registro? '}
                    buttons={[
                        {
                            text: 'No',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                this.setState({ showAlertConfirm: false });
                            }
                        },
                        {
                            text: 'Si',
                            handler: () => {
                                this.handle_eliminar()
                            }
                        }
                    ]}
                />
                <IonLoading
                    isOpen={this.state.showLoading}
                    message={'Eliminando Marca. Espere por favor...'}
                />
            </>
        );
    }
}


export default ListaMarcas;