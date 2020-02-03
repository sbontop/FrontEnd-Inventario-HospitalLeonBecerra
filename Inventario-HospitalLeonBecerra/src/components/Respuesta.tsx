import { IonLabel } from '@ionic/react';
import React from 'react';
class Respuesta extends React.Component<any, any> {

    render() {
        if (this.props.informacion === 0) {
            return (
                <IonLabel className="ion-margin">
                    <p className="ion-text-center ion-margin">No hay datos que mostrar</p>
                    <p className="ion-text-center">
                        <img src="./assets/img/sinResultados.png" alt=":(" />
                    </p>

                </IonLabel>
            );

        } else {
            return (null);
        }
    }
}
export default Respuesta;