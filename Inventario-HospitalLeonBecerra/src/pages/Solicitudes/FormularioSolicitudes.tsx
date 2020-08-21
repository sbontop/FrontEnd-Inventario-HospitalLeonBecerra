import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, 
    IonButtons, IonHeader, IonList, IonButton, IonRow, IonCol, IonNote, IonTextarea, IonItemDivider, IonIcon, IonFooter, IonLoading, 
    useIonViewWillEnter, IonModal, IonGrid } from '@ionic/react';
import React, { useState } from 'react';
import AxiosSolicitudes from '../../services/AxiosSolicitudes';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack, close,  checkboxOutline, save } from 'ionicons/icons';
import ListaSolicitudes from '../../components/solicitudesComponents/ListaSolicitudes';
import SignaturePad from 'react-signature-canvas'
import AxiosFirma from '../../services/AxiosFirma';
import styles from './styles.module.css'   

const FormularioSolicitudes: React.FC = () => {
    let { id } = useParams();
    const [usuarioSolicitante, setUsuarioSolicitante] = useState("");
    const [nombreSolicitante, setNombreSolicitante] = useState("");
    const [cedula, setCedula] = useState("");
    const [punto, setPunto] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [equipos, setEquipos] = useState([] as any);
    const [equipo, setEquipo] = useState([] as any);
    const [estado, setEstado] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [tipo, setTipo] = useState("");
    const [observacion, setObservacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [guardar, setGuardar] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [alertaFinalizar, setAlertaFinalizar] = useState(false);
    const [confirmarRegistro, setConfirmarRegistro] = useState(false);
    const [confirmarEdicion, setConfirmarEdicion] = useState(false);
    const [vistaPrevia, setVistaPrevia] = useState(true);
    const [trimmedDataURL, settrimmedDataURL] = useState(null);   
    const [confirmarSolicitud, setConfirmarSolicitud] = useState(false);
    const [mostrarVentanaFirma, setmostrarVentanaFirma] = useState(false);
    const [incompleto, setIncompleto] = useState(false);
    const [alertaEdicion, setAlertaEdicion] = useState(false);
    const [mostrarFooter, setMostrarFooter] = useState(true); 
    const [mostrarLoad, setMostrarLoad] = useState(false); 
    const [habilitarCampos, setHabilitarCampos] = useState(false);
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [redireccionar, setRedireccionar] = useState(false);
    var [sigPad] = useState({} as any);
    var [formData, setFormData] = useState({} as any);

    useIonViewWillEnter(() => {
        setMensaje("");
        setMostrarFooter(true);
        setIncompleto(false);
        setHabilitarCampos(false);
        setAlertaFinalizar(false);
        setEstado("");
        setEquipo([]);
        setObservacion("");                             
    });

    const cargar_equipos = (cedula: any) => { 
        let eq = [] as any;
        AxiosSolicitudes.mostrar_codigos(cedula).then(res=>{
            res.data.forEach((e: any) => {
                eq.push(e);
            });
            setEquipos(eq); 
            console.log("equipos", equipos)
        }).catch(err => {
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            setError(true);
            console.log(err);
        });
    }

    const limpiar=()=>{
        setMensaje("");
        setMostrarFooter(true);
        setIncompleto(false);
        setHabilitarCampos(false);
        setEstado("");
        setObservacion("");
        setEquipo([]);
        settrimmedDataURL(null);
        id = undefined;
    }

    useIonViewWillEnter(() => {
        setMostrarLoad(true);
        if (id !== undefined){
            setConfirmarSolicitud(false);
            AxiosSolicitudes.info_solicitud_id(id).then(res => {
                let prioridad= res.data.prioridad;
                transformar_prioridad(prioridad);
                console.log("edición:",id, res.data);
                setFecha(res.data.fecha_realizacion);
                setHora(res.data.hora_realizacion);
                setTipo(res.data.tipo);
                setCedula(res.data.cedula);
                setUsuarioSolicitante(res.data.id_usuario);
                setNombreSolicitante(res.data.nombre + " " + res.data.apellido);
                setPunto(res.data.bspi_punto);
                setDepartamento(res.data.dpto);
                setDescripcion(res.data.observacion);
                setEstado(res.data.estado);
                setMostrarLoad(false);
                cargar_equipos(res.data.cedula);
                if( res.data.estado === 'C' ){
                    AxiosSolicitudes.info_atencion_solicitud_id(id, res.data.cedula).then(res=>{
                        console.log("atenci", res.data)
                        let eq = [] as any;
                        res.data.equipos.forEach((element: any) => {
                            eq.push(element);
                        });
                        setEquipo(eq); 
                        console.log("eqr",eq)
                        setObservacion(res.data.observacion);
                        settrimmedDataURL(res.data.image_url);
                    })
                }
                if( res.data.estado === 'EP' ){
                    AxiosSolicitudes.info_atencion_solicitud_edit(id).then(res=>{
                        console.log("atenvfc", res.data)
                        if(!Array.isArray(res.data) ){
                            console.log("atenvfc", res.data)
                            let eq = [] as any;
                            if (res.data.equipos !== undefined){
                                res.data.equipos.forEach((element: any) => {
                                    console.log(element);
                                    eq.push(element);
                                });
                            }
                            setEquipo(eq); 
                            setObservacion(res.data.observacion);
                            settrimmedDataURL(res.data.image_url);
                        } 
                    })
                }
            }).catch(err => {
                setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                setError(true);
            });
        }                                    
        }, [id]
    );

    const aceptarSolicitud = (mensaje: any) => {
        setMensaje(mensaje);
        setConfirmarSolicitud(true);
        try {
            if (mensaje === "aceptar"){
                AxiosSolicitudes.cambiar_estado_solicitud(id, "EP");
            } else if (mensaje === "pendiente"){
                AxiosSolicitudes.cambiar_estado_solicitud(id,"P");
            } else if (mensaje === "rechazar"){
                AxiosSolicitudes.cambiar_estado_solicitud(id, "R");
            }
        } catch (error) {
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde");
            setError(true);
        }
    }

    const transformar_prioridad = (prioridad: string) =>{
        if (prioridad === 'A') {
            setPrioridad("Alta");
        }else if (prioridad === 'B') {
            setPrioridad("Baja");
        }else if (prioridad === 'M') {
            setPrioridad("Media");
        }else if (prioridad === 'CT') {
            setPrioridad("Crítica");
        }
    }

    const registrar = () => { 
        console.log("len",equipo.length)
        if ( estado === 'EP' && (equipo.length === 0 || trimmedDataURL === null)) {
            setMensaje("Para finalizar la solicitud es necesario firmarla y agregar equipos involucrados");
            setIncompleto(true);
        } else {
            try {
                AxiosFirma.almacenar_firma(formData).then(res => {   
                    var id_imagen = res.data;
                    let registro = {
                        equipos: equipo,
                        id_usuario: "admin",
                        observacion: observacion,
                        id_solicitud: id,
                        estado: "C",
                        id_imagen: id_imagen
                    }
                    AxiosSolicitudes.crear_atencion_solicitud(registro).then(() => {
                        console.log('REGISTRO:', registro, guardar)
                    }).catch(err => {
                        setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                        if (err.response) {
                            setMensaje(err.response.data.log)
                        }
                        setError(true);
                    }); 
                    console.log("Upload44");
                }).catch(err => {
                    console.log(err);      
                    console.log('Error 2');
                });  
                setConfirmarRegistro(true);
                setMensaje("Registro guardado satisfactoriamente"); 
            }  catch (error) {
                setMensaje("Error al guardar la atención a esta solicitud")
                setError(true);
            }
        }   
    } 

    const actualizar = () => { 
        if ( estado === 'EP' && ( equipo.length > 0 || observacion !== "" || observacion !== null )) {
            let registro = {
                id_solicitud: id,
                observacion: observacion,
                equipo: equipo
            }
            AxiosSolicitudes.editar_atencion_solicitud(registro).then(res => {
                console.log(res)
                setConfirmarEdicion(true);
                setMensaje("Registro actualizado satisfactoriamente")                   
            }).catch(() => {
                setError(true);
            });
        } else {
            setMensaje("No se pueden guardar los cambios debido a que no ha agregado ninguna obervación o equipo");
            setIncompleto(true);
        }   
    } 

    const volver_principal = () => {
        setGuardar(false);
        setRedireccionar(true);   
        setMostrarLoad(false);     
    }

    if (redireccionar) {
        return (<Redirect to="/homesolicitudes" />);
    }

    const clear = () => {
        sigPad.clear()
    }

    const trim = () => {
        settrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
        setmostrarVentanaFirma(false);
        const canvas = sigPad.getTrimmedCanvas();
        canvas.toBlob((blob:any) => {
        const formData = new FormData();
            formData.append('image_name', blob);
            formData.append('id_solicitud', id);
            console.log("Fomrulario: ",formData);
            setFormData(formData);    
        });
    }

    const vista_previa = () => {
        settrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
        setVistaPrevia(false);
        console.log("Data: ",trimmedDataURL);
    }

    return (
    <IonPage>  
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonButton onClick={(e) => limpiar()} routerLink="/homesolicitudes"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                </IonButtons>
                <IonTitle>Seguimiento de solicitud</IonTitle>
                <IonButtons slot="end">
                    { estado === 'EP' ? <IonButton onClick={(e) => actualizar()}> <IonIcon icon={save}></IonIcon> </IonButton> : null }
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonLoading
            isOpen={mostrarLoad}
            message={'Cargando datos, espere por favor...'}
        />

        <IonContent className="ion-padding">  
            <form onSubmit={(e) => { e.preventDefault(); registrar(); }} action="post">      
                <IonItemDivider className="ion-no-margin-no-padding no-lines" color="light">
                    <IonLabel> <b> Detalle de solicitud </b> </IonLabel>
                </IonItemDivider>
                <IonList>
                    <IonItem >
                        <IonLabel> <small>Prioridad</small> <h2> {prioridad} </h2> </IonLabel>
                    </IonItem>
                    <IonItem >
                        <IonLabel> <small>Fecha</small> <h2> {fecha} </h2> </IonLabel>
                    </IonItem> 
                    <IonItem>
                        <IonLabel> <small>Hora</small> <h2> {hora} </h2> </IonLabel>
                    </IonItem> 
                    <IonItem>
                        <IonLabel> <small>Tipo de requerimiento</small> <h2>{ListaSolicitudes.transformar_tipo(tipo)} </h2> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel> <small>Username</small> <h2> {usuarioSolicitante} </h2> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel> <small>Nombre</small> <h2> {nombreSolicitante} </h2> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel> <small>Cédula</small> <h2> {cedula} </h2> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel> <small>Punto</small> <h2> {punto} </h2> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel> <small>Departamento</small> <h2> {departamento} </h2> </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel> <small>Descripción</small> <h2> {descripcion} </h2> </IonLabel>
                    </IonItem>   
                </IonList>

                { estado === 'P' || estado === 'R' ? null :
                <IonList>
                    <IonItemDivider className="ion-no-margin-no-padding" color="light"> 
                        <IonLabel> <b> Atención de solicitud </b> </IonLabel> 
                    </IonItemDivider>
                    <IonItem lines="inset">
                        <IonLabel position="floating"> Estado </IonLabel>
                        <IonInput disabled name="estado" value={estado} onIonChange={(e) => setEstado((e.target as HTMLInputElement).value)} >
                            { estado === 'P' ? "Pendiente" : estado === 'EP' ? "En progreso" : estado === 'C' ? "Completada" : "Rechazada" }
                        </IonInput>   
                    </IonItem> 

                    <IonItem lines="inset">
                        <IonLabel position="floating">Observaciones</IonLabel>
                        <IonTextarea disabled={habilitarCampos} name="observacion" value={observacion} onIonChange={(e) => setObservacion((e.target as HTMLInputElement).value)}></IonTextarea>
                    </IonItem>    

                    { 
                        estado === 'C' && equipo.length >= 0 ?
                        <>
                            <IonItem>
                                <IonList>
                                <IonLabel><small>Equipos involucrados </small></IonLabel> 
                                    { equipo.length === 0 ?
                                        <IonItem lines="none" key={0}> <p> No registrado </p></IonItem> 
                                        :
                                        equipo.map((element: any, index:any) => {
                                            return ( <IonItem lines="none" key={index}> <p>{ "▹  " + element }</p></IonItem> );  
                                        })
                                    }
                                </IonList>
                            </IonItem>
                        </>
                        
                    :
                        <IonItem lines="inset">
                            <IonLabel position="floating">Equipos involucrados<IonText color="primary">*</IonText></IonLabel>
                            <IonSelect multiple disabled= {habilitarCampos} name="equipos" value={equipo} onIonChange={(e) => setEquipo(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                                { equipos.length === 0 ?                                 
                                    <IonSelectOption key={0} value={null}> Ninguno </IonSelectOption>
                                    :
                                    equipos.map((m:any, index:number) => {
                                        return ( <IonSelectOption key={index} value={m.id}> {m.dato} </IonSelectOption> );
                                    })
                                }
                            </IonSelect>   
                        </IonItem>      
                    }

                    <IonModal
                        isOpen={mostrarVentanaFirma}
                        onDidDismiss={e => setmostrarVentanaFirma(false)}
                    >

                    <IonToolbar color="primary">
                        <IonTitle> Solicitud </IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setmostrarVentanaFirma(false)}> <IonIcon icon={close}></IonIcon> </IonButton>
                        </IonButtons>
                    </IonToolbar>
                    
                    <IonContent>
                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol> 
                                    <h2> <b> Firma electrónica </b> </h2>
                                </IonCol>
                            </IonRow>

                            <IonRow class="ion-text-center" className={styles.fondo}>
                                <IonCol >
                                    <IonNote>Al realizar la firma de esta solicitud usted acepta que se ha realizado de manera satisfactoria el servicio brindado en esta solicitud.</IonNote>  
                                </IonCol>
                            </IonRow>
                            <br/>

                            <IonRow class="ion-text-center">
                                <SignaturePad clearOnResize={true}
                                    canvasProps={{width: 390, height: 300, className: 'sigCanvas', style:{ "height": "100%", "width": "100%", "background":"#EEEDE8"} }}
                                    ref={(ref) => { sigPad = ref }}
                                />
                            </IonRow> 

                            <IonRow class="ion-text-end">
                                <IonCol>
                                    <IonButton color="dark" onClick={clear}> Volver a firmar </IonButton>
                                </IonCol>              
                            </IonRow>

                            <IonRow class="ion-text-end">
                                <IonCol>
                                    <IonButton color="dark" onClick={vista_previa}> Vista previa </IonButton>
                                </IonCol>
                            </IonRow>

                            <IonRow class="ion-text-end">  
                                <IonCol>
                                    <IonButton color="dark" onClick={trim}> Guardar </IonButton>
                                </IonCol>
                            </IonRow>
            
                            { estado === 'C' ?
                                <>
                                    <IonRow hidden={trimmedDataURL === null ? true : false}>
                                        <IonCol class="ion-text-center">
                                            <h4> <b> Firma </b> </h4>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow hidden={trimmedDataURL === null ? true : false }>
                                        <IonCol class="ion-text-center">
                                            <img id="imageid" alt="" src ={trimmedDataURL+''} />
                                        </IonCol>
                                    </IonRow>
                                </> : null
                            }

                            <br/>

                            <IonRow hidden={vistaPrevia}>
                                <IonCol class="ion-text-center">
                                    <h2> <b> Vista previa </b> </h2>
                                </IonCol>
                            </IonRow>

                            <IonRow hidden={vistaPrevia}>
                                <IonCol class="ion-text-center">
                                    <img id="imageid" alt="" src ={trimmedDataURL+''} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>                
                    </IonContent>

                    </IonModal>        
                        <IonRow hidden={ trimmedDataURL === null ? true : false }>
                            <IonCol class="ion-text-center">
                                <h2> <b> Firma </b> </h2>
                            </IonCol>
                        </IonRow>

                        <IonRow hidden={ trimmedDataURL === null ? true : false }>
                            <IonCol class="ion-text-center">
                                <img id="imageid" alt="" src ={trimmedDataURL+''} />
                            </IonCol>
                        </IonRow>

                        { estado === 'C' ? null :
                            <p className="ion-text-center">                 
                                <IonRow class="ion-text-center">
                                    <IonCol class="ion-no-padding">
                                        <IonButton disabled= {habilitarCampos} expand="full" color="medium" onClick={() => {setmostrarVentanaFirma(true)} } class="ion-no-margin">{trimmedDataURL===null?'Registrar firma':'Volver a firmar'}</IonButton>          
                                    </IonCol>
                                </IonRow> 
                                <IonRow style={{paddingTop: 10}} >
                                    <IonCol class="ion-no-padding">
                                        <IonButton disabled= {habilitarCampos} type="submit" size="large" expand="block" color="success" class="ion-no-margin">Finalizar  <IonIcon icon={checkboxOutline}></IonIcon></IonButton>
                                    </IonCol>
                                </IonRow>
                            </p> 
                        }

                </IonList>

                }
                </form>

                <IonAlert
                    isOpen={alerta}
                    onDidDismiss={() => volver_principal()}
                    message={mensaje === "aceptar" ? "La solicitud ha sido aceptada": mensaje === "rechazar" ? "La solicitud ha sido rechazada" :"La solicitud ha sido movida a la bandeja de pendientes"}
                    buttons={['Aceptar']}
                />
            
                <IonAlert
                    isOpen={alertaFinalizar}
                    onDidDismiss={() => volver_principal()}
                    message={"La solicitud ha sido completada con éxito."}
                    buttons={['Aceptar']}
                />

                <IonAlert
                    isOpen={alertaEdicion}
                    onDidDismiss={() => volver_principal()}
                    message={"La solicitud ha sido actualizada con éxito."}
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
                isOpen={confirmarSolicitud}
                header={'Confirmación'}
                message={'¿Está seguro de que desea ' + mensaje + ' esta solicitud?'}
                buttons=
                    {[         
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'primary',
                            handler: () => {
                                setConfirmarSolicitud(false)
                                setMostrarFooter(true)
                            }
                        },
                        {
                            cssClass: 'success',
                            text: 'Aceptar',
                            handler: () => {
                                setAlerta(true)
                                setHabilitarCampos(false)
                                setMostrarFooter(true)            
                            }
                        }        
                    ]}
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
                                if(estado==='EP'){
                                    setAlertaFinalizar(true)
                                } else{
                                    setAlerta(true) 
                                }
                                setGuardar(true)              
                            }
                        }        
                    ]}
                />

                <IonAlert
                isOpen={confirmarEdicion}
                header={'Confirmación'}
                message={'¿Está seguro de que desea modificar esta solicitud?'}
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
                                setAlertaEdicion(true)
                                setGuardar(true)              
                            }
                        }        
                    ]}
                />
            </IonContent>
            
            <IonFooter class="ion-no-margin-no-padding" >	
                { estado === "P" && mostrarFooter ? 
                <IonRow class="ion-text-center">
                    <IonCol class="ion-no-padding">
                        <IonButton color="success"  size="large" expand="full" class="ion-no-margin" onClick={() => aceptarSolicitud("aceptar")} >Aceptar</IonButton>
                    </IonCol>
                    <IonCol class="ion-no-padding">
                        <IonButton expand="full" size="large" class="ion-no-margin" onClick={() => aceptarSolicitud("rechazar")} >Rechazar</IonButton>
                    </IonCol>
                </IonRow> : null }
                { estado === "R" && mostrarFooter ? 
                <IonRow class="ion-text-center">
                    <IonCol class="ion-no-padding">
                        <IonButton color="warning"  size="large" expand="full" class="ion-no-margin" onClick={() => aceptarSolicitud("pendiente")} >Mover a pendientes</IonButton>
                    </IonCol>
                </IonRow> : null }
            </IonFooter>

        </IonPage>
    );
};

export default FormularioSolicitudes;