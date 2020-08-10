export default class Auxiliar {

    static avatar = (tipo_equipo: string, estado: string) => {
        let tipo = tipo_equipo.toLocaleLowerCase();
        let ruta = "";
        switch (tipo) {
            case "router":
                estado === 'D' ? ruta = "./assets/img/router/D.png" :
                    estado === 'R' ? ruta = "./assets/img/router/R.png" :
                        estado === 'ER' ? ruta = "./assets/img/router/ER.png" :
                            estado === 'O' ? ruta = "./assets/img/router/O.png" :
                                ruta = "./assets/img/router/B.png"

                return ruta;
            case "impresora":
                estado === 'D' ? ruta = "./assets/img/impresora/D.png" :
                    estado === 'R' ? ruta = "./assets/img/impresora/R.png" :
                        estado === 'ER' ? ruta = "./assets/img/impresora/ER.png" :
                            estado === 'O' ? ruta = "./assets/img/impresora/O.png" :
                                ruta = "./assets/img/impresora/B.png"
                return ruta;

            case "desktop":
                estado === 'D' ? ruta = "./assets/img/desktop/D.png" :
                    estado === 'R' ? ruta = "./assets/img/desktop/R.png" :
                        estado === 'ER' ? ruta = "./assets/img/desktop/ER.png" :
                            estado === 'O' ? ruta = "./assets/img/desktop/O.png" :
                                ruta = "./assets/img/desktop/B.png"
                return ruta;
            case "laptop":
                estado === 'D' ? ruta = "./assets/img/desktop/D.png" :
                    estado === 'R' ? ruta = "./assets/img/desktop/R.png" :
                        estado === 'ER' ? ruta = "./assets/img/desktop/ER.png" :
                            estado === 'O' ? ruta = "./assets/img/desktop/O.png" :
                                ruta = "./assets/img/desktop/B.png"
                return ruta;
            default:
                estado === 'D' ? ruta = "./assets/img/otros/D.png" :
                    estado === 'R' ? ruta = "./assets/img/otros/R.png" :
                        estado === 'ER' ? ruta = "./assets/img/otros/ER.png" :
                            estado === 'O' ? ruta = "./assets/img/otros/O.png" :
                                ruta = "./assets/img/otros/B.png"
                return ruta;
        }

    }

}