import { IonContent, IonToolbar, IonTitle, IonPage, IonAlert, IonGrid, IonItem, IonLabel, IonInput, IonText, 
         IonButtons, IonHeader, IonList, IonButton, IonRow, IonCol, IonTextarea, IonIcon} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import AxiosPrograma from '../../../services/AxiosPrograma';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';

const FormularioPrograma: React.FC = () => {
    let { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [version, setVersion] = useState("");
    const [codigo, setCodigo] = useState("");
    const [editor, setEditor] = useState("");
    const [observacion, setObservacion] = useState("");
    const [guardar, setGuardar] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [confirmarRegistro, setConfirmarRegistro] = useState(false);
    const [confirmarEdicion, setConfirmarEdicion] = useState(false);
    const [incompleto, setIncompleto] = useState(false);
    const [editionMode, setEditionMode] = useState(false);
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [redireccionar, setRedireccionar] = useState(false);

    useEffect(() => {
        if (id !== undefined){
            setEditionMode(true);
            AxiosPrograma.datos_programa(id).then(res => {
                console.log("edición:", id, res.data)
                setCodigo(res.data.codigo);
                setEditor(res.data.editor);
                setNombre(res.data.nombre);
                setVersion(res.data.version);
                setObservacion(res.data.observacion);
            }).catch(err => {
                setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                setError(true);
            });
        }
    }, [id]);

    const registrar = () => { 
        if (codigo === undefined || nombre === undefined) {
            setMensaje("Debe completar todos los campos");
            setIncompleto(true);
        } else {     
            let registro_programa = {
                id_programa: id,
                codigo: codigo,
                nombre: nombre,
                editor: editor,
                version: version,
                observacion: observacion,
                encargado_registro: "admin"
            }
            if (!editionMode) {
                // console.log("3",registro_programa)
                AxiosPrograma.crear_programa(registro_programa).then(res => {
                    setConfirmarRegistro(true);
                    setMensaje("Registro guardado satisfactoriamente");
                    console.log(guardar);
                    // volver_principal();
                }).catch(err => {
                    //setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                    if (err.response) {
                       setMensaje(err.response.data.log)
                    }
                    setError(true);
                });
            } else {
                // console.log(registro_programa)
                AxiosPrograma.editar_programa(registro_programa).then(res => {
                    // console.log("act",res)
                    setConfirmarEdicion(true);
                    setMensaje("Registro actualizado satisfactoriamente")                   
                    // volver_principal();
                }).catch(_error => {
                    setError(true);
                });
            }
        }   
    } 
  
    const volver_principal = () => {
        setGuardar(false);
        setRedireccionar(true);
    }
  
    if (redireccionar) {
        return (<Redirect to="/homeprograma" />);
    }
  
    return (
        <IonPage>  
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonButton routerLink="/homeprograma"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Inventario de programas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonTitle className="ion-text-center">{!editionMode ? "Nuevo programa" : "Editar programa"}</IonTitle>
                <p className="ion-text-center">
                    <img src="./assets/img/programa/command.png" alt="Usuario" />
                </p>
                <form onSubmit={(e) => { e.preventDefault(); registrar(); }} action="post">   
                    <IonList> 
                        <IonItem>
                            <IonLabel position="floating">Código<IonText color="primary">*</IonText></IonLabel>
                            <IonInput disabled = {editionMode} required type="text" name="codigo" value={codigo} onIonChange={(e) => setCodigo((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem> 
                        <IonItem>
                            <IonLabel position="floating">Nombre<IonText color="primary">*</IonText></IonLabel>
                            <IonInput required type="text" name="nombre" value={nombre} onIonChange={(e) => setNombre((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Versión<IonText color="primary"></IonText></IonLabel>
                            <IonInput type="text" name="version" value={version} onIonChange={(e) => setVersion((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Editor<IonText color="primary"></IonText></IonLabel>
                            <IonInput type="text" name="editor" value={editor} onIonChange={(e) => setEditor((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Observación</IonLabel>
                            <IonTextarea name="observacion" value={observacion} onIonChange={(e) => setObservacion((e.target as HTMLInputElement).value)}></IonTextarea>
                        </IonItem>             
                        <p className="ion-text-center">
                            <IonGrid>
                                <IonRow class="ion-text-center">
                                    <IonCol>
                                        <IonButton type="submit" color="secondary" class="ion-no-margin">{!editionMode ? "Guardar" : "Guardar cambios"} </IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton color="primary" routerLink="/homeprograma" class="ion-no-margin">Cancelar</IonButton>          
                                    </IonCol>
                                </IonRow> 
                            </IonGrid>
                        </p>
                    </IonList>
                </form>
                <IonAlert
                    isOpen={alerta}
                    onDidDismiss={() => volver_principal()}
                    message={mensaje}
                    buttons={['Aceptar']}
                />
                <IonAlert
                    isOpen={incompleto}
                    onDidDismiss={() => setIncompleto(false)}
                    header={mensaje}
                    buttons={['Aceptar']}
                />
                <IonAlert
                    isOpen={error}
                    header={'Se ha producido un error al realizar su solicitud'}
                    message={'Asegurese de agregar un un registro que no exista'}
                    buttons={['Aceptar']}
                />
                <IonAlert
                isOpen={confirmarRegistro}
                header={'Confirmación'}
                message={'¿Está seguro de agregar este nuevo registro?'}
                buttons=
                    {[         
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'primary',
                            handler: () => {
                                setConfirmarRegistro(false)
                            }
                        },
                        {
                            cssClass: 'success',
                            text: 'Aceptar',
                            handler: () => {
                                setAlerta(true)
                                setGuardar(true)              
                            }
                        }        
                    ]}
                />
                <IonAlert
                isOpen={confirmarEdicion}
                header={'Confirmación'}
                message={'¿Está seguro de modificar este registro?'}
                buttons=
                    {[         
                        {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'primary',
                            handler: () => {
                                setConfirmarEdicion(false)
                            }
                        },
                        {
                        cssClass: 'success',
                        text: 'Aceptar',
                            handler: () => {
                                setAlerta(true)
                                setGuardar(true)              
                            }
                        }        
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};
  
export default FormularioPrograma;
  
