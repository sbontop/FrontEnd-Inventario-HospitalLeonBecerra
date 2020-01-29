import axios from 'axios';
export default class AxiosCorreo {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static mostrar_correos = () => {
    return AxiosCorreo.instanceAxios.get(`/mostrar_correos`);
  }

  static empleado_por_dpto = (departamento: any) => {
    return AxiosCorreo.instanceAxios.get(`/empleados_dpto/{departamento}`);
  }  

  static correo_por_fecha = (fecha: any) => {
    return AxiosCorreo.instanceAxios.get(`/correos/${fecha}`);
  }

  static correo_por_fecha_dpto = (fecha: any, dpto: any) => {
    return AxiosCorreo.instanceAxios.get(`/correos/${fecha}/${dpto}`);
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
