import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, 
    IonButtons, IonHeader, IonList, IonButton, IonRow, IonCol, IonTextarea, IonIcon, IonFooter, IonLoading, useIonViewWillEnter, withIonLifeCycle} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import AxiosSolicitudes from '../../services/AxiosSolicitudes';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack, trendingDown, trendingUp, remove, flash , time, calendar, checkmarkCircle, checkboxOutline} from 'ionicons/icons';
import ListaSolicitudes from '../../components/solicitudesComponents/ListaSolicitudes';

const FormularioSolicitudes: React.FC = () => {
    let { id } = useParams();
    const [usuarioSolicitante, setUsuarioSolicitante] = useState("");
    const [nombreSolicitante, setNombreSolicitante] = useState("");
    const [cedula, setCedula] = useState("");
    const [punto, setPunto] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [equipos, setEquipos] = useState("");
    const [empleado, setEmpleado] = useState("");
    const [estado, setEstado] = useState("");
    const [responsable, setResponsable] = useState("");
    const [estados] = useState([{id:"D", estado: "Disponible"},{id:"O", estado: "Operativo"},{id:"ER", estado: "En revisión"}, {id:"R", estado: "Reparado"}] as any);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [tipo, setTipo] = useState("");
    const [observacion, setObservacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [guardar, setGuardar] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [confirmarRegistro, setConfirmarRegistro] = useState(false);
    const [confirmarEdicion, setConfirmarEdicion] = useState(false);
    
    const [confirmarSolicitud, setConfirmarSolicitud] = useState(false);
    const [incompleto, setIncompleto] = useState(false);
    const [editionMode, setEditionMode] = useState(false);
    const [mostrarFooter, setMostrarFooter] = useState(true); 
    const [mostrarLoad, setMostrarLoad] = useState(false); 
    const [habilitarCampos, setHabilitarCampos] = useState(false);
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [redireccionar, setRedireccionar] = useState(false);

    useEffect(() => {
    if (id !== undefined){
        setEditionMode(true);
        setMostrarLoad(true);
        setMostrarFooter(true);
        setConfirmarSolicitud(false);
        AxiosSolicitudes.info_solicitud_id(id).then(res => {
            let prioridad= res.data.prioridad;
            transformar_prioridad(prioridad)
            console.log("edición:",id, res.data);
            //setPrioridad(prioridad);
            setEmpleado(res.data.nombre);
            setFecha(res.data.fecha_realizacion);
            setHora(res.data.hora_realizacion);
            setTipo(res.data.tipo);
            setCedula(res.data.cedula);
            setUsuarioSolicitante(res.data.id_usuario);
            setNombreSolicitante(res.data.nombre+" "+res.data.apellido);
            setPunto(res.data.bspi_punto);
            setDepartamento(res.data.dpto);
            setEstado(res.data.estado);
            setObservacion(res.data.observacion);
            res.data.estado!=="P"?setHabilitarCampos(false):setHabilitarCampos(true);
        }).catch(err => {
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            setError(true);
        });
        setMostrarLoad(false);
    }                                    
    }, [id]);

    useIonViewWillEnter(() => {
        if (id !== undefined){
            setEditionMode(true);
            setMostrarLoad(true);
            setMostrarFooter(true);
            setConfirmarSolicitud(false);
            AxiosSolicitudes.info_solicitud_id(id).then(res => {
                let prioridad= res.data.prioridad;
                transformar_prioridad(prioridad)
                console.log("edición:",id, res.data);
                //setPrioridad(prioridad);
                setEmpleado(res.data.nombre);
                setFecha(res.data.fecha_realizacion);
                setHora(res.data.hora_realizacion);
                setTipo(res.data.tipo);
                setCedula(res.data.cedula);
                setUsuarioSolicitante(res.data.id_usuario);
                setNombreSolicitante(res.data.nombre+" "+res.data.apellido);
                setPunto(res.data.bspi_punto);
                setDepartamento(res.data.dpto);
                setEstado(res.data.estado);
                setObservacion(res.data.observacion);
                res.data.estado!=="P"?setHabilitarCampos(false):setHabilitarCampos(true);
            }).catch(err => {
                setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                setError(true);
            });
            setMostrarLoad(false);
        }                                    
        }, [id]
      );

    const aceptarSolicitud = (mensaje: any) => {
        setMensaje(mensaje);
        setConfirmarSolicitud(true);
        try {
            if (mensaje === "aceptar"){
                //setMostrarFooter(false)// AxiosSolicitudes.cambiar_estado_solicitud(id,"EP");
            } else {
                // AxiosSolicitudes.cambiar_estado_solicitud(id,"R");
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
    if (true
        // prioridad === undefined || nombre === undefined || pass === undefined || usuario === undefined || clave === undefined
        // || id_marca === undefined || modelo === undefined || numero_serie === undefined || estado === undefined
        ) {
        setMensaje("Debe completar todos los campos");
        setIncompleto(true);
    } else {     
        let registro_equipo_router = {
            // id_equipo: id,
            // fecha_registro: new Date().toISOString().substr(0,10),
            // prioridad: prioridad,
            // tipo_equipo: "Router",
            // id_marca: id_marca,
            // asignado: empleado,
            // estado_operativo: estado,
            // modelo: modelo,
            // numero_serie: numero_serie,
            // descripcion: descripcion,
            // encargado_registro: 'admin',
            // componente_principal: null,
            // ip: ip,        
            // nombre: nombre,
            // pass: pass,
            // puerta_enlace: puerta_enlace,
            // usuario: usuario,
            // clave: clave
        }
        if (!editionMode) {
            // AxiosRouter.crear_equipo_router(registro_equipo_router).then(() => {
            //     setMensaje("Registro guardado satisfactoriamente")
            //     setConfirmarRegistro(true);
            //     console.log(guardar)
            // }).catch(err => {
            //     setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            //     if (err.response) {
            //         setMensaje(err.response.data.log)
            //     }
            //     setError(true);
            // });
        } else {
            console.log(registro_equipo_router)
            // AxiosRouter.editar_router(registro_equipo_router).then(res => {
            //     console.log(res)
            //     setMensaje("Registro actualizado satisfactoriamente")                   
            //     setConfirmarEdicion(true);
            // }).catch(() => {
            //     setError(true);
            // });
        }
    }   
    } 

    const volver_principal = () => {
        setGuardar(false);
        setRedireccionar(true);
    }

    if (redireccionar) {
    return (<Redirect to="/homesolicitudes" />);
    }



    return (
    <IonPage>  
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonButton routerLink="/homesolicitudes"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                </IonButtons>
                <IonTitle>Solicitudes</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonLoading
                        isOpen={mostrarLoad}
                        message={'Cargando datos, espere por favor...'}
                    />
        <IonContent className="ion-padding">  
    <IonTitle className="ion-text-center">Datos de la solicitud</IonTitle>

            <form onSubmit={(e) => { e.preventDefault(); registrar(); }} action="post">
            <IonList>
        <IonItem>
                        <IonLabel position="floating">Prioridad<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled required name="prioridad"  value={prioridad} onIonChange={(e) => setPrioridad((e.target as HTMLInputElement).value)} >
                        
        {/* {prioridad === 'A' ? <IonIcon color="alto" slot="start" icon={trendingUp}></IonIcon> :
        prioridad === 'Baja' ? <IonIcon color="bajo" slot="start" icon={trendingDown}></IonIcon> :
        prioridad === 'Media' ? <IonIcon color="medio" slot="start" icon={remove}></IonIcon> : 
        prioridad === 'Crítica' ? <IonIcon color="critico" slot="start" icon={flash}></IonIcon> : null } */}
    </IonInput>                   
                   </IonItem>            

                    {/* <IonItem>

                        <IonLabel position="floating">Código<IonText color="primary">*</IonText></IonLabel>

                        <IonInput disabled = {editionMode} required type="text" name="codigo" value={codigo} onIonChange={(e) => setPrioridad((e.target as HTMLInputElement).value)} ></IonInput>

                    </IonItem>  */}

                    <IonItem>
                        <IonLabel position="floating">Fecha de la solicitud</IonLabel>
                        <IonInput disabled name="fecha" value={fecha}>
                            <IonIcon className="btn_eye_icon"  color="medium" slot="start" icon={calendar}></IonIcon>
                        </IonInput>   
                    </IonItem> 
                    <IonItem>
                        <IonLabel position="floating">Hora de la solicitud</IonLabel>
                        <IonInput disabled name="hora" value={hora}>
                            <IonIcon className="btn_eye_icon"  color="medium" slot="start" icon={time}></IonIcon>
                        </IonInput>   
                    </IonItem> 
                    <IonItem>
                        <IonLabel position="floating">Tipo de requerimiento<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled required type="text" name="tipo" value={ListaSolicitudes.transformar_tipo(tipo)} onIonChange={(e) => setTipo((e.target as HTMLInputElement).value)} ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Usuario solicitante<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled required name="solicitante" value={usuarioSolicitante} onIonChange={(e) => setUsuarioSolicitante((e.detail.value!))} >
                       </IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Nombre del solicitante<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled required name="nombreSolicitante" value={nombreSolicitante} onIonChange={(e) => setNombreSolicitante((e.detail.value!))} >
                       </IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Cédula del solicitante<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled required type="text" name="cedula" value={cedula} onIonChange={(e) => setCedula((e.target as HTMLInputElement).value)} ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Institución <IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled name="punto" value={punto} onIonChange={(e) => setPunto((e.target as HTMLInputElement).value)} > </IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Departamento<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled name="departamento" value={departamento} onIonChange={(e) => setDepartamento((e.target as HTMLInputElement).value)} >  </IonInput>
                    </IonItem> 

                    <IonItem>
                        <IonLabel position="floating">Detalle</IonLabel>
                        <IonTextarea disabled name="descripcion" value={descripcion} onIonChange={(e) => setDescripcion((e.target as HTMLInputElement).value)}></IonTextarea>
                    </IonItem>   

                    <IonItem>
                        <IonLabel position="floating">Estado<IonText color="primary">*</IonText></IonLabel>
                        <IonSelect disabled= {habilitarCampos} name="estado" value={estado} onIonChange={(e) => setEstado(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            {/* {estados.map((m:any, index:number) => {
                            return (
                            <IonSelectOption key={index} value={m.id}>
                                {m.estado} 
                            </IonSelectOption>
                            ); 
                        })}  */}
                        </IonSelect>   
                    </IonItem> 

                    <IonItem>

                        <IonLabel position="floating">Responsable a cargo</IonLabel>

                        <IonSelect disabled={habilitarCampos} name="responsable" value={responsable} onIonChange={(e) => setResponsable(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >

                            <IonSelectOption key={0} value={null}>

                                {"Ninguna"}

                            </IonSelectOption>

                            {/* {ips.map((m:any, index:number) => {

                            return (

                            <IonSelectOption key={index} value={m.id_ip}>

                                {m.direccion_ip} 
                            </IonSelectOption>
                            );
                        })} */}
                        </IonSelect>   
                    </IonItem> 

                    <IonItem lines="full">
                        <IonLabel position="floating">Equipos involucrados</IonLabel>
                        <IonSelect  multiple disabled= {habilitarCampos} name="equipos" value={equipos} onIonChange={(e) => setEquipos(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            <IonSelectOption key={0} value={null}></IonSelectOption>
                            <IonSelectOption key={1} value={null}></IonSelectOption>
                            <IonSelectOption key={2} value={null}>
                                {"Ninguna"}</IonSelectOption>
                                <IonSelectOption key={0} value={null}></IonSelectOption>
                            {/* {ips.map((m:any, index:number) => {
                            return (
                            <IonSelectOption key={index} value={m.id_ip}>
                                {m.direccion_ip} 
                            </IonSelectOption>
                            );
                        })} */}
                        </IonSelect>   
                    </IonItem> 

                    <IonItem>
                        <IonLabel position="floating">Observaciones</IonLabel>
                        <IonTextarea disabled= {habilitarCampos} name="observacion" value={observacion} onIonChange={(e) => setObservacion((e.target as HTMLInputElement).value)}></IonTextarea>
                    </IonItem>             

                    <p className="ion-text-center">                 
                            <IonRow class="ion-text-center">
                                <IonCol class="ion-no-padding">
                                    <IonButton  disabled= {habilitarCampos} expand="full" color="medium" routerLink="/path" class="ion-no-margin">Registrar firma</IonButton>          
                                </IonCol>
                            </IonRow> 
                            <IonRow style={{paddingTop: 10}} >
                                <IonCol class="ion-no-padding">
                                    <IonButton disabled= {habilitarCampos} type="submit" size="large" expand="block" color="success" class="ion-no-margin">Finalizar  <IonIcon icon={checkboxOutline}></IonIcon></IonButton>
                                </IonCol>
                            </IonRow>
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
                            setHabilitarCampos(false)
                            setMostrarFooter(false)// setMostrarFooter(true)// setAlerta(true)
                            // aceptarSolicitud// setGuardar(true)              
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
       { estado === "P" && mostrarFooter ? <IonFooter class="ion-no-margin-no-padding" >	
           <IonRow  class="ion-text-center">
               <IonCol class="ion-no-padding">
                   <IonButton color="success" expand="full" class="ion-no-margin" onClick={() => aceptarSolicitud("aceptar")} >Aceptar</IonButton>
                </IonCol>
                <IonCol class="ion-no-padding">
                   <IonButton expand="full" class="ion-no-margin" onClick={() => aceptarSolicitud("rechazar")} >Rechazar</IonButton>
                </IonCol>
            </IonRow> 
        </IonFooter> : null}
    </IonPage>
    );
};

export default withIonLifeCycle(FormularioSolicitudes);