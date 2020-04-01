import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.css';
import { trash, create } from 'ionicons/icons';
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
            data: {},
            marcas: [],
            showLoading: false,
            errorMsj: '',
            confirmMsj: '',
            errorHeader: '',
            confirmHeader: 'Confirmacion',
            showAlertError: false,
            showAlertConfirm: false,
            ramTabs: ['cpu-memoria_ram_1'],
            storageTabs: ['pc-disco_duro_1'],
            disabled_form: false,
            loadingMessage: "",
            confirmMessage: "",
            successMessage: ''

        }
    }

    componentDidMount = () => {
        console.log("mounted laptop")
        GlobalPC.getMarcas(this);
        // console.log(this.props)
        // console.log(this.props.match.params.id);
        if (this.props.match.params.id !== undefined) {

            GlobalPC.getEquipoByID(this, 1);
        }
        // else{
        //     this.setState({ 
        //         loadingMessage:"Registrando Informacion. Espere por favor...",
        //         confirmMessage:"¿Esta seguro de registrar este equipo?",
        //         successMessage:'El equipo se registro exitosamente!'
        //     })
        // }

        //this.getEquipoByID();

    }
    // getEquipoByID=()=>{
    //     this.setState({showLoading: true})
    //     AxiosPC.getEquipoByID(this.props.match.params.id,1).then(response =>{
    //         this.setState({
    //             showLoading: false
    //         })

    //         console.log(response)
    //     }, err=>{
    //         this.setState({
    //             showLoading: false
    //         })
    //         console.log(err);
    //     });
    // }
    componentWillUnmount() {
        console.log("unmounted laptop");

    }

    validarData = () => {
        console.log(this.state.data)
        let dataCopy = this.state.data;
        let arrPrincipal = Object.keys(dataCopy);
        let formValues = ['pc-codigo', 'pc-id_marca', 'pc-modelo', "pc-numero_serie", 'pc-ram_soportada', 'pc-frecuencia', 'pc-nucleos', 'pc-numero_slots', "pc-disco_duro_1"];
        let indValues = ['id_marca', 'modelo', 'numero_serie', "codigo"];
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
        slotsTotal = Number(dataCopy['pc-numero_slots']);
        for (var _k = 0; _k < arrPrincipal.length; _k++) {
            if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1||(arrPrincipal[_k].indexOf('pc-disco_duro')!== -1)) {
                for (var _j = 0; _j < indValues.length; _j++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(indValues[_j]) < 0) return 'Debe ingresar datos en el campo ' + indValues[_j].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                for (var _r = 0; _r < valuesRD.length; _r++) {
                    if (Object.keys(dataCopy[arrPrincipal[_k]]).indexOf(valuesRD[_r]) < 0) return 'Debe ingresar datos en el campo ' + valuesRD[_r].replace('_', " ").toUpperCase() + ' en el componente ' + arrPrincipal[_k].split('-')[1].toUpperCase().replace('_', " ");
                }
                if (arrPrincipal[_k].indexOf('cpu-memoria_ram') !== -1) {
                    if ((Number(dataCopy[arrPrincipal[_k]]['capacidad']) === 1 ? 2 : Number(dataCopy[arrPrincipal[_k]]['capacidad'])) % 2 !== 0 || Number((dataCopy[arrPrincipal[_k]]['capacidad']) <= 0)){
                        return 'La Capacidad del componente ' + dataCopy[arrPrincipal[_k]] + ' no es correcta. Deben ser numeros positivos pares multipos de 2. '
                    } 
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

        if (this.state.backAction) {
            console.log("entro");

            return (<Redirect to="/consultlaptop" />);
        }
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <div onClick={(e: any) => { this.setState({ backAction: true }) }}> <IonBackButton defaultHref="/home" ></IonBackButton></div>
                        </IonButtons>
                        <IonTitle>{this.props.match.params.id === undefined ? "Equipos Informáticos" : "Editar Equipo"}</IonTitle>
                        <IonButtons slot="end" hidden={this.props.match.params.id === undefined}>
                            <IonButton onClick={(e: any) => { this.setState({ disabled_form:!this.state.disabled_form }) }}><IonIcon icon={create}></IonIcon> </IonButton>
                            <IonButton onClick={(e: any) => { this.setState({ confirmMessage:"¿Esta seguro de eliminar este equipo?", showAlertConfirm:true }) }} ><IonIcon icon={trash}></IonIcon> </IonButton>
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
                                            <IonInput disabled={this.state.disabled_form} required type="text" value={this.state.data["pc-codigo"]} name='pc-codigo' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }} ></IonInput>
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

                                        <IonItem>
                                            <IonLabel position="floating">Frecuencia del Procesador<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput type="number" disabled={this.state.disabled_form} className="root" value={this.state.data["pc-frecuencia"]} name='pc-frecuencia' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Número de nucleos de Procesador<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput type="number" disabled={this.state.disabled_form} className="root" value={this.state.data["pc-nucleos"]} name='pc-nucleos' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Descripcion</IonLabel>
                                            <IonInput type="text" disabled={this.state.disabled_form} className="root" value={this.state.data["pc-descripcion"]} name='pc-descripcion' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, this) }}></IonInput>
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
                                    <IonButton color="success" class="ion-no-margin" disabled={this.state.disabled_form} onClick={(e: any) => { GlobalPC.saveHandler(this.validarData(), this) }}>{"Guardar "+(this.props.match.params.id !== undefined?"Cambios":"Equipo")}</IonButton>
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
                                                    if(this.props.match.params.id !== undefined){
                                                        if(this.state.confirmMessage.indexOf("eliminar")>-1){
                                                            GlobalPC.deleteEquipo(this,this.props.match.params.id);
                                                        }else{
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    "num_memoria_ram": this.state.ramTabs.length,
                                                                    "num_disco_duro":this.state.storageTabs.length
                                                                }
                                                            });
                                                            console.log(this.state.data);
                                                            GlobalPC.editEquipo(this,this.props.match.params.id,this.state.data,1);
                                                        }
                                                    }else{
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



