import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, IonButton, IonContent, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime,
  IonIcon
} from '@ionic/react';
import React from 'react';
import { options,add } from 'ionicons/icons';
import ListaCorreos from '../../components/correoComponents/ListaCorreos';
import AxiosCorreo from '../../services/Axios.services';
import SelectOptionDepartamento from '../../components/correoComponents/SelectOptionDepartamento';




interface estados {
  popOver: boolean,
  filtro_dpto: any,
  filtro_fecha: any,
  datos: any
};

class HomeCorreo extends React.Component<any, estados> {

  constructor(props: any) {
    super(props);
    this.state = {
      popOver: false,
      filtro_dpto: String,
      filtro_fecha: new Date().toISOString(),
      datos: [] as any
    }
  }

  componentDidMount = () => {
    AxiosCorreo.mostrar_correos().then(res => {
      this.setState({ datos: res.data });
      console.log("recargando");
    }).catch(err => {
      console.log(err);
    });
  }



  aplicar_filtros = () => {
    let correo: any[] = [];
    if (this.state.filtro_dpto !== "Todos" && this.state.filtro_fecha === "") {
      console.log("Se ha activado el filtro por dpto");
      AxiosCorreo.empleado_por_dpto(this.state.filtro_dpto).then(res => {
        correo.push(res.data);
      }).catch(err => {
        console.log(err);
      });

    } else if (this.state.filtro_dpto === "Todos" && this.state.filtro_fecha !== "") {
      console.log("Se ha activado el filtro por fecha y todos");
      AxiosCorreo.correo_por_fecha(this.state.filtro_fecha).then(res => {
        correo.push(res.data);
      }).catch(err => {
        console.log(err);
      });


    } else if (this.state.filtro_dpto !== "Todos" && this.state.filtro_fecha !== "") {
      console.log("Se ha activado el filtro por fecha y un dpto especifico");
      AxiosCorreo.correo_por_fecha_dpto(this.state.filtro_fecha, this.state.filtro_dpto).then(res => {
        correo.push(res.data);
      }).catch(err => {
        console.log(err);
      });


    } else {
      console.log("Se ha activado el filtro por defecto, sin tener en cuenta la fecha y todod");
      AxiosCorreo.mostrar_correos().then(res => {
        this.setState({ datos: res.data });
        console.log(this.state.datos);
      }).catch(err => {
        console.log(err);
      });


    }
    console.log(this.state.filtro_dpto, this.state.filtro_fecha.substring(0, 10));

    this.setState({ datos: correo });
    console.log(this.state.datos);

  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="h" />
            </IonButtons>
            <IonTitle >Inventario de correo</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/formularioCorreo"><IonIcon icon={add}></IonIcon></IonButton>
              <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
            </IonButtons>
            <IonPopover
              isOpen={this.state.popOver}
              onDidDismiss={e => this.setState({ popOver: false })}>
              <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
              <IonList>
                <IonItem>
                  <IonLabel>Departamento</IonLabel>
                  <IonSelect value={this.state.filtro_dpto} okText="Ok" cancelText="Cancelar" name="departamento"
                    onIonChange={(e) => this.setState({ filtro_dpto: e.detail.value })}>
                    <IonSelectOption selected>Todos</IonSelectOption>
                    <SelectOptionDepartamento />
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Fecha de <br /> asignación</IonLabel>
                  <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                    value={this.state.filtro_fecha} onIonChange={(e) => this.setState({ filtro_fecha: e.detail.value })}
                    placeholder="Fecha" displayFormat="DD/MM/YYYY"
                  ></IonDatetime>
                </IonItem>
              </IonList>
              <div className="ion-text-center ion-margin">
                <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                <IonButton onClick={() => this.aplicar_filtros()}>Aplicar</IonButton>
              </div >
            </IonPopover>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.state.datos.map((dato: any) => {
            return (
              <ListaCorreos key={dato.correo} nombres={dato.nombre} apellidos={dato.apellido} departamento={dato.departamento} correo={dato.correo} />
            )
          })
          }
        </IonContent>
      </IonPage>
    );
  }
};

export default HomeCorreo;