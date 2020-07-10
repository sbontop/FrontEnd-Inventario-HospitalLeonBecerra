import {
    IonItem, IonIcon, IonListHeader, IonNote,
} from '@ionic/react';
import {
    key, locate, business, reorder, person, pricetag,codeDownload,
    card, informationCircle, calendar, barcode, globe, logIn, speedometer
} from 'ionicons/icons';
import React from 'react';

export default class ItemSection extends React.Component<{ comp: any, header: any }, any>{
   
   
    private globalContent(header: any, comp: any) {
        return (
            <div>
                <IonListHeader> {header} </IonListHeader>
                <IonItem>
                    <IonIcon slot="start" icon={card}> </IonIcon>
                                    Codigo <IonNote slot="end">{comp.codigo}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={pricetag}> </IonIcon>
                                    Marca <IonNote color="dark" slot="end">{comp.marca}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={informationCircle} > </IonIcon>
                                    Modelo <IonNote color="dark" slot="end">{comp.modelo}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={barcode} > </IonIcon>
                                    Número de serie <IonNote color="dark" slot="end">{comp.numero_serie}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={reorder}> </IonIcon>
                                    Descripcion <IonNote slot="end">{comp.descripcion}</IonNote>
                </IonItem>
            </div>
        );
    }



    private generalContent() {
        return (
            <div>
                <IonListHeader>Información General</IonListHeader>
                <IonItem>
                    <IonIcon slot="start" icon={key}> </IonIcon>
                                    Código <IonNote color="dark" slot="end">{this.props.comp.general.codigo}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={locate}> </IonIcon>
                                    Nombre PC <IonNote slot="end">{this.props.comp.so.nombre_pc} </IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={business}> </IonIcon>
                                    Usuario PC <IonNote color="dark" slot="end">{this.props.comp.so.usuario_pc}
                    </IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={speedometer}> </IonIcon>
                                    Estado
                                    <IonNote color="dark" slot="end">
                        {this.props.comp.general.estado_operativo === 'D' ? "Disponible" : null}
                        {this.props.comp.general.estado_operativo === 'B' ? "De baja" : null}
                        {this.props.comp.general.estado_operativo === 'R' ? "Reparado" : null}
                        {this.props.comp.general.estado_operativo === 'ER' ? "En revisión" : null}
                        {this.props.comp.general.estado_operativo === 'O' ? "Operativo" : null}
                    </IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={person}> </IonIcon>
                                    Empleado a cargo <IonNote color="dark" slot="end">{this.props.comp.general.asignado===null?"No Asignado":(this.props.comp.general.empleado + " " + this.props.comp.general.apellido)}</IonNote>
                </IonItem>

                <IonItem>
                    <IonIcon slot="start" icon={globe}> </IonIcon>
                                    Direción IP <IonNote slot="end">{this.props.comp.general.ip === null ? "No Asinada" : this.props.comp.general.direccion_ip}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={calendar} > </IonIcon>
                                    Fecha de registro <IonNote color="dark" slot="end">{this.props.comp.general.fecha_registro}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={reorder}> </IonIcon>
                                    Descripción <IonNote color="dark" slot="end">{this.props.comp.general.descripcion}</IonNote>
                </IonItem>
            </div>
        );
    }

    private SOContent() {
        return (
            <div>
                <IonListHeader>Sistema Operativo</IonListHeader>
                <IonItem>
                    <IonIcon slot="start" icon={logIn}> </IonIcon>
                                   SO <IonNote slot="end">{this.props.comp.so}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={logIn}> </IonIcon>
                                   Tipo de Sistema <IonNote slot="end">{this.props.comp.tipo_so}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={logIn}> </IonIcon>
                                   Licencia <IonNote slot="end">{this.props.comp.licencia === "1" ? "Si" : "No"}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon slot="start" icon={logIn}> </IonIcon>
                                   Service Pack 1 <IonNote slot="end">{this.props.comp.services_pack === "1" ? "Si" : "No"}</IonNote>
                </IonItem>
            </div>
        );
    }

    

    private generateContent() {

        if (this.props.header === "Memoria RAM" || this.props.header === "Disco Duro") {
            return this.props.comp.map((alm: any, i: any) => {
                return (
                    <div key={alm.id_equipo}>
                        {this.globalContent(this.props.header + " " + (i + 1), alm)}
                        <IonItem>
                            <IonIcon slot="start" icon={barcode} > </IonIcon>
                                Capacidad     <IonNote color="dark" slot="end">{alm.capacidad}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reorder}> </IonIcon>
                                    Tipo <IonNote slot="end">{alm.tipo}</IonNote>
                        </IonItem>
                    </div>
                );
            });
        }
        else if (this.props.header === "Procesador") {
            return (
                <div key={this.props.comp.id_equipo}>
                    {this.globalContent(this.props.header, this.props.comp)}
                    <IonItem>
                        <IonIcon slot="start" icon={barcode} > </IonIcon>
                                Frecuencia     <IonNote color="dark" slot="end">{this.props.comp.frecuencia.concat( "GHz")}</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={reorder}> </IonIcon>
                        Número de núcleos <IonNote slot="end">{this.props.comp.nucleos}</IonNote>
                    </IonItem>
                </div>
            );
        }
        else if (this.props.header === "Tarjeta Madre") {
            return (
                <div key={this.props.comp.id_equipo}>
                    {this.globalContent(this.props.header, this.props.comp)}
                    <IonItem>
                        <IonIcon slot="start" icon={barcode} > </IonIcon>
                                RAM Soportada     <IonNote color="dark" slot="end">{this.props.comp.ram_soportada}</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={reorder}> </IonIcon>
                        Número de slots <IonNote slot="end">{this.props.comp.numero_slots}</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={reorder}> </IonIcon>
                        Conexiones para Disco Duro <IonNote slot="end">{this.props.comp.conexiones_dd}</IonNote>
                    </IonItem>

                </div>
            );

        }
        else if (this.props.header === "Sistema Operativo") {
            return (
                <div >
                    {this.SOContent()}
                </div>
            );
        }
        else if (this.props.header === "Programas instalados") {
            return (
                <div key={this.props.comp.id_programa}><IonListHeader>Programas instalados</IonListHeader>
                       {this.props.comp.map((programa:any, i:any) => {
                           return (
                            // console.log("here progrsm", programa.nombre)
                           <IonItem key={programa.id_programa}><IonIcon slot="start" icon={codeDownload}> </IonIcon>
                           <IonNote slot="end">{programa.nombre} </IonNote>
                           </IonItem>
                           
                           );
                       } 
                       )}
</div>
            );
        }
        else if (this.props.header === "Informacion General") {
            return (
                <div>
                    {this.generalContent()}
                </div>
            );
        }
        else {
            return (
                <div key={this.props.comp.id_equipo}>
                    {this.globalContent(this.props.header, this.props.comp)}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.generateContent()}
            </div>
        );
    }
}