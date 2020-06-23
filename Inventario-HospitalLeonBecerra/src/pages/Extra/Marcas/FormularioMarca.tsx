import { IonItem, IonLabel, IonButton, IonTitle, IonList, IonInput, IonAlert, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon } from '@ionic/react';
import Axios from '../../../services/AxiosMarcas';
import React from 'react';
import { arrowBack } from 'ionicons/icons';


class FormularioMarca extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            marca: "",
            alerta: false,
            mensaje: "",
            editionMode: false,
            id: ""
        }
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        if (id !== undefined) {
            Axios.marca_id(id).then(res => {
                this.setState({ id: id, editionMode: true })
                this.setState({ marca: res.data })
            }).catch(err => {
                this.setState({ mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde", alerta: true });
            });
        }
    }

    registrar_marca() {
        if (this.state.marca === "") {
            this.setState({ mensaje: "Debe completar todos los campos", alerta: true });
        } else {
            let registro_marca = {
                nombre: this.state.marca,
                key: this.state.id
            }
            if (this.state.editionMode) {
                Axios.editar_marca(registro_marca).then(res => {
                    this.setState({ mensaje: res.data.log, alerta: true });
                }).catch(error => {
                    this.setState({ mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });
                    if (error.response) {
                        this.setState({ mensaje: error.response.data.log });
                    }
                    this.setState({ alerta: true });
                });
            } else {
                Axios.crear_marca(registro_marca).then(res => {
                    this.setState({ mensaje: res.data.log, alerta: true });
                }).catch(error => {
                    this.setState({ mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });
                    if (error.response) {
                        this.setState({ mensaje: error.response.data.log });
                    }
                    this.setState({ alerta: true });
                });
            }
        }
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/homeMarcas"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Inventario de Marcas</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonTitle className="ion-text-center">{this.state.editionMode ? "Editar marca" : "Nueva marca"}</IonTitle>
                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">Nombre</IonLabel>
                            <IonInput value={this.state.marca} required type="text" onIonChange={e => this.setState({ marca: e.detail.value! })}></IonInput>
                        </IonItem>
                        <div className="ion-text-center ion-margin">
                            <IonButton color="success" onClick={() => this.registrar_marca()}>Guardar</IonButton>
                        </div >
                    </IonList>

                    <IonAlert
                        isOpen={this.state.alerta}
                        onDidDismiss={() => this.setState({ alerta: false })}
                        header={this.state.mensaje}
                        buttons={['Aceptar']}
                    />
                </IonContent>
            </IonPage>
        );
    }
}


export default FormularioMarca;