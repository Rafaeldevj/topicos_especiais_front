import { http } from './config'

export default {

    salvar: (usuario) => {
    
        return http.post('/usuario', usuario)
    },

    atualaizar: (id, usuario) => {
    
        return http.put(`/usuario/${id}`, usuario)
    },

    listar: () => {
        return http.get('/usuario')
    },

    ativar: (id) => {
        return http.get(`/usuario/ativar/${id}`)
    },

    buscar: (id) => {
        return http.get(`/usuario/${id}`)
    }


}