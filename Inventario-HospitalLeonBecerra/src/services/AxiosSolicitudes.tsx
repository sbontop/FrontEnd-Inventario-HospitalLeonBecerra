import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosSolicitudes {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
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

  static info_atencion_solicitud_id = (id:any) => {
    return AxiosSolicitudes.instanceAxios.get(`/info_atencion_solicitud_id/${id}`);
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

  static crear_atencion_solicitud = (registro: any) => {
    return AxiosSolicitudes.instanceAxios.post(`/crear_atencion_solicitud`, registro);
  }
}