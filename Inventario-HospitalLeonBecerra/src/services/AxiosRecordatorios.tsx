import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosRecordatorios {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_recordatorios_paginado = (size:any, pageNumber:any) => {
    return AxiosRecordatorios.instanceAxios.get(`/mostrar_recordatorios/${size}?page=${pageNumber}`);
  }

  static eliminar_recordatorio = (id_equipo:any,body?:any) => {
    return AxiosRecordatorios.instanceAxios.put(`/eliminar_recordatorio/${id_equipo}`,body);
  }

  static eliminar_recordatorio_actual = (id_equipo:any) => {
    return AxiosRecordatorios.instanceAxios.delete(`/eliminar_recordatorio_actual/${id_equipo}`);
  }

  static recordatorios_actuales = () => {
    return AxiosRecordatorios.instanceAxios.get(`/recordatorios_actuales`);
  }

  static recordatorios_codigo = (codigo:any) => {
    return AxiosRecordatorios.instanceAxios.get(`/recordatorio_codigo/${codigo}`);
  }

}
