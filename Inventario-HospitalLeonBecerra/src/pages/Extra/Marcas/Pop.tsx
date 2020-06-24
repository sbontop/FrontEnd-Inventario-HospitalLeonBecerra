import { IonPopover, IonTitle, IonList, IonItem, IonLabel, IonInput, IonButton, IonAlert, IonText } from '@ionic/react';
import React from 'react';
import Axios from '../../../services/AxiosMarcas';

class Pop extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            marca: "",
            alerta: false,
            mensaje: ""
        }
    }

    componentDidMount = () => {
        if (this.props.id !== undefined) {
            this.setState({ marca: this.props.nombre, id: this.props.id });
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
            if (this.props.editionMode) {
                Axios.editar_marca(registro_marca).then(res => {
                    this.props.handle.actualizar_parametros();
                    this.props.prop.setState({ open: false });
                    this.setState({ mensaje: res.data.log, alerta: true });
                    this.props.handle.cargar_marcas(true);
                }).catch(error => {
                    this.setState({ mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });
                    if (error.response) {
                        this.setState({ mensaje: error.response.data.log });
                    }
                    this.setState({ alerta: true });
                });
            } else {
                Axios.crear_marca(registro_marca).then(res => {
                    this.props.handle.actualizar_parametros();
                    this.props.prop.setState({ open: false })
                    this.setState({ mensaje: res.data.log, alerta: true, marca: "" });
                    this.props.handle.cargar_marcas(true);
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
            <>
                <IonPopover
                    isOpen={this.props.prop.state.open}
                    onDidDismiss={e => this.props.prop.setState({ open: false })}>

                    <IonTitle className="ion-margin-top ion-text-center">{this.props.editionMode ? "Editar Marca" : "Crear Marca"} </IonTitle>
                    <br></br>
                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">Nombre<IonText color="danger">*</IonText></IonLabel>
                            <IonInput value={this.state.marca} required type="text" onIonChange={e => this.setState({ marca: e.detail.value! })}></IonInput>
                        </IonItem>
                        <br></br>
                        <div className="ion-text-center ion-margin">
                            <IonButton expand="block" size="small" type="submit" onClick={() => this.registrar_marca()} color="success">Guardar</IonButton>
                            <IonButton expand="block" size="small" onClick={() => this.props.prop.setState({ open: false })}>Cancelar</IonButton>
                        </div >
                    </IonList>
                </IonPopover>
                <IonAlert
                    isOpen={this.state.alerta}
                    onDidDismiss={() => this.setState({ alerta: false })}
                    header={this.state.mensaje}
                    buttons={['Aceptar']}
                />
            </>
        );
    }
}


export default Pop;
