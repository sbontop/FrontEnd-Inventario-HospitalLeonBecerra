import axios from 'axios';
export default class AxiosImpresora {
  static instanceAxios = axios.create({
    //baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    baseURL: 'http://localhost:8000/api',

  });

  //impresora_nueva

  static crear_impresora = (impresora: any) => {
    return AxiosImpresora.instanceAxios.post(`/impresora`, impresora);
  }

  static crear_impresora_nueva = (impresora: any) => {
    return AxiosImpresora.instanceAxios.post(`/impresora_nueva`, impresora);
  }

  static mostrar_marcas = () => {
    return AxiosImpresora.instanceAxios.get(`/marcas_impresoras`);
  }

  static mostrar_datos_impresoras = () => {
    return AxiosImpresora.instanceAxios.get(`/impresoras_all`);
  }

  /*
  static buscar_empleado = (empleado:any) => {
    return AxiosCorreo.instanceAxios.get(`/buscar_empleado/${empleado}`);
  }*/

  static mostrar_datos_impresoras_paginado = (size:any, pageNumber:any) => {
    return AxiosImpresora.instanceAxios.get(`/impresoras_paginado/${size}?page=${pageNumber}`);
  }

  static mostrar_dato_impresora_by_id_paginado = (pageNumber:any,body:any) => {
    return AxiosImpresora.instanceAxios.get(`/mostrar_impresoras_codigo_paginado?page=${pageNumber}`, body);
  }

  static mostrar_dato_impresora_by_id = (id_equipo:any) => {
    return AxiosImpresora.instanceAxios.get(`/obtener_impresora_por_id/${id_equipo}`);
  }

  static eliminar_impresora = (id_equipo:any,body?:any) => {
    return AxiosImpresora.instanceAxios.put(`/eliminar_impresora/${id_equipo}`,body);
  }

  static existe_codigo_numero_serie =(codigo:any,numero_serie:any) => {
    return AxiosImpresora.instanceAxios.get(`/existe_codigo_numero_serie/${codigo}/${numero_serie}`);
  }

  static mostrar_direcciones_ip_libres= () => {
    return AxiosImpresora.instanceAxios.get(`/ips_libres`);
  }

  static mostrar_empleados= () => {
    return AxiosImpresora.instanceAxios.get(`/mostrar_empleados`);
  }


  static impresoras_codigo = (codigo:any) => {
    return AxiosImpresora.instanceAxios.get(`/impresoras_codigo/${codigo}`);
  }

  static mostrar_datos_impresora_by_id_paginado = (codigo:any,pageNumber:any,size:any) => {
    return AxiosImpresora.instanceAxios.get(`/impresoras_codigo_paginado/${codigo}/${size}?page=${pageNumber}`);
  }

  static filtrar_impresoras = (marca?:any,fecha?:any) => {
    return AxiosImpresora.instanceAxios.get(`/filtrar_impresoras/${marca}/${fecha}`);
  }

  static filtrar_impresoras_paginado = (pageNumber?:any,marca?:any,fecha?:any,size?:any) => {
    return AxiosImpresora.instanceAxios.get(`/filtrar_impresoras_paginado/${marca}/${fecha}/${size}?page=${pageNumber}`);
  }


  static editar_impresora = (impresora: any) => {
    return AxiosImpresora.instanceAxios.put(`/editar_impresora`,impresora);
  }


}


















