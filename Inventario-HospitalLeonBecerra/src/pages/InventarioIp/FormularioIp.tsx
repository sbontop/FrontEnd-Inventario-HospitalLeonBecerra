import {
    IonContent, IonToolbar, IonTitle, IonPage, IonAlert,
    IonItem, IonLabel, IonInput, IonText, IonButtons, IonBackButton, IonList, IonButton, IonRow, IonCol
} from '@ionic/react';
import React, { useState } from 'react';
import AxiosIp from '../../services/AxiosIp';
import { Redirect } from 'react-router';
import Autenticacion from '../InicioSesion/Autenticacion';
// IMPORTANTE: La IP no se debe guardar en equipo, 
// lo que se debe guardar es la relacion de ip con routers
const FormularioIp: React.FC = () => {
    const [direccion_ip, setDireccion_ip] = useState("");
    const [hostname, setHostname] = useState("");
    const [subred, setSubred] = useState("");
    const [fortigate, setFortigate] = useState("");
    const [observacion, setObservacion] = useState("");
    const [maquinas_adicionales, setMaquinas_adicionales] = useState("");
    const [guardar, setGuardar] = useState(false);
    const [error, setError] = useState(false);
    const [redireccionar, setRedireccionar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const registrar = () => {
        let registro_ip_obj = {
            // campos de la tabla ip
            fecha_asignacion: new Date().toISOString().substr(0, 10),
            direccion_ip: direccion_ip,
            hostname: hostname,
            subred: subred,
            fortigate: fortigate,
            observacion: observacion,
            maquinas_adicionales: maquinas_adicionales,
            encargado_registro: Autenticacion.getEncargadoRegistro()
        }

        AxiosIp.crear_ip(registro_ip_obj).then(res => {
            setGuardar(true);
        }).catch(err => {
            console.log(err.response);
            setErrorMessage(err.response.data.log);
            setError(true);
        });
    }

    const volver_principal = () => {
        setGuardar(false);
        setRedireccionar(true);
    }

    if (localStorage.userdata === undefined){
        return (<Redirect to="/iniciarsesion" />)
      }

    if (redireccionar) {
        return (<Redirect  to="/homeip" />);
    }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/homeip"></IonBackButton>
                </IonButtons>
                <IonTitle>Agregar IP</IonTitle>
                <IonButtons slot="end">
                </IonButtons>
            </IonToolbar>
            <IonContent className="ion-padding">
                <form onSubmit={(e) => { e.preventDefault(); registrar(); }} action="post">
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Dirección IP<IonText color="danger">*</IonText></IonLabel>
                            <IonInput required type="text" name="direccion_ip" value={direccion_ip} onIonChange={(e) => setDireccion_ip((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Hostname<IonText color="danger">*</IonText></IonLabel>
                            <IonInput required type="text" name="hostname" value={hostname} onIonChange={(e) => setHostname((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Subred<IonText color="danger">*</IonText></IonLabel>
                            <IonInput required type="text" name="subred" value={subred} onIonChange={(e) => setSubred((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Fortigate<IonText color="danger">*</IonText></IonLabel>
                            <IonInput required type="text" name="fortigate" value={fortigate} onIonChange={(e) => setFortigate((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Observación<IonText color="danger">*</IonText></IonLabel>
                            <IonInput type="text" name="observacion" value={observacion} onIonChange={(e) => setObservacion((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Máquinas Adicionales<IonText color="danger">*</IonText></IonLabel>
                            <IonInput required type="number" name="maquinas_adicionales" value={maquinas_adicionales} onIonChange={(e) => setMaquinas_adicionales((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonRow class="ion-text-center">
                            <IonCol>
                                <IonButton type="submit" color="success" class="ion-no-margin">Guardar</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color="danger" routerLink="/homeip" class="ion-no-margin">Cancelar</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonList>
                </form>
                <IonAlert
                    isOpen={guardar}
                    onDidDismiss={() => volver_principal()}
                    header={'Guardado con éxito'}
                    message={'Se ha guardado exitosamente la IP'}
                    buttons={['Aceptar']}
                />
                <IonAlert
                    isOpen={error}
                    header={'Error al guardar la IP'}
                    message={errorMessage}
                    buttons={['Aceptar']}
                />
            </IonContent>
        </IonPage>
    );
};

export default FormularioIp;
