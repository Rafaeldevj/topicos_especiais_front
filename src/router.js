import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Inicio from './components/Inicio.vue'
import Perfil from './components/Perfil.vue'
import Painel from './components/Painel.vue'
import UsuarioCadastro from './components/usuario/UsuarioCadastro.vue'
import UsuarioListagem from './components/usuario/UsuarioListagem.vue'

import store from './store/index'

Vue.use(Router)

export default new Router({
    linkActiveClass: "active",
    routes: [
        {
            path: '/',
            component: Login,
            beforeEnter: (to, from, next) => {
                if(store.state.usuario.cd_usuario != null) {
                    next('/painel/inicio')
                } else {
                    next()
                }
            }
        },
        {
            path: '/login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if(store.state.usuario.cd_usuario != null) {
                    next('/painel/inicio')
                } else {
                    next()
                }
            }
        },
        {
            path: '/painel',
            component: Painel,
            beforeEnter: (to, from, next) => {
                if(store.state.usuario.cd_usuario != null) {
                    next()
                } else {
                    next('/login')
                }
            },
            children: [
                {
                    path: '',
                    redirect: 'inicio'
                },
                {
                    path: 'inicio',
                    component: Inicio,
                    beforeEnter: (to, from, next) => {
                        if(store.state.usuario.cd_usuario != null) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: 'perfil',
                    component: Perfil,
                    beforeEnter: (to, from, next) => {
                        if(store.state.usuario.cd_usuario != null) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: 'usuario_cadastro',
                    component: UsuarioCadastro,
                    beforeEnter: (to, from, next) => {
                        if(store.state.usuario.cd_usuario != null) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: 'usuario_listagem',
                    component: UsuarioListagem,
                    beforeEnter: (to, from, next) => {
                        if(store.state.usuario.cd_usuario != null) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: 'usuario_cadastro/:id',
                    component: UsuarioCadastro,
                    beforeEnter: (to, from, next) => {
                        if(store.state.usuario.cd_usuario != null) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
            ]

        }
    ]

})