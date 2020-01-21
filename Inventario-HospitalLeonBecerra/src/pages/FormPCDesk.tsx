import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.css';
import AxiosCorreo from '../services/Axios.services';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IonList, IonItem, IonLoading, IonIcon, IonAlert, IonButton, IonLabel, IonRow, IonCol, IonInput, IonText, IonGrid, IonHeader, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import  IState  from "./GlobalPC";
import GlobalPC  from "./GlobalPC";



export default class FormPCDesk extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            backAction: false,
            showAlertSuccess: Boolean,
            expanded: Number,
            setExpanded: false,
            data: {},
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




    

    validarData = () => {
        console.log('analisis', this.state.ramTabs);
        console.log('analisis', this.state.data);
        let dataCopy = this.state.data;
        let arrPrincipal = Object.keys(dataCopy);
        let formValues = ['pc-codigo', 'pc-monitor', 'pc-teclado', 'pc-parlantes', 'pc-mouse', 'cpu-tarjeta_madre', 'cpu-tarjeta_red','cpu-procesador', 'cpu-case', 'cpu-fuente_poder'];
        let indValues = ['marca', 'modelo', 'num_serie', "codigo"];
        let valuesTM = ['ram_soportada', 'num_slots','disc_conect'];
        let valuesRD = ['tipo', 'capacidad'];
        let valuesP = ['frecuencia','nucleos'];
        let ramSoportada = 0;
        let slotsTotal = 0;
        let ramTotal = 0;
        let discConect=0;
        formValues = formValues.concat(this.state.ramTabs);
        formValues = formValues.concat(this.state.storageTabs);

        for (var _i = 0; _i < formValues.length; _i++) {
            if (arrPrincipal.indexOf(formValues[_i]) < 0) {
                return 'No se han ingresado datos sobre ' + formValues[_i].split('-')[1].toUpperCase().replace('_', " ");
            }
        }

        for (var _k = 0; _k < arrPrincipal.length; _k++) {

            if (arrPrincipal[_k] === 'pc-codigo') {
                if (dataCopy[arrPrincipal[_k]].length <= 0) return 'Debe ingresar el Codigo del Equipo';
            }

            if (arrPrincipal[_k] !== 'pc-codigo' && arrPrincipal[_k] !== 'pc-descripcion') {
                for (var _j = 0; _j < indValues.length; _j++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(indValues[_j]) < 0) return 'Debe ingresar datos en el campo ' + indValues[_j].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");

                }
            }
            if (arrPrincipal[_k] === 'cpu-tarjeta_madre') {
                for (var _h = 0; _h < valuesTM.length; _h++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesTM[_h]) < 0) return 'Debe ingresar datos en el campo ' + valuesTM[_h].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if ((Number(dataCopy[arrPrincipal[_k]]['ram_soportada']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['ram_soportada'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['ram_soportada']) <= 0)) return 'La Ram Soportada por la tarjeta Madre no es correcta. Deben ser numeros positivos pares multipos de 2. '
                ramSoportada = Number(dataCopy[arrPrincipal[_k]]['ram_soportada']);
                slotsTotal = Number(dataCopy[arrPrincipal[_k]]['num_slots']);
                discConect = Number(dataCopy[arrPrincipal[_k]]['disc_conect']);
            }



            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1||arrPrincipal[_k].indexOf('cpu-disco_duro') !== -1) {  
                for (var _r = 0; _r < valuesRD.length; _r++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesRD[_r]) < 0) return 'Debe ingresar datos en el campo ' + valuesRD[_r].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }

                if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1) {
                    if ((Number(dataCopy[arrPrincipal[_k]]['capacidad']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['capacidad'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['capacidad']) <= 0)) return 'La Capacidad del componente ' + dataCopy[arrPrincipal[_k]] + ' no es correcta. Deben ser numeros positivos pares multipos de 2. '
                    ramTotal += Number(dataCopy[arrPrincipal[_k]]['capacidad']);

                }

            }
            if (arrPrincipal[_k].indexOf('cpu-procesador') !== -1) {  
                for (var _m = 0; _m < valuesP.length; _m++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesP[_m]) < 0) return 'Debe ingresar datos en el campo ' + valuesP[_m].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                

            }
        }



        if (slotsTotal < this.state.ramTabs.length) {
            return 'La cantidad de Tarjetas de Memoria Ram no coinciden con La cantidad de Slots Disponibles en la Tarjeta Madre.'
        }
        if (ramSoportada < ramTotal) {
            return 'La Memoria(s) Ram ingresadas sobre pasan la capacidad de la Tarjeta Madre.'

        }
        if(discConect<this.state.storageTabs.length){
            return 'La cantidad de Discos Duro no coinciden con La cantidad de Conexiones Disponibles en la Tarjeta Madre.'
        }

        return '';
    }

    


    

    

    addTabStorage = () => {
        let newTab = 'cpu-disco_duro_' + (this.state.storageTabs.length + 1);
        this.setState((prevState) => ({ storageTabs: [...prevState.storageTabs, newTab] }));
    }

    removeTabStorage = (index: any) => {
        let tab = 'cpu-disco_duro_' + (index + 1);
        let dataCopy = Object.assign({}, this.state.data);
        delete dataCopy[tab];
        this.setState((prevState) => ({ storageTabs: prevState.storageTabs.filter((value: any) => { return value !== tab }), data: dataCopy }));
    }

    sendData = () => {



        this.setState({
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosCorreo.crear_desktop(this.state.data).then(response => {
            this.setState({
                showLoading: false,
                showAlertSuccess: true

            })

            console.log(response);

        }, err => {
            let msj = '', header = '';
            console.log(err.response.data);
            if (err.response.status !== 400) {
                msj = 'Error ' + err.response.status;
                header = 'Error en el servidor. Intente mas tarde.';

            } else {
                let errorResp = err.response.data.log;
                if (errorResp.length < 2) {
                    msj = errorResp[0];
                    header = 'Error ' + err.response.status;
                }
                else {
                    msj = errorResp[1];
                    header = errorResp[0] + ' (Error ' + err.response.status + ')';

                }
            }
            this.setState({
                showLoading: false,
                errorMsj: msj,
                errorHeader: header,
                showAlertError: true
            });

        });

    }

    render() {

        if (!this.state.showAlertSuccess || this.state.backAction) {
            return (<Redirect to="/tiposequiposinventario" />);
        }

        const storagetabs = this.state.storageTabs.map((value: any, index: any) => {
            return (
                <IonRow key={index} class="ion-text-center">

                    <IonCol>
                        <IonList lines="full" className="ion-no-margin ion-no-padding">
                            <IonItem className="root" >
                                <IonGrid>
                                    <IonRow className="root" >
                                        <IonCol size="10">
                                            <b><IonText color="danger">{'Disco Duro ' + (index + 1)}</IonText></b>
                                        </IonCol>
                                        <IonCol size="2" >
                                            <IonIcon name='close' hidden={index === 0} size="small" onClick={(e: any) => { this.removeTabStorage(index) }} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <IonItem >
                                <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.codigo'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem >
                                <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.marca'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.modelo'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.num_serie'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.capacidad'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.tipo'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Descripcion</IonLabel>
                                <IonInput type="text" className="root" name={value + '.descripcion'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>
            );
        });
        const ramtabs = this.state.ramTabs.map((value: any, index: any) => {
            return (

                <IonRow key={index} class="ion-text-center">
                    <IonCol >
                        <IonList lines="full" className="ion-no-margin ion-no-padding">
                            <IonItem className="root" >
                                <IonGrid>
                                    <IonRow className="root" >
                                        <IonCol size="10">
                                            <b><IonText color="danger">{'Memoria ' + (index + 1)}</IonText></b>
                                        </IonCol>
                                        <IonCol size="2" >
                                            <IonIcon name='close' hidden={index === 0} size="small" onClick={(e: any) => { GlobalPC.removeTabRam(index,this) }} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <IonItem >
                                <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.codigo'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem >
                                <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.marca'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.modelo'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.num_serie'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Capacidad<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="number" className="root" name={value + '.capacidad'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.tipo'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Descripcion</IonLabel>
                                <IonInput required type="text" className="root" name={value + '.descripcion'} onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>


            );
        });


        return (
            <IonPage>

                <IonHeader>

                    <IonToolbar color="danger">

                        <IonButtons slot="start">
                            <div onClick={(e: any) => { this.setState({ backAction: true }) }}> <IonBackButton defaultHref="/home" ></IonBackButton></div>
                        </IonButtons>
                        <IonTitle>Equipos Informáticos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <form>
                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                </IonCol>
                                <IonCol>

                                    <IonList>
                                        <IonItem>
                                            <IonLabel class="ion-text-center">
                                                <h2><b>DeskTop</b></h2>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating" >Código<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required type="text" name='pc-codigo' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}} ></IonInput>
                                        </IonItem>


                                    </IonList>
                                </IonCol>
                            </IonRow>
                            <div>
                                <ExpansionPanel expanded={this.state.expanded === 1} onChange={(e:any)=>{GlobalPC.handleChange(1,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel1bh-header"
                                    >
                                        <Typography >Monitor</Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem>
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-monitor.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>


                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 2} onChange={(e:any)=>{GlobalPC.handleChange(2,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel2bh-header"
                                    >
                                        <Typography >Teclado</Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-teclado.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-teclado.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='pc-teclado.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-teclado.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-teclado.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 3} onChange={(e:any)=>{GlobalPC.handleChange(3,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel3bh-header"
                                    >
                                        <Typography>Parlantes</Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-parlantes.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 4} onChange={(e:any)=>{GlobalPC.handleChange(4,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Mouse</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}} ></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-mouse.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <IonItem>
                                    <IonLabel class="ion-text-center">
                                        <h2><b>CPU</b></h2>
                                    </IonLabel>
                                </IonItem>
                                <ExpansionPanel expanded={this.state.expanded === 5} onChange={(e:any)=>{GlobalPC.handleChange(5,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Tarjeta Madre</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Ram Soportada (GBs)<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="number" className="root" name='cpu-tarjeta_madre.ram_soportada' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Numero de slots para Ram<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="number" className="root" name='cpu-tarjeta_madre.num_slots' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Numero de Conexiones para Disco Duro<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="number" className="root" name='cpu-tarjeta_madre.disc_conect' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-tarjeta_madre.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 6} onChange={(e:any)=>{GlobalPC.handleChange(6,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Memoria Ram</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid > {ramtabs}</IonGrid >

                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small" onClick={(e:any)=>{GlobalPC.addTabRam(this)}}>Agregar Memoria Ram</Button>
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 7} onChange={(e:any)=>{GlobalPC.handleChange(7,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Disco Duro</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            {storagetabs}
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" onClick={this.addTabStorage}>Agregar Disco Duro</Button>
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 8} onChange={(e:any)=>{GlobalPC.handleChange(8,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Procesador</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                               
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-procesador.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-procesador.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-procesador.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-procesador.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Frecuencia<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="number" className="root" name='cpu-procesador.frecuencia' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de nucleos<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="number" className="root" name='cpu-procesador.nucleos' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-procesador.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                       
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 9} onChange={(e:any)=>{GlobalPC.handleChange(9,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Fuente de Poder</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                              
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 10} onChange={(e:any)=>{GlobalPC.handleChange(10,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Tarjeta de Red</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-tarjeta_red.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}} ></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 11} onChange={(e:any)=>{GlobalPC.handleChange(11,this)}}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Case del CPU</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                {/* <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol> */}
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                    <IonItem >
                                                            <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.codigo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.marca' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.modelo' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.num_serie' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-case.descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeInput(e,this)}} ></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e:any)=>{GlobalPC.nextTab(this)}}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>


                            </div>
                            <IonItem>
                                <IonLabel position="floating" >Descripcion General<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" name='pc-descripcion' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}} ></IonInput>
                            </IonItem>
                            <br />
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonButton color="success" class="ion-no-margin" onClick={(e:any) => { GlobalPC.saveHandler(this.validarData(),this)}}>Guardar</IonButton>
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
                                                    this.sendData();
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





