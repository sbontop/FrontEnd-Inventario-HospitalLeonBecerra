import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonRow, IonCol, IonTitle, IonPage, 
  IonItem, IonLabel, IonInput, IonText, IonButtons, IonBackButton, IonList, IonButton, IonAvatar} from '@ionic/react';
import React, { Component } from 'react';
import './style.css';

export default class Router extends Component <{history:any}, any>{
  render (){
    return (
    <IonPage>
      <IonToolbar color="primary">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
        <IonTitle>Inventario de routers</IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding">
        <IonToolbar class="ion-text-center">
          <IonTitle><b>Nuevo router</b></IonTitle>
          <p className="ion-text-center"><img src={process.env.PUBLIC_URL+"/assets/img/router.png"} alt=""/></p>
        </IonToolbar>         
          <IonList>
            <IonItem>
              <IonLabel position="floating">IP<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Puerta de enlace<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" ></IonInput>
            </IonItem>   
            <IonItem>
              <IonLabel position="floating">Organización<IonText color="danger">*</IonText></IonLabel>
              <IonSelect >
                  return (
                    <IonSelectOption>
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>      
            <IonItem>
              <IonLabel position="floating">Departamento<IonText color="danger">*</IonText></IonLabel>
              <IonSelect >
                  return (
                    <IonSelectOption>
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nombre<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Pass <IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="password" ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Usuario<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Clave <IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="password" ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Encargado registro<IonText color="danger">*</IonText></IonLabel>
              <IonSelect >
                  return (
                    <IonSelectOption >
                    </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        <IonRow class="ion-text-center ion-padding">
          <IonCol>
            <IonButton type="submit" color="success" class="ion-no-margin">Guardar</IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="danger" class="ion-no-margin">Cancelar</IonButton>          
          </IonCol>
        </IonRow>     
      </IonContent>
    </IonPage>
  )};
}
