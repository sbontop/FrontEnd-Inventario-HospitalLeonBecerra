import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, IonButtons, IonHeader, 
    IonList, IonButton, IonRow, IonCol, IonNote, IonTextarea, IonIcon, IonListHeader, IonFooter, IonLoading, useIonViewWillEnter, useIonViewWillLeave,
    IonModal, IonGrid } from '@ionic/react';
import React, { useState } from 'react';
import AxiosSolicitudes from '../../services/AxiosSolicitudes';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack, trendingDown, trendingUp, remove, close, flash , time, calendar, checkboxOutline, save, build, person, man, card, business, locate, informationCircleOutline } from 'ionicons/icons';
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
    const [alertaFinalizar, setAlertaFinalizar] = useState(false);
    const [confirmarRegistro, setConfirmarRegistro] = useState(false);
    const [confirmarEdicion, setConfirmarEdicion] = useState(false);
    const [vistaPrevia, setVistaPrevia] = useState(true);

    const [firma, setFirma] = useState("");
    const [trimmedDataURL, settrimmedDataURL] = useState(null);   
    const [confirmarSolicitud, setConfirmarSolicitud] = useState(false);
    const [mostrarVentanaFirma, setmostrarVentanaFirma] = useState(false);
    const [incompleto, setIncompleto] = useState(false);
    const [editionMode, setEditionMode] = useState(false);
    const [mostrarFooter, setMostrarFooter] = useState(true); 
    const [mostrarLoad, setMostrarLoad] = useState(false); 
    const [habilitarCampos, setHabilitarCampos] = useState(false);
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [redireccionar, setRedireccionar] = useState(false);
    var [sigPad, setSigPad] = useState({} as any);
    var [formData, setFormData] = useState({} as any);


    useIonViewWillEnter(() => {
        // cargar_empleados(); 
        //setEmpleados([] as any);
        setMensaje("");
        setMostrarFooter(true);
        setIncompleto(false);
        setHabilitarCampos(false);
        setEstado("");
        //setEquipo([]);
        setObservacion("");
        setEditionMode(false);
        // id=undefined;
        cargar_equipos();                               
    });

    const cargar_empleados = () => { 
        let emp = [] as any;
        AxiosSolicitudes.empleados_sistemas().then(res=>{
            res.data.forEach((e: any ) => {
                let datos_empleado = {"username":e.username, "nombres": e.nombre + " "+ e.apellido};
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
        // setEmpleados([] as any);
        // setMensaje("");
        // setMostrarFooter(true);
        // setIncompleto(false);
        // setHabilitarCampos(false);
        // setEstado("");
        // setEquipo("");
        // setObservacion("");
        // // setEstado("");
        // setEditionMode(false)
    })

    const limpiar=()=>{
        // setEmpleados([] as any);
        setMensaje("");
        setMostrarFooter(true);
        setIncompleto(false);
        setHabilitarCampos(false);
        setEstado("");
        // setEquipo([]);
        setObservacion("");
        setEditionMode(false);
        id=undefined;
    }

    useIonViewWillEnter(() => {
        setMostrarLoad(true);
        if (id !== undefined){
            setEditionMode(true);
            // setMostrarFooter(true);
            setConfirmarSolicitud(false);
            AxiosSolicitudes.info_solicitud_id(id).then(res => {
                let prioridad= res.data.prioridad;
                // let estado = res.data.estado;
                transformar_prioridad(prioridad);
                
                // transformar_estado(estado);
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
                // res.data.estado==="P"?setHabilitarCampos(true):setHabilitarCampos(false); 
                setEstado(res.data.estado);
                setMostrarLoad(false);
                if(res.data.estado==='C'){
                    AxiosSolicitudes.info_atencion_solicitud_id(id).then(res=>{
                        console.log("atenc", res.data)
                        setEquipo(res.data.equipos);
                        setFirma(res.data.image_url);
                        setObservacion(res.data.observacion);
                        settrimmedDataURL(res.data.image_url);
                        // setHabilitarCampos(true);
                    })
                }
            }).catch(err => {
                setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                setError(true);
            });
            
        }                                    
        }, [id]
    );

    const cambiarComponentes = () => {
        estado==="P"?setHabilitarCampos(true):setHabilitarCampos(false); 
        //estado==="C"?setHabilitarCampos(true):setHabilitarCampos(false);
    }

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
        if ( equipos === undefined ) {
            setMensaje("Debe completar todos los campos");
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
                setMensaje("Registro guardado satisfactoriamente");
                setConfirmarRegistro(true);
            }  catch (error) {
                setMensaje("Error al guardar la atención a esta solicitud")
                setError(true);
            }
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

    const manejarEstadoPendiente = (estado: any) => {
        if(estado === "P"){
            setMostrarFooter(false);
            setEstado(estado);
        }
    }

    const clear = () => {
        sigPad.clear()
    }

    const dibujar = () => {
        sigPad[0].toDataURL(trimmedDataURL);
    }

    const guardar_url = () =>{
        settrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
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
        /*this.getBase64Image(this.state.url_cargada, function(base64image:any){
          console.log('vista_previa',base64image);
        });*/
    }

    if (localStorage.userdata === undefined){
        return (<Redirect to="/iniciarsesion" />)
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
                    <IonButton onClick={(e) => console.log("print")}></IonButton>
                    {/* {estado==='EP'?
                        <IonButton onClick={(e) => console.log("print")}><IonIcon icon={save}></IonIcon></IonButton>:null} */}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonLoading
            isOpen={mostrarLoad}
            message={'Cargando datos, espere por favor...'}
        />
        <IonContent className="ion-padding">  
        {/* <IonTitle className="ion-text-center">Solicitud</IonTitle> */}
            <form onSubmit={(e) => { e.preventDefault(); registrar(); }} action="post"> 
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

{estado=== 'P' || estado==='R' ? null :
                <IonList>

                <IonListHeader  className="ion-text-center ion-no-margin-no-padding">ATENCIÓN DE SOLICITUD</IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Estado</IonLabel>
                        <IonInput disabled name="estado" value={estado} onIonChange={(e) => setEstado((e.target as HTMLInputElement).value)} >
                            {/* {estados.map((m:any, index:number) => {
                            return (
                            <IonSelectOption key={index} value={m.id}>
                                {m.estado} 
                            </IonSelectOption>
                            ); 
                        })}  */}
                        {estado==='P' ? "Pendiente" : estado==='EP' ? "En progreso" : estado==='C' ? "Completada" : "Rechazada" }
                        </IonInput>   
                    </IonItem> 

                    {/* <IonItem>

                        <IonLabel position="floating">Responsable a cargo<IonText color="primary">*</IonText></IonLabel>

                        <IonSelect disabled={habilitarCampos} name="responsable" value={responsable} onIonChange={(e) => setResponsable(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            {empleados.map((m:any, index:number) => {

                            return (

                            <IonSelectOption key={index} value={m.username}>

                                {m.nombres} 
                            </IonSelectOption>
                            );
                        })}
                        </IonSelect>   
                    </IonItem>  */}
{/* {
estado==='C'? <IonList><IonLabel position="floating">Equipos involucrados<IonText color="primary">*</IonText></IonLabel>
                        
    {equipo.map((m:any, index:number) => {
                            return (<>
                                
                            <IonItem key={index}>
                                {m.dato} 
                            </IonItem></>
                            );})}
</IonList>: */}
                    <IonItem lines="full">
                        <IonLabel position="floating">Equipos involucrados<IonText color="primary">*</IonText></IonLabel>
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
                   
    
{/* } */}
                    <IonItem>
                        <IonLabel position="floating">Observaciones</IonLabel>
                        <IonTextarea disabled= {habilitarCampos} name="observacion" value={observacion} onIonChange={(e) => setObservacion((e.target as HTMLInputElement).value)}></IonTextarea>
                    </IonItem>             
        <IonModal
          isOpen={mostrarVentanaFirma}
          onDidDismiss={e => setmostrarVentanaFirma(false)}>
          <IonToolbar color="primary">
            <IonTitle>Solicitud</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() =>setmostrarVentanaFirma(false)}><IonIcon icon={close}></IonIcon></IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent>

          <IonGrid>
            <IonRow class="ion-text-center">
              <IonCol>
                
                <h2>
                    <b>
                        Firma electrónica
                    </b>
                </h2>
                
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

            {/*<IonRow class="ion-text-center">
              {<SignaturePad penColor='green'
                  canvasProps={{width: 500, height: 200, className: 'sigCanvas' }}
                  ref={(ref2) => { this.sigPad2 = ref2 }}
                    />}
                    </IonRow>*/}


            <IonRow class="ion-text-end">
              <IonCol>
                <IonButton color="dark" onClick={clear}>Volver a firma</IonButton>
              </IonCol>              
            </IonRow>
            <IonRow class="ion-text-end">
                        <IonCol>
                            <IonButton color="dark" onClick={vista_previa}>Vista Previa</IonButton>
                        </IonCol>
                        </IonRow>
            <IonRow class="ion-text-end">  
              <IonCol>
                    <IonButton color="dark" onClick={trim}>
                    Guardar</IonButton>
              </IonCol>
            </IonRow>
{
    estado==='C'?
<>
            <IonRow hidden={trimmedDataURL===null?true:false}>
              <IonCol class="ion-text-center">
                <h2>
                    <b>
                        Firma
                    </b>
                </h2>
              </IonCol>
            </IonRow>


            <IonRow hidden={trimmedDataURL===null?true:false}>
              <IonCol class="ion-text-center">
                <img id="imageid" alt="" src ={trimmedDataURL+''} />
              </IonCol>
            </IonRow></>:null
}

            {/* <img alt="prueba" src={trimmedDataURL} /> */}
            <br/>

            <IonRow hidden={vistaPrevia}>
              <IonCol class="ion-text-center">
                <h2>
                    <b>
                        Vista Previa
                    </b>
                </h2>
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

        

        <IonRow hidden={trimmedDataURL===null?true:false}>
              <IonCol class="ion-text-center">
                <h2>
                    <b>
                        Firma
                    </b>
                </h2>
              </IonCol>
            </IonRow>


            <IonRow hidden={trimmedDataURL===null?true:false}>
              <IonCol class="ion-text-center">
                <img id="imageid" alt="" src ={trimmedDataURL+''} />
              </IonCol>
            </IonRow>
{estado === 'C' ? null:
                    <p className="ion-text-center">                 
                            <IonRow class="ion-text-center">
                                <IonCol class="ion-no-padding">
                <IonButton  disabled= {habilitarCampos} expand="full" color="medium" onClick={() => {setmostrarVentanaFirma(true)} } class="ion-no-margin">{trimmedDataURL===null?'Registrar firma':'Volver a firmar'}</IonButton>          
                                </IonCol>
                            </IonRow> 
                            <IonRow style={{paddingTop: 10}} >
                                <IonCol class="ion-no-padding">
                                    <IonButton disabled= {habilitarCampos} type="submit" size="large" expand="block" color="success" class="ion-no-margin">Finalizar  <IonIcon icon={checkboxOutline}></IonIcon></IonButton>
                                </IonCol>
                            </IonRow>
                    </p> }
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
                message={"La solicitud ha sido completada con exito."}
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
            { estado === "P" && mostrarFooter ? 
            <IonFooter class="ion-no-margin-no-padding" >	
                <IonRow  class="ion-text-center">
                    <IonCol class="ion-no-padding">
                        <IonButton color="success"  size="large" expand="full" class="ion-no-margin" onClick={() => aceptarSolicitud("aceptar")} >Aceptar</IonButton>
                    </IonCol>
                    <IonCol class="ion-no-padding">
                        <IonButton expand="full" size="large" class="ion-no-margin" onClick={() => aceptarSolicitud("rechazar")} >Rechazar</IonButton>
                    </IonCol>
                </IonRow> 
            </IonFooter> : null}
            { estado === "R" && mostrarFooter ? 
            <IonFooter class="ion-no-margin-no-padding" >	
                <IonRow  class="ion-text-center">
                    <IonCol class="ion-no-padding">
                        <IonButton color="warning"  size="large" expand="full" class="ion-no-margin" onClick={() => aceptarSolicitud("pendiente")} >Mover a pendientes</IonButton>
                    </IonCol>
                    {/* <IonCol class="ion-no-padding">
                        <IonButton expand="full" size="large" class="ion-no-margin" onClick={() => aceptarSolicitud("rechazar")} >Rechazar</IonButton>
                    </IonCol> */}
                </IonRow> 
            </IonFooter> : null}
        </IonPage>
    );
};

export default FormularioSolicitudes;