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

  static info_atencion_solicitud_id = (id:any, cedula:any) => {
    return AxiosSolicitudes.instanceAxios.get(`/info_atencion_solicitud_id/${id}/${cedula}`);
  }

  static info_atencion_solicitud_edit = (id:any) => {
    return AxiosSolicitudes.instanceAxios.get(`/info_atencion_solicitud_edit/${id}`);
  }

  static editar_atencion_solicitud = (atencion: any) => {
    return AxiosSolicitudes.instanceAxios.post(`/editar_atencion_solicitud`, atencion);
  }

  static cambiar_estado_solicitud = (id: any, codigo: any) => {
    return AxiosSolicitudes.instanceAxios.put(`/cambiar_estado_solicitud/${id}/${codigo}`);
  }

  static empleados_sistemas = () => {
    return AxiosSolicitudes.instanceAxios.get('/empleados_sistemas');
  }

  static mostrar_codigos = (cedula: any) => {
    return AxiosSolicitudes.instanceAxios.get(`/mostrar_codigo_equipos_solicitante/${cedula}`);
  }

  static crear_atencion_solicitud = (registro: any) => {
    return AxiosSolicitudes.instanceAxios.post(`/crear_atencion_solicitud`, registro);
  }
}