


import React, { Component } from 'react';
export default interface IState {
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
    storageTabs: any;
    backAction: any;
}


export default class GlobalPC {
    static handleChange = (panel: number, obj:React.Component<{}, IState>) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {

        obj.setState({
            expanded: !isExpanded ? -1 : panel,

        });
    };

    static nextTab = (obj:React.Component<{}, IState>) => {
        obj.setState({
            expanded: obj.state.expanded + 1

        });
    }


    static onChangeCodInput = (e: any, obj:React.Component<{}, IState>) => {
        const { name, value } = e.target;
        obj.setState({
            data: {
                ...obj.state.data,
                [name]: value
            }
        });
    }
    static onChangeInput = (e: any,  obj:React.Component<{}, IState>) => {
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

    static saveHandler = (msj: string, obj:React.Component<{}, IState>) => {
        
        console.log(msj)
        if (msj === '') {
            obj.setState({
                showAlertConfirm: true,
                confirmHeader: 'Confirmacion'
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

    static addTabRam = (obj:React.Component<{}, IState>) => {
        let newTab = 'cpu-memoria_ram_' + (obj.state.ramTabs.length + 1);
        obj.setState((prevState) => ({ ramTabs: [...prevState.ramTabs, newTab] }));
    }

    static removeTabRam = (index: any, obj:React.Component<{}, IState>) => {
        let tab = 'cpu-memoria_ram_' + (index + 1);
        let dataCopy = Object.assign({}, obj.state.data);
        delete dataCopy[tab];
        obj.setState((prevState) => ({ ramTabs: prevState.ramTabs.filter((value: any) => { return value !== tab }), data: dataCopy }));
    }
}
