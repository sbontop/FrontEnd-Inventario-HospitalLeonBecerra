import React from 'react';
import { IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonButton, IonPopover, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, 
         IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react';
import ListRouters from '../../../components/ProgramaComponents/ListProgramas';
import { add, options, arrowBack } from 'ionicons/icons';
import AxiosPrograma from '../../../services/AxiosPrograma';
import Respuesta from '../../../components/Respuesta';

class HomePrograma extends React.Component<any, any> {
    constructor(props: any) {
    super(props);
    this.state = 
        {
            programas: [] as any,
            editores: [] as any,
            showPopover: false,
            showLoading: false,
            disable_load: false,
            parametros: { page_size: 10, page_index: 0 }
        }
    }

    asignar_parametros = (name: any, value: any) => {
        this.setState({ parametros: { ...this.state.parametros, [name]: value } });
    }

    clearReload() {
        this.setState({ parametros: { page_size: 10, page_index: 0}, showPopover: false });
        this.cargar_programas(true);
        this.cargar_editores();
    }

    componentDidMount = () => {
        this.setState({ showLoading: true })
        this.cargar_programas(true);
        this.cargar_editores();
    }

    buscar = (e: any) => {
        let nombre = e.target.value;
        if (nombre) {
            AxiosPrograma.buscar_programa(nombre).then(res => {
                this.setState({programas: res.data});
            }).catch(err => {
                console.log(err);
            });
        }
    }

    onClear = (e: any) => {
        this.cargar_programas(true);
    }

    cargar_editores = () => {
        AxiosPrograma.editores().then((res: any) => {
            console.log('e', res.data)
            this.setState({editores: res.data});  
        })
    }

    cargar_programas(newLoad: boolean) {
        let parametros: any = {};
        parametros = this.state.parametros;
        if (newLoad) {
            parametros.page_index = 0;
        }
        console.log("Parametros dentro de cargar routers", parametros)
        AxiosPrograma.filtrar_programas(parametros).then(res => {
            this.setState({ programas: newLoad ? res.data.resp : [...this.state.programas, ...res.data.resp]});
            this.setState({ showLoading: false, disable_load: this.state.programas.length === res.data.itemSize }); 
        }).catch(err => {
            this.setState({ showLoading: false });
            console.log(err);
        }); 
    }

    doRefresh = (e: any, newPageIndex: number) => {
        this.asignar_parametros("page_index", newPageIndex);
        console.log("parametros dentro doRefresh", this.state.parametros)
        setTimeout(() => {
        this.cargar_programas(newPageIndex === 0);
            if (newPageIndex === 0) {
                e.detail.complete();
            } else {
                e.target.complete();
            }
        }, 1000);
    }

    handle_aplicar = () => {
        this.asignar_parametros("page_index", 0);
        this.setState({ showPopover: false, showLoading: true })
        console.log("parametros dentro de handle aplicar", this.state.parametros)
        this.cargar_programas(true);
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/inventarios"><IonIcon icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Inventario de programas</IonTitle>
                        <IonButtons slot="end">
                            <IonButton routerLink="/formularioprograma"><IonIcon icon={add}></IonIcon></IonButton>
                            <IonButton onClick={(e) => this.setState({showPopover: true})}><IonIcon icon={options}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
       
                <IonSearchbar placeholder="Buscar programa"
                    onIonChange={(e: any) => { this.buscar(e) }} 
                    onIonClear={(e: any) => { this.onClear(e) }}>
                </IonSearchbar>  

                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(e: any) =>  this.doRefresh(e, 0)}>
                        <IonRefresherContent refreshingSpinner="bubbles"></IonRefresherContent>
                    </IonRefresher>
                    <IonLoading
                        isOpen={this.state.showLoading}
                        message={'Cargando datos, espere por favor...'}
                    />
                    <Respuesta informacion={this.state.programas.length}></Respuesta>
                    <IonList>{this.state.programas.map((r: any)=>{
                        return (             
                            <ListRouters key={`${r.id_programa}`} 
                            id_programa={r.id_programa} 
                            codigo={r.codigo}
                            nombre={r.nombre} 
                            version={r.version} 
                            editor={r.editor}
                            encargado_registro={r.encargado_registro}
                            observacion={r.observacion === null ? 'Ninguna' : r.observacion}
                            />
                        )
                        })}
                    </IonList>
                    <IonInfiniteScroll disabled={this.state.disable_load} threshold="100px"
                        onIonInfinite={(e: any) =>  this.doRefresh(e, this.state.parametros.page_index + 1)}
                        ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                        <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Cargando mas registros"></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent>

                <IonPopover      
                    isOpen={this.state.showPopover}
                    onDidDismiss={e => this.setState({ showPopover: false})}>
                    <IonTitle className="ion-margin-top">Filtro de búsqueda</IonTitle>
                    <IonList>
                        <IonItem>
                            <IonLabel>Editor</IonLabel>
                            <IonSelect multiple={true} name="editor" value={this.state.parametros.editor} 
                            onIonChange={(e: any) => this.asignar_parametros(e.target.name, e.target.value)} okText="Aceptar" cancelText="Cancelar" >
                            {/* <IonSelectOption selected>Todas</IonSelectOption> */}
                            {this.state.editores.map((m:any, i:number) => {
                            return (
                                <IonSelectOption key={i} value={m.editor}>
                                {m.editor} 
                                </IonSelectOption>
                            );
                            })}
                        </IonSelect>   
                        </IonItem>
                    </IonList>
                    <div className="ion-text-center ion-margin">
                        <IonButton expand="block" onClick={() => this.handle_aplicar()}>Aplicar</IonButton>
                        <IonButton expand="block" onClick={() =>  this.clearReload()} >Limpiar</IonButton>
                        <IonButton expand="block" onClick={() => this.setState({showPopover: false})}>Cancelar</IonButton>
                    </div > 
                </IonPopover>

            </IonPage>  
        );
    }
}

export default HomePrograma;
