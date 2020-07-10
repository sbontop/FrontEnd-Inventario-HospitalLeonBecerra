import axios from 'axios';

export default class AxiosPC {
    static instanceAxios = axios.create({
        //baseURL: 'https://app-hlb-api-rest.herokuapp.com/api',
        baseURL: 'http://localhost:8000/api',
        
    // baseURL: 'https://backend-hlb.herokuapp.com/api',

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
        return AxiosPC.instanceAxios.post('/getequipos',body);
      }

      static mostrar_marcas= () => {
        return AxiosPC.instanceAxios.get(`/listado_marcas`);
      }

      static get_listaip= () => {
        return AxiosPC.instanceAxios.get(`/ips_libres`);
      }
      static get_ip_id= (id:any) => {
        return AxiosPC.instanceAxios.get(`/ipbyidonly/${id}`);
      }
      static get_lista_office= () => {
        return AxiosPC.instanceAxios.get(`/programas`);
      }
      static get_lista_empleados= () => {
        return AxiosPC.instanceAxios.get(`/mostrar_empleados`);
      }

      static get_lista_so= () => {
        return AxiosPC.instanceAxios.get(`/listar_so`);
      }

      static deleteEquipo=(idequipo:any,tipo:any)=>{
        
        return AxiosPC.instanceAxios.put(`/deleteequipo/${idequipo}/${tipo}`);
      }

      static getEquipoByID =(idequipo:any, op:any)=>{
        if(op===1){
          return AxiosPC.instanceAxios.get(`/getLaptopByID/${idequipo}`);
        }
        return AxiosPC.instanceAxios.get(`/getDesktopByID/${idequipo}`);
      }
      
      static editEquipo=(idequipo:any, body:any, op:any)=>{
        if(op===2){
          return AxiosPC.instanceAxios.put(`/editdesktop/${idequipo}`,body);
        }
        return AxiosPC.instanceAxios.put(`/editlaptop/${idequipo}`,body);
      }
       
}