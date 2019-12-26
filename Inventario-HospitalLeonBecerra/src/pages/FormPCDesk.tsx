import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IonList, IonItem, IonLabel, IonInput, IonHeader, IonContent, IonTitle, IonPage, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';

interface IState {
    expanded: any;
    setExpanded: any;
}


export default class FormPCDesk extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            expanded: String,
            setExpanded: false

        }


    }

    handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        console.log(isExpanded)
        this.setState({
            expanded: !isExpanded ? "" : panel,

        });
    };


    render() {





        return (
            <IonPage>
                
                    <IonHeader>

                        <IonToolbar color="danger">

                            <IonButtons slot="start">
                                <IonBackButton defaultHref = "/home"></IonBackButton>
                            </IonButtons>
                            <IonTitle>Equipos Informáticos</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                <IonContent fullscreen>
                    <div>
                        <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                id="panel1bh-header"
                            >
                                <Typography >General settings</Typography>
                                <Typography >I am an expansion panel</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                    maximus est, id dignissim quam.
</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                id="panel2bh-header"
                            >
                                <Typography >Users</Typography>
                                <Typography>
                                    You are currently not an owner
</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                    diam eros in elit. Pellentesque convallis laoreet laoreet.
</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                id="panel3bh-header"
                            >
                                <Typography >General settings</Typography>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                    vitae egestas augue. Duis vel est augue.
</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                id="panel4bh-header"
                            >
                                <Typography >Personal data</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <form action="">
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="floating">Title</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>


                                    </IonList>

                                </form>

                            </ExpansionPanelDetails>
                        </ExpansionPanel>





                    </div>
                    </IonContent>
                </IonPage>


                

         



        );
    }
}





