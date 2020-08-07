import axios from 'axios';
import VariableGlobal from './VariableGlobal'
//const baseURL_upload_images: any= 'http://localhost:8000/api/upload/images';

export default class AxiosFirma {
  static instanceAxios = axios.create({
    //baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    baseURL: 'http://localhost:8000/api/upload/images',

  });




  static mostrar_departamentos = () => {
    return AxiosFirma.instanceAxios.get(`/mostrar_departamentos`);
  }

  static mostrar_roles = () => {
    return AxiosFirma.instanceAxios.get(`/mostrar_roles`);
  }




  static almacenar_firma = (firma: any) => {
    return axios
      .post(VariableGlobal.baseURL_upload_images, firma,{
      headers: {'content-type': 'multipart/form-data'}
    })
    .then(response => {
      console.log("Response firmar: ",response);
      return response;
     })
     .catch(err => {
      console.log("err: ",err);
      return err;
     })
  }


  /*static almacenar_firma = (firma: any) => {
    return AxiosFirma.instanceAxios.post(`/upload/images`, firma);
  }*/

}
