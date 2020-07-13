import React from 'react';
import { IonItem,  IonLabel, IonRippleEffect, IonAvatar, IonContent, IonList, IonIcon, IonButton, IonModal, IonToolbar, IonTitle, IonButtons, IonListHeader, IonNote, IonAlert, IonLoading} from '@ionic/react';
import { trash, create, key, locate, pricetag, medical, business, person, speedometer, informationCircle, barcode, reorder, globe, logIn, card, keypad, calendar } from 'ionicons/icons';
import AxiosRouter from '../../services/AxiosRouter';

class ListRouters extends React.Component<any, any>  {
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
        AxiosRouter.eliminar_router(this.props.id_equipo).then(res => {    
            this.setState({
                showLoading: false,
                mensaje: "Registro eliminado satisfactoriamente",
                alerta: true
            })
           this.props.handle.cargar_routers(true);
        }).catch(error => {
            console.log(error)
            this.setState({ showLoading: false, alerta: true, mensaje: "Ocurrió un error al procesar su solicitud, inténtelo más tarde" });   
        }); 
    } 
      
    render(){
        return (
            <IonList>
                <IonItem className = "ion-activatable" onClick={() => this.setState({ ventanaDetalle: true })}>
                    <IonLabel key={this.props.id_router} >
                        <h2><b> {this.props.id_router}</b></h2>
                        <h3 color="secondary">Estado: 
                            { 
                                this.props.estado === 'D' ? " Disponible" : 
                                this.props.estado === 'B' ? " De baja" : 
                                this.props.estado === 'R' ? " Reparado" : 
                                this.props.estado === 'ER' ? " En revisión" :
                                this.props.estado === 'O' ? " Operativo" : null 
                            }
                        </h3>
                        <p>Marca: {this.props.marca}</p>
                        <IonRippleEffect></IonRippleEffect> 
                    </IonLabel>
                    
                    <IonAvatar slot="start"> 
                        {
                        this.props.estado === 'D'  ? <img src="./assets/img/router/D.png"  alt="D" /> : 
                        this.props.estado === 'R'  ? <img src="./assets/img/router/R.png"  alt="R" /> : 
                        this.props.estado === 'ER' ? <img src="./assets/img/router/ER.png" alt="ER" /> :
                        this.props.estado === 'O'  ? <img src="./assets/img/router/O.png"  alt="O" /> :
                                                     <img src="./assets/img/router/B.png"  alt="B" />
                        }
                    </IonAvatar> 

                    <IonButton size="default"  fill="clear" onClick={() => console.log("Acción editar")} routerLink={"/formulariorouter/edit/"+this.props.id_equipo} color="secondary" >
                        <IonIcon color="medium" icon={create}></IonIcon>
                    </IonButton>

                    {this.props.estado === "B" ? <IonButton disabled size="default" fill="clear" onClick={() => this.setState({ showAlertConfirm: true })} color="primary" >
                        <IonIcon color="medium" icon={trash}></IonIcon>
                    </IonButton> :
                    <IonButton size="default"  fill="clear" onClick={() => this.setState({ showAlertConfirm: true })} color="primary" >
                    <IonIcon color="medium" icon={trash}></IonIcon></IonButton>}
                </IonItem>
        
                <IonContent>      
                    <IonModal
                        isOpen={this.state.ventanaDetalle}
                        onDidDismiss={e => this.setState({ ventanaDetalle: false })}> 
                        <IonToolbar color="primary">
                            <IonTitle>Detalle de router</IonTitle>
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
                                    Código <IonNote color="dark" slot="end">{this.props.id_router}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={locate}> </IonIcon>
                                    Punto <IonNote slot="end">{this.props.punto} </IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={business}> </IonIcon>
                                    Departamento <IonNote  color="dark" slot="end">{this.props.departamento}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={person}> </IonIcon>
                                    Empleado a cargo <IonNote color="dark" slot="end">{this.props.empleado}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={pricetag}> </IonIcon>
                                    Marca <IonNote color="dark" slot="end">{this.props.marca}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={informationCircle} > </IonIcon>
                                    Modelo <IonNote color="dark" slot="end">{this.props.modelo}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={barcode} > </IonIcon>
                                    Número de serie <IonNote color="dark" slot="end">{this.props.numero_serie}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={speedometer}> </IonIcon>
                                    Estado 
                                    <IonNote color="dark" slot="end">
                                        { this.props.estado === 'D' ? "Disponible" : null }
                                        { this.props.estado === 'B' ? "De baja" : null }
                                        { this.props.estado === 'R' ? "Reparado" : null }
                                        { this.props.estado === 'ER' ? "En revisión" : null }
                                        { this.props.estado === 'O' ? "Operativo" : null }
                                    </IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={calendar} > </IonIcon>
                                    Fecha de registro <IonNote color="dark" slot="end">{this.props.fecha_registro}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={reorder}> </IonIcon>
                                    Descripción <IonNote color="dark" slot="end">{this.props.descripcion}</IonNote>
                                </IonItem>                
                                
                                <IonListHeader>Datos de dirección IP</IonListHeader>
                                <IonItem>
                                    <IonIcon slot="start" icon={globe}> </IonIcon>
                                    Direción IP <IonNote slot="end">{this.props.ip}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={logIn}> </IonIcon>
                                    Puerta enlace <IonNote slot="end">{this.props.puerta_enlace}</IonNote>
                                </IonItem>
                            
                                <IonListHeader>Datos de configuración</IonListHeader>
                                <IonItem>
                                    <IonIcon slot="start" icon={card}> </IonIcon>
                                    Nombre <IonNote slot="end">{this.props.nombre}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={medical}> </IonIcon>
                                    Pass <IonNote slot="end">{this.props.pass}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={person}> </IonIcon>
                                    Usuario <IonNote slot="end">{this.props.usuario}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={keypad}> </IonIcon>
                                    Clave <IonNote slot="end"> {this.props.clave}</IonNote>       
                                </IonItem>
                            </IonList> 
                        </IonContent>
                    </IonModal>
                    <IonLoading
                    isOpen={this.state.showLoading}
                    message={'Eliminando router. Espere por favor...'}
                    />
                    <IonAlert
                    isOpen={this.state.showAlertConfirm}
                    header={"Eliminar Router"}
                    message={'¿Esta seguro de eliminar este router?'}
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

export default ListRouters;