import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: {
            cd_usuario: null,
            nm_usuario: null,
            nm_email: null,
            fl_ativo: null,
            created_at: null
        },
        grupo: {
            cd_grupo: null,
            nm_grupo: null
        }
    }
})