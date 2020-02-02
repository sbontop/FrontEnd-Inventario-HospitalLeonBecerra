import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.css';

import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IonList, IonItem, IonLoading, IonSelect, IonAlert, IonSelectOption, IonButton, IonLabel, IonRow, IonCol, IonInput, IonText, IonGrid, IonHeader, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import IState from "./GlobalPC";
import GlobalPC from "./GlobalPC";


export default class FormPCLaptop extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            backAction: false,
            showAlertSuccess: Boolean,
            expanded: Number,
            setExpanded: false,
            data: {},
            marcas: [],
            showLoading: Boolean,
            errorMsj: '',
            confirmMsj: '',
            errorHeader: '',
            confirmHeader: '',
            showAlertError: Boolean,
            showAlertConfirm: Boolean,
            ramTabs: ['cpu-memoria_ram_1'],
            storageTabs: ['cpu-disco_duro_1']
        }
    }

    componentDidMount = () => {
        GlobalPC.getMarcas(this);
    }












    validarData = () => {

        let dataCopy = this.state.data;
        let arrPrincipal = Object.keys(dataCopy);
        let formValues = ['pc-codigo', 'pc-marca', 'pc-modelo',"pc-num_serie", 'pc-ram_soportada', 'pc-frecuencia', 'pc-nucleos', 'pc-num_slots'];
        let indValues = ['marca', 'modelo', 'num_serie', "codigo"];

        let valuesRD = ['tipo', 'capacidad'];
        let ramSoportada = 0;
        let slotsTotal = 0;
        let ramTotal = 0;

        formValues = formValues.concat(this.state.ramTabs);


        for (var _i = 0; _i < formValues.length; _i++) {
            if (arrPrincipal.indexOf(formValues[_i]) < 0) {
                return 'No se han ingresado datos sobre ' + formValues[_i].split('-')[1].toUpperCase().replace('_', " ");
            }

        }

        if ((Number(dataCopy['pc-ram_soportada']) === 1 ? 2 : Number(dataCopy['pc-ram_soportada'])) % 2 !== 0 || Number((dataCopy['pc-ram_soportada']) <= 0)) return 'La Ram Soportada por la tarjeta Madre no es correcta. Deben ser numeros positivos pares multipos de 2. '
        ramSoportada = Number(dataCopy['pc-ram_soportada']);
        slotsTotal = Number(dataCopy['pc-num_slots']);



        for (var _k = 0; _k < arrPrincipal.length; _k++) {

            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1) {
                for (var _j = 0; _j < indValues.length; _j++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(indValues[_j]) < 0) return 'Debe ingresar datos en el campo ' + indValues[_j].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");

                }
                for (var _r = 0; _r < valuesRD.length; _r++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesRD[_r]) < 0) return 'Debe ingresar datos en el campo ' + valuesRD[_r].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if ((Number(dataCopy[arrPrincipal[_k]]['capacidad']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['capacidad'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['capacidad']) <= 0)) return 'La Capacidad del componente ' + dataCopy[arrPrincipal[_k]] + ' no es correcta. Deben ser numeros positivos pares multipos de 2. '

                if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1) {
                    ramTotal += Number(dataCopy[arrPrincipal[_k]]['capacidad']);
                }

            }
        }



        if (slotsTotal < this.state.ramTabs.length) {
            return 'La cantidad de Tarjetas de Memoria Ram no coinciden con La cantidad de Slots Disponibles en la Tarjeta Madre.'
        }
        if (ramSoportada < ramTotal) {
            return 'La Memoria(s) Ram ingresadas sobre pasan la capacidad de la Tarjeta Madre.'

        }


        return '';
    }









    render() {

        if (!this.state.showAlertSuccess || this.state.backAction) {
            return (<Redirect to="/consultlaptop" />);
        }




        return (
            <IonPage>

                <IonHeader>

                    <IonToolbar color="primary">

                        <IonButtons slot="start">
                            <div onClick={(e: any) => { this.setState({ backAction: true }) }}> <IonBackButton defaultHref="/home" ></IonBackButton></div>
                        </IonButtons>
                        <IonTitle>Equipos Informáticos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <form>
                        <IonGrid>
                            <IonItem>
                                <IonLabel class="ion-text-center">
                                    <h2><b>Laptop</b></h2>
                                </IonLabel>
                            </IonItem>
                            <IonRow class="ion-text-center">

                                <IonCol>
                                    <img src={process.env.PUBLIC_URL + "/assets/img/laptop.png"} alt="" />
                                </IonCol>
                                <IonCol>

                                    <IonList>

                                        <IonItem>
                                            <IonLabel position="floating" >Código<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required type="text" name='pc-codigo' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }} ></IonInput>
                                        </IonItem>


                                    </IonList>
                                </IonCol>
                            </IonRow>
                            <IonRow class="ion-text-center">

                                <IonCol>
                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                        <IonItem>
                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                            {/* <IonInput required type="text" className="root" name='pc-marca' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}}></IonInput> */}
                                            <IonSelect name='pc-marca' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}>
                                                {this.state.marcas.map((object: any, i: any) => {
                                                    return (
                                                        <IonSelectOption key={object.marca} value={object.marca}>
                                                            {object.marca}
                                                        </IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required type="text" className="root" name='pc-modelo' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required type="text" className="root" name= 'pc-num_serie'onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Ram Soportada (GBs)<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required type="number" className="root" name='pc-ram_soportada' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Numero de slots para Ram<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required type="number" className="root" name='pc-num_slots' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel position="floating">Frecuencia del Procesador<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput type="number" className="root" name='pc-frecuencia' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Número de nucleos de Procesador<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput type="number" className="root" name='pc-nucleos' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Descripcion</IonLabel>
                                            <IonInput type="text" className="root" name='pc-descripcion' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>

                                    </IonList>
                                </IonCol>
                            </IonRow>

                            <div>





                                <ExpansionPanel expanded={this.state.expanded === 1} onChange={GlobalPC.handleChange(1, this)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Memoria Ram</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid > {GlobalPC.generateRamForm(this)}</IonGrid >

                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small" onClick={(e: any) => { GlobalPC.addTabRam(this) }}>Agregar Memoria Ram</Button>
                                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(this) }}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 2} onChange={GlobalPC.handleChange(2, this)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Disco Duro</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>

                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">

                                                        {GlobalPC.generateGeneralForm("pc-disco_duro", this)}

                                                        <IonItem>
                                                            <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-disco_duro.capacidad' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-disco_duro.tipo' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>

                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>

                                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(this) }}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>





                            </div>

                            <br />
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonButton color="success" class="ion-no-margin" onClick={(e: any) => { GlobalPC.saveHandler(this.validarData(), this) }}>Guardar</IonButton>
                                    <IonLoading
                                        isOpen={this.state.showLoading}
                                        message={'Registrando Informacion. Espero por favor...'}
                                    />

                                    <IonAlert
                                        isOpen={this.state.showAlertConfirm}

                                        header={this.state.confirmHeader}

                                        message={'¿Esta seguro de registrar este equipo?'}
                                        buttons={[
                                            {
                                                text: 'No',
                                                role: 'cancel',
                                                cssClass: 'secondary',
                                                handler: () => {
                                                    this.setState({ showAlertConfirm: false });
                                                }
                                            },
                                            {
                                                text: 'Si',
                                                handler: () => {
                                                    GlobalPC.sendData(1, this);
                                                }
                                            }
                                        ]}
                                    />
                                    <IonAlert
                                        isOpen={this.state.showAlertError}

                                        header={this.state.errorHeader}

                                        message={this.state.errorMsj}
                                        buttons={[
                                            {
                                                text: 'Ok',
                                                handler: () => {
                                                    this.setState({ showAlertError: false })
                                                }
                                            }
                                        ]}
                                    />
                                    <IonAlert
                                        isOpen={this.state.showAlertSuccess}

                                        header={'Registro Exitoso'}

                                        message={'El equipo se registro exitosamente!'}
                                        buttons={[
                                            {
                                                text: 'Ok',
                                                handler: () => {
                                                    this.setState({
                                                        showAlertSuccess: false
                                                    })
                                                }
                                            }
                                        ]}
                                    />

                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" onClick={(e: any) => { this.setState({ backAction: true }) }} class="ion-no-margin">Cancelar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonPage>








        );
    }
}



