import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, IonItem, IonLabel, IonInput, IonText, IonButtons, IonHeader, 
    IonList, IonButton, IonRow, IonCol, IonNote, IonTextarea, IonIcon, IonListHeader, IonFooter, IonLoading, useIonViewWillEnter, useIonViewWillLeave,
    IonModal, IonGrid, withIonLifeCycle} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import AxiosSolicitudes from '../../services/AxiosSolicitudes';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack, trendingDown, trendingUp, remove, close, flash , time, calendar, checkmarkCircle, checkboxOutline, save, build, person, man, card, business, locate, information, informationCircleOutline, desktop} from 'ionicons/icons';


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
    const [confirmarEdicion6, setConfirmarEdicion6] = useState(false);
    const [vistaPrevia, setVistaPrevia] = useState(true);

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
        cargar_empleados(); 
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
    if ( responsable === undefined || equipos === undefined ) {
        setMensaje("Debe completar todos los campos");
        setIncompleto(true);
    } else {  
        
        let registro = {
            equipos: equipo,
            id_usuario: responsable,
            observacion: observacion,
            id_solicitud: id,
        }
        // if (!editionMode) {
          try{
            AxiosSolicitudes.crear_atencion_solicitud1(registro).then(() => {
                
                console.log(guardar);
                }).catch(err => {
                    setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                    if (err.response) {
                        setMensaje(err.response.data.log)
                    }
                    setError(true);
                });
                AxiosFirma.almacenar_firma(formData).then(res => {   
          //this.cargando = false;
                
          console.log("Upload44");
          console.log("Data: ",res);
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
               
            // }); 
        // } else {
            // console.log(registro);
            
            // AxiosRouter.editar_router(registro_equipo_router).then(res => {
            //     console.log(res)
            //     setMensaje("Registro actualizado satisfactoriamente")                   
            //     setConfirmarEdicion(true);
            // }).catch(() => {
            //     setError(true);
            // });
        // }
    }   
    } 

    const volver_principal = () => {
         setGuardar(false);
        
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
    //let sigPad:any = {};

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
        //this.cargando = true;
        
        settrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
        setmostrarVentanaFirma(false);
        /*
        let image = new Image();
        image.src = sigPad.getTrimmedCanvas().toDataURL('image/png');
        //console.log("Informa: ",sigPad.getTrimmedCanvas().toDataURL('image/png'));
        guardar_url();
        console.log("Recort: ",trimmedDataURL);
        const canvas = sigPad.getTrimmedCanvas();
        canvas.toBlob((blob:any) => {
        const formData = new FormData();
        formData.append('image_name', blob);
        AxiosFirma.almacenar_firma(formData).then(res => {   
          //this.cargando = false;
                
          console.log("Upload44");
          console.log("Data: ",res);
        }).catch(err => {
          console.log(err);      
          console.log('Error 2');
        });
      });*/
    
    //   /this.cargar();/
      //this.cargar2();
      //var base64:any = this.getBase64Image(document.getElementById("imageid"));
      //console.log("Base: "); 
    
      //this.obtener_imagen_firma_electronica();
       
    
    }

    const vista_previa = () => {
        settrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
        setVistaPrevia(false);
        console.log("Data: ",trimmedDataURL);
        /*this.getBase64Image(this.state.url_cargada, function(base64image:any){
          console.log('vista_previa',base64image);
        });*/
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

                <IonList>
                <IonListHeader className="ion-text-center">ATENCIÓN DE SOLICITUD</IonListHeader>
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
                        </IonInput>   
                    </IonItem> 

                    <IonItem>

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
                    </IonItem> 

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
                            if(estado==='En progreso'){
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