import {
    IonItem,  IonLabel, IonAvatar,IonIcon, IonList
   } from '@ionic/react';
   import { trash } from 'ionicons/icons';
   import React from 'react';
   
   interface ICorreo {
     nombres: string;
     apellidos: string;
     departamento: string;
     correo: string;
   }
   
   class ListaCorreos extends React.Component<ICorreo>  {
   render(){
     return ( 
             <IonList >
             <IonItem>
               <IonLabel>
                 <h2>Usuario: {this.props.nombres} {this.props.apellidos}</h2>
                 <p><small>Departamento: {this.props.departamento}</small></p>
                 <p><small>Correo: {this.props.correo}</small></p>
               </IonLabel>
               <IonAvatar slot="start"><img src="./assets/img/miniuser.svg" alt="imagen" /></IonAvatar>
               <IonIcon slot="end" icon={trash} ></IonIcon>
             </IonItem>
             </IonList>
     );
   }
   };
   
   
   export default ListaCorreos;