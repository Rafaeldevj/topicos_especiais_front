<template>
    <div class="container">
        <br>
        <b-card
            border-variant="dark"
            header="Cadastro de Usuário"
            header-class="text-center"
            header-bg-variant="dark"
            header-text-variant="white"
        >
            <b-card-text>
                <b-form @submit.prevent="salvar" @reset.prevent="limparForm">
                    <div class="row">
                        <div class="col-6">
                            <b-form-group
                                label="Nome de usuário:"
                                label-for="usuario"
                            >
                                <b-form-input
                                id="usuario"
                                type="text"
                                v-model="usuario_form.nm_usuario"
                                required
                                placeholder="Nome de usuário..."
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-6">
                            <b-form-group
                                label="Email do usuário:"
                                label-for="email"
                            >
                                <b-form-input
                                id="email"
                                type="email"
                                v-model="usuario_form.nm_email"
                                required
                                placeholder="Email do usuário..."
                                ></b-form-input>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <b-form-group
                                label="Senha do usuário:"
                                label-for="senha"
                            >
                                <b-form-input
                                id="senha"
                                type="password"
                                :disabled="desabilidato"
                                v-model="usuario_form.nm_senha"
                                required
                                placeholder="Senha do usuário..."
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-6">
                            <b-form-group
                                label="Situação do usuário:"
                                label-for="situacao"
                            >
                                <b-form-select
                                id="situacao"
                                v-model="usuario_form.fl_ativo"
                                :options="status"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <b-form-group id="grupos" label="Grupo">
                                <b-form-radio-group v-model="usuario_form.grupo" id="grupos">
                                    <b-form-radio v-for="grupo in listaGrupos" :value="grupo.cd_grupo" :key="grupo.cd_grupo">{{grupo.nm_grupo}}</b-form-radio>

                                </b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div>
                    <b-button id="salvar_btn" type="submit" variant="primary"><i class="fas fa-save"></i> Salvar</b-button>
                    &nbsp;
                    <b-button id="novo_usuario_btn" type="reset" variant="danger"><i class="fas fa-eraser"></i> Novo cadastro</b-button>

                </b-form>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>

import gruposService from '../../services/grupo'
import usuarioService from '../../services/usuario'

export default {
    data() {
        return {
            usuario_form: {
                nm_usuario: '',
                nm_email: '',
                nm_senha: '',
                fl_ativo: null,
                grupo: null
            },
            desabilidato: false,
            status: [{ text: 'Selecione uma opção', value: null }, {text: 'Ativo', value: 'S'}, {text: 'Inativo', value: 'N'}],
            listaGrupos: []
        }
    },
    created() {
        this.limparForm()
    },
    methods: {

        getGrupos() {
            gruposService.listarGrupos().then(
                response => {
                    this.listaGrupos = response.data
                }
            );
        },

        salvar() {

            if(this.$route.params.id != null) {

                usuarioService.atualaizar(this.$route.params.id, this.usuario_form).then(
                    response => {

                        if (response.data == 1) {

                            this.$store.state.usuario = this.usuario_form

                            console.log(this.$store.state.usuario)

                            this.$swal({
                                position: 'center',
                                type: 'success',
                                title: 'Usuário atualizado com sucesso!',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(() => {
                                this.$router.push(`/painel/usuario_listagem`)
                            })
                            
                        } else {

                            this.$swal({
                                position: 'center',
                                type: 'error',
                                title: 'Falha ao atualizar usuário!',
                                showConfirmButton: false,
                                timer: 2000
                            });

                        }
                        
                    }
                )

            }
            else {
                usuarioService.salvar(this.usuario_form).then(
                    response => {
                        if(response.data.cd_usuario > 0) {
                            this.$swal({
                                position: 'center',
                                type: 'success',
                                title: 'Usuário cadastrado com sucesso!',
                                showConfirmButton: false,
                                timer: 2000
                            });
                            this.limparForm()
                        } else {
                            this.$swal({
                                position: 'center',
                                type: 'error',
                                title: 'Falha ao cadastrar usuário!',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                        
                    }
                )
            }
        },

        limparForm() {
            this.usuario_form.nm_usuario = ''
            this.usuario_form.nm_email = ''
            this.usuario_form.nm_senha = ''
            this.usuario_form.fl_ativo = null
            this.usuario_form.grupo = null

            this.desabilidato = false
        },

        verificaParametros() {

            if(this.$route.params.id != null) {
                let id = this.$route.params.id
                this.desabilidato = true

                usuarioService.buscar(id).then(
                    response => {
                        this.usuario_form = response.data.usr[0]
                        this.usuario_form.grupo = response.data.grupo.cd_grupo
                    }
                )

            } else {
                this.limparForm()
            }
            

        }

    },
    mounted() {
        this.getGrupos()
        this.verificaParametros()
    }
}
</script>

<style>

</style>


