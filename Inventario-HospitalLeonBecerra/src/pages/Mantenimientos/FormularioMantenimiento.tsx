
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonList,
    IonSelect, IonSelectOption, IonAlert, IonText, IonIcon, IonButtons, IonGrid, IonRow, IonCol, IonDatetime, IonTextarea, IonToggle,
    IonLoading, useIonViewWillEnter
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useState } from 'react';
import AxiosMantenimiento from '../../services/AxiosMantenimiento';
import { useParams, Redirect } from 'react-router';

/* Atributos basados en el archivo Anidex */
const FormularioMantenimiento: React.FC = () => {
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha_inicio, setFecha_inicio] = useState("");
    const [fecha_fin, setFecha_fin] = useState("");
    const [observacion_falla, setObservacion_falla] = useState("");
    const [estado_fisico, setEstado_fisico] = useState("");
    const [actividad_realizada, setActividad_realizada] = useState("");
    const [observacion, setObservacion] = useState("");
    const [codigo, setCodigo] = useState("");
    const [id_solicitud, setId_solicitud] = useState(null);
    const [realizado_por] = useState("admin");//, setRealizado_por
    const [fecha_recordatorio, setFecha_recordatorio] = useState("");
    const [hora_recordatorio, setHora_recordatorio] = useState("");
    const [editionMode, setEditionMode] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [incompleto, setIncompleto] = useState(false);
    const [error, setError] = useState(false);
    const [recordatorio, setRecordatorio] = useState(false);
    const [confirmar, setConfirmar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dirigir, setDirigir] = useState(false);
    const [accionLoading, setAccionLoading] = useState("");
    const [solicitudes, setSolicitudes] = useState([] as any);
    const { id, codigo_equipo, tipo_equipo, estado_operativo } = useParams();

    useIonViewWillEnter(() => {
        AxiosMantenimiento.solicitudes_en_progreso().then(res => {
            setSolicitudes(res.data);
        });
    }, []);

    useIonViewWillEnter(() => {
        if (id !== undefined) {
            setEditionMode(true);
            cargar_datos(id);
        } else {
            if (codigo_equipo !== "undefined") {
                setCodigo(codigo_equipo);
            }
        }
    }, [id]);

    const cargar_datos = (id: any) => {
        setAccionLoading("Cargando")
        setLoading(true);
        AxiosMantenimiento.mantenimiento_id(id).then(res => {
            res.data.forEach(function (d: any) {
                setCodigo(d.codigo)
                setTitulo(d.titulo);
                setTipo(d.tipo);
                setFecha_inicio(d.fecha_inicio);
                setFecha_fin(d.fecha_fin);
                setObservacion_falla(d.observacion_falla);
                setEstado_fisico(d.estado_fisico);
                setActividad_realizada(d.actividad_realizada);
                setObservacion(d.observacion);
                setId_solicitud(d.id_solicitud);
                //  setFecha_recordatorio(d.fecha_recordatorio);
                //  setHora_recordatorio(d.hora_recordatorio);
            });
            if (fecha_recordatorio !== "") {
                setRecordatorio(true)
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            setError(true);
        });
    }

    /**
     * Función para gestionar el registro de un correo
     */
    const registrar_mantenimiento = () => {

        if (validar_inputs()) {
            let advertencia = "Debe completar todos los campos.";
            if (recordatorio) {
                advertencia = advertencia + " Si ha elegido programar un recordatorio, debe especificar una fecha y hora.";
            }
            setConfirmar(false);
            setMensaje(advertencia);
            setIncompleto(true);
        } else {
            setAccionLoading("Guardando")
            setLoading(true);
            if (!editionMode) {
                crear_mantenimiento(retornar_registro());
            } else {
                editar_mantenimiento(retornar_registro());
            }
        }
    }

    const retornar_registro = () => {
        return {
            titulo: titulo,
            tipo: tipo,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            observacion_falla: observacion_falla,
            estado_fisico: estado_fisico,
            actividad_realizada: actividad_realizada,
            observacion: observacion,
            id_solicitud: id_solicitud,
            realizado_por: realizado_por,
            fecha_recordatorio: fecha_recordatorio,
            hora_recordatorio: hora_recordatorio,
            id_mantenimiento: id,
            codigo: codigo
        }

    }

    const validar_inputs = () => {
        if (tipo === "" || fecha_inicio === "" || titulo === "" || validar_recordatorio()) {
            return true;
        }
        return false;
    }

    const validar_recordatorio = () => {
        if ((recordatorio && (fecha_recordatorio === "" || hora_recordatorio === ""))) {
            return true;
        }
        return false;
    }


    /**
     * Función para crear un nuevo mantenimiento en la base de datos.
     * @param registro_mantenimiento 
     */
    const crear_mantenimiento = (registro_mantenimiento: any) => {
        AxiosMantenimiento.crear_mantenimiento(registro_mantenimiento).then(() => {
            setMensaje("Registro guardado satisfactoriamente")
            setLoading(false)
            setAlerta(true);
        }).catch(err => {
            setLoading(false)
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            if (err.response) {
                setMensaje(err.response.data.log)
            }
            setError(true);
        });
    }

    /**
     * Función para editar un correo en la base de datos.
     * @param registro_mantenimiento 
     */
    const editar_mantenimiento = (registro_mantenimiento: any) => {
        AxiosMantenimiento.editar_mantenimiento(registro_mantenimiento).then(() => {
            setMensaje("Registro actualizado satisfactoriamente")
            setLoading(false)
            setAlerta(true);
        }).catch(err => {
            setLoading(false)
            setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
            if (err.response) {
                setMensaje(err.response.data.log)
            }
            setError(true);
        });
    }

    const evento_recordatorio = (valor: any) => {
        setRecordatorio(valor);
        if (valor === false) {
            setHora_recordatorio("");
            setFecha_recordatorio("");
        }
    }

    const volver_principal = () => {
        setAlerta(false);
        setDirigir(true);
    }

    if (dirigir) {
        return (<Redirect to={"/homehistorial/" + codigo_equipo + "/" + tipo_equipo + "/" + estado_operativo} />);
    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonButton routerLink={"/homehistorial/" + codigo_equipo + "/" + tipo_equipo + "/" + estado_operativo}>
                            <IonIcon icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{editionMode ? "Editar mantenimiento" : "Nuevo mantenimiento"}</IonTitle>
                </IonToolbar>
                
            </IonHeader>
            <IonContent className="ion-padding">
                <IonLoading
                    isOpen={loading}
                    message={accionLoading + ' datos, espere por favor...'}
                />
                <form onSubmit={(e) => { e.preventDefault(); setConfirmar(true); }} action="post">
                    <IonList>
                        <IonRow class="ion-text-center">
                            <IonCol size="4">
                                <img src="./assets/img/mantenimiento/form.png" alt="Mantenimiento" />
                            </IonCol>
                            <IonCol size="8">
                                <IonItem>
                                    <IonLabel position="stacked">Código del equipo</IonLabel>
                                    <IonInput readonly required value={codigo}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonItem>
                            <IonLabel >Fecha de inicio<IonText color="danger">*</IonText> </IonLabel>
                            <IonDatetime className="ion-margin-top" value={fecha_inicio} doneText="Ok" cancelText="Cancelar" name="fecha_inicio"
                                onIonChange={(e: any) => setFecha_inicio(e.detail.value! ? e.detail.value.substring(0, 10) : "")}
                                placeholder="Fecha inicio" displayFormat="DD/MM/YYYY" min="2020" max="2030" onIonCancel={(e: any) => setFecha_inicio("")} ></IonDatetime>
                        </IonItem>

                        <IonItem>
                            <IonLabel>Fecha de finalización</IonLabel>
                            <IonDatetime className="ion-margin-top" value={fecha_fin} doneText="Ok" cancelText="Cancelar" name="fecha_fin"
                                onIonChange={(e: any) => setFecha_fin(e.detail.value! ? e.detail.value.substring(0, 10) : "")}
                                placeholder="Fecha fin" displayFormat="DD/MM/YYYY" min="2020" max="2030" onIonCancel={(e: any) => setFecha_fin("")}
                            ></IonDatetime>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Solicitud relacionada</IonLabel>
                            <IonSelect value={id_solicitud} name="estado" onIonChange={(e) => setId_solicitud(e.detail.value)} okText="Ok" cancelText="Cancelar">
                                <IonSelectOption value={null}>Ninguna</IonSelectOption>
                                {solicitudes.map((m: any) => {
                                    return (
                                        <IonSelectOption key={m.id_solicitud} value={m.id_solicitud}>
                                            {'ID:' + m.id_solicitud + '-' + m.id_usuario}
                                        </IonSelectOption>
                                    );
                                })}
                            </IonSelect>
                        </IonItem>



                        <IonItem>
                            <IonLabel position="stacked">Tipo de mantenimiento<IonText color="danger">*</IonText></IonLabel>
                            <IonSelect value={tipo} name="estado" onIonChange={(e) => setTipo(e.detail.value)} okText="Ok" cancelText="Cancelar">
                                <IonSelectOption value="C">Correctivo</IonSelectOption>
                                <IonSelectOption value="P">Preventivo</IonSelectOption>
                                <IonSelectOption value="R">Revisión</IonSelectOption>
                            </IonSelect>
                        </IonItem>



                        <IonItem>
                            <IonLabel position="stacked">Título<IonText color="danger">*</IonText></IonLabel>
                            <IonInput name="titulo" required value={titulo} inputMode="text" placeholder="Breve descripción del mantenimiento." onIonChange={e => setTitulo(e.detail.value!)}></IonInput>
                        </IonItem>


                        <IonItem>
                            <IonLabel position="stacked">Observación sobre la falla</IonLabel>
                            <IonTextarea className="ion-margin-top" inputMode="text" placeholder="Descripción de la falla." value={observacion_falla} onIonChange={e => setObservacion_falla(e.detail.value!)}></IonTextarea>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Estado físico del equipo</IonLabel>
                            <IonTextarea className="ion-margin-top" inputMode="text" placeholder="Descripción del estado del equipo." value={estado_fisico} onIonChange={e => setEstado_fisico(e.detail.value!)}></IonTextarea>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Actividad realizada</IonLabel>
                            <IonTextarea className="ion-margin-top" inputMode="text" value={actividad_realizada} placeholder="Actividad realizada." onIonChange={e => setActividad_realizada(e.detail.value!)}></IonTextarea>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Observaciones</IonLabel>
                            <IonTextarea className="ion-margin-top" inputMode="text" value={observacion} placeholder="Comentarios del técnico." onIonChange={e => setObservacion(e.detail.value!)}></IonTextarea>
                        </IonItem>
                        <IonItem>
                            <IonLabel >Programar recordatorio</IonLabel>
                            <IonToggle value="programacion" checked={recordatorio} onIonChange={e => evento_recordatorio(e.detail.checked)} />
                        </IonItem>
                        {recordatorio ?
                            <div>
                                <IonItem>
                                    <IonLabel position="stacked">Fecha del recordatorio</IonLabel>
                                    <IonDatetime value={fecha_recordatorio} doneText="Ok" cancelText="Cancelar" name="fecha_recordatorio"
                                        onIonChange={(e: any) => setFecha_recordatorio(e.detail.value! ? e.detail.value.substring(0, 10) : "")}
                                        placeholder="Fecha" displayFormat="DD/MM/YYYY" min="2020" max="2030"></IonDatetime>
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Hora del recordatorio</IonLabel>
                                    <IonDatetime displayFormat="HH:mm" value={hora_recordatorio} doneText="Ok" cancelText="Cancelar" onIonChange={e => setHora_recordatorio(e.detail.value!)}></IonDatetime>
                                </IonItem>
                            </div> : null
                        }

                        <p className="ion-text-center">
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonButton color="success" disabled={codigo === "undefined" ? true : false} type="submit">{!editionMode ? "Guardar" : "Guardar cambios"}</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton color="danger" routerLink="/homemantenimientos">Cancelar</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </p>
                    </IonList>
                </form>
                <IonAlert
                    isOpen={incompleto}
                    onDidDismiss={() => setIncompleto(false)}
                    message={mensaje}
                    buttons={['Aceptar']}
                />
                <IonAlert
                    isOpen={error}
                    onDidDismiss={() => setError(false)}
                    message={mensaje}
                    buttons={['Aceptar']}
                />
                <IonAlert
                    isOpen={alerta}
                    onDidDismiss={() => volver_principal()}
                    message={mensaje}
                    buttons={[{
                        text: 'Aceptar',
                        handler: () => {
                            volver_principal();
                        }
                    }
                    ]}
                />

                <IonAlert
                    isOpen={confirmar}
                    header={'Confirmación'}
                    message={!editionMode ? '¿Está seguro de agregar este mantenimiento?': '¿Está seguro de modificar este mantenimiento?'}
                    buttons=
                    {[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'primary',
                            handler: () => {
                                setConfirmar(false);
                            }
                        },
                        {
                            cssClass: 'success',
                            text: 'Aceptar',
                            handler: () => {
                                registrar_mantenimiento();
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage >
    );
};

export default FormularioMantenimiento;
