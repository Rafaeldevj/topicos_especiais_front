import { http } from './config'

export default {

    logar: (usuario) => {
    
        return http.post('/usuario/login', usuario);
    }

}