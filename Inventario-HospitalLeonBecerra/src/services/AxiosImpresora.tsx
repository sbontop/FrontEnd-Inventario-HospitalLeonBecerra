import axios from 'axios';
export default class AxiosImpresora {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static crear_impresora = (impresora: any) => {
    return AxiosImpresora.instanceAxios.post(`/impresora`, impresora);
  }


}
