import {
    IonSelectOption
} from '@ionic/react';
import AxiosCorreo from '../../services/Axios.services';
import React, { useState, useEffect } from 'react';


const SelectOptionDepartamento: React.FC = () => {
    const [departamentos, setDepartamentos] = useState([] as any);


    useEffect(() => {
        AxiosCorreo.mostrar_departamentos().then(res => {
            setDepartamentos(res.data); });
            
    }, []);

    return (
        <>
            {departamentos.map((dato: any) => {
                return (
                    <IonSelectOption key={dato.nombre} value={dato.nombre}>{dato.nombre}</IonSelectOption>
                )
            })
            }
        </>
    );

};
export default SelectOptionDepartamento;