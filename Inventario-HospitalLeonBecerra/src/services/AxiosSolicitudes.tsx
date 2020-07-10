import axios from 'axios';
export default class AxiosSolicitudes {
  static instanceAxios = axios.create({
    /* baseURL: 'https://app-hlb-api-rest.herokuapp.com/api', */
    baseURL: 'http://localhost:8000/api',
  });

  static filtrar_solicitudes = (filtros: any) => {
    return AxiosSolicitudes.instanceAxios.post(`/filtrar_solicitudes`,filtros);
  }

  static contar_solicitudes = () => {
    return AxiosSolicitudes.instanceAxios.get(`/contar_solicitudes`);
  }
}