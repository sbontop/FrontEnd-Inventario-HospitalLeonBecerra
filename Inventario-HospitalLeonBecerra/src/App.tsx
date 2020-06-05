import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';
import Equipos from './pages/Equipos';
import Inventarios from './pages/Inventarios';
import FormPCDesk from './pages/InventarioPC/FormPCDesk';
import FormImpresora from './pages/InventarioImpresora/FormImpresora';
import TiposEquiposInventario from './pages/TiposEquiposInventario';
import HomeRouter from './pages/InventarioRouter/HomeRouter';
import FormularioRouter from './pages/InventarioRouter/FormularioRouter';
import HomeIp from './pages/InventarioIp/HomeIp';
import InfinitiveScroll from './pages/InventarioIp/InfinitiveScroll';
import InfinitiveScrollFiltered from './pages/InventarioIp/InfinitiveScrollFiltered';
import FormularioIp from './pages/InventarioIp/FormularioIp';
import FormPCLaptop from "./pages/InventarioPC/FormLaptop";
import Menu from './components/Menu';
import Home from './pages/Home';
import { home, desktop, list } from 'ionicons/icons';
import HomeImpresora from './pages/InventarioImpresora/HomeImpresora';


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
import GlobalPC from './pages/InventarioPC/GlobalPC';

const appPages: AppPage[] = [
  {
    title: 'Menú principal',
    url: '/home',
    icon: home
  },
  {
    title: 'Inventario',
    url: '/inventarios',
    icon: list
  },
  {
    title: 'Registro de equipos',
    url: '/tiposequiposinventario',
    icon: desktop
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/formimpresora" component={FormImpresora} exact={true} />
          <Route path="/consulta" component={HomeImpresora} exact={true} />
          <Route path="/formlaptop" render={(props)=><FormPCLaptop {...props}></FormPCLaptop>} />
          <Route path="/form-laptop/edit/:id" render={(props)=><FormPCLaptop {...props}></FormPCLaptop>} />
          {/* <Route path="/opinveqinfo" component={OpInvEqInfo} exact={true} /> */}
          <Route path="/inventarios" component={Inventarios} exact={true} />
          <Route path="/consultdesk" render={() => <ConsultarDesktop tipo={GlobalPC.varDesktop} />} exact={true} />
          <Route path="/consultlaptop" render={() => <ConsultarDesktop tipo={GlobalPC.varLaptop} />} exact={true} />
          {/* <Route path="/formdesktop" component={FormPCDesk} exact={true} /> */}
          <Route path="/formdesktop" render={(props)=><FormPCDesk {...props}></FormPCDesk>} />
          <Route path="/form-desktop/edit/:id" render={(props)=><FormPCDesk {...props}></FormPCDesk>} />
          <Route path="/tiposequiposinventario" component={TiposEquiposInventario} exact={true} />
          <Route path="/homerouter" component={HomeRouter} exact={true} />
          <Route path="/formulariorouter" component={FormularioRouter} exact={true} />
          <Route path="/homeip" component={HomeIp} exact={true} />
          <Route path="/formularioip" component={FormularioIp} exact={true} />
          <Route path="/infinitive-scroll" component={InfinitiveScroll} exact={true} />
          <Route path="/infinitive-scroll-filtered" component={InfinitiveScrollFiltered} exact={true} />
          <Route path="/Equipos" component={Equipos} exact={true} />
          <Route path="/Home" component={Home} exact={true} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          <Route path="/homeCorreo" component={HomeCorreo} exact={true} />
          <Route path="/formularioCorreo" component={FormularioCorreo} exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
