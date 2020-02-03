import axios from 'axios';

export default class AxiosPC {
    static instanceAxios = axios.create({
        //baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
        baseURL: 'http://localhost:8000/api',

      });

      static crear_desktop = (equipo:any)=>{
        return AxiosPC.instanceAxios.post('/desktop',equipo);
      }
    
      static crear_laptop = (equipo:any)=>{
        return AxiosPC.instanceAxios.post('/laptop',equipo);
      }
    
      static crear_pc =(equipo:any, op:any)=>{
        if(op===1){
          return AxiosPC.instanceAxios.post('/laptop',equipo);
        }
        return AxiosPC.instanceAxios.post('/desktop',equipo);
      }

      static getEquipos=(body:any)=>{
        return AxiosPC.instanceAxios.post('/getdesktop',body);
      }

      static mostrar_marcas= () => {
        return AxiosPC.instanceAxios.get(`/listado_marcas`);
      }
}