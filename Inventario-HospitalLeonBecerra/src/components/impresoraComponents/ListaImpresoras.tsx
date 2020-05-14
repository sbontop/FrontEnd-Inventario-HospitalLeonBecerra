import {
  IonItem,  IonLabel, IonButton, IonIcon,IonAvatar, IonList, IonPopover, IonAlert, IonLoading, IonTitle, IonRippleEffect
 } from '@ionic/react';
 import { trash, create } from 'ionicons/icons';
 import { Link, Redirect } from 'react-router-dom';
 import AxiosImpresora from '../../services/AxiosImpresora';


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
  ip: String,
  asignado: String,
  direccion_ip:String,
  nombre: String,
  apellido: String,
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


  eliminar = () =>{

    this.setState({
      guardar:false,
      cargando:true
    });

    AxiosImpresora.eliminar_impresora(this.props.id_equipo).then((res:any) => {
      console.log("RESPUESTA:",res.data);
      this.setState({
        cargando:false,
        confirmacion:true,
      });


      //console.log("DATA:",this.state.impresoras);

    }).catch((err:any) => {

      this.setState({
        //cargando:false,
        //error_servidor:true,
      });
    });
  }

 render(){
   return ( 
            <IonList>
            <IonItem className = "ion-activatable">
              <IonLabel key={this.props.id_impresora} onClick={() => this.setState({ ventanaDetalle: true })}>
                
              <IonRippleEffect></IonRippleEffect>
                <h2><b>IMPRESORA: {this.props.codigo}</b></h2>
                
                

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
                {/*<IonRippleEffect></IonRippleEffect>*/}
                

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
             
              {/*<IonButton size="large" color="warning" class="bp" fill="clear"><IonIcon icon={create}></IonIcon></IonButton>*/}
              {/*<Link to={"/edit/"} className="btn btn-primary">Edit</Link>*/}
              {/*<IonButton size="large" color="warning" class="bp" routerLink={"/FormImpresora/edit/"+this.props.obj.id_equipo} fill="clear"><IonIcon icon={create}></IonIcon></IonButton>*/}
              {/* <IonButton size="large" color="warning" class="bp" routerLink={"/formimpresora/edit/"+this.props.id_impresora} fill="clear"><IonIcon icon={create}></IonIcon></IonButton>
              <IonButton size="large" shape="round" color="danger" class="bp" fill="clear" onClick={this._remove.bind(this)}><IonIcon icon={trash}></IonIcon></IonButton> */}


              <IonButton size="default" color="warning" class="bp" routerLink={"/formimpresora/edit/"+this.props.id_impresora} fill="clear"><IonIcon icon={create}></IonIcon></IonButton>
              <IonButton size="default" shape="round" color="danger" class="bp" fill="clear" onClick={this._remove.bind(this)}><IonIcon icon={trash}></IonIcon></IonButton>

              {/*<IonButton size="large" color="warning" class="bp" fill="clear"><IonIcon icon={create}><Redirect to={"/FormImpresora/edit/"+this.props.id_equipo} /></IonIcon></IonButton>*/}


            </IonItem>
            
            <IonPopover cssClass="vista"
        isOpen={this.state.ventanaDetalle}
        onDidDismiss={e => this.setState({ ventanaDetalle: false })}>
          <IonTitle className="ion-margin-top ion-text-center">Detalle del equipo</IonTitle>
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
              {
                  this.props.estado_operativo==='D'?
                    <IonLabel>Estado: Disponible</IonLabel>
                  :null
                }
                {
                  this.props.estado_operativo==='B'?
                    <IonLabel>Estado: De baja</IonLabel>
                  :null
                }
                {
                  this.props.estado_operativo==='R'?
                    <IonLabel>Estado: Reparado</IonLabel>
                  :null
                }
                {
                  this.props.estado_operativo==='ER'?
                    <IonLabel>Estado: En revisión</IonLabel>
                  :null
                }
                {
                  this.props.estado_operativo==='O'?
                    <IonLabel>Estado: Operativa</IonLabel>
                  :null
                }
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



              <div>
            {
                this.props.descripcion!==null && this.props.descripcion!=='' && this.props.descripcion!==' '? 
                  <IonItem>
                    <IonLabel>Descripción: {this.props.descripcion}</IonLabel>
                  </IonItem>
                : 
                <IonItem>
                  <IonLabel>Descripción: N/A </IonLabel>
                </IonItem>
               }
            </div>
 

            
            <div>
            {
                (this.props.direccion_ip!==null && this.props.direccion_ip!=='' && this.props.direccion_ip!==' ')? 
              <IonItem>
              <IonLabel>Dirección IP: {this.props.direccion_ip}</IonLabel>

              </IonItem>
                : 
                
              <IonItem>
              <IonLabel>Dirección IP: N/A</IonLabel>

              </IonItem>

   
               }
            </div>

              <div>
            {
                this.props.nombre!==null? 
                <div>
              <IonItem>
              <IonLabel>Asignado: {this.props.nombre + ' ' + this.props.apellido}</IonLabel>

              </IonItem>
                </div>
                : 
                
                <div>
              <IonItem>
              <IonLabel>Asignado: N/A</IonLabel>

              </IonItem>
                </div>

   
               }
            </div>

            </IonList>
            <div className="ion-text-center ion-margin">
            <IonButton onClick={() => this.setState({ ventanaDetalle: false })}>Cerrar</IonButton>
            </div>
      </IonPopover>

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
 };
 
 
 export default ListaImpresoras;