import { IonContent, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonTitle, IonPage, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonButtons, IonBackButton,/*, IonFooter, IonPage, IonTitle, IonToolbar*//*IonList, IonLabel, IonInput,IonToggle, IonRadio, IonCheckbox, IonItemOptions,IonItemSliding, IonItemOption*/IonList, IonButton} from '@ionic/react';
import React from 'react';

type Item = {
  src: string;
  text: string;
};



const objectOptions = [
  {
    id: 1,
    first: 'Alice',
    last: 'Smith'
  },
  {
    id: 2,
    first: 'Bob',
    last: 'Davis'
  },
  {
    id: 3,
    first: 'Charlie',
    last: 'Rosenburg'
  }
];

const compareWith = (o1: any, o2: any) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const Equipos2: React.FC = () => {
  return (
    <IonPage>
    <IonToolbar color="danger">
      <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
      </IonButtons>
      <IonTitle>Equipos Informáticos</IonTitle>
    </IonToolbar>

    <IonContent fullscreen>
      <IonItem>
        <IonLabel class="ion-text-center">
          <h2><b>Registrar Impresora</b></h2>
        </IonLabel>
      </IonItem>
      
      <form>
      <IonGrid>
        <IonRow class="ion-text-center">
          <IonCol>
            <img src={process.env.PUBLIC_URL+"/assets/img/printer.png"} alt=""/>
          </IonCol>
          <IonCol>            
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Número de serie <IonText color="danger">*</IonText></IonLabel>
                <IonInput required type="text" ></IonInput>
              </IonItem>
              
            </IonList>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
                <IonLabel position="stacked">Tipo <IonText color="danger">*</IonText></IonLabel>
              <IonSelect compareWith={compareWith}>
                {objectOptions.map((object, i) => {
                  return (
                    <IonSelectOption key={object.id} value={object.id}>
                      {object.first} {object.last}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
            <IonList lines="full" class="ion-no-margin ion-no-padding">
              <IonItem>
                <IonLabel position="stacked">Marca <IonText color="danger">*</IonText></IonLabel>
                <IonInput required type="text" ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Estado <IonText color="danger">*</IonText></IonLabel>
                <IonSelect compareWith={compareWith}>
                  {objectOptions.map((object, i) => {
                    return (
                      <IonSelectOption key={object.id} value={object.id}>
                        {object.first} {object.last}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Modelo <IonText color="danger">*</IonText></IonLabel>
                <IonInput required type="text" ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Departamento en custodia <IonText color="danger">*</IonText></IonLabel>
                <IonSelect compareWith={compareWith}>
                  {objectOptions.map((object, i) => {
                    return (
                      <IonSelectOption key={object.id} value={object.id}>
                        {object.first} {object.last}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Usuario <IonText color="danger">*</IonText></IonLabel>
                <IonInput required type="text" ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Tinta/Cartucho <IonText color="danger">*</IonText></IonLabel>
                <IonInput required type="text" ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">BSPI-Punto <IonText color="danger">*</IonText></IonLabel>
                <IonSelect compareWith={compareWith}>
                  {objectOptions.map((object, i) => {
                    return (
                      <IonSelectOption key={object.id} value={object.id}>
                        {object.first} {object.last}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Encargado del registro <IonText color="danger">*</IonText></IonLabel>
                <IonInput required type="text" ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Observación</IonLabel>
                <IonTextarea></IonTextarea>
              </IonItem>
          </IonList>
          </IonCol>
        </IonRow>
        <IonRow class="ion-text-center">
          <IonCol>
            <IonButton type="submit" color="success" class="ion-no-margin">Guardar</IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="danger" class="ion-no-margin">Cancelar</IonButton>          
          </IonCol>
        </IonRow>


      </IonGrid>

      </form>
   
    {/*## Multiple Selection*/}
    
    {/*## Interface Options*/}
    

      
    </IonContent>
    </IonPage>
  );
};

export default Equipos2;
