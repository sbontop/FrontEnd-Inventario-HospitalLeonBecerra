import axios from 'axios';

export default class AxiosIp {
  static instanceAxios = axios.create({
    // baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    baseURL: 'http://localhost:8000/api',
  });

  static listado_ips = () => {
    return AxiosIp.instanceAxios.get(`/listar_ips`);
  }

  static crear_equipo_ip = (equipo_ip: any) => {
    return AxiosIp.instanceAxios.post(`/crear_equipo_ip`, equipo_ip);
  }

  static filtrar_ip = (direccion_ip: any) => {
      return AxiosIp.instanceAxios.get(`/filtrar_ip/${direccion_ip}`);
  }

  static marcas_ips = () => {
    return AxiosIp.instanceAxios.get(`/marcas_routers`);
  }
  
  static filtro_ip = (marca:any, fecha_registro: any) => {
    return AxiosIp.instanceAxios.get(`/filtrar_routers/${marca}/${fecha_registro}`);
  }
}
