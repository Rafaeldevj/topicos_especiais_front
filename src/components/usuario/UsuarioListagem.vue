<template>
    <div class="container">
        <br>
        <b-card
            border-variant="dark"
            header="Listagem de Usuários"
            header-class="text-center"
            header-bg-variant="dark"
            header-text-variant="white"
        >
            <b-card-text>
                <b-table hover :items="items" :fields="fields" thead-class="text-center" tbody-tr-class="text-center">
                    <template slot="fl_ativo" slot-scope="data">
                        <div v-if="data.item.fl_ativo == 'S'">
                            <b-badge variant="success">Ativo</b-badge>
                        </div>
                        <div v-else>
                            <b-badge variant="danger">Inativo</b-badge>
                        </div>
                        
                    </template>

                    <template slot="controle" slot-scope="row">
                        <b-button size="sm" class="mr-3" variant="outline-primary" @click="navegar(row.item.cd_usuario)">
                            <i class="fas fa-user-edit"></i>
                            Editar
                        <!--{{ row.item.cd_usuario }}-->
                        </b-button>
                        <b-button size="sm" class="mr-3" variant="outline-info" @click="showModal(row.item)">
                            <i class="fas fa-eye"></i>
                            Vizualisar
                        <!--{{ row.item.cd_usuario }}-->
                        </b-button>
                        <b-button size="sm" class="mr-3" variant="outline-warning" @click="ativaDesativa(row.item.cd_usuario)">
                            <i class="fas fa-power-off"></i>
                            Ativar/Desativar
                        </b-button>
                    </template>
                </b-table>
            </b-card-text>
        </b-card>

        <b-modal id="info_usuario" title="Dados do Usuário" header-bg-variant="dark" header-text-variant="light">
            <p class="my-2">Código: <strong>{{ usuarioView.cd_usuario }}</strong></p>
            <p class="my-2">Usuário: <strong>{{ usuarioView.nm_usuario }}</strong></p>
            <p class="my-2">Email: <strong>{{ usuarioView.nm_email }}</strong></p>
            <div v-if="usuarioView.fl_ativo == 'S'">
                <p class="my-2">Situação: <b-badge pill variant="success">Ativo</b-badge></p>
            </div>
            <div v-else>
                <p class="my-2">Situação: <b-badge pill variant="danger">Inativo</b-badge></p>
            </div>
            <p class="my-2">Data de Cadastro: <strong> {{ refatoraDataTabela(usuarioView.created_at) }} </strong></p>
        </b-modal>
    </div>
</template>

<script>

import usuarioService from '../../services/usuario'
import moment from 'moment'

export default {
    data() {
        return {
            usuarioView: {
                cd_usuario: '',
                nm_usuario: '',
                nm_email: '',
                fl_ativo: ''
            },
            fields: {
                cd_usuario: {
                    label: 'Código',
                    sortable: true
                },
                nm_usuario: {
                    label: 'Nome',
                    sortable: true
                },
                fl_ativo: {
                    label: 'Situação',
                    sortable: true
                },
                controle: {
                    label: 'Controle'
                }
            },
            items: []
        }
    },
    methods: {

        carregaUsuarios(){
            usuarioService.listar().then(
                response => {
                    this.items = response.data
                }
            )
        },

        ativaDesativa(id) {
            usuarioService.ativar(id).then(
                response => {
                    if(response.data == 'N') {
                        this.$store.state.usuario.fl_ativo == 'S'
                    } else {
                        this.$store.state.usuario.fl_ativo == 'N'
                    }
                    this.carregaUsuarios()
                }
            )
        },

        showModal(usuario) {
            this.usuarioView = usuario
            this.$bvModal.show('info_usuario')
        },

        refatoraDataTabela(data){

            if (data != null) {
                let dia = data.slice(8,10);
                let mes = data.slice(5,7);
                let ano = data.slice(0,4);
                let hora = data.slice(11,13);
                let minuto = data.slice(14,16);
                let segundo = data.slice(17, 19)

                return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
            } else {
                return "";
            }

        },

        navegar(id) {
            this.$router.push(`usuario_cadastro/${id}`)
        },
    },
    mounted() {
        this.carregaUsuarios()
    }
}
</script>

<style>

</style>
