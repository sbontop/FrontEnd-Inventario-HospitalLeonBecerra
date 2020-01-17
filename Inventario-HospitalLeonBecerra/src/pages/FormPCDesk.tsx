import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
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

interface IState {
    showLoading: any;
    expanded: any;
    setExpanded: any;
    data: any;
    errorMsj: any;
    confirmMsj: any;
    errorHeader: any;
    confirmHeader: any;
    showAlertError: any;
    showAlertConfirm: any;
    showAlertSuccess: any;
    ramTabs: any;
    backAction:any;
}


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
            ramTabs: ['cpu-memoria_ram_1']
        }
    }




    handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {

        this.setState({
            expanded: !isExpanded ? -1 : panel,

        });
    };

    nextTab = () => {
        this.setState({
            expanded: this.state.expanded + 1

        });
    }


    onChangeCodInput = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    }
    onChangeInput = (e: any) => {
        const { name, value } = e.target;
        let val = name.split(".");
        this.setState({
            data: {
                ...this.state.data,
                [val[0]]: {
                    ...this.state.data[val[0]],
                    [val[1]]: value
                }
            }
        });


    }

    validarData = () => {
        console.log('analisis',this.state.ramTabs);
        console.log('analisis',this.state.data);
        let dataCopy = this.state.data;
        let arrPrincipal = Object.keys(dataCopy);
        let formValues = ['pc-codigo', 'cpu-disco_duro', 'pc-monitor', 'pc-teclado', 'pc-parlantes', 'pc-mouse', 'cpu-tarjeta_madre', 'cpu-tarjeta_red', 'cpu-case', 'cpu-fuente_poder'];
        let indValues = ['marca', 'modelo', 'num_serie'];
        let valuesTM = ['ram_soportada', 'num_slots'];
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
                
            }



            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !==-1) {
                for (var _r = 0; _r < valuesRD.length; _r++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesRD[_r]) < 0) return 'Debe ingresar datos en el campo ' + valuesRD[_r].replace('_', ". ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if ((Number(dataCopy[arrPrincipal[_k]]['capacidad']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['capacidad'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['capacidad']) <= 0)) return 'La Capacidad del componente ' + dataCopy[arrPrincipal[_k]] + ' no es correcta. Deben ser numeros positivos pares multipos de 2. '
               
                if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !==-1 ) {
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

    saveHandler = () => {
        let msj = this.validarData();
        console.log(msj)
        if (msj === '') {
            this.setState({
                showAlertConfirm: true,
                confirmHeader: 'Confirmacion'
            });
            console.log(this.state.data)
        }
        else {
            this.setState({
                errorMsj: msj,
                showAlertError: true,
                errorHeader: 'Error'
            });
        }


    }

    addRamTab = () => {
        let newTab = 'cpu-memoria_ram_' + (this.state.ramTabs.length + 1);
        this.setState((prevState) => ({ ramTabs: [...prevState.ramTabs, newTab] }));
    }

    removeRamTab = (index: any) => {
        console.log(index)
        let tab = 'cpu-memoria_ram_'+(index+1);
        console.log(tab)
        let dataCopy = Object.assign({}, this.state.data);
        delete dataCopy[tab];
        console.log(dataCopy)
        this.setState((prevState) => ({ ramTabs: prevState.ramTabs.filter((value:any)=>{return value !== tab }), data: dataCopy}));
    }

    sendData = () => {



        this.setState({
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosCorreo.crear_desktop( this.state.data).then(response => {
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
        const ramtabs = this.state.ramTabs.map((value: any, index: any) => {
            return (

                <IonRow key={index} class="ion-text-center">
                    <IonCol >
                        <IonList lines="full" className="ion-no-margin ion-no-padding">
                            <IonItem className="root" >
                                <IonGrid>
                                    <IonRow className="root" >
                                        <IonCol size = "10">
                                            <b><IonText color="danger">{'Memoria ' + (index + 1)}</IonText></b>
                                        </IonCol>
                                        <IonCol size = "2" >
                                            <IonIcon name='close' hidden = {index===0} size="small" onClick = {(e:any)=>{this.removeRamTab(index)}} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <IonItem >
                                <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.marca'} onIonChange={this.onChangeInput}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.modelo'} onIonChange={this.onChangeInput}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.num_serie'} onIonChange={this.onChangeInput}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Capacidad<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="number" className="root" name={value + '.capacidad'} onIonChange={this.onChangeInput}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" className="root" name={value + '.tipo'} onIonChange={this.onChangeInput}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Descripcion</IonLabel>
                                <IonInput required type="text" className="root" name={value + '.descripcion'} onIonChange={this.onChangeInput}></IonInput>
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
                           <div onClick = {(e:any)=>{this.setState({backAction: true})}}> <IonBackButton defaultHref="/home" ></IonBackButton></div>
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
                                            <IonInput required type="text" name='pc-codigo' onIonChange={this.onChangeCodInput} ></IonInput>
                                        </IonItem>


                                    </IonList>
                                </IonCol>
                            </IonRow>
                            <div>
                                <ExpansionPanel expanded={this.state.expanded === 1} onChange={this.handleChange(1)}>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-monitor.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-monitor.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>


                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 2} onChange={this.handleChange(2)}>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-teclado.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='pc-teclado.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-teclado.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-teclado.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 3} onChange={this.handleChange(3)}>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-parlantes.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-parlantes.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 4} onChange={this.handleChange(4)}>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='pc-mouse.num_serie' onIonChange={this.onChangeInput} ></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='pc-mouse.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <IonItem>
                                    <IonLabel class="ion-text-center">
                                        <h2><b>CPU</b></h2>
                                    </IonLabel>
                                </IonItem>
                                <ExpansionPanel expanded={this.state.expanded === 5} onChange={this.handleChange(5)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Tarjeta Madre</Typography>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_madre.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Ram Soportada (GBs)<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="number" className="root" name='cpu-tarjeta_madre.ram_soportada' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Numero de slots para Ram<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="number" className="root" name='cpu-tarjeta_madre.num_slots' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-tarjeta_madre.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 6} onChange={this.handleChange(6)}>
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
                                        <Button size="small" onClick={this.addRamTab}>Agregar Memoria Ram</Button>
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 7} onChange={this.handleChange(7)}>
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
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-disco_duro.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-disco_duro.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-disco_duro.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-disco_duro.capacidad' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-disco_duro.tipo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-disco_duro.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 8} onChange={this.handleChange(8)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >Fuente de Poder</Typography>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-fuente_poder.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 9} onChange={this.handleChange(9)}>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-tarjeta_red.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-tarjeta_red.descripcion' onIonChange={this.onChangeInput} ></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 10} onChange={this.handleChange(10)}>
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
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='cpu-case.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='cpu-case.descripcion' onIonChange={this.onChangeInput} ></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>


                            </div>
                            <IonItem>
                                <IonLabel position="floating" >Descripcion General<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required type="text" name='pc-descripcion' onIonChange={this.onChangeCodInput} ></IonInput>
                            </IonItem>
                            <br />
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonButton color="success" class="ion-no-margin" onClick={e => { this.saveHandler() }}>Guardar</IonButton>
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
                                    <IonButton color="danger" onClick = {(e:any)=>{this.setState({backAction: true})}} class="ion-no-margin">Cancelar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonPage>








        );
    }
}





