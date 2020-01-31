import {
    IonContent, IonToolbar, IonTitle, IonDatetime ,IonHeader, IonSelect ,IonPage, IonPopover,IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonThumbnail, IonBackButton, IonSearchbar, IonList, IonSelectOption
} from '@ionic/react';
import React from 'react';
import { options, add, build } from 'ionicons/icons';
import AxiosPC from '../../services/AxiosPC'

interface IStateEq {
    equipos: any
    data: any
    filtro:any
    filtro_fecha:any
    busqueda:any
    popOver: boolean
}

export default class ConsultarDesktop extends React.Component<{}, IStateEq> {
    constructor(props: any) {
        super(props);
        this.state = {
            equipos: [],
            data: {},
            popOver:false,
            filtro: "codigo",
            busqueda:"",
            filtro_fecha:"",
        }
        
    }

    componentDidMount = ()=>{
        this.getEquipos();
    }

    onChangeCodInput = (e: any) => {
        let value = e.target.value;
        console.log(value);

        this.setState({
            data: {
                ...this.state.data,
                [this.state.filtro]: value
            }
        });
        console.log(this.state.data)
    }

    getEquipos = () => {
      
        
        console.log(this.state.data)
        AxiosPC.getEquipos(this.state.data).then(response => {
            console.log(response)
            this.setState({
                equipos: response.data

            })
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    render() {
        const list = this.state.equipos.map((value: any, index: any) => {
            return (
                <IonItem key={index}>
                    <IonLabel color="dark">
                        <h2><b>{value.tipo_equipo.toUpperCase() + ": " + value.codigo}</b></h2>
                        <h3>{"Usuario: " + value.encargado_registro}</h3>
                        <p>{"Fecha. Reg: " + value.fecha_registro}</p>
                    </IonLabel>
                    <IonThumbnail>
                        <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                    </IonThumbnail>


                    <IonButton class="btn1" fill="clear"> X </IonButton>
                </IonItem>
            );
        });
        return (
            <IonPage>
                <br />
                <IonHeader translucent>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tab2" />
                        </IonButtons>
                        <IonTitle>Equipos informáticos</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink="/formdesktop"><IonIcon icon={add}></IonIcon></IonButton>
                            <IonButton onClick={() => this.setState({ popOver: true })}><IonIcon icon={options}></IonIcon></IonButton>
                        </IonButtons>
                        <IonPopover
                            isOpen={this.state.popOver}
                            onDidDismiss={e => this.setState({ popOver: false })}>
                            <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                            <IonList>
                                <IonItem>
                                    <IonLabel>Buscar por</IonLabel>
                                    <IonSelect  okText="Ok" cancelText="Cancelar" name="filtro"
                                        onIonChange={(e) => this.setState({ 
                                            
                                            filtro: e.detail.value, 
                                            busqueda:"",
                                            data:{
                                            
                                                [e.detail.value]: "",
                                                "fecha":this.state.filtro_fecha
                                            }
                                        
                                        })}>
                                        <IonSelectOption value="codigo" selected>Codigo Equipo</IonSelectOption>
                                        <IonSelectOption value ="user" >Usuario Registro</IonSelectOption>
                                        <IonSelectOption value ="num_serie" >Numero de serie</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Fecha de <br /> asignación</IonLabel>
                                    <IonDatetime doneText="Ok" cancelText="Cancelar" name="fecha"
                                        onIonChange={(e) => {this.setState({ 
                                            filtro_fecha: e.detail.value!==null&&e.detail.value!==undefined?e.detail.value.split("T")[0]:"",
                                            data:{
                                            
                                                [this.state.filtro]: this.state.busqueda,
                                                "fecha":e.detail.value!==null&&e.detail.value!==undefined?e.detail.value.split("T")[0]:""
                                            }
                                        });console.log(this.state.filtro_fecha)}}
                                        placeholder="Fecha" displayFormat="DD/MM/YYYY"
                                    ></IonDatetime>
                                </IonItem>
                            </IonList>
                            <div className="ion-text-center ion-margin">
                                <IonButton onClick={() => this.setState({ popOver: false })} >Cancelar</IonButton>
                                <IonButton onClick={(e:any) => {
                                    
                                    this.setState({ popOver: false })
                                    
                                    this.getEquipos()}}>Aplicar</IonButton>
                            </div >
                        </IonPopover>
                    </IonToolbar>

                </IonHeader>

                <IonContent >

                    <IonSearchbar placeholder={"Buscar por "+(this.state.filtro==="codigo"?"Codigo":this.state.filtro==="user"?"Usuario Registra":"Numero de Serie")+" ..."} onIonChange={(e:any)=>{this.setState({
                    busqueda:e.target.value,
                    data:{
                        [this.state.filtro]: e.target.value,
                        "fecha":this.state.filtro_fecha
                    }
                })}} value ={this.state.busqueda}
                        onIonCancel={(e: any) => { this.getEquipos() }} cancelButtonIcon="md-search" showCancelButton="focus"
                    >
                    </IonSearchbar>





                    <IonList>
                        {list}
                    </IonList>
                </IonContent >
            </IonPage>
        );

    }



}