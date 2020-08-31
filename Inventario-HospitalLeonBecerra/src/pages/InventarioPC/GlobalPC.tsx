
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
    listOffice: any;
    fuente: any;
    visible_fuente: any;
    tipo_memoria:any;
   

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

    static getListOffice(obj: React.Component<any, IState>) {
        AxiosPC.get_lista_office().then((res: any) => {
            console.log("lar",res.data)
            obj.setState({
                listOffice: res.data
            });
            console.log("DATAoof:", obj.state.listOffice);
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

    static saveHandler = (msj: any, obj: React.Component<any, IState>) => {
        let edit = obj.props.match.params.id !== undefined;
        console.log(msj)
        if (typeof msj !== 'string') {
            obj.setState({
                showAlertConfirm: true,
                confirmHeader: 'Confirmacion',
                confirmMessage: edit ? "¿Esta seguro de editar este equipo?" : "¿Esta seguro de registrar este equipo?",

            });
            obj.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    "list_cod": msj[0],
                    "list_serie": msj[1]
                }
            }))
            console.log('save: ', obj.state)
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

    static removeTabStorage = (index: any, obj: React.Component<any, IState>) => {
        let tab = 'cpu-disco_duro_' + (index + 1);
        let dataCopy = Object.assign({}, obj.state.data);
        delete dataCopy[tab];
        obj.setState((prevState) => ({ storageTabs: prevState.storageTabs.filter((value: any) => { return value !== tab }), data: dataCopy }));
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

    static valRegExpNum = (str: any, long: any, decimal: any) => {
        return new RegExp('^[1-9][0-9]' + long + (decimal ? '([\\.|\\,]\\d{1,2})?$' : '$')).test(str);
    }
    static sendData = (op: any, obj: React.Component<any, IState>) => {
        obj.setState({
            loadingMessage: "Registrando Informacion. Espere por favor...",
            showLoading: true,
            showAlertConfirm: false,


        })
        console.log(obj.state.data)
        AxiosPC.crear_pc(obj.state.data, op).then(response => {
            obj.setState({
                showLoading: false,
                successMessage: "El equipo se registro exitosamente!",
                showAlertSuccess: true
            })
            console.log(response);
        }, err => {
            GlobalPC.errorHandler(err, obj);
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
            GlobalPC.errorHandler(err, obj);
        });
    }


    static deleteEquipo = (obj: any, idequipo: any, tipo: any) => {
        obj.setState({
            loadingMessage: "Eliminando equipo. Espere por favor...",
            showLoading: true,
            showAlertConfirm: false
        })
        AxiosPC.deleteEquipo(idequipo, tipo).then((response: any) => {
            obj.setState({
                showLoading: false,
                successMessage: 'El equipo se elimino exitosamente!',
                showAlertSuccess: true
            })
            console.log(response);
        }, err => {
            GlobalPC.errorHandler(err, obj);
        })
    }

    static getIpByID=(id:any,obj: React.Component<any, IState>)=>{
        AxiosPC.get_ip_id(id).then((res: any) => {
            obj.setState({
                listIP: [...obj.state.listIP,...res.data]
            });
            console.log("ip asig:", obj.state.listIP);
        }).catch((err: any) => {
            console.log(err.response.data);

        });
    }


    static getEquipoByID = (obj: React.Component<any, IState>, op: any) => {
        obj.setState({
            loadingMessage: "Cargando Informacion. Espere por favor...", showLoading: true,
        })
        AxiosPC.getEquipoByID(obj.props.match.params.id, op).then(response => {
            // if(response.data["pc-ip_asignada"]!=null){
            //     GlobalPC.getIpByID(response.data["pc-ip_asignada"],obj);
            // }
            for (let i = 1; i < response.data["num_memoria_ram"]; i++) {
                GlobalPC.addTabRam(obj);
            }
            for (let j = 1; j < response.data["num_disco_duro"]; j++) {
                GlobalPC.addTabStorage(obj)
            }
            
            
            //if(response.data["pc-ups_regulador"]!==null&&response.data["pc-ups_regulador"]!==undefined){
            let var_ = response.data["pc-ups_regulador"] !== null && response.data["pc-ups_regulador"] !== undefined;
            obj.setState({
                fuente: var_,
                visible_fuente: !var_
            })
            if(!var_){
                obj.setState({
                    data: {
                        ...response.data,
                        "pc-ups_regulador":{
                            "tipo_equipo":null
                        }
                    }
                });
            }
            else{
                obj.setState({
                    data:response.data
                })
            }
            console.log(var_, "var_")
            //}
            obj.setState({
                
                showLoading: false,
                disabled_form: true
            });
            console.log("get eq", response.data)
        }, err => {
            GlobalPC.errorHandler(err, obj);
        });
    }

    static errorHandler(err: any, obj: React.Component<any, IState>) {
        let msj = '', header = '';
        console.log(err.response.data);
        if (err.response.status !== 400) {
            msj = 'Error ' + err.response.status;
            header = 'Error en el servidor. Intente mas tarde.';
        } else {
            msj = err.response.data.log;
            header = 'Error ' + err.response.status;
        }
        obj.setState({
            showLoading: false,
            errorMsj: msj,
            errorHeader: header,
            showAlertError: true
        });
        console.log(err.response.data);
    }

    static generateStorageForm = (obj: React.Component<any, IState>) => {
        return obj.state.storageTabs.map((value: any, index: any) => {
            return (
                <IonRow key={index} class="ion-text-center">

                    <IonCol>
                        <IonList lines="full" className="ion-no-margin ion-no-padding">
                            <IonItem className="root" >
                                <IonGrid>
                                    <IonRow className="root" >
                                        <IonCol size="10">
                                            <b><IonText color="primary">{'Disco Duro ' + (index + 1)}</IonText></b>
                                        </IonCol>
                                        <IonCol size="2" >
                                            <IonIcon name='close' hidden={index === 0} size="small" onClick={(e: any) => { GlobalPC.removeTabStorage(index, obj) }} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            {GlobalPC.generateGeneralForm(value, obj)}
                            <IonItem>
                                <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                <IonInput disabled={obj.state.disabled_form} required type="number" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['capacidad'] : null} className="root" name={value + '.capacidad'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                <IonSelect disabled={obj.state.disabled_form} value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['tipo_capacidad'] : null} className="root" name={value + '.tipo_capacidad'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}>
                                    <IonSelectOption value={"TB"}>TB (TeraByte)</IonSelectOption>
                                    <IonSelectOption value={"GB"}>GB (GigaByte)</IonSelectOption>
                                    <IonSelectOption value={"MB"}>MB (MegaByte)</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo de Disco<IonText color="danger">*</IonText></IonLabel>
                                <IonSelect disabled={obj.state.disabled_form} value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['tipo'] : null} className="root" name={value + '.tipo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}>
                                    <IonSelectOption value={"SSD"}>SSD</IonSelectOption>
                                    <IonSelectOption value={"HDD"}>HDD</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                        </IonList>
                    </IonCol>
                </IonRow>
            );
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
                                <IonLabel position="floating">Capacidad de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                <IonInput required disabled={obj.state.disabled_form} type="number" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['capacidad'] : null} className="root" name={value + '.capacidad'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo de Almacenamiento<IonText color="danger">*</IonText></IonLabel>
                                <IonSelect disabled={obj.state.disabled_form} value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['tipo_capacidad'] : null} className="root" name={value + '.tipo_capacidad'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}>
                                    <IonSelectOption value={"GB"}>GB (GigaByte)</IonSelectOption>
                                    <IonSelectOption value={"MB"}>MB (MegaByte)</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Tipo de Memoria<IonText color="danger">*</IonText></IonLabel>
                                <IonSelect disabled={obj.state.disabled_form} value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['tipo'] : null} className="root" name={value + '.tipo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj); }}>
                                    <IonSelectOption value={"DDR"}>DDR</IonSelectOption>
                                    <IonSelectOption value={"DDR2"}>DDR2</IonSelectOption>
                                    <IonSelectOption value={"DDR3"}>DDR3</IonSelectOption>
                                    <IonSelectOption value={"DDR4"}>DDR4</IonSelectOption>
                                </IonSelect>
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
                    <IonInput required disabled={obj.props.match.params.id !== undefined} type="text" value={obj.state.data[value] !== undefined && obj.state.data[value] !== null ? obj.state.data[value]['codigo'] : null} className="root" name={value + '.codigo'} onIonChange={(e: any) => { GlobalPC.onChangeInput(e, obj) }}></IonInput>
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
                    <IonInput type="text" disabled={obj.state.disabled_form} className="root" value={obj.state.data["pc-nombre_pc"]} name='pc-nombre_pc' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Usuario del PC<IonText color="danger">*</IonText></IonLabel>
                    <IonInput type="text" disabled={obj.state.disabled_form} className="root" value={obj.state.data["pc-usuario_pc"]} name='pc-usuario_pc' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Direccion del IP</IonLabel>
                    {/* <IonInput required type="text" className="root" name='pc-marca' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}}></IonInput> */}
                    <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-ip_asignada"]} name='pc-ip_asignada' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>
                        <IonSelectOption value={null}>
                            Ninguno
                        </IonSelectOption>
                        {obj.state.listIP.map((object: any, i: any) => {
                            return (
                                <IonSelectOption key={object.id_ip} value={object.id_ip}>
                                    {object.direccion_ip}
                                </IonSelectOption>
                            );
                        })}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Asignar a Empleado</IonLabel>
                    {/* <IonInput required type="text" className="root" name='pc-marca' onIonChange={(e:any)=>{GlobalPC.onChangeCodInput(e,this)}}></IonInput> */}
                    <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-empleado_asignado"]} name='pc-empleado_asignado' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>
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



    static generateFuenteForm(obj: React.Component<any, IState>, idx: any) {
        return (
            <div key={"FuenteForm"} hidden={obj.state.visible_fuente}>
                < ExpansionPanel expanded={obj.state.expanded === idx} onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
                    obj.setState({
                        expanded: !isExpanded ? -1 : idx
                    });

                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel4bh-header"
                    >
                        <Typography >FUENTE DE ALIMENTACION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>


                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                        <IonItem>
                                            <IonLabel position="floating">Tipo de Fuente de alimentacion<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect disabled={obj.props.match.params.id !== undefined} value={obj.state.data["pc-ups_regulador"] !== undefined && obj.state.data["pc-ups_regulador"] !== null ? obj.state.data["pc-ups_regulador"]['tipo_equipo'] : null} name='pc-ups_regulador.tipo_equipo' onIonChange={(e: any) => {
                                                GlobalPC.onChangeInput(e, obj)
                                                obj.setState({
                                                    fuente: obj.state.data["pc-ups_regulador"]['tipo_equipo'] !== null
                                                })
                                                console.log(obj.state.data["pc-ups_regulador"]['tipo_equipo'])
                                            }}>
                                                <IonSelectOption value={null}>Ninguno</IonSelectOption>
                                                <IonSelectOption value={"UPS"}>UPS</IonSelectOption>
                                                <IonSelectOption value={"REGULADOR"}>REGULADOR</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                        <div hidden={obj.state.fuente}>
                                            <p className="ion-text-center ion-margin">Seleccione un tipo de fuente de alimentacion para registrar su informacion</p>
                                        </div>
                                        <div hidden={!obj.state.fuente}>
                                            {GlobalPC.generateGeneralForm('pc-ups_regulador', obj)}
                                        </div>


                                    </IonList>
                                </IonCol>
                            </IonRow>
                        </IonGrid>



                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button size="small" color="primary" onClick={(e: any) => { GlobalPC.nextTab(obj) }}>
                            Siguiente
                                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        )
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
                        <Typography>SISTEMA OPERATIVO</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <IonList lines="full" className="ion-no-margin ion-no-padding">
                                        <IonItem>
                                            <IonLabel position="floating">Sistema Operativo<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-sistema_operativo"]} name='pc-sistema_operativo' onIonChange={(e: any) => {
                                                const { name, value } = e.target;
                                                obj.setState({
                                                    data: {
                                                        ...obj.state.data,
                                                        [name]: value
                                                    }
                                                });

                                            }}>

                                                {obj.state.listSO.map((object: any, i: any) => {
                                                    return (
                                                        <IonSelectOption key={object + "_" + i} value={object}>
                                                            {object}
                                                        </IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                        </IonItem>


                                        <IonItem>
                                            <IonLabel position="floating">Tipo de Sistema Operativo<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect disabled={obj.state.disabled_form} value={obj.state.data["pc-tipo_sistema_operativo"]} name='pc-tipo_sistema_operativo' onIonChange={(e: any) => {
                                                const { name, value } = e.target;
                                                obj.setState({
                                                    data: {
                                                        ...obj.state.data,
                                                        [name]: value
                                                    }
                                                });
                                            }}>
                                                <IonSelectOption value={"64 Bits"}>64 Bits</IonSelectOption>
                                                <IonSelectOption value={"32 Bits"}>32 Bits</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="floating">Programas instalados<IonText color="danger">*</IonText></IonLabel>
                                            <IonSelect multiple={true} disabled={obj.state.disabled_form} value={obj.state.data["pc-version_office"]
                                            // obj.state.data["pc-version_office"].map((object: any, i: any) => {
                                            //     obj.state.id_programas.push(object.id_programa)
                                            // })
                                        } 
                                            name='pc-version_office' onIonChange={(e: any) => { GlobalPC.onChangeCodInput(e, obj) }}>
                                                {obj.state.listOffice.map((object: any, i: any) => {
                                                    return (
                                                        <IonSelectOption key={object + "_" + i} value={object.id_programa}>
                                                            {object.nombre}
                                                        </IonSelectOption>
                                                    );
                                                })}
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
                                            <IonToggle disabled={obj.state.disabled_form} checked={obj.state.data["pc-service"]} name='pc-service' onIonChange={(e: any) => {
                                                obj.setState({
                                                    data: {
                                                        ...obj.state.data,
                                                        [e.target.name]: e.detail.checked
                                                    }
                                                });
                                            }} />
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
