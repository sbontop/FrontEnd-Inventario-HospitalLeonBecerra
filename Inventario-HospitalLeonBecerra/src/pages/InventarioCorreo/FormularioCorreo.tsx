
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonList,
  IonSelect, IonSelectOption, IonAlert, IonText, IonIcon, IonButtons, IonGrid, IonRow, IonCol
} from '@ionic/react';
import { search, eye, arrowBack, eyeOff } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import AxiosCorreo from '../../services/Axios.services';
import { useParams, Redirect } from 'react-router';
import './Style.css';

const FormularioCorreo: React.FC = () => {
  const [alerta, setAlerta] = useState(false);
  const [dirigir, setDirigir] = useState(false);
  const [buscar, setBuscar] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [incompleto, setIncompleto] = useState(false);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [cedula, setCedula] = useState("");
  const [punto, setPunto] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [estado, setEstado] = useState("");
  const [editionMode, setEditionMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(true);
  const [confirmar, setConfirmar] = useState(false);
  const [bloqueado, setBloqueado] = useState(true);
  const { id } = useParams();


  useEffect(() => {
    if (id !== undefined) {
      AxiosCorreo.correo_id(id).then(res => {
        setEditionMode(true);
        res.data.forEach(function (d: any) {
          setCedula(d.cedula);
          setUsuario(d.nombre + " " + d.apellido);
          setDepartamento(d.departamento);
          setPunto(d.bspi_punto);
          setCorreo(d.correo);
          setContrasena(d.contrasena);
          setEstado(d.estado);
        });
      }).catch(err => {
        setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
        setError(true);
      });
    }
  }, [id]);

  /**
   * Función para gestionar el registro de un correo
   */
  const registrar_correo = () => {
    if (usuario === "" || correo === "" || contrasena === "") {
      setMensaje("Debe completar todos los campos");
      setIncompleto(true);
    } else {
      let registro_correo = {
        correo: correo,
        contrasena: contrasena,
        estado: estado,
        cedula: cedula,
        id: id
      }
      if (!editionMode) {
        crear_correo(registro_correo);
      } else {
        editar_correo(registro_correo);
      }
    }
  }

  /**
   * Función para crear un nuevo correo en la base de datos.
   * @param registro_correo 
   */
  const crear_correo = (registro_correo: any) => {
    AxiosCorreo.crear_correo(registro_correo).then(res => {
      setMensaje("Registro guardado satisfactoriamente")
      setAlerta(true);
    }).catch(err => {
      setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
      if (err.response) {
        setMensaje(err.response.data.log)
      }
      setError(true);
    });
  }

  /**
   * Función para editar un correo en la base de datos.
   * @param registro_correo 
   */
  const editar_correo = (registro_correo: any) => {
    AxiosCorreo.editar_correo(registro_correo).then(res => {
      setMensaje("Registro actualizado satisfactoriamente")
      setAlerta(true);
    }).catch(err => {
      setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
      if (err.response) {
        setMensaje(err.response.data.log)
      }
      setError(true);
    });
  }

  /**
   * Función que permite buscar un empleado y colocar sus datos en los 
   * campos departamento y bspi_punto del formulario
   */
  const buscar_usuario = () => {
    if (!editionMode) {
      if (usuario === "") {
        setMensaje("Debe escribir los nombres del empleado");
        setIncompleto(true);
        setBloqueado(true);
      } else {
        AxiosCorreo.buscar_empleado(usuario).then(res => {
          if (res.data.length === 0) {
            setDepartamento("");
            setPunto("");
            setBuscar(true);
            setBloqueado(true);
          } else {
            res.data.forEach(function (d: any) {
              setCedula(d.cedula);
              setDepartamento(d.departamento);
              setPunto(d.bspi_punto);
            });
            setBloqueado(false);
          }
        }).catch(err => {
          setMensaje("Ocurrió un error al procesar su solicitud, inténtelo más tarde")
          setError(true);
        });
      }
    }
  }

  /**
   * Función auxiliar que permite manipular la forma en que se muestra el texto de la contraseña.
   */
  const cambiar_tipo = () => {
    passwordMode ? setPasswordMode(false) : setPasswordMode(true)
  }

  /**
   * Función auxiliar utilizada para gestionar los estados que permite cerrar la alerta producida 
   * y para cambiar la vista.
   */
  const cambiar_estados = () => {
    setAlerta(false);
    setDirigir(true);
  }

  /**
   * Para redireccionar al login si no está logeado
   */

  if (localStorage.userdata === undefined) {
    return (<Redirect to="/iniciarsesion" />)
  }

  /**
   * Función que recibe una variable booleana, si es true la vista actual se redirige hacia otra ventana.
   */
  if (dirigir) {
    return (<Redirect to="/homeCorreo" />);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton routerLink="/homeCorreo"><IonIcon icon={arrowBack}></IonIcon></IonButton>
          </IonButtons>
          <IonTitle>{editionMode ? "Editar correo electrónico" : "Nuevo correo electrónico"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <form onSubmit={(e) => { e.preventDefault(); setConfirmar(true); }} action="post">
          <IonList>

            <IonRow class="ion-text-center">
              <IonCol size="4">
                <img src="./assets/icon/user.png" alt="usuario" />
              </IonCol>
              <IonCol size="8">
                <IonItem>
                  <IonInput required className="ion-margin-top" disabled={editionMode} placeholder="Buscar Empleado" value={usuario} name="usuario" onIonChange={(e) => setUsuario((e.target as HTMLInputElement).value)}></IonInput>
                  <IonIcon icon={search} color={editionMode ? "light" : "danger"} onClick={() => buscar_usuario()} ></IonIcon>
                </IonItem>
              </IonCol>

            </IonRow>
            <IonItem>
              <IonLabel position="stacked">Departamento</IonLabel>
              <IonInput className="ion-margin-top" disabled name="departamento" value={departamento}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">BSPI-Punto</IonLabel>
              <IonInput className="ion-margin-top" disabled name="bspi_punto" value={punto}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Correo<IonText color="danger">*</IonText></IonLabel>
              <IonInput required inputmode="email" disabled={bloqueado} type="email" pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" className="ion-margin-top" value={correo} placeholder="example@hospitalleonbecerra.org" name="correo" onIonChange={e => setCorreo(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contraseña<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type={passwordMode ? "password" : "text"} disabled={bloqueado} minlength={5} className="ion-margin-top" name="contrasena" value={contrasena} onIonChange={e => setContrasena(e.detail.value!)}></IonInput>
              <IonIcon className="btn_eye_icon" icon={passwordMode ? eye : eyeOff} color="danger" onClick={() => cambiar_tipo()} ></IonIcon>
            </IonItem>
            <IonList>
              {
                editionMode ?
                  <IonItem>
                    <IonLabel position="stacked">Estado<IonText color="danger">*</IonText></IonLabel>
                    <IonSelect className="ion-margin-top" value={estado} name="estado" onIonChange={(e) => setEstado(e.detail.value)} okText="Ok" cancelText="Cancelar">
                      <IonSelectOption value="EU">En uso</IonSelectOption>
                      <IonSelectOption value="I">Inactivo</IonSelectOption>
                    </IonSelect>
                  </IonItem> : null
              }

            </IonList>
            <p className="ion-text-center">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonButton color="success" type="submit">{!editionMode ? "Guardar" : "Guardar cambios"}</IonButton>
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
          message={mensaje}
          buttons={[{
            text: 'Aceptar',
            handler: () => {
              cambiar_estados();
            }
          }
          ]}
        />
        <IonAlert
          isOpen={incompleto}
          onDidDismiss={() => setIncompleto(false)}
          message={mensaje}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={buscar}
          onDidDismiss={() => setBuscar(false)}
          message={'Usuario no existe, asegurese de escribir sus nombres correctamente'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={error}
          onDidDismiss={() => setError(false)}
          message={mensaje}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={confirmar}
          header={'Confirmación'}
          message={!editionMode ? '¿Está seguro de agregar este registro?' : '¿Está seguro de modificar este registro?'}
          buttons=
          {[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'primary',
              handler: () => {
                setConfirmar(false);
              }
            },
            {
              cssClass: 'success',
              text: 'Aceptar',
              handler: () => {
                registrar_correo();
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default FormularioCorreo;
