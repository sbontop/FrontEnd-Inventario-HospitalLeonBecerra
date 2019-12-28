import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.css';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IonList, IonItem, IonButton, IonLabel, IonRow, IonCol, IonInput, IonText, IonGrid, IonHeader, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';

interface IState {
    expanded: any;
    setExpanded: any;
    data:any;
}


export default class FormPCDesk extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            expanded: Number,
            setExpanded: false,
            data:{},
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

    onChangeInput = (e:any) =>{
        const { name, value } = e.target;
        let val = name.split(".");
        //console.log(val[0], val[1])
        this.setState({
            data:{
                ...this.state.data,
                [val[0]]:{
                    ...this.state.data[val[0]],
                    [val[1]]: value
                }
            }
        });
        

    }

    

    sendData = (e: any) => {
        e.stopPropagation();
        console.log(this.state)
        console.log(e)
        e.preventDefault();
        
    }

    render() {





        return (
            <IonPage>

                <IonHeader>

                    <IonToolbar color="danger">

                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home"></IonBackButton>
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
                                            <IonInput required type="text" ></IonInput>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='monitor.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='monitor.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='monitor.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='monitor.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>


                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='teclado.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput type="text" className="root" name='teclado.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='teclado.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='teclado.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='parlantes.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='parlantes.madelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='parlantes.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='parlantes.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='mouse.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='mouse.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='mouse.num_serie' onIonChange={this.onChangeInput} ></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='mouse.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='trajeta_madre.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='trajeta_madre.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='trajeta_madre.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Ram Soportada (GBs)<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='trajeta_madre.ram_soport' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Numero de slots para Ram<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='trajeta_madre.num_slots' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='trajeta_madre.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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


                                        <IonGrid>
                                            <IonRow class="ion-text-center">
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='ram.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='ram.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='ram.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Capacidad<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='ram.capacidad' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='ram.tipo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput required type="text" className="root" name='ram.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='disco.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='disco.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='disco.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='disco.capacidad' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='disco.tipo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput  type="text" className="root" name='disco.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput  type="text" className="root" name='fuente.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput  type="text" className="root" name='fuente.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput  type="text" className="root" name='fuente.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput  type="text" className="root" name='fuente.descripcion' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
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
                                                <IonCol size="3">
                                                    <img src={process.env.PUBLIC_URL + "/assets/img/desktop.png"} alt="" />
                                                </IonCol>
                                                <IonCol>
                                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                                        <IonItem >
                                                            <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='tarjeta_red.marca' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Modelo<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='tarjeta_red.modelo' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>
                                                        <IonItem>
                                                            <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                                                            <IonInput required type="text" className="root" name='tarjeta_red.num_serie' onIonChange={this.onChangeInput}></IonInput>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonLabel position="floating">Descripcion</IonLabel>
                                                            <IonInput type="text" className="root" name='tarjeta_red.descripcion' onIonChange={this.onChangeInput} ></IonInput>
                                                        </IonItem>
                                                    </IonList>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>



                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button size="small">Cancel</Button>
                                        <Button size="small" color="primary" onClick={this.nextTab}>
                                            Siguiente
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>


                            </div>
                            <br />
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonButton  color="success" class="ion-no-margin" onClick={this.sendData}>Guardar</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" class="ion-no-margin">Cancelar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonPage>








        );
    }
}





