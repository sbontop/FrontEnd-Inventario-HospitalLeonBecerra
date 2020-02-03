import {
  IonItem,  IonLabel, IonButton, IonIcon,IonAvatar, IonList, IonPopover, IonTitle, IonRippleEffect
 } from '@ionic/react';
 import { trash } from 'ionicons/icons';

 import React from 'react';
 
 interface IPrinter {
  id_impresora:string,
  numero_serie:string;
  tipo: string;
  marca: string;
  codigo: string;
  estado_operativo: string;
  modelo: string,
  tinta: string,
  cartucho: string,
  toner: string,
  cinta: String,
  rollo: String,
  rodillo: String,

  descripcion: string
 }
 


 interface estados {
  ventanaDetalle: boolean
}



 class ListaImpresoras extends React.Component<IPrinter, estados, {history:any}>  {

  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false
    }
  }

 render(){
   return ( 
            <IonList>
            <IonItem className = "ion-activatable">
              <IonLabel key={this.props.id_impresora} onClick={() => this.setState({ ventanaDetalle: true })}>
                
                
                <h2><b>IMPRESORA: {this.props.codigo}</b></h2>
                <h3>Estado: {this.props.estado_operativo}</h3>
                <p>Marca: {this.props.marca}</p>
                <IonRippleEffect></IonRippleEffect> 
                

                {/*
                <p>IMPRESORA: {this.props.codigo}</p>
                <p><small>Estado: {this.props.estado_operativo}</small></p>
                <p><small>Marca: {this.props.marca}</small></p>
                <IonRippleEffect></IonRippleEffect> 
                */}

              </IonLabel>
              {/*<IonThumbnail>
                <img src={process.env.PUBLIC_URL+"/assets/img/printer.png"} alt=""/>
              </IonThumbnail>*/}
              <IonAvatar slot="start"><img src={process.env.PUBLIC_URL+"/assets/img/icon_printer.png"} alt="imagen" /></IonAvatar>

              {/*<IonButton class="btn1" fill="clear"> X </IonButton>*/}
              <IonIcon icon={trash}></IonIcon>

            </IonItem>
            
            <IonPopover
        isOpen={this.state.ventanaDetalle}
        onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonTitle className="ion-margin-top">Detalle del equipo</IonTitle>
            <IonList>
              <IonItem>
                <IonLabel>Id: {this.props.id_impresora}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Número de serie: {this.props.numero_serie}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Tipo: {this.props.tipo}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Marca: {this.props.marca}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Código: {this.props.codigo}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Estado: {this.props.estado_operativo}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Modelo: {this.props.modelo}</IonLabel>
              </IonItem>
              <div>
                {
                this.props.tipo==="Impresora"? 
                <div>
                <IonItem>
                  <IonLabel>Tinta: {this.props.tinta}</IonLabel>
                </IonItem>
                <IonItem>
                <IonLabel>Cartucho: {this.props.cartucho}</IonLabel>
                </IonItem>
                </div>
                : null
               }
               {
                this.props.tipo==="Multifuncional"? 
                <div>
                <IonItem>
                  <IonLabel>Tinta: {this.props.tinta}</IonLabel>
                </IonItem>
                <IonItem>
                <IonLabel>Cartucho: {this.props.cartucho}</IonLabel>
                </IonItem>
                <IonItem>
                <IonLabel>Toner: {this.props.toner}</IonLabel>
                </IonItem>
                </div>
                : null
               }
               {
                this.props.tipo==="Matricial"? 
                <div>
                <IonItem>
                  <IonLabel>Cinta: {this.props.cinta}</IonLabel>
                </IonItem>
                </div>
                : null
                
               }
               {
                this.props.tipo==="Brazalete"? 
                <div>
                <IonItem>
                  <IonLabel>Rollo: {this.props.rollo}</IonLabel>
                </IonItem>
                </div>
                : null
               }
               {
                this.props.tipo==="Escaner"? 
                <div>
                <IonItem>
                  <IonLabel>Rodillo: {this.props.rodillo}</IonLabel>
                </IonItem>
                
                </div>
                : null
               }
              </div>

              <IonItem>
                <IonLabel>Descripción: {this.props.descripcion}</IonLabel>
              </IonItem>

            <div>
            {
                this.props.descripcion===" "? 
                <div>
                <IonLabel>Descripción: {this.props.descripcion}</IonLabel>
                </div>
                : null
               }
            </div>
            </IonList>
            <div className="ion-text-center ion-margin">
            <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>Cerrar</IonButton>
            </div>
      </IonPopover>

            </IonList>
            


   );
 }
 };
 
 
 export default ListaImpresoras;