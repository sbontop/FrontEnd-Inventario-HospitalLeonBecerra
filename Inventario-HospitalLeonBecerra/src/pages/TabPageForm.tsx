import { /*IonList, IonItem, IonInput, IonTab, IonHeader,*/IonLabel, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon/*, IonBadge, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons*/ } from '@ionic/react';
import FormPCDesk from './FormPCDesk';
import AppPage from './AppPage';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
export default class TabPageForm extends Component {

//<Redirect exact path="/tabs" to="/tabs/form" />
    render() {

        return (
            <IonTabs>

                <IonRouterOutlet>
                    

                    <Route path="/tabs/form" render={() => <FormPCDesk />} exact={true} />
                    <Route path="/tabs/apps" render={() => <AppPage />} exact={true} />
                    <Route path="/tabs" render={() => <Redirect to="/tabs/form"/> } exact={true} />
                </IonRouterOutlet>
               
                <IonTabBar slot="bottom">
                    <IonTabButton tab="form" href="/tabs/form">
                        <IonIcon name="calendar" />
                        <IonLabel>Schedule</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="apps" href="/tabs/apps">
                        <IonIcon name="contacts" />
                        <IonLabel>Speakers</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        );
    }
}