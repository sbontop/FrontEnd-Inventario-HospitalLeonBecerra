import React from 'react';
import { IonItem,  IonLabel, IonRippleEffect, IonAvatar, IonContent, IonList, IonIcon, IonButton, IonModal, IonToolbar, IonTitle, IonButtons, IonListHeader, IonNote, IonAlert, IonLoading} from '@ionic/react';
import { trash, create, pricetag, codeDownload, business, key, reorder } from 'ionicons/icons';
import AxiosPrograma from '../../services/AxiosPrograma';

class ListaProgramas extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            ventanaDetalle: false,
            alerta: false,
            mensaje: "",
            showAlertConfirm: false,
            showLoading: false
        }
    }

    handle_eliminar() {
        this.setState({
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosPrograma.eliminar_programa(this.props.id_programa).then(() => {    
            this.setState({
                showLoading: false,
                mensaje: "Registro eliminado satisfactoriamente",
                alerta: true
            })
            this.props.handle.cargar_programas(true);
        }).catch(error => {
            console.log(error)
            this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
        }); 
    } 
      
    render(){
        return (
            <IonList>
                <IonItem className = "ion-activatable">
                    <IonLabel key={this.props.id_programa} onClick={() => this.setState({ ventanaDetalle: true })}>
                        <h2><b>{this.props.codigo}</b></h2>
                        <h3>Nombre: {this.props.nombre}</h3>
                        <p>Editor: {this.props.editor === null ? 'No registrado' : this.props.editor}</p>
                        <IonRippleEffect></IonRippleEffect> 
                    </IonLabel>
                    <IonAvatar slot="start"><img src="./assets/img/programa/command.png" alt="imagen" /></IonAvatar>
                    <IonButton size="default" fill="clear" onClick={() => console.log("Acción editar")} routerLink={"/formularioprograma/edit/"+this.props.id_programa} color="warning" >
                        <IonIcon color="medium" icon={create}></IonIcon>
                    </IonButton>
                    <IonButton size="default" fill="clear" onClick={() => this.setState({ showAlertConfirm: true })} color="primary">
                        <IonIcon color="medium" icon={trash}></IonIcon>
                    </IonButton>
                </IonItem>
        
                <IonContent>      
                    <IonModal
                        isOpen={this.state.ventanaDetalle}
                        onDidDismiss={e => this.setState({ ventanaDetalle: false })}> 
                        <IonToolbar color="primary">
                            <IonTitle>Detalle del programa</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>
                                    <IonIcon name="close" slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                        <IonContent>
                            <IonList>
                                <IonListHeader>Información general</IonListHeader>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}> </IonIcon>
                                    Código <IonNote  color="dark" slot="end">{this.props.codigo}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={codeDownload}> </IonIcon>
                                    Nombre <IonNote  color="dark" slot="end">{this.props.nombre}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={business}> </IonIcon>
                                    Editor <IonNote  color="dark" slot="end">{this.props.editor === null ? 'No registrado' : this.props.editor}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={pricetag}> </IonIcon>
                                    Versión <IonNote color="dark" slot="end">{this.props.version === null ? 'No registrada' : this.props.version}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={reorder}> </IonIcon>
                                    Observación <IonNote color="dark" slot="end">{this.props.observacion === null || this.props.observacion === '' ? 'Ninguna' : this.props.observacion}</IonNote>
                                </IonItem>
                            </IonList> 
                        </IonContent>
                    </IonModal>
                    <IonLoading
                    isOpen={this.state.showLoading}
                    message={'Eliminando programa. Espere por favor...'}
                    />
                    <IonAlert
                    isOpen={this.state.showAlertConfirm}
                    header={"Eliminar Programa"}
                    message={'¿Esta seguro de eliminar este programa?'}
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
                    <IonAlert
                    isOpen={this.state.alerta}
                    onDidDismiss={() => { this.setState({ alerta: false }) }}
                    header={this.state.mensaje}
                    buttons={['Aceptar']}
                    />
                </IonContent>
            </IonList> 
        );
    }
}

export default ListaProgramas;