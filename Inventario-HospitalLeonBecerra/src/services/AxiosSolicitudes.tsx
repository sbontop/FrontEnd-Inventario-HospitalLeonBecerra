import axios from 'axios';
export default class AxiosSolicitudes {
  static instanceAxios = axios.create({
     baseURL: 'http://localhost:8000/api'
    //   https://backend-hlb.herokuapp.com/api', 
    
    // baseURL: 'https://backend-hlb.herokuapp.com/api',
  });

  static filtrar_solicitudes = (filtros: any) => {
    return AxiosSolicitudes.instanceAxios.post(`/filtrar_solicitudes`,filtros);
  }

  static contar_solicitudes = () => {
    return AxiosSolicitudes.instanceAxios.get(`/contar_solicitudes`);
  }

  static info_solicitud_id = (id:any) => {
    return AxiosSolicitudes.instanceAxios.get(`/info_solicitud_id/${id}`);
  }

  static cambiar_estado_solicitud = (id: any, codigo: any) => {
    return AxiosSolicitudes.instanceAxios.put(`/cambiar_estado_solicitud/${id}/${codigo}`);
  }

  static empleados_sistemas = () => {
    return AxiosSolicitudes.instanceAxios.get('/empleados_sistemas');
  }

  static mostrar_codigos = () => {
    return AxiosSolicitudes.instanceAxios.get('/mostrar_codigos');
  }

  static crear_atencion_solicitud = (request: any, requestFirma: any) => {
    return AxiosSolicitudes.instanceAxios.post(`/crear_atencion_solicitud/${request}/${requestFirma}`);
  }
}