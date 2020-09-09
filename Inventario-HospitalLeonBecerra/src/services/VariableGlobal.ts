export default class VariableGlobal {
    static baseURL = 'https://backendhlb.herokuapp.com/api'; // 'http://localhost:8000/api'
    static base_url_register: any = VariableGlobal.baseURL+'/register';
    static base_url_login: any = VariableGlobal.baseURL+'/login';
    static base_url_profile: any = VariableGlobal.baseURL+'/user';
    static baseURL_upload_images: any= VariableGlobal.baseURL+'/upload/images';
}