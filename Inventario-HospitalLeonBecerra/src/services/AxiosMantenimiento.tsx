import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosMantenimiento {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });


  static mantenimiento_id = (mantenimiento_id: any) => {
    return AxiosMantenimiento.instanceAxios.get(`/mantenimiento_id/${mantenimiento_id}`);
  }

  static crear_mantenimiento = (mantenimiento: any) => {
    return AxiosMantenimiento.instanceAxios.post(`crear_mantenimiento`, mantenimiento);
  }

  static editar_mantenimiento = (mantenimiento: any) => {
    return AxiosMantenimiento.instanceAxios.put(`/editar_mantenimiento`, mantenimiento);
  }

  static solicitudes_en_progreso = () => {
    return AxiosMantenimiento.instanceAxios.get((`/solicitudes_en_progreso`));
  }

  static mostrar_mantenimientos = (parametros: any) => {
    return AxiosMantenimiento.instanceAxios.post(`/mostrar_mantenimientos`,parametros);
  }

  static equipos_por_codigo = (codigo_equipo: any) => {
    return AxiosMantenimiento.instanceAxios.post(`/equipos_por_codigo`,codigo_equipo);
  }

}