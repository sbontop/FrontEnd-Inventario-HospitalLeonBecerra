import axios from 'axios';
export default class AxiosCorreo {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static correo_por_fecha = (fecha: any) => {
    return AxiosCorreo.instanceAxios.get(`/correos/${fecha}`);
  }

  static crear_correo = (correo: any) => {
    return AxiosCorreo.instanceAxios.post(`/correos`, correo);
  }
  static mostrar_departamentos = () => {
    return AxiosCorreo.instanceAxios.get(`/departamentos`);
  }

}
