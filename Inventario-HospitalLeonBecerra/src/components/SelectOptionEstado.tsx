import { IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';

const SelectOptionEstado: React.FC = () => {
    const [estados] = useState([{id:"D", estado: "Disponible"},{id:"O", estado: "Operativo"},{id:"ER", estado: "En revisión"}, {id:"R", estado: "Reparado"}, {id:"B", estado:"De baja"}] as any);

    return (
        <>
            {estados.map((dato: any) => {
                return (
                    <IonSelectOption key={dato.id} value={dato.id}>{dato.estado}</IonSelectOption>
                )
            })
            }
        </>
    );

};
export default SelectOptionEstado;