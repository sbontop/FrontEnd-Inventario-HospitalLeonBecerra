import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosNotificacion {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static actualizar_token = (token: any) => {
    return AxiosNotificacion.instanceAxios.put(`actualizar_token`,token);
  }

}