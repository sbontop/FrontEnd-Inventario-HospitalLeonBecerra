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
import { IonList, IonItem, IonLoading, IonIcon, IonSelect, IonAlert, IonSelectOption, IonButton, IonLabel, IonRow, IonCol, IonInput, IonText, IonGrid, IonHeader, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import IState from "./GlobalPC";
import GlobalPC from "./GlobalPC";



export default class FormPCLaptop extends Component<any, IState> {

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
            errorHeader: '',
            confirmHeader: 'Confirmacion',
            showAlertError: false,
            showAlertConfirm: false,
            ramTabs: ['cpu-memoria_ram_1'],
            storageTabs: ['cpu-disco_duro_1'],
            disabled_form: false,
            loadingMessage: "",
            confirmMessage: "",
            successMessage: '',
            listIP: [],
            listEmp: [],
            listSO: [],
            listOffice: [],
            fuente: false,
            visible_fuente: false

        }
    }

    componentDidMount = () => {
        console.log("mounted laptop")
        GlobalPC.getMarcas(this);
        //GlobalPC.getListIP(this);
        GlobalPC.getListEmpleado(this);
        GlobalPC.getListSO(this);
        GlobalPC.getListOffice(this);
        GlobalPC.getIpByID(this.props.match.params.ip === undefined ? -1 : this.props.match.params.ip, this);
        console.log(this.props.match.params.ip);
        if (this.props.match.params.id !== undefined) {
            GlobalPC.getEquipoByID(this, 1);
        }


    }

    componentWillUnmount() {
        console.log("unmounted laptop");

    }



    validarData(): string | any[][] {
        console.log(this.state.data)
        //, 'pc-conexiones_dd'
        let formValues = ['pc-codigo', 'pc-id_marca', 'pc-modelo', "pc-numero_serie", "pc-estado", 'pc-ram_soportada', 'pc-numero_slots', 
        "pc-procesador", "pc-nombre_pc", 'pc-usuario_pc', "pc-sistema_operativo", "pc-tipo_sistema_operativo", "pc-licencia", 
        "pc-service", "pc-version_office", "pc-empleado_asignado", "pc-ip_asignada"];
        let indValues = ['id_marca', 'modelo', 'numero_serie', "codigo"];
        let valuesRD = ['tipo', 'capacidad', "tipo_capacidad"];
        let valuesP = ['frecuencia', 'nucleos'];
        let ramSoportada = 0;
        let slotsTotal = 0;
        //let discConect = 0;
        let ramTotal = 0;
        let arr_cod: any[] = [];
        //let arr_serie: any[] = [];
        formValues = formValues.concat(this.state.ramTabs);
        formValues = formValues.concat(this.state.storageTabs);
        let dataCopy = this.state.data;
        let arrPrincipal = Object.keys(dataCopy).filter((value: any) => { return value.indexOf("num_") === -1 && value.indexOf("list_") === -1 });
        if (this.state.fuente) {
            formValues = formValues.concat(["pc-ups_regulador"]);
        } else {

            arrPrincipal = arrPrincipal.filter((value: any) => { return value !== "pc-ups_regulador" });
            formValues = formValues.filter((value: any) => { return value !== "pc-ups_regulador" });
        }

        for (var _i = 0; _i < formValues.length; _i++) {
            if (arrPrincipal.indexOf(formValues[_i]) < 0 || dataCopy[formValues[_i]] === undefined || ((typeof dataCopy[formValues[_i]] === "string" || typeof dataCopy[formValues[_i]] === "number" ? String(dataCopy[formValues[_i]]).trim() : dataCopy[formValues[_i]]) === "")) {
                return 'No se han ingresado datos sobre ' + formValues[_i].split('-')[1].toUpperCase().replace('_', " ");
            }
        }

        if (arr_cod.indexOf(dataCopy["pc-codigo"]) > -1) {

            return "El codigo " + dataCopy['pc-codigo'] + " esta repetido. Por favor revise el formulario..."
        } else {
            arr_cod = arr_cod.concat([dataCopy["pc-codigo"]]);

        }

        // if (arr_serie.indexOf(dataCopy["pc-numero_serie"]) > -1) {

        //     return "El Numero de Serie " + dataCopy['pc-numero_serie'] + " esta repetido. Por favor revise el formulario..."
        // } else {

        //     arr_serie = arr_serie.concat([dataCopy["pc-numero_serie"]]);
        // }

        if (!GlobalPC.valRegExpNum(dataCopy['pc-ram_soportada'], "{0,2}", false)) {
            return "Los datos ingresados en Ram Soportada no son validos";
        }
        if (!GlobalPC.valRegExpNum(dataCopy['pc-numero_slots'], "{0}", false)) {
            return "Los datos ingresados en Slots para Ram no son validos";
        }
        // if (!GlobalPC.valRegExpNum(dataCopy['pc-conexiones_dd'], "{0}", false)) {
        //     return "Los datos ingresados en Conexiones para Discos no son validos"
        // }
        if ((Number(dataCopy['pc-ram_soportada']) === 1 ? 2 : Number(dataCopy['pc-ram_soportada'])) % 2 !== 0 || Number((dataCopy['pc-ram_soportada']) <= 0)) return 'La Ram Soportada por la tarjeta Madre no es correcta. Deben ser numeros positivos pares multipos de 2. '
        ramSoportada = Number(dataCopy['pc-ram_soportada']);
        slotsTotal = Number(dataCopy['pc-numero_slots']);
        //discConect = Number(dataCopy['pc-conexiones_dd']);
        for (var _k = 0; _k < arrPrincipal.length; _k++) {
            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1 || (arrPrincipal[_k].indexOf('cpu-disco_duro') !== -1 || (arrPrincipal[_k].indexOf('pc-ups_regulador') !== -1) || arrPrincipal[_k].indexOf('pc-procesador') !== -1)) {
                for (var _j = 0; _j < indValues.length; _j++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(indValues[_j]) < 0 || dataCopy[arrPrincipal[_k]][indValues[_j]] === undefined || dataCopy[arrPrincipal[_k]][indValues[_j]] === null || String(dataCopy[arrPrincipal[_k]][indValues[_j]]).trim() === "") {
                        return 'Debe ingresar datos validos en el campo ' + indValues[_j].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                    } else {
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
            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1 || (arrPrincipal[_k].indexOf('cpu-disco_duro') !== -1)) {
                for (var _r = 0; _r < valuesRD.length; _r++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesRD[_r]) < 0 || dataCopy[arrPrincipal[_k]][valuesRD[_r]] === undefined || dataCopy[arrPrincipal[_k]][valuesRD[_r]] === null || String(dataCopy[arrPrincipal[_k]][valuesRD[_r]]).trim() === "") return 'Debe ingresar datos validos en el campo ' + valuesRD[_r].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if (!GlobalPC.valRegExpNum(dataCopy[arrPrincipal[_k]]["capacidad"], "*", false)) {
                    return "La Capacidad ingresada en " + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ") + " no es valida."
                }
            }
            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1) {
                if ((Number(dataCopy[arrPrincipal[_k]]['capacidad']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['capacidad'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['capacidad']) <= 0)) {
                    return 'La Capacidad del componente ' + dataCopy[arrPrincipal[_k]] + ' no es correcta. Deben ser numeros positivos pares multipos de 2. '
                }
                let r = Number(dataCopy[arrPrincipal[_k]]['capacidad']);
                ramTotal += (dataCopy[arrPrincipal[_k]]["tipo_capacidad"] === "GB" ? r : r / 1000);
            }
            if (arrPrincipal[_k].indexOf('pc-procesador') !== -1) {
                for (var _m = 0; _m < valuesP.length; _m++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesP[_m]) < 0 || dataCopy[arrPrincipal[_k]][valuesP[_m]] === undefined || dataCopy[arrPrincipal[_k]][valuesP[_m]] === null) return 'Debe ingresar datos en el campo ' + valuesP[_m].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
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
            return 'La cantidad de Tarjetas de Memoria Ram no coinciden con La cantidad de Slots Disponibles en el Equipo.'
        }
        if (ramSoportada < ramTotal) {
            return 'La Memoria(s) Ram ingresadas sobre pasan la capacidad del Equipo.'
        }
        // if (discConect < this.state.storageTabs.length) {
        //     return 'La cantidad de Discos Duro no coinciden con La cantidad de Conexiones Disponibles en el Equipo.'
        // }


        //arr_serie
        return [arr_cod];
    }


    render() {

        if (this.state.backAction) {

            return (<Redirect to="/consultlaptop" />);
        }
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <div > <IonButton onClick={(e: any) => { this.setState({ backAction: true }) }}  ><IonIcon icon={arrowBack}></IonIcon></IonButton></div>
                        </IonButtons>
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
                                            <IonInput disabled={this.props.match.params.id !== undefined} required type="text" value={this.state.data["pc-codigo"]} name='pc-codigo' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }} ></IonInput>
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
                                            <IonSelect disabled={this.state.disabled_form} value={this.state.data["pc-id_marca"]} name='pc-id_marca' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}>
                                                {this.state.marcas.map((object: any, i: any) => {
                                                    return (
                                                        <IonSelectOption key={object.id_marca} value={object.id_marca}>
                                                            {object.nombre}
                                                        </IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required disabled={this.state.disabled_form} type="text" value={this.state.data["pc-modelo"]} className="root" name='pc-modelo' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required disabled={this.state.disabled_form} type="text" value={this.state.data["pc-numero_serie"]} className="root" name='pc-numero_serie' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Ram Soportada (GBs)<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required disabled={this.state.disabled_form} type="number" value={this.state.data["pc-ram_soportada"]} className="root" name='pc-ram_soportada' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Numero de slots para Ram<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required disabled={this.state.disabled_form} type="number" value={this.state.data["pc-numero_slots"]} className="root" name='pc-numero_slots' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        {/* <IonItem>
                                            <IonLabel position="floating">Numero de Conexiones para Disco Duro<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput required disabled={this.state.disabled_form} type="number" value={this.state.data["pc-conexiones_dd"]} className="root" name='pc-conexiones_dd' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem> */}
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

                                        {GlobalPC.generateFormExt(this)}
                                        <IonItem>
                                            <IonLabel position="floating">Descripcion</IonLabel>
                                            <IonInput type="text" disabled={this.state.disabled_form} className="root" value={this.state.data["pc-descripcion"]} name='pc-descripcion' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>

                                    </IonList>
                                </IonCol>
                            </IonRow>

                            <div>
                                {GlobalPC.generateSOForm(this, 1)}
                                <ExpansionPanel expanded={this.state.expanded === 2} onChange={GlobalPC.handleChange(2, this)}>
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
                                <ExpansionPanel expanded={this.state.expanded === 3} onChange={GlobalPC.handleChange(3, this)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="panel4bh-header"
                                    >
                                        <Typography >DISCO DURO</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>

                                        <IonGrid>
                                            {/* <IonRow class="ion-text-center">
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">

                                                        {GlobalPC.generateGeneralForm("pc-disco_duro_1", this)}

                                                        <IonItem>
                                                            <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required disabled={this.state.disabled_form} type="text" value={this.state.data["pc-disco_duro_1"] !== undefined && this.state.data["pc-disco_duro_1"] !== null ? this.state.data["pc-disco_duro_1"]['capacidad'] : null} className="root" name='pc-disco_duro_1.capacidad' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required disabled={this.state.disabled_form} type="text" value={this.state.data["pc-disco_duro_1"] !== undefined && this.state.data["pc-disco_duro_1"] !== null ? this.state.data["pc-disco_duro_1"]['tipo'] : null} className="root" name='pc-disco_duro_1.tipo' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow> */}
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

                                < ExpansionPanel expanded={this.state.expanded === 4} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                                    this.setState({
                                        expanded: !isExpanded ? -1 : 4
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
                                                        {GlobalPC.generateGeneralForm('pc-procesador', this)}
                                                        <IonItem>
                                                            <IonLabel position="floating">Frecuencia (GHz)<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput disabled={this.state.disabled_form} value={this.state.data["pc-procesador"] !== undefined && this.state.data["pc-procesador"] !== null ? this.state.data["pc-procesador"]['frecuencia'] : null} type="number" className="root" name='pc-procesador.frecuencia' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de nucleos<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput disabled={this.state.disabled_form} value={this.state.data["pc-procesador"] !== undefined && this.state.data["pc-procesador"] !== null ? this.state.data["pc-procesador"]['nucleos'] : null} type="number" className="root" name='pc-procesador.nucleos' onIonChange={(e: any) => { GlobalPC.onChangeInput(e, this) }}></IonInput>
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
                                {
                                    //GlobalPC.generateFuenteForm(this, 5)
                                }
                            </div>
                            <br />
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonButton color="success" class="ion-no-margin" disabled={this.state.disabled_form} onClick={(e: any) => {

                                        const res = this.validarData();
                                        GlobalPC.saveHandler(res, this);


                                    }}>{"Guardar " + (this.props.match.params.id !== undefined ? "Cambios" : "Equipo")}</IonButton>
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
                                                            GlobalPC.deleteEquipo(this, this.props.match.params.id, "laptop");
                                                        } else {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    "num_memoria_ram": this.state.ramTabs.length,
                                                                    "num_disco_duro": this.state.storageTabs.length
                                                                }
                                                            });
                                                            console.log(this.state.data);
                                                            GlobalPC.editEquipo(this, this.props.match.params.id, this.state.data, 1);
                                                        }
                                                    } else {


                                                        GlobalPC.sendData(1, this);
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



