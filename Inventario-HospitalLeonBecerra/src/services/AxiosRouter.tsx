import axios from 'axios';

export default class AxiosRouter {
  static instanceAxios = axios.create({
    //  baseURL: 'https://backend-hlb.herokuapp.com/api',
    baseURL: 'http://localhost:8000/api'
    // baseURL: 'https://backend-hlb.herokuapp.com/api',
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

  static empleados = () => {
    return AxiosRouter.instanceAxios.get(`/mostrar_empleados`);
  }

  static ips = () => {
    return AxiosRouter.instanceAxios.get(`/ips_libres`);
  }
  
  static filtrar_routers = (filtros: any) => {
    return AxiosRouter.instanceAxios.post(`/filtrar_routers`, filtros);
  }

  static buscar_router = (codigo:any) => {
    return AxiosRouter.instanceAxios.get(`/buscar_router/${codigo}`);
  }

  static datos_router = (codigo:any) => {
    return AxiosRouter.instanceAxios.get(`/router_id/${codigo}`);
  }

  static eliminar_router = (id_equipo: any) => {
    return AxiosRouter.instanceAxios.put(`/eliminar_router/${id_equipo}`);
  }

  static editar_router = (router: any) => {
    return AxiosRouter.instanceAxios.post(`/editar_router`, router);
  }
}
