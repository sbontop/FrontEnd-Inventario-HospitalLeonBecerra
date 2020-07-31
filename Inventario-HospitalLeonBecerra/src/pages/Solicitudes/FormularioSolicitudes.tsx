import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, 
    IonButtons, IonHeader, IonList, IonButton, IonRow, IonCol, IonNote, IonTextarea, IonIcon, IonListHeader, IonFooter, IonLoading, useIonViewWillEnter, useIonViewWillLeave} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import AxiosSolicitudes from '../../services/AxiosSolicitudes';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack, trendingDown, trendingUp, remove, flash , time, calendar, checkmarkCircle, checkboxOutline, save, build, person, man, card, business, locate, information, informationCircleOutline, desktop} from 'ionicons/icons';
import ListaSolicitudes from '../../components/solicitudesComponents/ListaSolicitudes';

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
    const [empleado, setEmpleado] = useState("");
    const [empleados, setEmpleados] = useState([] as any);
    const [estado, setEstado] = useState("");
    const [responsable, setResponsable] = useState("");
    const [estados] = useState([{id:"P", estado: "Pendiente"},{id:"R", estado: "Rechazada"},{id:"C", estado: "Completada"}, {id:"EP", estado: "En progreso"}] as any);
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

    useIonViewWillEnter(() => {
        cargar_empleados(); 
        cargar_equipos();                               
    });

    const cargar_empleados = () => { 
        let emp = [] as any;
        AxiosSolicitudes.empleados_sistemas().then(res=>{
            res.data.forEach((e: any ) => {
                let datos_empleado = {"cedula":e.cedula, "nombres": e.nombre + " "+ e.apellido};
                emp.push(datos_empleado);
            }); 
            setEmpleados(emp);
        }).catch(err => {
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            setError(true);
        });
    }

    const cargar_equipos = () => { 
        let eq = [] as any;
        AxiosSolicitudes.mostrar_codigos().then(res=>{
            res.data.map((e: any, index: any) =>{
                eq.push(e);
            })
            setEquipos(eq); 
            console.log("equipos", equipos)
        }).catch(err => {
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            setError(true);
        });
    }

    useIonViewWillLeave(()=>{
        setEmpleados([] as any);
        setMensaje("");
        setMostrarFooter(true);
        setEstado("");
        setEditionMode(false)
    })

    useIonViewWillEnter(() => {
        if (id !== undefined){
            setEditionMode(true);
            setMostrarLoad(true);
            // setMostrarFooter(true);
            setConfirmarSolicitud(false);
            AxiosSolicitudes.info_solicitud_id(id).then(res => {
                let prioridad= res.data.prioridad;
                let estado = res.data.estado;
                transformar_prioridad(prioridad);
                transformar_estado(estado);
                console.log("edición:",id, res.data);
                setEmpleado(res.data.nombre);
                setFecha(res.data.fecha_realizacion);
                setHora(res.data.hora_realizacion);
                setTipo(res.data.tipo);
                setCedula(res.data.cedula);
                setUsuarioSolicitante(res.data.id_usuario);
                setNombreSolicitante(res.data.nombre+" "+res.data.apellido);
                setPunto(res.data.bspi_punto);
                setDepartamento(res.data.dpto);
                setDescripcion(res.data.observacion);
                res.data.estado==="P"?setHabilitarCampos(true):setHabilitarCampos(false);
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
                 AxiosSolicitudes.cambiar_estado_solicitud(id,"EP");
            } else {
                AxiosSolicitudes.cambiar_estado_solicitud(id,"R");
            }
            // setMostrarFooter(false)//
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

    const transformar_estado = (estado: string) =>{
        if (estado === 'P') {
            setEstado("Pendiente");
        }else if (estado === 'EP') {
            setEstado("En progreso");
        }else if (estado === 'C') {
            setEstado("Completado");
        }else if (estado === 'R') {
            setEstado("Rechazado");
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
        // setGuardar(false);
        
        // setMostrarFooter(false)
        // if(mensaje==="rechazar"){
            setRedireccionar(true);
        // }
        
    }

    if (redireccionar) {
    return (<Redirect to="/homesolicitudes" />);
    }

    const manejarEstadoPendiente = (estado: any) => {
        if(estado === "P"){
            setMostrarFooter(false);
            setEstado(estado);
        }
    }

    return (
    <IonPage>  
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonButton routerLink="/homesolicitudes"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                </IonButtons>
                <IonTitle>Seguimiento de solicitud</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={(e) => console.log("print")}><IonIcon icon={save}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonLoading
            isOpen={mostrarLoad}
            message={'Cargando datos, espere por favor...'}
        />
        <IonContent className="ion-padding">  
        {/* <IonTitle className="ion-text-center">Solicitud</IonTitle> */}
            <form action="post"> 
            {/* onSubmit={(e) => { e.preventDefault(); registrar(); }}  */}
                <IonList>
                <IonListHeader >DETALLE DE SOLICITUD</IonListHeader>
                    <IonItem>
                        {prioridad === 'Alta' ? <IonIcon  color="alto" slot="start" icon={trendingUp}></IonIcon> :
                        prioridad === 'Baja' ? <IonIcon  color="bajo" slot="start" icon={trendingDown}></IonIcon> :
                        prioridad === 'Media' ? <IonIcon color="medio" slot="start" icon={remove}></IonIcon> : 
                        prioridad === 'Crítica' ? <IonIcon color="critico" slot="start" icon={flash}></IonIcon> : null }
                        Prioridad <IonNote color="dark" slot="end">{prioridad}</IonNote>
                    </IonItem>

                    <IonItem >
                        <IonIcon color="medium" slot="start" icon={calendar}></IonIcon>
                        Fecha<IonNote color="dark" slot="end">{fecha}</IonNote>
                    </IonItem> 

                    <IonItem>
                        <IonIcon color="medium" slot="start" icon={time}></IonIcon>
                        Hora<IonNote color="dark" slot="end">{hora}</IonNote>  
                    </IonItem> 

                    <IonItem>
                        <IonIcon color="medium" slot="start" icon={build}></IonIcon>
                        Tipo de requerimiento<IonNote color="dark" slot="end">{ListaSolicitudes.transformar_tipo(tipo)} </IonNote> 
                    </IonItem>

                    <IonItem>
                        <IonIcon color="medium" slot="start" icon={person}></IonIcon>
                        Username<IonNote color="dark" slot="end">{usuarioSolicitante} </IonNote>
                    </IonItem>

                    <IonItem>
                        <IonIcon color="medium" slot="start" icon={man}></IonIcon>
                        Nombre<IonNote color="dark" slot="end">{nombreSolicitante} </IonNote>
                    </IonItem>

                    <IonItem>
                        <IonIcon color="medium" slot="start" icon={card}></IonIcon>
                        Cédula<IonNote color="dark" slot="end">{cedula} </IonNote>
                    </IonItem>

                    <IonItem>
                        <IonIcon slot="start" icon={locate}> </IonIcon>
                        Punto <IonNote slot="end">{punto} </IonNote>
                    </IonItem>

                    <IonItem>
                        <IonIcon slot="start" icon={business}> </IonIcon>
                        Departamento <IonNote  color="dark" slot="end">{departamento}</IonNote>
                    </IonItem>

                    <IonItem>
                        <IonIcon slot="start" icon={informationCircleOutline}> </IonIcon>
                        Descripción <IonNote color="dark" slot="end">{descripcion}</IonNote>
                    </IonItem>   
                </IonList>

                <IonList>
                <IonListHeader className="ion-text-center">ATENCIÓN DE SOLICITUD</IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Estado<IonText color="primary">*</IonText></IonLabel>
                        <IonInput disabled name="estado" value={estado} onIonChange={(e) => setEstado((e.target as HTMLInputElement).value)} >
                            {/* {estados.map((m:any, index:number) => {
                            return (
                            <IonSelectOption key={index} value={m.id}>
                                {m.estado} 
                            </IonSelectOption>
                            ); 
                        })}  */}
                        </IonInput>   
                    </IonItem> 

                    <IonItem>

                        <IonLabel position="floating">Responsable a cargo<IonText color="primary">*</IonText></IonLabel>

                        <IonSelect disabled={habilitarCampos} name="responsable" value={responsable} onIonChange={(e) => setResponsable(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            {empleados.map((m:any, index:number) => {

                            return (

                            <IonSelectOption key={index} value={m.cedula}>

                                {m.nombres} 
                            </IonSelectOption>
                            );
                        })}
                        </IonSelect>   
                    </IonItem> 

                    <IonItem lines="full">
                        <IonLabel position="floating">Equipos involucrados</IonLabel>
                        <IonSelect  multiple disabled= {habilitarCampos} name="equipos" value={equipo} onIonChange={(e) => setEquipo(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            {equipos.map((m:any, index:number) => {
                            return (
                            <IonSelectOption key={index} value={m.id}>
                                {m.dato} 
                            </IonSelectOption>
                            );
                        })}
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
                message={mensaje === "aceptar" ? "La solicitud ha sido aceptada":"La solicitud ha sido rechazada"}
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
                            // if(mensaje==="aceptar"){

                            // }
                            setAlerta(true)
                            setHabilitarCampos(false)
                             setMostrarFooter(true)// setAlerta(true)
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
       { estado === "Pendiente" && mostrarFooter ? <IonFooter class="ion-no-margin-no-padding" >	
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

export default FormularioSolicitudes;