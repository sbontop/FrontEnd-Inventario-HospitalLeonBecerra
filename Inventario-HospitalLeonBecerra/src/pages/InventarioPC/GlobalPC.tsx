
import React from 'react';
import AxiosPC from '../../services/AxiosPC';
import { IonList, IonItem, IonIcon, IonLabel, IonRow, IonCol, IonInput, IonText, IonSelect, IonSelectOption, IonGrid, IonToggle } from '@ionic/react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.css';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
export default interface IState {
    showLoading: any;
    expanded: any;
    setExpanded: any;
    marcas: any;
    data: any;
    errorMsj: any;
    confirmMsj: any;
    errorHeader: any;
    confirmHeader: any;
    showAlertError: any;
    showAlertConfirm: any;
    showAlertSuccess: any;
    ramTabs: any;
    storageTabs: any;
    backAction: any;
    disabled_form: any;
    loadingMessage: any;
    confirmMessage: any;
    successMessage: any;
    listIP: any;
    listEmp: any;
    listSO: any;
}


export default class GlobalPC {

    static varDesktop = "desktop";
    static varLaptop = "laptop";
    static varIdDesktop = -1;
    static varIdLaptop = -1;


    static handleChange = (panel: number, obj: React.Component<any, IState>) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        obj.setState({ expanded: !isExpanded ? -1 : panel });
    };

    static nextTab = (obj: React.Component<any, IState>) => {
        obj.setState({ expanded: obj.state.expanded + 1 });
    }

    static getMarcas(obj: React.Component<any, IState>) {
        AxiosPC.mostrar_marcas().then((res: any) => {
            obj.setState({
                marcas: res.data
            });
            console.log("DATA:", obj.state.marcas);

        }).catch((err: any) => {
            console.log(err.response.data);
        });
    }

    static getListIP(obj: React.Component<any, IState>) {
        AxiosPC.get_listaip().then((res: any) => {
            obj.setState({
                listIP: res.data
            });
            console.log("DATA:", obj.state.listIP);
        }).catch((err: any) => {
            console.log(err.response.data);
        });
    }
    static getListSO(obj: React.Component<any, IState>) {
        AxiosPC.get_lista_so().then((res: any) => {
            obj.setState({
                listSO: res.data
            });
            console.log("DATA:", obj.state.listSO);
        }).catch((err: any) => {
            console.log(err.response.data);
        });
    }
    static getListEmpleado(obj: React.Component<any, IState>) {
        AxiosPC.get_lista_empleados().then((res: any) => {
            obj.setState({
                listEmp: res.data
            });
            console.log("DATA:", obj.state.listEmp);
        }).catch((err: any) => {
            console.log(err.response.data);

        });
    }
    static onChangeCodInput = (e: any, obj: React.Component<any, IState>) => {
        const { name, value } = e.target;
        obj.setState({
            data: {
                ...obj.state.data,
                [name]: value
            }
        });
    }
    static onChangeInput = (e: any, obj: React.Component<any, IState>) => {
        const { name, value } = e.target;
        let val = name.split(".");
        obj.setState({
            data: {
                ...obj.state.data,
                [val[0]]: {
                    ...obj.state.data[val[0]],
                    [val[1]]: value
                }
            }
        });


    }

    static saveHandler = (msj: string, obj: React.Component<any, IState>) => {
        let edit = obj.props.match.params.id !== undefined;
        console.log(msj)
        if (msj === '') {
            obj.setState({
                showAlertConfirm: true,
                confirmHeader: 'Confirmacion',
                confirmMessage: edit ? "¿Esta seguro de editar este equipo?" : "¿Esta seguro de registrar este equipo?",
                // successMessage: edit?'El equipo se edito exitosamente!':
            });
            console.log(obj.state.data)
        }
        else {
            obj.setState({
                errorMsj: msj,
                showAlertError: true,
                errorHeader: 'Error'
            });
        }
    }
    static addTabStorage = (obj: React.Component<any, IState>) => {
        let newTab = 'cpu-disco_duro_' + (obj.state.storageTabs.length + 1);
        obj.setState((prevState) => ({ storageTabs: [...prevState.storageTabs, newTab] }));
    }

    static addTabRam = (obj: React.Component<any, IState>) => {
        let newTab = 'cpu-memoria_ram_' + (obj.state.ramTabs.length + 1);
        obj.setState((prevState) => ({ ramTabs: [...prevState.ramTabs, newTab] }));
    }

    static removeTabRam = (index: any, obj: React.Component<any, IState>) => {
        let tab = 'cpu-memoria_ram_' + (index + 1);
        let dataCopy = Object.assign({}, obj.state.data);
        delete dataCopy[tab];
        obj.setState((prevState) => ({ ramTabs: prevState.ramTabs.filter((value: any) => { return value !== tab }), data: dataCopy }));
    }

    static sendData = (op: any, obj: React.Component<any, IState>) => {
        obj.setState({
            loadingMessage: "Registrando Informacion. Espere por favor...",
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosPC.crear_pc(obj.state.data, op).then(response => {
            obj.setState({
                showLoading: false,
                successMessage: "El equipo se registro exitosamente!",
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
            obj.setState({
                showLoading: false,
                errorMsj: msj,
                errorHeader: header,
                showAlertError: true
            });
        });
    }

    static editEquipo(obj: any, idequipo: any, body: any, op: any) {
        obj.setState({
            loadingMessage: "Registrando la nueva Informacion del equipo. Espere por favor...",
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosPC.editEquipo(idequipo, body, op).then(response => {
            obj.setState({
                showLoading: false,
                successMessage: 'La informacion del equipo se edito exitosamente!',
                showAlertSuccess: true
            })
            console.log(response);
        }, err => {
            obj.setState({
                showLoading: false
            })
            console.log(err.response.data);
        });
    }


    static deleteEquipo = (obj: any, idequipo: any,tipo:any) => {
        obj.setState({
            loadingMessage: "Eliminando equipo. Espere por favor...",
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosPC.deleteEquipo(idequipo,tipo).then((response: any) => {
            obj.setState({
                showLoading: false,
                successMessage: 'El equipo se elimino exitosamente!',
                showAlertSuccess: true
            })
            console.log(response);
        }, err => {
            obj.setState({
                showLoading: false
            })
            console.log(err.response.data);
        })
    }


    static getEquipoByID = (obj: React.Component<any, IState>, op: any) => {
        obj.setState({
            loadingMessage: "Cargando Informacion. Espere por favor...", showLoading: true,
        })
        AxiosPC.getEquipoByID(obj.props.match.params.id, op).then(response => {
            for (let i = 1; i < response.data["num_memoria_ram"]; i++) {
                GlobalPC.addTabRam(obj);
            }
            for (let j = 1; j < response.data["num_disco_duro"] && op !== 1; j++) {
                GlobalPC.addTabStorage(obj)
            }
            obj.setState({
                data: response.data,
                showLoading: false,
                disabled_form: true
            });
            console.log(response.data)
        }, err => {
            obj.setState({
                showLoading: false
            })
            console.log(err);
        });
    }




    static generateRamForm = (obj: React.Component<any, IState>) => {
        return obj.state.ramTabs.map((value: any, index: any) => {
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
                                            <IonIcon name='close' hidden={index === 0 || obj.props.match.params.id !== undefined} size="small" onClick={(e: any) => { GlobalPC.removeTabRam(index, obj) }} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            {GlobalPC.generateGeneralForm(value, obj)}
                            <IonItem>
                                <IonLabel position="floating">Capacidad<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required disabled={obj.state.disabled_form} type="number" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['capacidad'] : null} className="root" name={value + '.capacidad'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required disabled={obj.state.disabled_form} type="text" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['tipo'] : null} className="root" name={value + '.tipo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                            </IonItem>

                        </IonList>
                    </IonCol>
                </IonRow>


            );
        });
    }

    static generatePrincipalForm = (list: any, obj: React.Component<any, IState>, idx: any) => {

        return list.map((value: any, index: any) => {

            return (
                <ExpansionPanel key={value + idx} expanded={obj.state.expanded === (index + idx)} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                    console.log((index + idx))
                    obj.setState({
                        expanded: !isExpanded ? -1 : (index + idx)
                    })
                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1bh-header">
                        <Typography>{value.split("-")[1].toUpperCase().replace("_", " ")}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                        {GlobalPC.generateGeneralForm(value, obj)}
                                    </IonList >
                                </IonCol>
                            </IonRow>
                        </IonGrid>


                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        {/* <Button size="small">Cancel</Button> */}
                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(obj) }}>
                            Siguiente
                                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            )
        })



    }



    static generateGeneralForm = (value: any, obj: React.Component<any, IState>) => {
        return (

            <div key={value}>
                <IonItem>
                    <IonLabel position="floating">Codigo<IonText color="danger">*</IonText></IonLabel>
                    <IonInput required disabled={obj.state.disabled_form} type="text" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['codigo'] : null} className="root" name={value + '.codigo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Marca<IonText color="danger">*</IonText></IonLabel>
                    {/* <IonInput required type="text" className="root" name= {value + '.marca'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput> */}
                    {/* <IonLabel position="stacked">Tipo <IonText color="danger">*</IonText></IonLabel> */}
                    <IonSelect disabled={obj.state.disabled_form} value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['id_marca'] : null} name={value + '.id_marca'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}>
                        {obj.state.marcas.map((object: any, i: any) => {
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
                    <IonInput required disabled={obj.state.disabled_form} type="text" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['modelo'] : null} className="root" name={value + '.modelo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Número de Serie<IonText color="danger">*</IonText></IonLabel>
                    <IonInput required disabled={obj.state.disabled_form} type="text" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['numero_serie'] : null} className="root" name={value + '.numero_serie'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Descripcion</IonLabel>
                    <IonInput type="text" disabled={obj.state.disabled_form} value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['descripcion'] : null} className="root" name={value + '.descripcion'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                </IonItem>
            </div>

        )
    }


    static generateFormExt(obj: React.Component<any, IState>) {
        return (
            <div key={"ext"}>
                <IonItem>
                    <IonLabel position="floating">Nombre del PC<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type="text" disabled={obj.state.disabled_form} className="root" value={obj.state.data["pc-nombre"]} name='pc-nombre' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Usuario del PC<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type="text" disabled={obj.state.disabled_form} className="root" value={obj.state.data["pc-usuario"]} name='pc-usuario' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Direccion del IP</IonLabel>
                    {/* <IonInput required type="text" className="root" name='pc-marca' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}}></IonInput> */}
                    <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-ip"]} name='pc-ip' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>
                        <IonSelectOption value={null}>
                            Ninguno
                                </IonSelectOption>
                        {obj.state.listIP.map((object: any, i: any) => {
                            return (
                                <IonSelectOption key={object.id_ip} value={object.direccion_ip}>
                                    {object.direccion_ip}
                                </IonSelectOption>
                            );
                        })}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Asignar a Empleado</IonLabel>
                    {/* <IonInput required type="text" className="root" name='pc-marca' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}}></IonInput> */}
                    <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-empleado"]} name='pc-empleado' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>
                        <IonSelectOption value={null}> Ninguno</IonSelectOption>
                        {obj.state.listEmp.map((object: any, i: any) => {
                            return (
                                <IonSelectOption key={object.id} value={object.id}>
                                    {object.nombre + " " + object.apellido}
                                </IonSelectOption>
                            );
                        })}
                    </IonSelect>
                </IonItem>
            </div>
        );
    }


    static generateSOForm(obj: React.Component<any, IState>, idx: any) {
        return (
            <div key={"SOForm"}>
                <ExpansionPanel expanded={obj.state.expanded === (idx)} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                    console.log((idx))
                    obj.setState({
                        expanded: !isExpanded ? -1 : idx
                    })
                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1bh-header">
                        <Typography>Sistema Operativo</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                        <IonItem>
                                            <IonLabel position="floating">Sistema Operativo<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-so"]} name='pc-so' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>

                                                {obj.state.listSO.map((object: any, i: any) => {
                                                    return (
                                                        <IonSelectOption key={object.so + "_" + i} value={object.so}>
                                                            {object.so}
                                                        </IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel position="floating">Tipo de Sistema Operativo<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-tipo_so"]} name='pc-tipo_so' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>
                                                <IonSelectOption value={"64 Bits"}>64 Bits</IonSelectOption>
                                                <IonSelectOption value={"32 Bits"}>32 Bits</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="fixed">Licencia<IonText color="danger">*</IonText></IonLabel>
                                            <IonToggle disabled={obj.state.disabled_form} checked={obj.state.data["pc-licencia"]} name='pc-licencia' onIonChange={(e: any) => {
                                                obj.setState({
                                                    data: {
                                                        ...obj.state.data,
                                                        [e.target.name]: e.detail.checked
                                                    }
                                                });
                                            }} />
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="fixed">Service Pack<IonText color="danger">*</IonText></IonLabel>
                                            <IonToggle disabled={obj.state.disabled_form} checked={obj.state.data["pc-service"]} name='pc-service' onIonChange={(e: any) => { obj.setState({
                                                    data: {
                                                        ...obj.state.data,
                                                        [e.target.name]: e.detail.checked
                                                    }
                                                }); }} />
                                        </IonItem>
                                    </IonList >
                                </IonCol>
                            </IonRow>
                        </IonGrid>


                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        {/* <Button size="small">Cancel</Button> */}
                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(obj) }}>
                            Siguiente
                                </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }


}
