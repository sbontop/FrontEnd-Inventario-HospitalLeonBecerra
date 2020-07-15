import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime, 
    useIonViewDidEnter,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonViewWillLeave,
    IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/react';
import ListIps from '../../components/ipComponents/ListIps';
import { add, options } from 'ionicons/icons';
import AxiosIp from '../../services/AxiosIp';
import { RefresherEventDetail } from '@ionic/core';
import { useState } from 'react';

const HomeIp: React.FC = () => {
    const [ips, setIps] = useState([] as any);
    const [showPopover, setShowPopover] = useState<{ open: boolean }>({ open: false });
    const [showLoading, setShowLoading] = useState(false);
    const [marca, setMarca] = useState([] as any);
    const [fecha_registro, setFecha_registro] = useState([] as any);
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumberTmp, setPageNumberTmp] = useState(1);
    
    async function fetchData() {
        const url: string =`http://localhost:8000/api/listar_ips?page=${pageNumber}`;

        const res: Response = await fetch(url);
        res
            .json()
            .then(async (res) => {
                if (res && res.data && res.data.length > 0) {
                    setIps([...ips, ...res.data]);
                    setDisableInfiniteScroll(res.data.length < 10);
                } else {
                    setDisableInfiniteScroll(true);
                }
            })
            .catch(err => console.error(err));
    }

    async function fetchDataTmp() {
        const url: string =`http://localhost:8000/api/listar_ips?page=${pageNumberTmp}`;

        const res: Response = await fetch(url);
        res
            .json()
            .then(async (res) => {
                if (res && res.data && res.data.length > 0) {
                    setIps(res.data);
                    setDisableInfiniteScroll(res.data.length < 10);
                } else {
                    setDisableInfiniteScroll(true);
                }
            })
            .catch(err => console.error(err));
    }

    const cargar_ips_prueba = () => {
        console.log('Llamada API');
        AxiosIp.listado_ips_prueba().then(res => {
            console.log(res.data);
        });
    }

    const aplicar_filtros = () => {
        AxiosIp.filtro_ip(marca, "2020-02-02").then(res => {
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

    async function onChange (e: any) {
        let direccion_ip = e.target.value;
        if (direccion_ip) {
            setDisableInfiniteScroll(true);
            AxiosIp.filtrar_ip(direccion_ip).then(res => {
                // console.log(res);
                setIps(res.data);
            }).catch(err => {
                console.log(err);
            });
        } else {
            setPageNumberTmp(1);
            setPageNumber(2);
            fetchDataTmp();
        }
    }

    async function onClear(e: any)  {
        await fetchData();
    }

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    useIonViewWillEnter(async () => {
        console.log('ionViewWillEnter event fired');
        // cargar_ips();
        // cargar_ips_prueba();
        await fetchData();
        console.log(ips);
    });

    useIonViewDidEnter(async () => {
        console.log('useIonViewDidEnter event fired');
        setPageNumber(pageNumber + 1);
    });

    useIonViewWillLeave(async () => {
        console.log('ionViewWillLeave event fired');
        setPageNumber(1);
        setIps([]);
    });

    useIonViewDidLeave(async () => {
        console.log('useIonViewDidLeave event fired');
    });

    async function searchNext($event: CustomEvent<void>) {
        await fetchData();
        console.log(ips);
        setPageNumber(pageNumber + 1);
        ($event.target as HTMLIonInfiniteScrollElement).complete();
    }

    async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setPageNumberTmp(1);
        setPageNumber(2);
        fetchDataTmp();
        event.detail.complete();
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

            <IonSearchbar placeholder="Buscar dirección IP..."
                onIonChange={(e: any) => { onChange(e) }}
                onIonClear={(e: any) => { onClear(e) }}
            >
            </IonSearchbar>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        refreshingSpinner="bubbles"
                    />
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
                <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                    onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent
                        loadingText="Cargando mas Ips...">
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>

            <IonPopover
                isOpen={showPopover.open}
                onDidDismiss={e => setShowPopover({ open: false })}>
                <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                <IonList>
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