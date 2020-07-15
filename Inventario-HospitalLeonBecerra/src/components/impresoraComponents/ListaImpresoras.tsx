import {
  IonItem,  IonLabel, IonButton, IonIcon,IonAvatar, IonList, IonModal, IonToolbar, IonNote, IonButtons, IonContent, IonAlert, IonLoading, IonTitle, IonRippleEffect
 } from '@ionic/react';
 import { trash, create, close, mailOpen,  albums, paper, list, key, speedometer, colorFilter, cube, aperture, disc, listBox, informationCircle, bulb, person, print} from 'ionicons/icons';
 //import { Link, Redirect } from 'react-router-dom';


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
  cinta: string,
  rollo: string,
  rodillo: string,
  ip: string,
  asignado: string,
  direccion_ip:string,
  nombre: string,
  apellido: string,
  descripcion: string,
  id_equipo: string,
  onRemove: any
 }

 interface estados {
  ventanaDetalle: boolean,
  guardar: boolean,
  cargando: boolean,
  confirmacion: boolean
}

 class ListaImpresoras extends React.Component<IPrinter, estados, {history:any}>  {

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
            <IonItem className = "ion-activatable">
              <IonLabel key={this.props.id_impresora} onClick={() => this.setState({ ventanaDetalle: true })}>
                
              <IonRippleEffect></IonRippleEffect>
                <h2><b>{this.props.codigo}</b></h2>
                {
                  this.props.estado_operativo==='D'?
                    <h3>Estado: Disponible</h3>
                  :null
                }
                {
                  this.props.estado_operativo==='B'?
                    <h3>Estado: De baja</h3>
                  :null
                }
                {
                  this.props.estado_operativo==='R'?
                    <h3>Estado: Reparado</h3>
                  :null
                }
                {
                  this.props.estado_operativo==='ER'?
                    <h3>Estado: En revisión</h3>
                  :null
                }
                {
                  this.props.estado_operativo==='O'?
                    <h3>Estado: Operativa</h3>
                  :null
                }
                <p>Marca: {this.props.marca}</p>
              </IonLabel>

              <IonAvatar slot="start"> 
                        {
                        this.props.estado_operativo === 'D'  ? <img src="./assets/img/impresora/D.png"  alt="D" /> : 
                        this.props.estado_operativo === 'R'  ? <img src="./assets/img/impresora/R.png"  alt="R" /> : 
                        this.props.estado_operativo === 'ER' ? <img src="./assets/img/impresora/ER.png" alt="ER" /> :
                        this.props.estado_operativo === 'O'  ? <img src="./assets/img/impresora/O.png"  alt="O" /> :
                                                     <img src="./assets/img/impresora/B.png"  alt="B" />
                        }
                    </IonAvatar> 


                  


              <IonButton size="default" fill="clear" routerLink={"/formimpresora/edit/"+this.props.id_impresora} color="secondary" ><IonIcon color="medium" icon={create}></IonIcon></IonButton>
              {
                this.props.estado_operativo === "B" ? <IonButton disabled size="default" color="primary" fill="clear" onClick={this._remove.bind(this)}><IonIcon color="medium" icon={trash}></IonIcon></IonButton>:
                <IonButton size="default" color="primary" fill="clear" onClick={this._remove.bind(this)}><IonIcon color="medium" icon={trash}></IonIcon></IonButton>
              }              
              

                                  

              {/*<IonButton size="large" color="warning" class="bp" fill="clear"><IonIcon icon={create}><Redirect to={"/FormImpresora/edit/"+this.props.id_equipo} /></IonIcon></IonButton>*/}
            </IonItem>

<IonModal
          isOpen={this.state.ventanaDetalle}
          onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonToolbar color="primary">
            <IonTitle>Detalle impresora</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() =>this.setState({ ventanaDetalle: false })}><IonIcon icon={close}></IonIcon></IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={paper}></IonIcon>
                <IonLabel>Número de serie</IonLabel>
                <IonNote slot="end">{this.props.numero_serie}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={print}></IonIcon>
                <IonLabel>Tipo</IonLabel>
                <IonNote slot="end">{this.props.tipo}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={albums}></IonIcon>
                <IonLabel>Marca</IonLabel>
                <IonNote slot="end">{this.props.marca}</IonNote>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={key}></IonIcon>
                <IonLabel>Código</IonLabel>
                <IonNote slot="end">{this.props.codigo}</IonNote>
              </IonItem>

              <IonItem>
                <IonIcon slot="start" icon={speedometer}></IonIcon>
                <IonLabel>Estado</IonLabel>
                <IonNote slot="end">
                    {
                  (() => {
                    switch (this.props.estado_operativo) {
                      case 'D':   return 'Disponible';
                      case 'ER': return  'En revisión';
                      case 'O':  return  'Operativa';
                      case 'R':  return  'Reparado';
                      case 'B':  return  'De baja';
                    }
                  })()}
                </IonNote>
              </IonItem>

              <IonItem>
                <IonIcon slot="start" icon={list}></IonIcon>
                <IonLabel>Modelo</IonLabel>
                <IonNote slot="end">{this.props.modelo}</IonNote>
              </IonItem>
            
              
              <div>
                {
                this.props.tipo==="Impresora"? 
                <div>
                <IonItem>
                  <IonIcon slot="start" icon={colorFilter}></IonIcon>
                  <IonLabel>Tinta</IonLabel>
                  <IonNote slot="end">{this.props.tinta}</IonNote>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" icon={cube}></IonIcon>
                  <IonLabel>Cartucho</IonLabel>
                  <IonNote slot="end">{this.props.cartucho}</IonNote>
                </IonItem>
                </div>
                : null
               }
               
               
               {
                this.props.tipo==="Multifuncional"? 

                <div>
                  {
                 this.props.tinta!==null && this.props.tinta!=='' && this.props.tinta!==' '?
                 <IonItem>
                  <IonIcon slot="start" icon={colorFilter}></IonIcon>
                  <IonLabel>Tinta</IonLabel>
                  <IonNote slot="end">{this.props.tinta}</IonNote>
                </IonItem>:null 
               }
               {
                 this.props.cartucho!==null && this.props.cartucho!=='' && this.props.cartucho!==' '?
                 <IonItem>
                  <IonIcon slot="start" icon={cube}></IonIcon>
                  <IonLabel>Cartucho</IonLabel>
                  <IonNote slot="end">{this.props.cartucho}</IonNote>
                </IonItem>:null 
               }
               {
                 this.props.toner!==null && this.props.toner!=='' && this.props.toner!==' '?
                 <IonItem>
                 <IonIcon slot="start" icon={aperture}></IonIcon>
                 <IonLabel>Toner</IonLabel>
                 <IonNote slot="end">{this.props.toner}</IonNote>
               </IonItem>:null 
               }
                </div>:null
                                

               }
               {
                this.props.tipo==="Matricial"? 
                <div>
                <IonItem>
                  <IonIcon slot="start" icon={disc}></IonIcon>
                  <IonLabel>Cinta</IonLabel>
                  <IonNote slot="end">{this.props.cinta}</IonNote>
                </IonItem>                
                </div>
                : null
                
               }
               {
                this.props.tipo==="Brazalete"? 
                <div>
                
                <IonItem>
                  <IonIcon slot="start" icon={mailOpen}></IonIcon>
                  <IonLabel>Rollo</IonLabel>
                  <IonNote slot="end">{this.props.rollo}</IonNote>
                </IonItem>
                </div>
                : null
               }
               {
                this.props.tipo==="Escáner"? 
                <div>

                <IonItem>
                  <IonIcon slot="start" icon={listBox}></IonIcon>
                  <IonLabel>Rodillo</IonLabel>
                  <IonNote slot="end">{this.props.rodillo}</IonNote>
                </IonItem>
                
                </div>
                : null
               }
              </div>

              <div>
            {
                this.props.descripcion!==null && this.props.descripcion!=='' && this.props.descripcion!==' '? 

                <IonItem>
                  <IonIcon slot="start" icon={informationCircle}></IonIcon>
                  <IonLabel>Descripción</IonLabel>
                  <IonNote slot="end">{this.props.descripcion}</IonNote>
                </IonItem>                  
                : 
                <IonItem>
                  <IonIcon slot="start" icon={informationCircle}></IonIcon>
                  <IonLabel>Descripción</IonLabel>
                  <IonNote slot="end">N/A</IonNote>
                </IonItem>
               }
            </div>
            <div>
            {
                (this.props.direccion_ip!==null && this.props.direccion_ip!=='' && this.props.direccion_ip!==' ')? 
              
              <IonItem>
                <IonIcon slot="start" icon={bulb}></IonIcon>
                <IonLabel>Dirección IP</IonLabel>
                <IonNote slot="end">{this.props.direccion_ip}</IonNote>
              </IonItem>
                : 
              <IonItem>
                <IonIcon slot="start" icon={bulb}></IonIcon>
                <IonLabel>Dirección IP</IonLabel>
                <IonNote slot="end">N/A</IonNote>
              </IonItem>
               }
            </div>

              <div>
            {
                this.props.nombre!==null? 
                <div>

                <IonItem>
                  <IonIcon slot="start" icon={person}></IonIcon>
                  <IonLabel>Asignado</IonLabel>
                  <IonNote slot="end">{this.props.nombre + ' ' + this.props.apellido}</IonNote>
                </IonItem>              

                </div>
                : 
        
                <div>

                <IonItem>
                  <IonIcon slot="start" icon={person}></IonIcon>
                  <IonLabel>Asignado</IonLabel>
                  <IonNote slot="end">N/A</IonNote>
                </IonItem>

                </div>
               }
            </div>
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
 

 export default ListaImpresoras;