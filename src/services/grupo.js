import { http } from './config'

export default {

    listarGrupos: () => {
    
        return http.get('/grupo');
    }

}