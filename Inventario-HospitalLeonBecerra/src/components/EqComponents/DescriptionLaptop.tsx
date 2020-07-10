import React from 'react';
import {
    IonItem, IonIcon, IonListHeader, IonNote, 
} from '@ionic/react';
import {
    reorder, barcode,pricetag, informationCircle
} from 'ionicons/icons';
import ItemSection from "./ItemSection";
export default class DescriptionLaptop extends React.Component<{ obj: any }, any>{
    render() {
        return (
            <div>
                {this.props.obj.so === null || this.props.obj.general === null ? null :
                    <div>
                        <ItemSection comp={{ "general": this.props.obj.general, "so": this.props.obj.so }} header="Informacion General"></ItemSection>
                        <IonItem>
                            <IonIcon slot="start" icon={pricetag}> </IonIcon>
                                Marca <IonNote color="dark" slot="end">{this.props.obj.general.marca}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={informationCircle} > </IonIcon>
                                Modelo <IonNote color="dark" slot="end">{this.props.obj.general.modelo}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={barcode} > </IonIcon>
                                Número de serie <IonNote color="dark" slot="end">{this.props.obj.general.numero_serie}</IonNote>
                        </IonItem>
                    </div>
                }

                {this.props.obj.so === null ? null : <ItemSection header="Sistema Operativo" comp={this.props.obj.so}></ItemSection>}
                {this.props.obj.programas === null ? null : <ItemSection header="Programas instalados" comp={this.props.obj.programas}></ItemSection>}
                

                <IonListHeader> Datos generales de memoria RAM  </IonListHeader>
                <IonItem>
                    <IonIcon slot="start" icon={barcode} > </IonIcon>
                                RAM Soportada     <IonNote color="dark" slot="end">{this.props.obj.ram_soportada}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={reorder}> </IonIcon>
                        Número de slots <IonNote slot="end">{this.props.obj.numero_slots}</IonNote>
                </IonItem>
                {this.props.obj.rams === null ? null : <ItemSection header="Memoria RAM" comp={this.props.obj.rams}></ItemSection>}
                {this.props.obj.discos === null ? null : <ItemSection header="Disco Duro" comp={this.props.obj.discos}></ItemSection>}
                {this.props.obj.procesador === null ? null : <ItemSection header="Procesador" comp={this.props.obj.procesador}></ItemSection>}


            </div>
        );
    }
}