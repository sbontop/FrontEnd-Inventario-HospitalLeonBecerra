import axios from 'axios';

export default class AxiosRouter {
  static instanceAxios = axios.create({
    baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    //baseURL: 'http://localhost:8000/api',

  });

  static listado_routers = () => {
    return AxiosRouter.instanceAxios.get(`/listar_routers`);
  }

  static crear_equipo_router = (equipo_router: any) => {
    return AxiosRouter.instanceAxios.post(`/crear_equipo_router`, equipo_router);
  }

  static marcas_routers = () => {
    return AxiosRouter.instanceAxios.get(`/marcas_routers`);
  }
  
  static filtro_router = (marca:any, fecha_registro: any) => {
    return AxiosRouter.instanceAxios.get(`filtrar_routers/${marca}/${fecha_registro}`);
  }

  static buscar_router = (codigo:any) => {
    return AxiosRouter.instanceAxios.get(`/buscar_router/${codigo}`);
  }
}
