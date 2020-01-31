import {
    IonItem,  IonLabel, IonButton, IonThumbnail
   } from '@ionic/react';

   import React from 'react';
   
   interface IPrinter {
     codigo: string;
     estado_operativo: string;
     marca: string;
   }
   
   class ListaImpresoras extends React.Component<IPrinter>  {
   render(){
     return ( 
              <IonItem>
                <IonLabel>
                  <h2><b>IMPRESORA: {this.props.codigo}</b></h2>
                  <h3>Estado: {this.props.estado_operativo}</h3>
                  <p>Marca: {this.props.marca}</p>
                </IonLabel>
                <IonThumbnail>
                  <img src={process.env.PUBLIC_URL+"/assets/img/printer.png"} alt=""/>
                </IonThumbnail>
                <IonButton class="btn1" fill="clear"> X </IonButton>

              </IonItem>
     );
   }
   };
   
   
   export default ListaImpresoras;