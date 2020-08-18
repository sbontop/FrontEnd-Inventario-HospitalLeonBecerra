import axios from 'axios';
import VariableGlobal from './VariableGlobal'
const base_url_register: any = VariableGlobal.base_url_register;
const base_url_login: any = VariableGlobal.base_url_login;
const base_url_profile: any = VariableGlobal.base_url_profile;

export default class AxiosAutenticacion {
  static instanceAxios = axios.create({
    //baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
    baseURL: VariableGlobal.baseURL,

  });


static register = (newUser: any) => {
  return axios
      .post(base_url_register, newUser, {
          headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
          
          console.log("Response: ",response);
          return response;

      })
      .catch(err => {
          console.log("err: ",err);
          return err;

      })
}


static mostrar_departamentos = () => {
    return AxiosAutenticacion.instanceAxios.get(`/mostrar_departamentos`);
  }



  static mostrar_roles = () => {
    return AxiosAutenticacion.instanceAxios.get(`/mostrar_roles`);
  }

static login = (user:any) => {
  return axios
      .post(
            base_url_login,
          {
              username: user.username,
              password: user.password
          },
          {
              headers: { 'Content-Type': 'application/json' }
          }
      )
      /*.then(response => {
          localStorage.setItem('usertoken', response.data.token)
          return response.data.token
      })*/
      .catch(err => {
        //console.log("Respuesta: ",err.error);
        //console.log("Respuesta: ",(err+'').includes('400'));
        return err;
        })
}


static obtener_datos_usuario = (username:any) => {
    return AxiosAutenticacion.instanceAxios.get(`/obtener_datos_usurios/${username}`);
  }

 

static getProfile = () => {
  return axios
      .get(base_url_profile, {
          headers: {Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.usertoken}` }
      })
      .then(response => {
          console.log('response ',response);
          console.log("response.data ", response.data);
          return response.data
      })
      .catch(err => {
          console.log(err)
          //console.log('Not function: ',err);
      })
}
}