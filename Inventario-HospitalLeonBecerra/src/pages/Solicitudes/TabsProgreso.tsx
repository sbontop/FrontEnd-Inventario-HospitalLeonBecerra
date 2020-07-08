import React from 'react';
import { IonTitle, IonContent, IonPage } from '@ionic/react';

class TabsProgreso extends React.Component<any, any> {

    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonTitle className="ion-text-start">En progreso</IonTitle>
                </IonContent>
            </IonPage>

        )
    }

}
export default TabsProgreso;