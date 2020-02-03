
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonList,
  IonSelect, IonSelectOption, IonAlert, IonText, IonIcon, IonButtons, IonBackButton, IonGrid, IonRow, IonCol
} from '@ionic/react';
import { search } from 'ionicons/icons';
import React, { useState } from 'react';
import AxiosCorreo from '../../services/Axios.services';
import { Redirect } from 'react-router';

const FormularioCorreo: React.FC = () => {
  const [alerta, setAlerta] = useState(false);
  const [dirigir, setDirigir] = useState(false);
  const [buscar, setBuscar] = useState(false);
  const [vacio, setVacio] = useState(false);
  const [incompleto, setIncompleto] = useState(false);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState();
  const [cedula, setCedula] = useState();
  const [punto, setPunto] = useState();
  const [departamento, setDepartamento] = useState();
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState();
  const [estado, setEstado] = useState("En uso");


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
        setAlerta(true);
      }).catch(err => {
        console.log(err);
        setError(true);
      });

    }
  }


  const buscar_usuario = () => {
    if (usuario === undefined || usuario === "") {
      setVacio(true);
    } else {
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
        setError(true);
      });
    }
  }


  const cambiar_estados = () => {
    setAlerta(false);
    setDirigir(true);
  }


  if (dirigir) {
    return (<Redirect to="/homeCorreo" />);
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
              <IonInput className="ion-margin-top" placeholder="Buscar Empleado" name="usuario" onIonChange={(e) => setUsuario((e.target as HTMLInputElement).value)}></IonInput>
              <IonIcon icon={search} color="danger" onClick={() => buscar_usuario()} ></IonIcon>
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
              <IonLabel position="floating">Correo<IonText color="danger">*</IonText></IonLabel>
              <IonInput className="ion-margin-top" placeholder="example@hospitalleonbecerra.org"  name="correo" onIonChange={(e) => setCorreo((e.target as HTMLInputElement).value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contraseña<IonText color="danger">*</IonText></IonLabel>
              <IonInput className="ion-margin-top" name="contrasena" onIonChange={(e) => setContrasena((e.target as HTMLInputElement).value)}></IonInput>
            </IonItem>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Estado<IonText color="danger">*</IonText></IonLabel>
                <IonSelect className="ion-margin-top" value={estado} name="estado" onIonChange={(e) => setEstado(e.detail.value)} okText="Ok" cancelText="Cancelar">
                  <IonSelectOption selected>En uso</IonSelectOption>
                  <IonSelectOption>Inactivo</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
            <p className="ion-text-center">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonButton color="success" type="submit">Guardar</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton color="danger" routerLink="/homeCorreo">Cancelar</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </p>
          </IonList>
        </form>
        <IonAlert
          isOpen={alerta}
          onDidDismiss={() => cambiar_estados()}
          header={'Guardado con éxito'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={incompleto}
          onDidDismiss={() => setIncompleto(false)}
          header={'Debe asegurse de completar todos los campos'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={buscar}
          onDidDismiss={() => setBuscar(false)}
          header={'Usuario no existe, asegurese de escribir sus nombres correctamente'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={vacio}
          onDidDismiss={() => setVacio(false)}
          header={'Debe escribir el nombre de un empleado'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={error}
          onDidDismiss={() => setError(false)}
          header={'Se ha producido un error al realizar su solicitud, inténtelo más tarde'}
          buttons={['Aceptar']}
        />
      </IonContent>
    </IonPage>
  );
};

export default FormularioCorreo;
