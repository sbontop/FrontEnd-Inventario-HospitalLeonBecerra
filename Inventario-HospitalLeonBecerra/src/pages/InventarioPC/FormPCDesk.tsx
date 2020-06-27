import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.css';
import { trash, create, arrowBack } from 'ionicons/icons';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    IonList, IonItem, IonLoading, IonIcon, IonAlert, IonSelectOption,
    IonButton, IonLabel, IonRow, IonCol, IonInput, IonText, IonGrid, IonHeader, IonContent,
    IonTitle, IonPage, IonToolbar, IonButtons, IonSelect
} from '@ionic/react';
import IState from "./GlobalPC";
import GlobalPC from "./GlobalPC";



export default class FormPCDesk extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            backAction: false,
            showAlertSuccess: false,
            expanded: Number,
            setExpanded: false,
            data: {
                "pc-licencia": false,
                "pc-service": false,
                "pc-ups_regulador": {
                    "tipo_equipo": null
                }
            },
            marcas: [],
            showLoading: false,
            errorMsj: '',
            confirmMsj: '',
            confirmHeader: 'Confirmacion',
            errorHeader: '',
            showAlertError: false,
            showAlertConfirm: false,
            ramTabs: ['cpu-memoria_ram_1'],
            storageTabs: ['cpu-disco_duro_1'],
            disabled_form: false,
            loadingMessage: "Registrando Informacion. Espere por favor...",
            confirmMessage: "¿Esta seguro de registrar este equipo?",
            successMessage: 'El equipo se registro exitosamente!',
            listIP: [],
            listEmp: [],
            listSO: [],
            listOffice: [],
            fuente: false,
            visible_fuente: false
        }
    }

    static pcList = ['pc-monitor', 'pc-teclado', 'pc-parlantes', 'pc-mouse'];
    static cpuList = ['cpu-tarjeta_red', 'cpu-case', 'cpu-fuente_poder']

    componentDidMount = () => {
        console.log("mounted desktop");



        // GlobalPC.getListIP(this);
        GlobalPC.getMarcas(this);
        GlobalPC.getListEmpleado(this);
        GlobalPC.getListSO(this);
        GlobalPC.getListOffice(this);
        GlobalPC.getIpByID(this.props.match.params.ip === undefined ? -1 : this.props.match.params.ip, this);
        if (this.props.match.params.id !== undefined) {
            GlobalPC.getEquipoByID(this, 2);
        }
    }




    validarData(): string | any[][] {
        console.log('analisis', this.state.ramTabs);
        console.log('analisis', this.state.data);
        let formValues = ['cpu-tarjeta_madre', 'cpu-procesador'];
        let formValues_2 = ['pc-codigo', "pc-nombre_pc", 'pc-usuario_pc', "pc-sistema_operativo", "pc-estado", "pc-tipo_sistema_operativo", "pc-licencia", "pc-service", "pc-version_office", "pc-empleado_asignado", "pc-ip_asignada"];
        let indValues = ['id_marca', 'modelo', 'numero_serie', "codigo"];
        let valuesTM = ['ram_soportada', 'numero_slots', 'conexiones_dd'];
        let valuesRD = ['tipo', 'capacidad', "tipo_capacidad"];
        let valuesP = ['frecuencia', 'nucleos'];
        let arr_cod: any[] = [];
       // let arr_serie: any[] = [];
        let ramSoportada = 0;
        let slotsTotal = 0;
        let ramTotal = 0;
        let discConect = 0;
        formValues = formValues.concat(this.state.ramTabs);
        formValues = formValues.concat(this.state.storageTabs);
        formValues = formValues.concat(formValues_2);
        formValues = formValues.concat(FormPCDesk.pcList);
        formValues = formValues.concat(FormPCDesk.cpuList);
        let dataCopy = this.state.data;
        let arrPrincipal = Object.keys(dataCopy).filter((value: any) => { return value.indexOf("num_") === -1 && value.indexOf("list_") === -1 });
        console.log(this.state.fuente, "fuente")
        if (this.state.fuente) {
            formValues = formValues.concat(["pc-ups_regulador"]);
        } else {
            arrPrincipal = arrPrincipal.filter((value: any) => { return value !== "pc-ups_regulador" });
            formValues = formValues.filter((value: any) => { return value !== "pc-ups_regulador" });
        }

        for (var _i = 0; _i < formValues.length; _i++) {
            if (arrPrincipal.indexOf(formValues[_i]) < 0) {
                return 'No se han ingresado datos sobre ' + formValues[_i].split('-')[1].toUpperCase().replace('_', " ");
            }
        }
        for (var _k = 0; _k < arrPrincipal.length; _k++) {

            if (formValues_2.indexOf(arrPrincipal[_k]) > -1) {
                if (dataCopy[arrPrincipal[_k]] === undefined || ((typeof dataCopy[arrPrincipal[_k]] === "string" || typeof dataCopy[arrPrincipal[_k]] === "number" ? String(dataCopy[arrPrincipal[_k]]).trim() : dataCopy[arrPrincipal[_k]]) === "")) {
                    return 'Debe ingresar valores validos para ' + arrPrincipal[_k].split('-')[1].replace('_', " ").toUpperCase();
                }
                else {
                    if (arrPrincipal[_k] === "pc-codigo") {
                        if (arr_cod.indexOf(dataCopy[arrPrincipal[_k]]) > -1) {

                            return "El codigo " + dataCopy[arrPrincipal[_k]] + " esta repetido. Por favor revise el formulario..."
                        } else {
                            arr_cod = arr_cod.concat([dataCopy["pc-codigo"]]);
                        }
                    }
                }
            }
            //            if (arrPrincipal[_k] !== 'pc-codigo' && arrPrincipal[_k] !== 'pc-descripcion' && arrPrincipal[_k].indexOf('num_') === -1) {
            if (formValues_2.indexOf(arrPrincipal[_k]) === -1 && arrPrincipal[_k] !== 'pc-descripcion' && arrPrincipal[_k].indexOf('num_') === -1) {
                for (var _j = 0; _j < indValues.length; _j++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(indValues[_j]) < 0 || dataCopy[arrPrincipal[_k]][indValues[_j]] === undefined || dataCopy[arrPrincipal[_k]][indValues[_j]] === null || (String(dataCopy[arrPrincipal[_k]][indValues[_j]]).trim() === "")) {
                        return 'Debe ingresar datos en el campo ' + indValues[_j].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                    }

                    else {
                        if (indValues[_j] === "codigo") {
                            if (arr_cod.indexOf(dataCopy[arrPrincipal[_k]][indValues[_j]]) > -1) {

                                return "El Codigo " + dataCopy[arrPrincipal[_k]][indValues[_j]] + " esta repetido. Por favor revise el formulario..."
                            } else {
                                arr_cod = arr_cod.concat([dataCopy[arrPrincipal[_k]][indValues[_j]]])
                            }
                        }
                        // if (indValues[_j] === "numero_serie") {
                        //     if (arr_serie.indexOf(dataCopy[arrPrincipal[_k]][indValues[_j]]) > -1) {

                        //         return "El Numero de serie " + dataCopy[arrPrincipal[_k]][indValues[_j]] + " esta repetido. Por favor revise el formulario..."
                        //     } else {
                        //         arr_serie = arr_serie.concat([dataCopy[arrPrincipal[_k]][indValues[_j]]])
                        //     }
                        // }
                    }
                }
            }
            if (arrPrincipal[_k] === 'cpu-tarjeta_madre') {
                for (var _h = 0; _h < valuesTM.length; _h++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesTM[_h]) < 0 || dataCopy[arrPrincipal[_k]][valuesTM[_h]] === undefined || dataCopy[arrPrincipal[_k]][valuesTM[_h]] === null || (String(dataCopy[arrPrincipal[_k]][valuesTM[_h]]).trim() === "")) return 'Debe ingresar datos en el campo ' + valuesTM[_h].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if (!GlobalPC.valRegExpNum(dataCopy[arrPrincipal[_k]]['ram_soportada'], "{0,2}", false)) {
                    return "Los datos ingresados en Ram Soportada no son validos";
                }
                if (!GlobalPC.valRegExpNum(dataCopy[arrPrincipal[_k]]['numero_slots'], "{0}", false)) {
                    return "Los datos ingresados en Slots para Ram no son validos";
                }
                if (!GlobalPC.valRegExpNum(dataCopy[arrPrincipal[_k]]['conexiones_dd'], "{0}", false)) {
                    return "Los datos ingresados en Conexiones para Discos no son validos"
                }

                if ((Number(dataCopy[arrPrincipal[_k]]['ram_soportada']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['ram_soportada'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['ram_soportada']) <= 0)) return 'La Ram Soportada por la tarjeta Madre no es correcta. Deben ser numeros positivos pares multipos de 2. '
                ramSoportada = Number(dataCopy[arrPrincipal[_k]]['ram_soportada']);
                slotsTotal = Number(dataCopy[arrPrincipal[_k]]['numero_slots']);
                discConect = Number(dataCopy[arrPrincipal[_k]]['conexiones_dd']);
            }
            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1 || arrPrincipal[_k].indexOf('cpu-disco_duro') !== -1) {
                for (var _r = 0; _r < valuesRD.length; _r++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesRD[_r]) < 0 || dataCopy[arrPrincipal[_k]][valuesRD[_r]] === undefined || dataCopy[arrPrincipal[_k]][valuesRD[_r]] === null || (String(dataCopy[arrPrincipal[_k]][valuesRD[_r]]).trim() === "")) return 'Debe ingresar datos en el campo ' + valuesRD[_r].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if (!GlobalPC.valRegExpNum(dataCopy[arrPrincipal[_k]]["capacidad"], "*", false)) {
                    return "La Capacidad ingresada en " + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ") + " no es valida."
                }
                if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1) {
                    if ((Number(dataCopy[arrPrincipal[_k]]['capacidad']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['capacidad'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['capacidad']) <= 0)) return 'La Capacidad del componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ") + ' no es correcta. Deben ser numeros positivos pares multipos de 2. '
                    //ramTotal += Number(dataCopy[arrPrincipal[_k]]['capacidad']);
                    let r = Number(dataCopy[arrPrincipal[_k]]['capacidad']);
                    ramTotal += (dataCopy[arrPrincipal[_k]]["tipo_capacidad"] === "GB" ? r : r / 1000);
                }
            }
            if (arrPrincipal[_k].indexOf('cpu-procesador') !== -1) {
                for (var _m = 0; _m < valuesP.length; _m++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesP[_m]) < 0 || dataCopy[arrPrincipal[_k]][valuesP[_m]] === undefined || dataCopy[arrPrincipal[_k]][valuesP[_m]] === null || (typeof (dataCopy[arrPrincipal[_k]][valuesP[_m]]) === "number")) return 'Debe ingresar datos en el campo ' + valuesP[_m].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if (!GlobalPC.valRegExpNum((dataCopy[arrPrincipal[_k]]["nucleos"]), "{0}", false)) {
                    return "El valor Ingresado en Numero de Nucleos en el Procesador no es valido!"
                }
                if (!GlobalPC.valRegExpNum((dataCopy[arrPrincipal[_k]]["frecuencia"]), "{0}", true)) {
                    return "El valor Ingresado en Frecuencia en el Procesador no es valido!"
                }
            }
        }
        if (slotsTotal < this.state.ramTabs.length) {
            return 'La cantidad de Tarjetas de Memoria Ram no coinciden con La cantidad de Slots Disponibles en la Tarjeta Madre.'
        }
        if (ramSoportada < ramTotal) {
            return 'La Memoria(s) Ram ingresadas sobre pasan la capacidad de la Tarjeta Madre.'

        }
        if (discConect < this.state.storageTabs.length) {
            return 'La cantidad de Discos Duro no coinciden con La cantidad de Conexiones Disponibles en la Tarjeta Madre.'
        }
        //arr_serie
        return [arr_cod];
    }








    // public addTabStorage = () => {
    //     let newTab = 'cpu-disco_duro_' + (this.state.storageTabs.length + 1);
    //     this.setState((prevState) => ({ storageTabs: [...prevState.storageTabs, newTab] }));
    // }

    // public removeTabStorage = (index: any) => {
    //     let tab = 'cpu-disco_duro_' + (index + 1);
    //     let dataCopy = Object.assign({}, this.state.data);
    //     delete dataCopy[tab];
    //     this.setState((prevState) => ({ storageTabs: prevState.storageTabs.filter((value: any) => { return value !== tab }), data: dataCopy }));
    // }



    render() {

        if (this.state.backAction) {
            return (<Redirect to="/consultdesk" />);
        }

        // const storagetabs = this.state.storageTabs.map((value: any, index: any) => {
        //     return (
        //         <IonRow key={index} class="ion-text-center">

        //             <IonCol>
        //                 <IonList lines="full" className="ion-no-margin ion-no-padding">
        //                     <IonItem className="root" >
        //                         <IonGrid>
        //                             <IonRow className="root" >
        //                                 <IonCol size="10">
        //                                     <b><IonText color="primary">{'Disco Duro ' + (index + 1)}</IonText></b>
        //                                 </IonCol>
        //                                 <IonCol size="2" >
        //                                     <IonIcon name='close' hidden={index === 0} size="small" onClick={(e: any) => { this.removeTabStorage(index) }} />
        //                                 </IonCol>
        //                             </IonRow>
        //                         </IonGrid>
        //                     </IonItem>
        //                     {GlobalPC.generateGeneralForm(value, this)}
        //                     <IonItem>
        //                         <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
        //                         <IonInput disabled={this.state.disabled_form} required type="text" value={this.state.data[value] !== undefined && this.state.data[value] !== null ? this.state.data[value]['capacidad'] : null} className="root" name={value + '.capacidad'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
        //                     </IonItem>
        //                     <IonItem>
        //                         <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
        //                         <IonInput disabled={this.state.disabled_form} required type="text" value={this.state.data[value] !== undefined && this.state.data[value] !== null ? this.state.data[value]['tipo'] : null} className="root" name={value + '.tipo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
        //                     </IonItem>

        //                 </IonList>
        //             </IonCol>
        //         </IonRow>
        //     );
        // });
        // // const ramtabs = this


        return (
            <IonPage>

                <IonHeader>

                    <IonToolbar color="primary">

                        <IonButtons slot="start">
                            <div > <IonButton onClick={(e: any) => { this.setState({ backAction: true }) }}  ><IonIcon icon={arrowBack}></IonIcon></IonButton></div>
                        </IonButtons>
                        {/* <IonTitle>Equipos Informáticos</IonTitle> */}
                        <IonTitle>{this.props.match.params.id === undefined ? "Equipos Informáticos" : "Editar Equipo"}</IonTitle>
                        <IonButtons slot="end" hidden={this.props.match.params.id === undefined}>
                            <IonButton onClick={(e: any) => { this.setState({ disabled_form: !this.state.disabled_form }) }}><IonIcon icon={create}></IonIcon> </IonButton>
                            <IonButton onClick={(e: any) => { this.setState({ confirmMessage: "¿Esta seguro de eliminar este equipo?", showAlertConfirm: true }) }} ><IonIcon icon={trash}></IonIcon> </IonButton>
                        </IonButtons>
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
                                            <IonInput required disabled={this.props.match.params.id !== undefined} type="text" name='pc-codigo' value={this.state.data["pc-codigo"]} onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }} ></IonInput>
                                        </IonItem>


                                    </IonList>
                                </IonCol>
                            </IonRow>
                            <div>
                                <IonList>
                                    {GlobalPC.generateFormExt(this)}
                                    <IonItem>
                                        <IonLabel position="floating">Estado<IonText color="danger">*</IonText></IonLabel>
                                        <IonSelect disabled={this.state.disabled_form} value={this.state.data["pc-estado"]} name={'pc-estado'} onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}>
                                            <IonSelectOption value={"O"}>Operativo</IonSelectOption>
                                            <IonSelectOption value={"D"}>Disponible</IonSelectOption>
                                            <IonSelectOption value={"ER"}>En Revision</IonSelectOption>
                                            <IonSelectOption value={"R"}>Reparado</IonSelectOption>
                                            <IonSelectOption value={"B"}>De Baja</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonList>




                                {GlobalPC.generatePrincipalForm(FormPCDesk.pcList, this, 0)}
                                <IonItem>
                                    <IonLabel class="ion-text-center">
                                        <h2><b>CPU</b></h2>
                                    </IonLabel>
                                </IonItem>
                                <ExpansionPanel expanded={this.state.expanded === 4} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                                    this.setState({
                                        expanded: !isExpanded ? -1 : 4
                                    });

                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >TARJETA MADRE</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        {GlobalPC.generateGeneralForm("cpu-tarjeta_madre", this)}
                                                        <IonItem>
                                                            <IonLabel position="floating">Ram Soportada (GBs)<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required disabled={this.state.disabled_form} type="number" value={this.state.data["cpu-tarjeta_madre"] !== undefined && this.state.data["cpu-tarjeta_madre"] !== null ? this.state.data["cpu-tarjeta_madre"]['ram_soportada'] : null} className="root" name='cpu-tarjeta_madre.ram_soportada' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Numero de slots para Ram<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required disabled={this.state.disabled_form} type="number" value={this.state.data["cpu-tarjeta_madre"] !== undefined && this.state.data["cpu-tarjeta_madre"] !== null ? this.state.data["cpu-tarjeta_madre"]['numero_slots'] : null} className="root" name='cpu-tarjeta_madre.numero_slots' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Numero de Conexiones para Disco Duro<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required disabled={this.state.disabled_form} type="number" value={this.state.data["cpu-tarjeta_madre"] !== undefined && this.state.data["cpu-tarjeta_madre"] !== null ? this.state.data["cpu-tarjeta_madre"]['conexiones_dd'] : null} className="root" name='cpu-tarjeta_madre.conexiones_dd' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        {/* <Button size="small">Cancel</Button> */}
                                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(this) }}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 5} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                                    this.setState({
                                        expanded: !isExpanded ? -1 : 5
                                    });

                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >MEMORIA RAM</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid > {GlobalPC.generateRamForm(this)}</IonGrid >

                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small" hidden={this.props.match.params.id !== undefined} onClick={(e: any) => { GlobalPC.addTabRam(this) }}>Agregar Memoria Ram</Button>
                                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(this) }}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                <ExpansionPanel expanded={this.state.expanded === 6} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                                    this.setState({
                                        expanded: !isExpanded ? -1 : 6
                                    });

                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >DISCO DURO</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            {/* {storagetabs} */}
                                            {GlobalPC.generateStorageForm(this)}
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>

                                        <Button size="small" hidden={this.props.match.params.id !== undefined} onClick={(e: any) => { GlobalPC.addTabStorage(this) }}>Agregar Disco Duro</Button>
                                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(this) }}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                                < ExpansionPanel expanded={this.state.expanded === 7} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                                    this.setState({
                                        expanded: !isExpanded ? -1 : 7
                                    });

                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >PROCESADOR</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        {GlobalPC.generateGeneralForm('cpu-procesador', this)}
                                                        <IonItem>
                                                            <IonLabel position="floating">Frecuencia (GHz)<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput disabled={this.state.disabled_form} value={this.state.data["cpu-procesador"] !== undefined && this.state.data["cpu-procesador"] !== null ? this.state.data["cpu-procesador"]['frecuencia'] : null} type="number" className="root" name='cpu-procesador.frecuencia' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de nucleos<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput disabled={this.state.disabled_form} value={this.state.data["cpu-procesador"] !== undefined && this.state.data["cpu-procesador"] !== null ? this.state.data["cpu-procesador"]['nucleos'] : null} type="number" className="root" name='cpu-procesador.nucleos' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
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
                                {GlobalPC.generateSOForm(this, 8)}
                                {GlobalPC.generateFuenteForm(this, 9)}
                                {GlobalPC.generatePrincipalForm(FormPCDesk.cpuList, this, FormPCDesk.pcList.length + 6)}


                            </div>
                            <IonItem>
                                <IonLabel position="floating" >DESCRIPCION GENERAL<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required disabled={this.state.disabled_form} value={this.state.data["pc-descripcion"]} type="text" name='pc-descripcion' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }} ></IonInput>
                            </IonItem>
                            <br />
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonButton color="success" class="ion-no-margin" onClick={(e: any) => { GlobalPC.saveHandler(this.validarData(), this) }}>{"Guardar " + (this.props.match.params.id !== undefined ? "Cambios" : "Equipo")}</IonButton>
                                    <IonLoading
                                        isOpen={this.state.showLoading}

                                        message={this.state.loadingMessage}

                                    />

                                    <IonAlert
                                        isOpen={this.state.showAlertConfirm}

                                        header={this.state.confirmHeader}

                                        message={this.state.confirmMessage}
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
                                                    if (this.props.match.params.id !== undefined) {
                                                        if (this.state.confirmMessage.indexOf("eliminar") > -1) {
                                                            GlobalPC.deleteEquipo(this, this.props.match.params.id, "desktop");
                                                        } else {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    "num_memoria_ram": this.state.ramTabs.length,
                                                                    "num_disco_duro": this.state.storageTabs.length
                                                                }
                                                            });
                                                            console.log(this.state.data);
                                                            GlobalPC.editEquipo(this, this.props.match.params.id, this.state.data, 2);
                                                        }
                                                    } else {
                                                        GlobalPC.sendData(2, this);
                                                    }

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

                                        message={this.state.successMessage}
                                        buttons={[
                                            {
                                                text: 'Ok',
                                                handler: () => {
                                                    this.setState({
                                                        showAlertSuccess: false, backAction: true
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





