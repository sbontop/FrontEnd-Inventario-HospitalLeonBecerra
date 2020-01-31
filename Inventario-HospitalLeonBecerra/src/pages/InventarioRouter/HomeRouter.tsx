import React from 'react';
import { IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, 
  IonRefresher, IonRefresherContent, IonSearchbar} from '@ionic/react';
import ListRouters from '../../components/RouterComponents/ListRouters';
import { add } from 'ionicons/icons';
import AxiosRouter from '../../services/AxiosRouter';
import { RefresherEventDetail } from '@ionic/core';

import { useState, useEffect } from 'react';

const HomeRouter: React.FC = () => {
  const [routers, setRouters] = useState([] as any);
  
  useEffect(() => {
  AxiosRouter.listado_routers().then(res => {
    setRouters(res.data); });    
}, []);

  const cargar_routers = () => {
    AxiosRouter.listado_routers().then(res => {
      setRouters(res.data); });    
  }

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
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
          </IonButtons>
        </IonToolbar>
      
        <IonSearchbar placeholder="Buscar un router..."
          // onIonChange={(e: CustomEvent) => this.props.setSearchText(e.detail.value)} 
          >
        </IonSearchbar>  

        <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon="arrow-dropdown"
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Actualizando...">
        </IonRefresherContent>
      </IonRefresher>

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
      </IonPage>
    );
    
  }

export default HomeRouter;
