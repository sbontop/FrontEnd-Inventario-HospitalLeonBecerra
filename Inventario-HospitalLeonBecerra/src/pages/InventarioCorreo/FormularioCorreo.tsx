
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonList,
    IonSelect, IonSelectOption, IonAlert
  } from '@ionic/react';
  import React, { useState } from 'react';
  import AxiosCorreo from '../../requirements/AxiosCorreo';
  
  /*Falta la accion que el usuario escriba el nombre del empleado y se carguen los datos del dpto y el
  punto_bspi o simplemente que coloque la cédula >:"vvv*/

  const FormularioCorreo: React.FC = () => {
    const [alerta, setAlerta] = useState(false);
    const [usuario, setUsuario] = useState();
    const [correo, setCorreo] = useState();
    const [contrasena, setContrasena] = useState();
    const [estado, setEstado] = useState();
  
  
    const registrar_correo = () => {
      let registro_correo = {
        correo: correo,
        contrasena: contrasena,
        estado: estado,
        cedula: usuario
      }
  
      AxiosCorreo.crear_correo(registro_correo).then(res => {
        console.log(res);
        setAlerta(true);
      }).catch(err => {
        console.log(err);
      });
  
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Inventario de correo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonTitle className="ion-text-center">Nuevo correo electrónico</IonTitle>
          <p className="ion-text-center">
            <img src="./assets/icon/user.png" alt="Usuario" />
          </p>
          <form onSubmit={(e) => { e.preventDefault(); registrar_correo(); }} action="post">
            <IonList>
              <IonItem>
                <IonLabel position="stacked" >Usuario</IonLabel>
                <IonInput className="ion-margin-top" placeholder="Nombres del empleado" name="usuario" value={usuario} onIonChange={(e) => setUsuario((e.target as HTMLInputElement).value)}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Departamento</IonLabel>
                <IonInput className="ion-margin-top" disabled name="departamento"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">BSPI-Punto</IonLabel>
                <IonInput className="ion-margin-top" disabled name="bspi_punto"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Correo</IonLabel>
                <IonInput className="ion-margin-top" type="email" name="correo" value={correo} onIonChange={(e) => setCorreo((e.target as HTMLInputElement).value)}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Contraseña</IonLabel>
                <IonInput className="ion-margin-top" type="password" name="contrasena" value={contrasena} onIonChange={(e) => setContrasena((e.target as HTMLInputElement).value)}></IonInput>
              </IonItem>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonSelect className="ion-margin-top" name="estado" value={estado} onIonChange={(e) => setEstado(e.detail.value)} okText="Ok" cancelText="Cancelar">
                    <IonSelectOption selected>En uso</IonSelectOption>
                    <IonSelectOption>Inactivo</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
              <p className="ion-text-center">            
                <IonButton color="primary">Cancelar</IonButton>
                <IonButton color="secondary" type="submit" > Guardar</IonButton>
              </p>
            </IonList>
          </form>
          <IonAlert
            isOpen={alerta}
            onDidDismiss={() => setAlerta(false)}
            header={'Guardado con éxito'}
            message={'colocar imagen'}
            buttons={['Aceptar']}
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default FormularioCorreo;
  