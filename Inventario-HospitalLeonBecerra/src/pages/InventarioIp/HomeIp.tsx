import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption
} from '@ionic/react';
import ListIps from '../../components/ipComponents/ListIps';
import { add, options } from 'ionicons/icons';
import AxiosIp from '../../services/AxiosIp';
import { RefresherEventDetail } from '@ionic/core';
import { useState, useEffect } from 'react';

const HomeIp: React.FC = () => {
    const [ips, setIps] = useState([] as any);
    const [marcas, setMarcas] = useState([] as any);
    const [showPopover, setShowPopover] = useState<{ open: boolean }>({ open: false });
    const [showLoading, setShowLoading] = useState(false);
    const [marca, setMarca] = useState([] as any);
    const [fecha_registro, setFecha_registro] = useState([] as any);

    const cargar_ips = () => {
        AxiosIp.listado_ips().then(res => {
            setIps(res.data);
        });
    }

    const aplicar_filtros = () => {
        AxiosIp.filtro_ip(marca, fecha_registro.substring(0, 10)).then(res => {
            setIps(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handle_aplicar = () => {
        aplicar_filtros();
        setFecha_registro("");
        setMarca("");
        setShowPopover({ open: false })
    }

    const onChange = (e: any) => {
        let direccion_ip = e.target.value;
        if (direccion_ip) {
            AxiosIp.filtrar_ip(direccion_ip).then(res => {
                // console.log(res);
                setIps(res.data);
            }).catch(err => {
                console.log(err);
            });
        } else {
            cargar_ips();
        }
    }

    const onClear = (e: any) => {
        cargar_ips();
    }

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    useEffect(() => {
        setShowLoading(true);
        AxiosIp.listado_ips().then(res => {
            setIps(res.data);
        });
    }, []);

    useEffect(() => {
        AxiosIp.marcas_ips().then(res => {
            setMarcas(res.data);
        });
    }, []);

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            cargar_ips();
            event.detail.complete();
        }, 2000);
    }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home"></IonBackButton>
                </IonButtons>
                <IonTitle>Inventario de Ips</IonTitle>
                <IonButtons slot="end">
                    <IonButton routerLink="/formularioip"><IonIcon icon={add}></IonIcon></IonButton>
                    <IonButton onClick={(e) => setShowPopover({ open: true })}><IonIcon icon={options}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar un router..."
                onIonChange={(e: any) => { onChange(e) }}
                onIonClear={(e: any) => { onClear(e) }}
            >
            </IonSearchbar>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent refreshingSpinner="bubbles">
                    </IonRefresherContent>
                </IonRefresher>
                <IonLoading
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Cargando datos, espere por favor...'}
                    duration={5000}
                />
                {ips.map((ip: any) => {
                    return (
                        <ListIps
                            key={`${ip.id_ip}`}
                            id_ip={ip.id_ip}
                            estado={ip.estado}
                            fecha_asignacion={ip.fecha_asignacion}
                            direccion_ip={ip.direccion_ip}
                            hostname={ip.hostname}
                            subred={ip.subred}
                            fortigate={ip.fortigate}
                            observacion={ip.observacion}
                            maquinas_adicionales={ip.maquinas_adicionales}
                            nombre_usuario={ip.nombre_usuario}
                            encargado_registro={ip.encargado_registro}
                        />
                    )
                })}
            </IonContent>

            <IonPopover
                isOpen={showPopover.open}
                onDidDismiss={e => setShowPopover({ open: false })}>
                <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                <IonList>
                    <IonItem>
                        <IonLabel>Marca</IonLabel>
                        <IonSelect placeholder="Todas" name="Todas" value={marca} onIonChange={(e) => setMarca(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                            <IonSelectOption selected>Todas</IonSelectOption>
                            {marcas.map((m: any) => {
                                return (
                                    <IonSelectOption key={m.id_marca} value={m.nombre}>
                                        {m.nombre}
                                    </IonSelectOption>
                                );
                            })}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Fecha registro</IonLabel>
                        <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha" onIonChange={(e) => setFecha_registro(e.detail.value)}
                            placeholder="Fecha" displayFormat="DD/MM/YYYY"
                        ></IonDatetime>
                    </IonItem>
                </IonList>
                <div className="ion-text-center ion-margin">
                    <IonButton onClick={() => setShowPopover({ open: false })}>Cancelar</IonButton>
                    <IonButton onClick={() => handle_aplicar()}>Aplicar</IonButton>
                </div >
            </IonPopover>
        </IonPage>
    );
}

export default HomeIp;
