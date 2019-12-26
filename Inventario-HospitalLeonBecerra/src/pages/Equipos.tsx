import { IonContent, IonToolbar, IonTitle,IonHeader, IonPage, IonItem, IonLabel, IonButton, IonButtons, IonThumbnail, IonBackButton,IonSearchbar,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/
IonList} from '@ionic/react';
import React from 'react';

const Equipos: React.FC = () => {
  return (
    /*
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
          will be your guide.
        </p>
      </IonContent>



    </IonPage>
    */

   <IonPage>
     <br/>    
      <IonHeader translucent>
        <IonToolbar color="danger">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/tab2" />
          </IonButtons>
          <IonTitle>Equipos informáticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent >
{/*-- Searchbar with cancel button never shown --*/}
<IonSearchbar showCancelButton="never"></IonSearchbar>

        <IonList>
          <IonItem>
          <IonLabel color="dark">
            <h2><b>ROUTER: A271N12</b></h2>
            <h3>Usuario: Admin</h3>
            <p>Fecha. Reg: 21/04/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/router.png"} alt=""/>
          </IonThumbnail>
            
          
          <IonButton class="btn1" fill="clear"> X </IonButton>
        </IonItem> 

        <IonItem>
          <IonLabel>
            <h2><b>IMPRESORA: HWM3-12-XW6</b></h2>
            <h3>Usuario: Sr. Patricia Panchana</h3>
            <p>Fecha Reg: 23/10/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/printer.png"} alt=""/>
          </IonThumbnail>
          <IonButton class="btn1" size="small" fill="clear"> X </IonButton>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2><b>DESKTOP: HWM3-12-XW3</b></h2>
            <h3>Usuario: Ing. María Sánchez</h3>
            <p>Fecha Reg: 23/10/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/desktop.png"} alt=""/>
          </IonThumbnail>
          <IonButton class="btn1" fill="clear"> X </IonButton>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2><b>LAPTOP: LPM1-132-ZZV3</b></h2>
            <h3>Dr. David Álvarez</h3>
            <p>Fecha Reg: 21/04/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/laptop.png"} alt=""/>
          </IonThumbnail>
          <IonButton class="btn1" size="small" fill="clear"> X </IonButton>
        </IonItem>

        <IonItem>
          <IonLabel color="dark">
            <h2><b>ROUTER: A271N12</b></h2>
            <h3>Usuario: Admin</h3>
            <p>Fecha. Reg: 21/04/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/router.png"} alt=""/>
          </IonThumbnail>
            
          
          <IonButton class="btn1" fill="clear"> X </IonButton>
        </IonItem> 

        <IonItem>
          <IonLabel>
            <h2><b>IMPRESORA: HWM3-12-XW6</b></h2>
            <h3>Usuario: Sr. Patricia Panchana</h3>
            <p>Fecha Reg: 23/10/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/printer.png"} alt=""/>
          </IonThumbnail>
          <IonButton class="btn1" size="small" fill="clear"> X </IonButton>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2><b>DESKTOP: HWM3-12-XW3</b></h2>
            <h3>Usuario: Ing. María Sánchez</h3>
            <p>Fecha Reg: 23/10/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/desktop.png"} alt=""/>
          </IonThumbnail>
          <IonButton class="btn1" fill="clear"> X </IonButton>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2><b>LAPTOP: LPM1-132-ZZV3</b></h2>
            <h3>Dr. David Álvarez</h3>
            <p>Fecha Reg: 21/04/2019 10:30</p>
          </IonLabel>
          <IonThumbnail>
            <img src={process.env.PUBLIC_URL+"/assets/img/laptop.png"} alt=""/>
          </IonThumbnail>
          <IonButton class="btn1" size="small" fill="clear"> X </IonButton>
        </IonItem>

        </IonList>
        

      </IonContent>
    </IonPage>

  );
};

export default Equipos;
