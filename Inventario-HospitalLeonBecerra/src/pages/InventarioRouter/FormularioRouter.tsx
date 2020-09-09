import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, IonGrid, IonItem, IonLabel, IonInput, IonText, 
         IonButtons, IonHeader, IonList, IonButton, IonRow, IonCol, IonTextarea, IonIcon, IonLoading, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useState } from 'react';
import AxiosRouter from '../../services/AxiosRouter';
import Autenticacion from '../InicioSesion/Autenticacion';
import AxiosPC from '../../services/AxiosPC';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { arrowBack, eye, eyeOff } from 'ionicons/icons';

const FormularioRouter: React.FC = () => {
    let { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [pass, setPass] = useState("");
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [codigo, setCodigo] = useState("");
    const [id_marca, setId_marca] = useState("");
    const [marcas, setMarcas] = useState([] as any);
    const [empleados, setEmpleados] = useState([] as any);
    const [empleado, setEmpleado] = useState("");
    const [estado, setEstado] = useState("");
    const [estados] = useState([{id:"D", estado: "Disponible"},{id:"O", estado: "Operativo"},{id:"ER", estado: "En revisión"}, {id:"R", estado: "Reparado"}] as any);
    const [ips, setIps] = useState([] as any);
    const [ip, setIp] = useState("");
    const [modelo, setModelo] = useState("");
    const [numero_serie, setNumero_serie] = useState("");
    const [puerta_enlace, setPuerta_enlace] = useState("");
    const [passwordMode, setPasswordMode] = useState(true);    
    const [passwordMode1, setPasswordMode1] = useState(true);
    const [descripcion, setDescripcion] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accionLoading, setAccionLoading] = useState("");
    const [confirmarRegistro, setConfirmarRegistro] = useState(false);
    const [incompleto, setIncompleto] = useState(false);
    const [editionMode, setEditionMode] = useState(false);
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [redireccionar, setRedireccionar] = useState(false);
    
    useIonViewWillEnter(() => {
        AxiosPC.mostrar_marcas().then(res => {
            setMarcas(res.data); });    
    }, []);
  
    useIonViewWillEnter(() => {
        AxiosRouter.empleados().then(res => {
            setEmpleados(res.data); });    
    }, []);
  
    useIonViewWillEnter(() => {
        AxiosRouter.ips().then(res => {
            setIps(res.data); });    
    }, []);

    useIonViewWillLeave(()=>{
        setIps([] as any);
        setMarcas([] as any);
        setEmpleados([]);
        setCodigo("");
        setEmpleado("");
        setNombre("");
        setPass("");
        setUsuario("");
        setClave("");
        setId_marca("");
        setModelo("");
        setNumero_serie("");
        setPuerta_enlace("");
        setEstado("");
        setIp("");
        setDescripcion("");
        setDescripcion("");
    });

    useIonViewWillEnter(() => {
        if (id !== undefined){
            setEditionMode(true);
            setAccionLoading("Cargando");
            setLoading(true);
            AxiosRouter.datos_router(id).then(res => {
                console.log("edición:", res.data)
                setCodigo(res.data.codigo);
                setEmpleado(res.data.asignado);
                setNombre(res.data.nombre);
                setPass(res.data.pass);
                setUsuario(res.data.usuario);
                setClave(res.data.clave);
                setId_marca(res.data.id_marca);
                setModelo(res.data.modelo);
                setNumero_serie(res.data.numero_serie);
                setPuerta_enlace(res.data.puerta_enlace);
                setEstado(res.data.estado_operativo);
                setIp(res.data.ip);
                setDescripcion(res.data.descripcion);
                setLoading(false);
            }).catch(() => {
                setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
                setError(true);
            });
        }
    }, [id]);

    const cambiar_tipo = () => {
        passwordMode ? setPasswordMode(false) : setPasswordMode(true)
    }

    const cambiar_tipo1 = () => {
        passwordMode1 ? setPasswordMode1(false) : setPasswordMode1(true)
    }

    const guardar = () => {
        if (codigo === "" || nombre === "" || pass === "" || usuario === "" || clave === ""
            || id_marca === "" || modelo === "" || numero_serie === "" || estado === "") {
            setMensaje("Debe completar todos los campos");
            setIncompleto(true);
            setConfirmarRegistro(false);
        }else{
            setConfirmarRegistro(true);
        } 
    }

    const registrar = () => {    
        let registro_equipo_router = {
            id_equipo: id,
            fecha_registro: new Date().toISOString().substr(0,10),
            codigo: codigo,
            tipo_equipo: "Router",
            id_marca: id_marca,
            asignado: empleado,
            estado_operativo: estado,
            modelo: modelo,
            numero_serie: numero_serie,
            descripcion: descripcion,
            encargado_registro: Autenticacion.getEncargadoRegistro(),
            componente_principal: null,
            ip: ip,        
            nombre: nombre,
            pass: pass,
            puerta_enlace: puerta_enlace,
            usuario: usuario,
            clave: clave
        }
        if (!editionMode) {
            setAccionLoading("Guardando");
            setLoading(true);
            AxiosRouter.crear_equipo_router(registro_equipo_router).then(() => {                  
                setLoading(false);
                setMensaje("Registro guardado satisfactoriamente");
                setAlerta(true);
            }).catch(err => {
                setLoading(false);
                if (err.response) {
                    setMensaje(err.response.data.log) 
                }
                setError(true);
            });
        } else {
            console.log(registro_equipo_router);
            setAccionLoading("Actualizando");
            setLoading(true);
            AxiosRouter.editar_router(registro_equipo_router).then(() => {
                setLoading(false);
                setMensaje("Registro actualizado satisfactoriamente");
                setAlerta(true);
            }).catch((err) => {
                setLoading(false);
                if (err.response) {
                    setMensaje(err.response.data.log)
                }
                setError(true);
            });
        }   
    } 
  
    const volver_principal = () => {
        setAlerta(false);
        setRedireccionar(true);
    }
  
    if (localStorage.userdata === undefined){
        return (<Redirect to="/iniciarsesion" />)
    }

    if (redireccionar) {
        return (<Redirect to="/homerouter" />);
    }
  
    return (
        <IonPage>  
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonButton routerLink="/homerouter"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>{!editionMode ? "Agregar router" : "Editar router"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading 
                isOpen={loading}
                message={accionLoading+' datos, espere por favor...'}
            />
            <IonContent className="ion-padding">
                <form onSubmit={(e) => { e.preventDefault(); guardar(); }} action="post">
                    <IonList>  
                        <IonRow class="ion-text-center">
                            <IonCol size="4"> <img src="./assets/img/router/router.png" alt="router" /> </IonCol>
                            <IonCol size="8">            
                                <IonItem>
                                    <IonLabel position="floating">Código<IonText color="primary">*</IonText></IonLabel>
                                    <IonInput disabled = {editionMode} required type="text" name="codigo" value={codigo} onIonChange={(e) => setCodigo((e.target as HTMLInputElement).value)} ></IonInput>
                                </IonItem>            
                    
                            </IonCol>
                        </IonRow>  
                        <IonItem>
                            <IonLabel position="floating">Asignar a empleado</IonLabel>
                            <IonSelect name="empleado" value={empleado} onIonChange={(e) => setEmpleado(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                                <IonSelectOption key={0} value={null}>
                                    {"Ninguno"} 
                                </IonSelectOption>
                                {empleados.map((m:any, index:number) => {
                                return (
                                <IonSelectOption key={index} value={m.id}>
                                    {m.nombre+ ' ' + m.apellido} 
                                </IonSelectOption>
                                );
                            })}
                            </IonSelect>   
                        </IonItem> 
                        <IonItem>
                            <IonLabel position="floating">Nombre<IonText color="primary">*</IonText></IonLabel>
                            <IonInput required type="text" name="nombre" value={nombre} onIonChange={(e) => setNombre((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Pass<IonText color="primary">*</IonText></IonLabel>
                            <IonInput required type={passwordMode ? "password" : "text"} name="pass" value={pass} onIonChange={(e) => setPass((e.detail.value!))} >
                            <IonIcon className="btn_eye_icon" icon={passwordMode ? eye : eyeOff} color="primary" onClick={() => cambiar_tipo()} ></IonIcon></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Usuario<IonText color="primary">*</IonText></IonLabel>
                            <IonInput required type="text" name="usuario" value={usuario} onIonChange={(e) => setUsuario((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Clave <IonText color="primary">*</IonText></IonLabel>
                            <IonInput type={passwordMode1 ? "password" : "text"} name="clave" value={clave} onIonChange={(e) => setClave((e.detail.value!))} >
                            <IonIcon className="btn_eye_icon"  icon={passwordMode1 ? eye : eyeOff} color="primary" onClick={() => cambiar_tipo1()} ></IonIcon>
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Marca<IonText color="primary">*</IonText></IonLabel>
                            <IonSelect name="id_marca" value={id_marca} onIonChange={(e) => setId_marca(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            {marcas.map((m:any, index:number) => {
                                return (
                                <IonSelectOption key={index} value={m.id_marca}>
                                    {m.nombre} 
                                </IonSelectOption>
                                );
                            })}
                            </IonSelect>   
                        </IonItem> 
                        <IonItem>
                            <IonLabel position="floating">Modelo<IonText color="primary">*</IonText></IonLabel>
                            <IonInput required type="text" name="modelo" value={modelo} onIonChange={(e) => setModelo((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Número de serie<IonText color="primary">*</IonText></IonLabel>
                            <IonInput required type="text"  name="numero_serie" value={numero_serie} onIonChange={(e) => setNumero_serie((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Estado<IonText color="primary">*</IonText></IonLabel>
                            <IonSelect name="estado" value={estado} onIonChange={(e) => setEstado(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                                {estados.map((m:any, index:number) => {
                                return (
                                <IonSelectOption key={index} value={m.id}>
                                    {m.estado} 
                                </IonSelectOption>
                                ); 
                            })} 
                            </IonSelect>   
                        </IonItem> 
                        <IonItem>
                            <IonLabel position="floating">Dirección IP</IonLabel>
                            <IonSelect name="ip" value={ip} onIonChange={(e) => setIp(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                                <IonSelectOption key={0} value={null}>
                                    {"Ninguna"}
                                </IonSelectOption>
                                {ips.map((m:any, index:number) => {
                                return (
                                <IonSelectOption key={index} value={m.id_ip}>
                                    {m.direccion_ip} 
                                </IonSelectOption>
                                );
                            })}
                            </IonSelect>   
                        </IonItem> 
                        <IonItem>
                            <IonLabel position="floating">Puerta de enlace</IonLabel>
                            <IonInput type="text" name="puerta_enlace" value={puerta_enlace} onIonChange={(e) => setPuerta_enlace((e.target as HTMLInputElement).value)} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Descripción</IonLabel>
                            <IonTextarea name="descripcion" value={descripcion} onIonChange={(e) => setDescripcion((e.target as HTMLInputElement).value)}></IonTextarea>
                        </IonItem>             
                        <p className="ion-text-center">
                            <IonGrid>
                                <IonRow class="ion-text-center">
                                    <IonCol>
                                        <IonButton type="submit" color="success" class="ion-no-margin">{!editionMode ? "Guardar" : "Guardar cambios"} </IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton color="primary" routerLink="/homerouter" class="ion-no-margin">Cancelar</IonButton>          
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
                    message={mensaje}
                    buttons=
                    {[   
                        {
                            cssClass: 'success',
                            text: 'Aceptar',
                            handler: () => {
                                setConfirmarRegistro(false);
                                setError(false);
                                setMensaje("");
                            }
                        }        
                    ]}
                />
                <IonAlert
                isOpen={confirmarRegistro}
                header={'Confirmación'}
                message={!editionMode ? '¿Está seguro de agregar este nuevo registro?' : '¿Está seguro de modificar este registro?'}
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
                                registrar()             
                            }
                        }        
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};
  
export default FormularioRouter;
  
