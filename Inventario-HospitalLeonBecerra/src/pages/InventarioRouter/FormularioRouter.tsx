import {IonContent, IonToolbar, IonSelect, IonSelectOption, IonTitle, IonPage, IonAlert, 
  IonItem, IonLabel, IonInput, IonText, IonButtons, IonBackButton, IonList, IonButton, IonRow, IonCol, IonTextarea} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import AxiosRouter from '../../services/AxiosRouter';
import { Redirect } from 'react-router';
  
const FormularioRouter: React.FC = () => {
  const [org, setOrg] = useState();
  const [dpto, setDpto] = useState();
  const [nombre, setNombre] = useState();
  const [pass, setPass] = useState();
  const [usuario, setUsuario] = useState();
  const [clave, setClave] = useState();
  const [codigo, setCodigo] = useState();
  const [marca, setMarca] = useState();
  const [marcas, setMarcas] = useState([] as any);
  const [modelo, setModelo] = useState();
  const [numero_serie, setNumero_serie] = useState();
  const [descripcion, setDescripcion] = useState();
  const [organizaciones, setOrganizaciones] = useState([] as any);
  const [departamentos, setDepartamentos] = useState([] as any);
  const [guardar, setGuardar] = useState(false);
  const [error, setError] = useState(false);
  const [redireccionar, setRedireccionar] = useState(false);
  

  useEffect(() => {
    AxiosRouter.obtener_organizaciones().then(res => {
      setOrganizaciones(res.data); });    
  }, []);

  useEffect(() => {
    AxiosRouter.departamentos_por_organizacion(org).then(res => {
      setDepartamentos(res.data); });    
  }, [org]);
  
  useEffect(() => {
    AxiosRouter.marcas_routers().then(res => {
      setMarcas(res.data); });    
  }, []);

  const registrar = () => {      
      let registro_equipo_router = {
        fecha_registro: new Date().toISOString().substr(0,10),
        estado_operativo: "disponible",
        codigo: codigo,
        tipo_equipo: "Router",
        marca: marca,
        modelo: modelo,
        numero_serie: numero_serie,
        descripcion: descripcion,
        encargado_registro: 'admin',
        componente_principal: null,
        ip: null,        
        nombre: nombre,
        pass: pass,
        puerta_enlace: "192.168.0.0",
        usuario: usuario,
        clave: clave
      }

      AxiosRouter.crear_equipo_router(registro_equipo_router).then(res => {
        setGuardar(true);
      }).catch(err => {
        setError(true);
      });   
  }

  const volver_principal = () => {
    setGuardar(false);
    setRedireccionar(true);
  }

  if (redireccionar) {
    return (<Redirect to="/homeRouter" />);
  }

    return (
    <IonPage>
      <IonToolbar color="primary">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
        <IonTitle>Agregar router</IonTitle>
        <IonButtons slot="end">
        </IonButtons>
      </IonToolbar>
      <IonContent className="ion-padding">
        <IonToolbar class="ion-text-center">
          <IonTitle>Nuevo router</IonTitle>
          <p className="ion-text-center"><img src={process.env.PUBLIC_URL+"/assets/img/router.png"} alt=""/></p>
        </IonToolbar>  
        <form onSubmit={(e) => { e.preventDefault(); registrar(); }} action="post">      
          <IonList>
          <IonItem>
              <IonLabel position="floating">Organización<IonText color="danger">*</IonText></IonLabel>
              <IonSelect value={org} onIonChange={(e) => setOrg(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                {organizaciones.map((organization: any) => {
                  return (
                    <IonSelectOption key={organization.id_organizacion} value={organization.bspi_punto}>
                      {organization.bspi_punto} 
                    </IonSelectOption>
                  );
                })}
              </IonSelect>    
            </IonItem>      
            <IonItem>
              <IonLabel position="floating">Departamento<IonText color="danger">*</IonText></IonLabel>
              <IonSelect value={dpto} onIonChange={(e) => setDpto(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                {departamentos.map((depto: any) => {
                  return (
                    <IonSelectOption key={depto.id_departamento} value={depto.nombre}>
                      {depto.nombre} 
                    </IonSelectOption>
                  );
                })}
              </IonSelect> 
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nombre<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" name="nombre" value={nombre} onIonChange={(e) => setNombre((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Pass<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" name="pass" value={pass} onIonChange={(e) => setPass((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Usuario<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" name="usuario" value={usuario} onIonChange={(e) => setUsuario((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Clave <IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" name="clave" value={clave} onIonChange={(e) => setClave((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Código</IonLabel>
              <IonInput type="text" name="codigo" value={codigo} onIonChange={(e) => setCodigo((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
              <IonSelect value={marca} onIonChange={(e) => setMarca(e.detail.value)} okText="Aceptar" cancelText="Cancelar" >
                {marcas.map((m: any) => {
                  return (
                    <IonSelectOption key={m.marca} value={m.marca}>
                      {m.marca} 
                    </IonSelectOption>
                  );
                })}
              </IonSelect>   
            </IonItem> 
            <IonItem>
              <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text" name="modelo" value={modelo} onIonChange={(e) => setModelo((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Número de serie<IonText color="danger">*</IonText></IonLabel>
              <IonInput required type="text"  name="numero_serie" value={numero_serie} onIonChange={(e) => setNumero_serie((e.target as HTMLInputElement).value)} ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Descripción</IonLabel>
              <IonTextarea name="descripcion" value={descripcion} onIonChange={(e) => setDescripcion((e.target as HTMLInputElement).value)}></IonTextarea>
            </IonItem>
            <IonRow class="ion-text-center">
            <IonCol>
              <IonButton type="submit" color="success" class="ion-no-margin">Guardar</IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="danger" routerLink="/homerouter" class="ion-no-margin">Cancelar</IonButton>          
            </IonCol>
          </IonRow> 
          </IonList>
        </form>
        <IonAlert
          isOpen={guardar}
          onDidDismiss={() => volver_principal()}
          header={'Guardado con éxito'}
          message={'Se ha guardado exitosamente el Router'}
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={error}
          header={'Se ha producido un error al realizar su solicitud'}
          message={'Asegurese de agregar un un registro que no exista'}
          buttons={['Aceptar']}
        /> 
      </IonContent>
    </IonPage>
  );
};

export default FormularioRouter;
