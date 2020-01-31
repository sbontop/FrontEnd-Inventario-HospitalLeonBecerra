import axios from 'axios';

export default class AxiosRouter {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static obtener_organizaciones = () => {
    return AxiosRouter.instanceAxios.get(`/organizaciones`);
  }

  static departamentos_por_organizacion = (bspi_punto: any) => {
    return AxiosRouter.instanceAxios.get(`/org_dpto/${bspi_punto}`);
  }

  static listado_routers = () => {
    return AxiosRouter.instanceAxios.get(`/listar_routers`);
  }

  static crear_equipo_router = (equipo_router: any) => {
    return AxiosRouter.instanceAxios.post(`/crear_equipo_router`, equipo_router);
  }

  static marcas_routers = () => {
    return AxiosRouter.instanceAxios.get(`/marcas_routers`);
  }
}
