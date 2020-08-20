import {
  IonItem,  IonLabel, IonListHeader, IonButton, IonIcon,IonAvatar, IonList, IonModal, IonToolbar, IonNote, IonButtons, IonContent, IonAlert, IonLoading, IonTitle, IonRippleEffect, IonBadge
 } from '@ionic/react';
 import { trash, create, close, key, speedometer, card, calendar, clock, cube} from 'ionicons/icons';
 //import { Link, Redirect } from 'react-router-dom';


 import React from 'react';
 
 interface IPrinter {
  id_recordatorio:string,
  hora_recordatorio:string;
  fecha_recordatorio: string;
  estado: string;
  id_mantenimiento: string;
  codigo: string,
  titulo: string,
  creado: any,
  id_equipo: any,
  tipo_equipo:any,
  estado_operativo: any,
  onRemove: any
 }

 interface estados {
  ventanaDetalle: boolean,
  guardar: boolean,
  cargando: boolean,
  confirmacion: boolean
}

 class ListaRecordatorios extends React.Component<IPrinter, estados, {history:any}>  {

  constructor(props: any) {
    super(props);
    this.state = {
      ventanaDetalle: false,
      guardar:false,
      cargando:false,
      confirmacion:false
    }
  }

  verificar =() =>{
    this.setState({guardar:true})
  }

  _remove(){
    if(this.props.onRemove)
        this.props.onRemove();
}




 render(){
   return ( 
            <IonList>
            <IonItem className = "ion-activatable" lines="none">
              <IonLabel key={this.props.id_recordatorio} onClick={() => this.setState({ ventanaDetalle: true })}>
                
              <IonRippleEffect></IonRippleEffect>
                <h2><b>{this.props.titulo}</b></h2>
                <h3>Equipo: {this.props.codigo}</h3>
                {/* <p>Fecha: {this.props.fecha_recordatorio}</p> */}
                <p>Creado: {this.props.creado.substring(0,10)}</p>
                

              </IonLabel>

              <IonAvatar slot="start"> 
                {/*
                this.props.estado === 'A'  ? <img src="./assets/img/impresora/D.png"  alt="D" /> : 
                                             <img src="./assets/img/impresora/B.png"  alt="B" />
                */}

                <IonBadge color="dark" class="ion-padding-top ion-padding-bottom">{this.props.hora_recordatorio.substring(0,5)}</IonBadge>

              </IonAvatar> 
              <IonButton size="default" color="primary" fill="clear" onClick={this._remove.bind(this)}><IonIcon color="medium" icon={trash}></IonIcon></IonButton>
              {/* <IonButton size="default" fill="clear" routerLink={"/formulariomantenimiento/edit/" + this.props.id_mantenimiento
                            + "/" + this.props.codigo + "/" + this.props.tipo_equipo + "/" + this.props.estado_operativo
                        } color="secondary" >
                            <IonIcon color="medium" icon={create}></IonIcon>
              </IonButton> */}



              {/*<IonButton size="large" color="warning" class="bp" fill="clear"><IonIcon icon={create}><Redirect to={"/FormImpresora/edit/"+this.props.id_equipo} /></IonIcon></IonButton>*/}
            </IonItem>

<IonModal
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonToolbar color="primary">
            <IonTitle>Detalle recordatorio</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() =>this.setState({ ventanaDetalle: false })}><IonIcon icon={close}></IonIcon></IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent>
            <IonList>
            <IonListHeader>Información general</IonListHeader>
              <IonItem>
                <IonIcon slot="start" icon={key}></IonIcon>
                <IonLabel>ID del recordatorio</IonLabel>
                <IonNote slot="end">{this.props.id_recordatorio}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={card}></IonIcon>
                <IonLabel>Título</IonLabel>
                <IonNote slot="end">{this.props.titulo}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={cube}></IonIcon>
                <IonLabel>Equipo</IonLabel>
                <IonNote slot="end">{this.props.codigo}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={speedometer}></IonIcon>
                <IonLabel>Estado</IonLabel>
                <IonNote slot="end">
                    {
                  (() => {
                    switch (this.props.estado) {
                      case 'A':   return 'Activo';
                      case 'I': return  'Inactivo';
                    }
                  })()}
                </IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={calendar}></IonIcon>
                <IonLabel>Fecha recordatorio</IonLabel>
                <IonNote slot="end">{this.props.fecha_recordatorio}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={calendar}></IonIcon>
                <IonLabel>Fecha creación</IonLabel>
                <IonNote slot="end">{this.props.creado.substring(0,10)}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={clock}></IonIcon>
                <IonLabel>Hora</IonLabel>
                <IonNote slot="end">{this.props.hora_recordatorio}</IonNote>
              </IonItem>
              
            </IonList>
            
            </IonContent>
        </IonModal>


      <IonAlert
        isOpen={this.state.guardar}
        header={'Confirmación'}
        message={'¿Está seguro de eliminar este registro?'}
        buttons={[         
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger',
            handler: (blah:any) => {
              this.setState({
                guardar:false
              });
            }
          },
          {
            cssClass: 'success',
            text: 'Aceptar',
            handler: () => {
              console.log('Aceptar');
              this._remove.bind(this);              
            }
          }        
        ]}
      />

      <IonLoading
          isOpen={this.state.cargando}
          message={'Eliminando registro. Espere por favor...'}
      />

      <IonAlert
            isOpen={this.state.confirmacion}
            header={'Registro eliminado'}
            message={'El registro ha sido eliminado satisfactoriamente'}
            buttons={[              
              {
                cssClass: 'success',
                text: 'Aceptar',
                handler: () => {
                  console.log('Aceptar');
                  this.setState({ confirmacion: false});
                }
              },
            ]}
          />
            </IonList>
   );
 }
 }
 

 export default ListaRecordatorios;