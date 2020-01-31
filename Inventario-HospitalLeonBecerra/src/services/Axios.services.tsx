import axios from 'axios';
export default class AxiosCorreo {
  static instanceAxios = axios.create({
    baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
  });

  static mostrar_correos = () => {
    return AxiosCorreo.instanceAxios.get(`/mostrar_correos`);
  }

  static empleado_por_dpto = (departamento: any) => {
    return AxiosCorreo.instanceAxios.get(`/empleados_dpto/{departamento}`);
  }  

  static correo_por_filtro = (departamento:any, fecha_asignacion: any) => {
    return AxiosCorreo.instanceAxios.get(`filtrar_correos/${departamento}/${fecha_asignacion}`);
  }

  static crear_correo = (correo: any) => {
    return AxiosCorreo.instanceAxios.post(`/correos`, correo);
  }

  static mostrar_departamentos = () => {
    return AxiosCorreo.instanceAxios.get(`/departamentos`);
  }

  static buscar_empleado = (empleado:any) => {
    return AxiosCorreo.instanceAxios.get(`/buscar_empleado/${empleado}`);
  }

  


  
}
