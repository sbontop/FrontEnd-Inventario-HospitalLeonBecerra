import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosMarcas {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static filtrar_marcas = (filtros: any) => {
    return AxiosMarcas.instanceAxios.post(`filtrar_marcas`,filtros);
  }

  static crear_marca = (marca: any) => {
    return AxiosMarcas.instanceAxios.post(`/crear_marca`, marca);
  }

  static editar_marca = (marca: any) => {
    return AxiosMarcas.instanceAxios.put(`/editar_marca`, marca);
  }

  static marca_id = (marca_id: any) => {
    return AxiosMarcas.instanceAxios.get(`/marca_id/${marca_id}`);
  }

  static eliminar_marca = (marca_id: any) => {
    return AxiosMarcas.instanceAxios.delete(`/eliminar_marca/${marca_id}`);
  }

}