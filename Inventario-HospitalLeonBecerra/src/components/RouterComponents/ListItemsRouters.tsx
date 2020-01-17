import React from 'react';
import {IonContent, IonPage, IonList, IonListHeader} from '@ionic/react';
import { useState, useEffect } from 'react';
import AxiosRouter from '../../services/AxiosRouter';
import ListRouters from '../../components/RouterComponents/ListRouters';

const ListItemsRouters: React.FC = () => {
  const [routers, setRouters] = useState([] as any);
  
  useEffect(() => {
    AxiosRouter.listado_routers().then(res => {
      setRouters(res.data); });    
    }, []);

  if (routers.length === 0) {
    return (
      <IonList >
        <IonListHeader>
          No hay ningún resultado
        </IonListHeader>
      </IonList>
    );
  }else{
    return (
      <IonPage>
        <IonContent>
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
};

export default ListItemsRouters;
