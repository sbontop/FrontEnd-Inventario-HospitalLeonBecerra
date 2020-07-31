import axios from 'axios';
export default class AxiosOtrosEquipos {
  static instanceAxios = axios.create({
    //baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    baseURL: 'https://backend-hlb.herokuapp.com/api',

  });

  //impresora_nueva

  static mostrar_equipos_paginado = (size:any, pageNumber:any) => {
    return AxiosOtrosEquipos.instanceAxios.get(`/mostrar_equipos_paginado/${size}?page=${pageNumber}`);
  }
 
  static mostrar_marcas = () => {
    return AxiosOtrosEquipos.instanceAxios.get(`/marcas_impresoras`);
  }

  static mostrar_datos_equipo_by_id_paginado = (codigo:any,pageNumber:any,size:any) => {
    return AxiosOtrosEquipos.instanceAxios.get(`/equipo_codigo_paginado/${codigo}/${size}?page=${pageNumber}`);
  }

  static filtrar_equipos_paginado = (pageNumber?:any,marca?:any,fecha?:any,estado?:any,size?:any) => {
    return AxiosOtrosEquipos.instanceAxios.get(`/filtrar_equipos_paginado/${marca}/${fecha}/${estado}/${size}?page=${pageNumber}`);
  }

  static eliminar_otros_equipos = (id_equipo:any,body?:any) => {
    return AxiosOtrosEquipos.instanceAxios.put(`/eliminar_otros_equipos/${id_equipo}`, body);
  }

  static mostrar_direcciones_ip_libres= () => {
    return AxiosOtrosEquipos.instanceAxios.get(`/ips_libres`);
  }

  static mostrar_empleados= () => {
    return AxiosOtrosEquipos.instanceAxios.get(`/mostrar_empleados`);
  }

  static mostrar_dato_otro_equipo_by_id = (id_equipo:any) => {
    return AxiosOtrosEquipos.instanceAxios.get(`/obtener_otro_equipo_por_id/${id_equipo}`);
  }

  static mostrar_tipo_equipo = () => {
    return AxiosOtrosEquipos.instanceAxios.get(`/tipo_equipo`);
}

  static mostrar_codigos = () => {
    return AxiosOtrosEquipos.instanceAxios.get(`/mostrar_codigos`);
  }

  static crear_otro_equipo = (equipo:any) => {
    return AxiosOtrosEquipos.instanceAxios.post(`/otro_equipo`, equipo);
  }

  static info_extra = (id_equipo:any) => {
    return AxiosOtrosEquipos.instanceAxios.get(`/info_extra/${id_equipo}`);
  }

  static editar_equipo = (equipo:any) => {
    return AxiosOtrosEquipos.instanceAxios.put(`/editar_equipo`,equipo);
}

}


















