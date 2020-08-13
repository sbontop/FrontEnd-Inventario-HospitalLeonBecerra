
const Auth = {
    authenticate(data:any) {
        console.log(data)
        localStorage.setItem('userdata',JSON.stringify(data))
        //this.isAuthenticated = true;
    },
    logout() {
        localStorage.removeItem('userdata');
    },
    getAuth() {
       console.log(localStorage.getItem('userdata') , 'loclal')
       return localStorage.getItem('userdata') !== null && localStorage.getItem('userdata') !== undefined;
    },
    getDataLog(){
        return localStorage.getItem('userdata') === null || localStorage.getItem('userdata') === undefined ? {} : JSON.parse(localStorage.userdata) ;
    },

    getEncargadoRegistro(){
        return localStorage.getItem('userdata') === null || localStorage.getItem('userdata') === undefined ? "" : JSON.parse(localStorage.userdata).user.username ;
    }

};
export default Auth;