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
  sigPad2:any = {};

  clear = () => {
    this.sigPad.clear()
  }


  /*getBase64Image=(img:any) => {
    let canvas:any = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx:any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL:any = canvas.toDataURL("image/png");
    return dataURL;
  }*/
  
  //var base64 = getBase64Image(document.getElementById("imageid"));

  
  trim = () => {
    //this.cargando = true;
    this.setState({
      cargando:true
    })
    let image = new Image();
    image.src = this.sigPad.getTrimmedCanvas().toDataURL('image/png');
    console.log("Informa: ",this.sigPad.getTrimmedCanvas().toDataURL('image/png'));

    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')});
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

  /*this.cargar();*/
  //this.cargar2();

  //var base64:any = this.getBase64Image(document.getElementById("imageid"));
  console.log("Base: "); 



  this.getBase64Image(this.state.url_cargada, function(base64image:any){
    console.log("base64image: ",base64image);
  });  

}

  func2 = ()=>{
    //let base64image = this.getBase64Image(imgUrl);
    //console.log(base64image);
  }

  getBase64Image=(imgUrl:any, callback:any)=> {

    var img = new Image();

    // onload fires when the image is fully loadded, and has width and height

    img.onload = function(){

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx:any = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL:any = canvas.toDataURL("image/png");
          //dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

      callback(dataURL); // the base64 string

    };

    // set attributes and src 
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;

}



  vista_previa = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')});
    //this.cargar2();

    this.getBase64Image('https://res.cloudinary.com/dzdnf95ze/image/upload/v1595987540/jzooce4l28mznoggqrpr.png', function(base64image:any){
      console.log('vista_previa',base64image);
    });

  }


  cargaContextoCanvas=(idCanvas:any)=>{
    var elemento:any = document.getElementById(idCanvas);
    if(elemento && elemento.getContext){
       var contexto = elemento.getContext('2d');
       if(contexto){
          return contexto;
       }
    }
    return false;
 }

 cargar2=()=>{
  //this.sigPad2.fromDataURL(this.sigPad.getTrimmedCanvas().toDataURL('image/png'));
  this.sigPad2.fromDataURL(this.state.url_cargada);

}

 cargar=()=>{

  var ctx = this.cargaContextoCanvas('mycanvas');
  if(ctx){
    //Creo una imagen conun objeto Image de Javascript
    var img = new Image();
    //indico la URL de la imagen
    img.src = this.state.url_cargada;
    //defino el evento onload del objeto imagen
    img.onload = function(){
       //incluyo la imagen en el canvas
       ctx.drawImage(img, 10, 10);
    }
 }
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
              <SignaturePad penColor='green'
                  canvasProps={{width: 500, height: 200, className: 'sigCanvas' }}
                  ref={(ref2) => { this.sigPad2 = ref2 }}
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
              : 'aa'}
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