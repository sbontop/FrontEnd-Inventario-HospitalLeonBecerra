import axios from 'axios';
export default class AxiosImpresora {
  static instanceAxios = axios.create({
    baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    //baseURL: 'http://localhost:8000/api',

  });

  static crear_impresora = (impresora: any) => {
    return AxiosImpresora.instanceAxios.post(`/impresora`, impresora);
  }

  static mostrar_marcas_impresoras = () => {
    return AxiosImpresora.instanceAxios.get(`/marcas_impresoras`);
  }

  static mostrar_datos_impresoras = () => {
    return AxiosImpresora.instanceAxios.get(`/impresoras_all`);
  }

  /*
  static buscar_empleado = (empleado:any) => {
    return AxiosCorreo.instanceAxios.get(`/buscar_empleado/${empleado}`);
  }*/

  static impresoras_codigo = (codigo:any) => {
    return AxiosImpresora.instanceAxios.get(`/impresoras_codigo/${codigo}`);
  }

  static filtrar_impresoras = (marca?:any,fecha?:any) => {
    return AxiosImpresora.instanceAxios.get(`/filtrar_impresoras/${marca}/${fecha}`);
  }

}


















