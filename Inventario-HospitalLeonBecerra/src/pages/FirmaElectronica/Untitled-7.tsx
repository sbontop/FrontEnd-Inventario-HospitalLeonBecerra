/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonGrid, IonCol, IonRow, IonToolbar, IonLoading, IonAlert, IonButton,  IonTitle,IonPage, IonButtons, IonBackButton, IonLabel} from '@ionic/react';
import AxiosFirma from '../../services/AxiosFirma';

import { withIonLifeCycle } from '@ionic/react';
import SignaturePad from 'react-signature-canvas'

class FirmaElectronica extends Component<any , any> {
  //private cargando:any = false;
  constructor(props: any) {
    super(props);
    this.state = {
      trimmedDataURL: null,
      cargando:false,
      guardado:false,
      url_cargada:""
    }
  }

  //state = {trimmedDataURL: null}
  sigPad:any = {};
  clear = () => {
    this.sigPad.clear()
  }


  getBase64Image=(img:any) => {
    let canvas:any = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx:any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL:any = canvas.toDataURL("image/png");
    return dataURL;
  }
  
  //var base64 = getBase64Image(document.getElementById("imageid"));

  
  trim = () => {
    //this.cargando = true;
    this.setState({
      cargando:true
    })
    let image = new Image();
    image.src = this.sigPad.getTrimmedCanvas().toDataURL('image/png');
    console.log("Informa: ",this.sigPad.getTrimmedCanvas().toDataURL('image/png'));

    //this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')});
    const canvas = this.sigPad.getTrimmedCanvas();
    canvas.toBlob((blob:any) => {
    const formData = new FormData();
    formData.append('image_name', blob);
    AxiosFirma.almacenar_firma(formData).then(res => {   
      //this.cargando = false;
      this.setState({
        cargando:false,
        guardado: true,
        url_cargada:res.data.log
      })       
      console.log("Upload44");
      console.log("Data: ",res);
    }).catch(err => {
      console.log(err);      
      console.log('Error 2');
    });
  });

  //var base64:any = this.getBase64Image(document.getElementById("imageid"));
  //console.log("Base: ",base64); 

  }

  vista_previa = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')});
  }


  render(){//Start   
    let {trimmedDataURL}:any = this.state 
    return(      



      <IonPage>     
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle > Aprobación </IonTitle>
          <IonButtons slot="end">
            {/*<IonButton hidden = {this.id===undefined?true:false} onClick = {this.accion} ><IonIcon icon={trash}></IonIcon></IonButton>*/}
          </IonButtons>
         </IonToolbar>
         <IonContent>          
         <IonLoading
          isOpen={this.state.cargando}
          message={'Registrando firma. Espere por favor...'}
         />
         <IonAlert
            isOpen={this.state.guardado}
            subHeader={'Firma guarda con éxito'}
            message={'La firma electrónica fue guardada con éxito'}
            buttons={[
              {
                cssClass: 'success',
                text: 'OK',
                handler: () => {
                  /*console.log('ERROR 46');*/
                  this.setState({
                    guardado:false          
                  });
                }
              }
            ]}
          />
          <IonGrid>
            <IonRow class="ion-text-center">
              <IonCol>
                <IonLabel>
                  Realize su firma acontinuación
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow class="ion-text-center">
                <SignaturePad penColor='green'
                  canvasProps={{width: 500, height: 200, className: 'sigCanvas' }}
                  ref={(ref) => { this.sigPad = ref }}
                />
                
            </IonRow> 
            <IonRow class="ion-text-center">
              <IonCol>
                <IonButton expand="block" onClick={this.clear}>Volver a intentar</IonButton>
              </IonCol>
            </IonRow> 
            <IonRow class="ion-text-center">
              <IonCol>
                <IonButton expand="block" onClick={this.trim}>
                Save</IonButton>
              </IonCol>
            </IonRow>

            <IonRow class="ion-text-center">
              <IonCol>
                <IonButton expand="block" onClick={this.vista_previa}>Vista Previa</IonButton>
              </IonCol>
            </IonRow>

            <IonRow class="ion-text-center">
              <IonCol>
                <IonLabel color="danger">Vista Previa</IonLabel>
              </IonCol>
            </IonRow>

            <IonRow class="ion-text-center">
              
              <IonCol>
              {trimmedDataURL
              ? <img alt="pad" 
                src={trimmedDataURL} />
              : null}
              </IonCol>  
            </IonRow>              
            {/*<img alt="prueba" src={trimmedDataURL} />*/}

            <IonRow>
              <IonCol class="ion-text-center">
                <img id="imageid" alt="convertir" src={this.state.url_cargada}/>
              </IonCol>
            </IonRow>

          </IonGrid>
         </IonContent>
      </IonPage>
  );

  /*render(){//Start    
    return(          
      <IonPage>     
        
        <SignaturePad penColor='green'
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
      </IonPage>
  );*/

  /*render(){//Start    
    return(    <div className={styles.sigContainer}>
      <SignaturePad canvasProps={{className: styles.sigPad}}/>
    </div>
);*/

  }//END
}

export default withIonLifeCycle(FirmaElectronica);