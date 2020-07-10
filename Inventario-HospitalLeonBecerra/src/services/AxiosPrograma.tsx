import axios from 'axios';

export default class AxiosPrograma {
  static instanceAxios = axios.create({
     baseURL: 'https://backend-hlb.herokuapp.com/api',
    // baseURL: 'http://localhost:8000/api',
  });

  static listado_programas = () => {
    return AxiosPrograma.instanceAxios.get(`/programas`);
  }

  static editores = () => {
    return AxiosPrograma.instanceAxios.get(`/editores_programa`);
  }

  static buscar_programa = (nombre:any) => {
    return AxiosPrograma.instanceAxios.get(`/buscar_programa/${nombre}`);
  }   

  static filtrar_programas = (filtros: any) => {
    return AxiosPrograma.instanceAxios.post(`/filtrar_programas`, filtros);
  }

  static crear_programa = (programa: any) => {
    return AxiosPrograma.instanceAxios.post(`/crear_programa`, programa);
  }
   
  static eliminar_programa = (id_programa: any) => {
    return AxiosPrograma.instanceAxios.put(`/eliminar_programa/${id_programa}`);
  }

  static editar_programa = (programa: any) => {
    return AxiosPrograma.instanceAxios.post(`/editar_programa`, programa);
  }

  static datos_programa = (id_programa: any) => {
    return AxiosPrograma.instanceAxios.get(`/buscar_programa_id/${id_programa}`);
  }
}
