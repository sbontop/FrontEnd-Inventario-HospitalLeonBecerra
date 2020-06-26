

import React from 'react';
import ItemSection from "./ItemSection";
export default class DescriptionDesktop extends React.Component<{ obj: any }, any>{
    render() {
        return (
            <div>
                {this.props.obj.so === null || this.props.obj.general === null||this.props.obj.so === undefined || this.props.obj.general === undefined  ? null : <ItemSection comp={{ "general": this.props.obj.general, "so": this.props.obj.so }} header="Informacion General"></ItemSection>}
                {this.props.obj.so === null ||this.props.obj.so === undefined ? null : <ItemSection header="Sistema Operativo" comp={this.props.obj.so}></ItemSection>}

                {this.props.obj.monitor === null || this.props.obj.monitor === undefined? null : <ItemSection header="Monitor" comp={this.props.obj.monitor}></ItemSection>}
                {this.props.obj.teclado === null|| this.props.obj.teclado === undefined? null : <ItemSection header="Teclado" comp={this.props.obj.teclado}></ItemSection>}
                {this.props.obj.mouse === null ||this.props.obj.mouse === undefined? null : <ItemSection header="Mouse" comp={this.props.obj.mouse}></ItemSection>}
                {this.props.obj.parlantes === null ||this.props.obj.parlantes === undefined? null : <ItemSection header="Parlantes" comp={this.props.obj.parlantes}></ItemSection>}
                {this.props.obj.f_alim === null ||this.props.obj.f_alim === undefined? null : <ItemSection header={this.props.obj.f_alim.tipo_equipo === 'ups' ? 'UPS' : 'Regulador'} comp={this.props.obj.f_alim}></ItemSection>}

                {this.props.obj.tarjeta_red === null || this.props.obj.tarjeta_red === undefined? null : <ItemSection header="Tarjeta de Red" comp={this.props.obj.tarjeta_red}></ItemSection>}
                {this.props.obj.case === null || this.props.obj.case === undefined? null : <ItemSection header="Case" comp={this.props.obj.case}></ItemSection>}
                {this.props.obj.tarjeta_madre === null|| this.props.obj.tarjeta_madre === undefined ? null : <ItemSection header="Tarjeta Madre" comp={this.props.obj.tarjeta_madre}></ItemSection>}
                {this.props.obj.rams === null || this.props.obj.rams === undefined ? null : <ItemSection header="Memoria RAM" comp={this.props.obj.rams}></ItemSection>}
                {this.props.obj.discos === null || this.props.obj.discos === undefined? null : <ItemSection header="Disco Duro" comp={this.props.obj.discos}></ItemSection>}
                {this.props.obj.procesador === null || this.props.obj.procesador === undefined ? null : <ItemSection header="Procesador" comp={this.props.obj.procesador}></ItemSection>}
                {this.props.obj.fuente_poder === null || this.props.obj.fuente_poder === undefined ? null : <ItemSection header="Fuente de Poder" comp={this.props.obj.fuente_poder}></ItemSection>}

            </div>
        );
    }
}