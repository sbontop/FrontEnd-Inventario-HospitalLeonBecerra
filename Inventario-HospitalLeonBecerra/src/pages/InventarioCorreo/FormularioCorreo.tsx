
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonList,
  IonSelect, IonSelectOption, IonAlert, IonText, IonIcon, IonButtons, IonBackButton
} from '@ionic/react';
import { search } from 'ionicons/icons';
import React, { useState } from 'react';
import AxiosCorreo from '../../services/Axios.services';

const FormularioCorreo: React.FC = () => {
  const [alerta, setAlerta] = useState(false);
  const [buscar, setBuscar] = useState(false);
  const [incompleto, setIncompleto] = useState(false);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState();
  const [cedula, setCedula] = useState();
  const [punto, setPunto] = useState();
  const [departamento, setDepartamento] = useState();
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState();
  const [estado, setEstado] = useState();


  const registrar_correo = () => {
    if (usuario === undefined || correo === undefined || contrasena === undefined || estado === undefined) {
      setIncompleto(true);
    } else {
      let registro_correo = {
        correo: correo,
        contrasena: contrasena,
        estado: estado,
        cedula: cedula
      }

      AxiosCorreo.crear_correo(registro_correo).then(res => {
        console.log(res);
        setAlerta(true);
      }).catch(err => {
        //console.log(err);
        setError(true);
      });

    }
  }

  const buscar_usuario = () => {
    AxiosCorreo.buscar_empleado(usuario).then(res => {
      if (res.data.length === 0) {
        setBuscar(true);
      } else {
        res.data.forEach(function (d: any) {
          setCedula(d.cedula);
          setDepartamento(d.departamento);
          setPunto(d.bspi_punto);
        });
      }
    }).catch(err => {
      // console.log(err);
      setError(true);
    });


  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/homeCorreo" />
          </IonButtons>
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
              <IonLabel position="stacked" >Usuario<IonText color="danger">*</IonText></IonLabel>
              <IonInput  className="ion-margin-top" placeholder="Nombres del empleado" name="usuario" value={usuario} onIonChange={(e) => setUsuario((e.target as HTMLInputElement).value)}></IonInput>
           
            <IonIcon slot="end" icon={search} onClick={() => buscar_usuario()} ></IonIcon>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Departamento</IonLabel>
              <IonInput className="ion-margin-top" disabled name="departamento">{departamento}</IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">BSPI-Punto</IonLabel>
              <IonInput className="ion-margin-top" disabled name="bspi_punto">{punto}</IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Correo<IonText color="danger">*</IonText></IonLabel>
              <IonInput className="ion-margin-top" placeholder="example@hospitalleonbecerra.org" type="email" name="correo" value={correo} onIonChange={(e) => setCorreo((e.target as HTMLInputElement).value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contraseña<IonText color="danger">*</IonText></IonLabel>
              <IonInput className="ion-margin-top" name="contrasena" value={contrasena} onIonChange={(e) => setContrasena((e.target as HTMLInputElement).value)}></IonInput>
            </IonItem>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Estado<IonText color="danger">*</IonText></IonLabel>
                <IonSelect className="ion-margin-top" name="estado" value={estado} onIonChange={(e) => setEstado(e.detail.value)} okText="Ok" cancelText="Cancelar">
                  <IonSelectOption selected>En uso</IonSelectOption>
                  <IonSelectOption>Inactivo</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
            <p className="ion-text-center">
              <IonButton color="primary">Cancelar</IonButton>
              <IonButton color="secondary" type="submit">Guardar</IonButton>
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
        <IonAlert
          isOpen={incompleto}
          onDidDismiss={() => setIncompleto(false)}
          header={'Debe asegurse de completar todos los campos'}
          message={'colocar imagen'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={buscar}
          onDidDismiss={() => setBuscar(false)}
          header={'Usuario no existe, asegurese de escribir sus nombres correctamente'}
          message={'colocar imagen'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={error}
          onDidDismiss={() => setBuscar(false)}
          header={'Se ha producido un error al realizar su solicitud'}
          message={'Asegurese se escribir un correo que no exista'}
          buttons={['Aceptar']}
        />

      </IonContent>
    </IonPage>
  );
};

export default FormularioCorreo;
