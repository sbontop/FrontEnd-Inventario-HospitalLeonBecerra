import React from 'react';
import { IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
  IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption} from '@ionic/react';
import ListRouters from '../../components/RouterComponents/ListRouters';
import { add, options } from 'ionicons/icons';
import AxiosRouter from '../../services/AxiosRouter';
import { RefresherEventDetail } from '@ionic/core';
import { useState, useEffect } from 'react';

const HomeRouter: React.FC = () => {
  const [routers, setRouters] = useState([] as any);
  const [marcas, setMarcas] = useState([] as any);
  const [marca, setMarca] = useState([] as any);
  const [showPopover, setShowPopover] = useState<{open: boolean}>({open: false});
  const [showLoading, setShowLoading] = useState(false);
  const [fecha_registro, setFecha_registro] = useState([] as any);

  const aplicar_filtros = () => {
    AxiosRouter.filtro_router(marca, fecha_registro.substring(0, 10)).then(res => {
      setRouters(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const handle_aplicar = () => {
    aplicar_filtros();
    setFecha_registro("");
    setMarca("");
    setShowPopover({open: false})
}

  setTimeout(() => {
    setShowLoading(false);
  }, 2000);

  useEffect(() => {
    setShowLoading(true);
    AxiosRouter.listado_routers().then(res => {
      setRouters(res.data); });    
  }, []);

  useEffect(() => {
    AxiosRouter.marcas_routers().then(res => {
      setMarcas(res.data); });    
  }, []);

  const cargar_routers = () => {
    AxiosRouter.listado_routers().then(res => {
      setRouters(res.data); });    
  }
  
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      cargar_routers();
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonToolbar color="primary">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
        <IonTitle>Inventario de routers</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink="/formulariorouter"><IonIcon icon={add}></IonIcon></IonButton>
          <IonButton onClick={(e) => setShowPopover({open: true})}><IonIcon icon={options}></IonIcon></IonButton>
        </IonButtons>
      </IonToolbar>
       
      <IonSearchbar placeholder="Buscar un router..."
        // onIonChange={(e: CustomEvent) => this.props.setSearchText(e.detail.value)} 
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
        {routers.map((r: any)=>{
          return (             
            <ListRouters key={`${r.id_router}`} 
            id_router={r.id_router} 
            nombre={r.nombre} 
            pass={r.pass} 
            puerta_enlace={r.puerta_enlace}
            usuario={r.usuario} 
            clave={r.clave} 
            id_equipo={r.id_equipo} />
          )
        })}
      </IonContent>

      <IonPopover      
        isOpen={showPopover.open}
        onDidDismiss={e => setShowPopover({open: false})}>
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
          <IonButton onClick={() => setShowPopover({open: false})}>Cancelar</IonButton>
          <IonButton onClick={() => handle_aplicar()}>Aplicar</IonButton>
        </div > 
      </IonPopover>
    </IonPage>  
    );
  }

export default HomeRouter;
