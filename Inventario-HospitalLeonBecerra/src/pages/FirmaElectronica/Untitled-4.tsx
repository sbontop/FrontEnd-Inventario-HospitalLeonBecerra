/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import { IonContent, IonGrid, IonCol, IonRow, IonInput, IonToolbar, IonButton, IonRefresher, IonRefresherContent, IonPopover, IonList, IonItem, IonAlert, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonTitle, IonHeader,IonSearchbar,IonPage, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonLoading, IonIcon /*IonRippleEffect,   IonItemDivider*/} from '@ionic/react';
import AxiosImpresora from '../../services/AxiosImpresora';
import { RefresherEventDetail } from '@ionic/core';
import { options,add/*,clipboard*/, home } from 'ionicons/icons';
import { withIonLifeCycle } from '@ionic/react';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import ListaImpresoras from '../../components/impresoraComponents/ListaImpresoras';
import SelectOptionEstado from '../../components/SelectOptionEstado';
//import AxiosAutenticacion from '../../services/AxiosAutenticacion';

import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'


class FirmaElectronica extends Component {
  




  constructor(props: any) {
    super(props);
    this.state = {
      trimmedDataURL: null
    }
  }


  
  //state = {trimmedDataURL: null}
  sigPad:any = {};
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
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

          
         <IonRow class="ion-text-center">
            <IonCol>
              <img src="./assets/img/printer.png" alt=""/>
            </IonCol>
          </IonRow> 

          <IonGrid>

            <IonRow class="ion-text-center">
                <SignaturePad penColor='green'
                  canvasProps={{height: 200, className:styles.autowidth, style:{"border":"1px solid #000000"} }}
                  ref={(ref) => { this.sigPad = ref }}
                />
            </IonRow> 

            <IonRow class="ion-text-center">
              <IonCol>
                <IonButton expand="block" onClick={this.clear}>Clear</IonButton>
              </IonCol>
            </IonRow> 

            <IonRow class="ion-text-center">
              <IonCol>
                <IonButton expand="block" onClick={this.trim}>
                Trim</IonButton>
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