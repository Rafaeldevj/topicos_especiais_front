<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand>Sistema</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <li class="nav-item" v-for="(item, index) in menu" :key="index">
                    <div v-if="item.permissao == 1">
                        <div v-if="permissao == 1">
                            <router-link class="nav-link" :to="item.caminho"><i :class="item.icone"></i> {{ item.nome }}</router-link>
                        </div>
                    </div>
                    <div v-else>
                        <router-link class="nav-link" :to="item.caminho"><i :class="item.icone"></i> {{ item.nome }}</router-link>
                    </div>
                </li>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template slot="button-content"><i class="fas fa-user"></i> &nbsp;{{ this.$store.state.usuario.nm_usuario }}</template>
                    <b-dropdown-item @click="navegar('perfil')"><i class="fas fa-user-cog"></i> &nbsp;Perfil</b-dropdown-item>
                    <b-dropdown-item @click="logout"><i class="fas fa-sign-out-alt"></i> &nbsp; Sair</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nome_usuario: '',
            permissao: null,
            menu: [
                { caminho: '/painel/inicio', icone: 'fas fa-home', nome: 'Inicio', permissao: 0 },
                { caminho: '/painel/usuario_cadastro', icone: 'fas fa-user-plus', nome: 'Cadastro de Usuário', permissao: 1 },
                { caminho: '/painel/usuario_listagem', icone: 'fas fa-list', nome: 'Listagem de Usuários', permissao: 1 }
            ]
        }
    },
    created() {
        this.nome_usuario = this.$store.state.usuario.nm_usuario
        this.permissao = this.$store.state.grupo.cd_grupo
    },
    methods: {
        
        navegar(pagina) {
            this.$router.push(pagina)
        },

        logout() {
            this.$store.state.usuario = { cd_usuario: null, nm_usuario: null, nm_email: null, fl_ativo: null, created_at: null }
            this.navegar('/login')
        }
    
    },
    mounted() {
        this.nome_usuario = this.$store.state.usuario.nm_usuario
    }
}
</script>

<style>
    #nome {
        color: white;
    }
</style>
