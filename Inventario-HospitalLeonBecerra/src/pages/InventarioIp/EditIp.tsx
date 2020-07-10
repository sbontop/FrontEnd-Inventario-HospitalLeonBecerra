import {
    IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert,
    IonItem, IonLabel, IonInput, IonText, IonButtons, IonBackButton, IonList, IonButton, IonRow, IonCol,

    useIonViewDidEnter,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonViewWillLeave,

} from '@ionic/react';
import React, { useState } from 'react';
import AxiosIp from '../../services/AxiosIp';
import { useParams, Redirect } from 'react-router';

// IMPORTANTE: La IP no se debe guardar en equipo, 
// lo que se debe guardar es la relacion de ip con routers
const EditIp: React.FC = () => {
    const [estado, setEstado] = useState();
    const [direccion_ip, setDireccion_ip] = useState();
    const [hostname, setHostname] = useState();
    const [subred, setSubred] = useState();
    const [fortigate, setFortigate] = useState();
    const [observacion, setObservacion] = useState();
    const [maquinas_adicionales, setMaquinas_adicionales] = useState();
    const [guardar, setGuardar] = useState(false);
    const [error, setError] = useState(false);
    const [redireccionar, setRedireccionar] = useState(false);
    const { id_ip } = useParams();

    const buscar_ip_por_codigo = () => {
        AxiosIp.buscar_ip_por_codigo(id_ip).then(res => {
            if (res.status === 200) {
                console.log(res);
                let ip_obj = res.data[0];
                setEstado(ip_obj.estado);
                setDireccion_ip(ip_obj.direccion_ip);
                setHostname(ip_obj.hostname);
                setSubred(ip_obj.subred);
                setFortigate(ip_obj.fortigate);
                setObservacion(ip_obj.observacion);
                setMaquinas_adicionales(ip_obj.maquinas_adicionales);
            }
        }).catch(err => {
            console.log(err);
            setError(true);
        });
    }

    useIonViewWillEnter(async () => {
        console.log('ionViewWillEnter event fired');
        console.log(id_ip);
        buscar_ip_por_codigo();
    });


    const editar = () => {
        let registro_ip_obj = {
            // campos de la tabla ip
            key: id_ip,
            estado: estado,
            fecha_asignacion: new Date().toISOString().substr(0, 10),
            direccion_ip: direccion_ip,
            hostname: hostname,
            subred: subred,
            fortigate: fortigate,
            observacion: observacion,
            maquinas_adicionales: maquinas_adicionales,
            /**Estos campos se manejan desde el backend */
            nombre_usuario: 'Samuel Braganza',
            encargado_registro: 'samuel'
        }

        AxiosIp.editar_ip(registro_ip_obj).then(res => {
            console.log(res);
            setGuardar(true);
        }).catch(err => {
            console.log(err);
            setError(true);
        });
    }

    const volver_principal = () => {
        setGuardar(false);
        setRedireccionar(true);
    }

    if (redireccionar) {
        return (<Redirect to="/homeip" />);
    }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/homeip"></IonBackButton>
                </IonButtons>
                <IonTitle>Editar IP</IonTitle>
                <IonButtons slot="end">
                </IonButtons>
            </IonToolbar>
            <IonContent className="ion-padding">
                <form onSubmit={(e) => { e.preventDefault(); editar(); }} action="post">
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Estado<IonText color="danger">*</IonText></IonLabel>
                            <IonSelect value={estado} onIonChange={(e) => setEstado(e.detail.value)}>
                                <IonSelectOption value="EU" key="EU">EU</IonSelectOption>
                                <IonSelectOption value="L" key="L">L</IonSelectOption>
                            </IonSelect>
                        </IonItem>
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
                            <IonLabel position="floating">Observacion<IonText color="danger">*</IonText></IonLabel>
                            <IonInput type="text" name="observacion" value={observacion} onIonChange={(e) => setObservacion((e.target as HTMLInputElement).value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Maquinas Adicionales<IonText color="danger">*</IonText></IonLabel>
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
                    header={'Se ha producido un error al realizar su solicitud'}
                    message={'Asegurese de agregar un un registro que no exista'}
                    buttons={['Aceptar']}
                />
            </IonContent>
        </IonPage>
    );
};

export default EditIp;
