import {
    IonItem,  IonLabel, IonAvatar, IonChip, IonList
   } from '@ionic/react';
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
             <IonList  key={this.props.correo}>
             <IonItem>
               <IonLabel>
                 <h2>Usuario: {this.props.nombres} {this.props.apellidos}</h2>
                 <p><small>Departamento: {this.props.departamento}</small></p>
                 <p><small>Correo: {this.props.correo}</small></p>
               </IonLabel>
               <IonAvatar slot="start"><img src="./assets/img/miniuser.svg" alt="imagen" /></IonAvatar>
               <IonChip color="light">
                 <IonAvatar><img src="./assets/img/delete.svg" alt="imagen" /></IonAvatar>
               </IonChip>
             </IonItem>
             </IonList>
     );
   }
   };
   
   
   export default ListaCorreos;