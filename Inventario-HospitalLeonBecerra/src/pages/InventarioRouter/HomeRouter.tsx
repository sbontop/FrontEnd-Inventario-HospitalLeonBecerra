import React from 'react';
import { IonContent, IonToolbar, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonSearchbar} from '@ionic/react';
//import { connect } from 'react-redux';
import ListItemsRouters from '../../components/RouterComponents/ListItemsRouters';
//import { createAction } from 'typesafe-actions';

//class HomeRouter extends React.Component<any> {

// export const setSearchText = createAction('fishes/SET_SEARCH_TEXT', resolve =>
//   (searchText: string) => resolve(searchText)
// /z/ );
// const mapStateToProps = (state: any) => {
//   //console.log(state);
//      return { searchText: state.searchText  };
//   };
//   // const mapStateToProps = state => {
//   //   return {
//   //     text: state.app.searchText
//   //   }
//   // }
//   const mapDispatchToProps = (dispatch: any) => {
//      return {
//     //  console.log(dispatch);
//       //  setSearchText: (txt: string) => dispatch(PropTypes.setSearchText(txt)),
//       //  startSearch: () => dispatch(PropTypes.search())
      
//   setSearchText: (searchText: string) => actions.fishes.setSearchText(searchText)
//      };
//   };  

const HomeRouter: React.FC = () => {
  
    return (
      <IonPage>
        <IonToolbar color="primary">
          <IonButtons slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Inventario de routers</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/formulariorouter"> 
              <div>
                <img src={process.env.PUBLIC_URL + "/assets/img/add.png"} alt="add" />
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      
        <IonSearchbar placeholder="Buscar un router..."
          // onIonChange={(e: CustomEvent) => this.props.setSearchText(e.detail.value)} 
          >
        </IonSearchbar>  

        <IonContent className="ion-padding">
          <ListItemsRouters/>
        </IonContent>
      </IonPage>
    );
    
  }

export default HomeRouter;
