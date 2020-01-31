import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';
import Equipos from './pages/Equipos';
import OpInvEqInfo from './pages/OpInvEqInfo'
import Inventarios from './pages/Inventarios';
import FormPCDesk from './pages/InventarioPC/FormPCDesk';
import FormImpresora from './pages/FormImpresora';
import TiposEquiposInventario from './pages/TiposEquiposInventario';
import HomeRouter from './pages/InventarioRouter/HomeRouter';
import FormularioRouter from './pages/InventarioRouter/FormularioRouter';
import FormPCLaptop from "./pages/InventarioPC/FormLaptop";
import Menu from './components/Menu';
import Home from './pages/Home';
import List from './pages/List';
import { home, list } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import HomeCorreo from './pages/InventarioCorreo/HomeCorreo';
import FormularioCorreo from './pages/InventarioCorreo/FormularioCorreo';
import ConsultarDesktop from './pages/InventarioPC/ConsultaEquipos';

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'List',
    url: '/home/list',
    icon: list
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/formimpresora" component={FormImpresora} exact={true} />
          <Route path="/formlaptop" component={FormPCLaptop} exact={true} />
          <Route path="/opinveqinfo" component={OpInvEqInfo} exact={true} />
          <Route path="/inventarios" component={Inventarios} exact={true} />
          <Route path="/consultdesk" component={ConsultarDesktop} exact={true} />
          <Route path="/formdesktop" component={FormPCDesk} exact={true} />
          <Route path="/tiposequiposinventario" component={TiposEquiposInventario} exact={true} />
          <Route path="/homerouter" component={HomeRouter} exact={true} />
          <Route path="/formulariorouter" component={FormularioRouter} exact={true} />
          <Route path="/Equipos" component={Equipos} exact={true} />
          <Route path="/Home" component={Home} exact={true} />
          <Route path="/home/list" component={List} exact={true} />
          <Route path="/" render={() => <Redirect to="/home"/> } exact={true} />
          <Route path="/homeCorreo" component={HomeCorreo} exact={true} />
        <Route path="/formularioCorreo" component={FormularioCorreo} exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
