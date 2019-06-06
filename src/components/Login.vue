<template>
    <div>

        <b-row>
            <b-col></b-col>
            
            <b-col>
                <br><br><br><br><br><br>
                <div class="" id="login">
                    <b-card header-bg-variant="primary" header="Login" header-text-variant="white" header-class="text-center">
                        <b-form @submit.prevent="onLogin">
                            
                            <b-form-group
                                label="Email:"
                                label-for="email"
                            >
                                <b-form-input
                                id="email"
                                type="email"
                                v-model="login.nm_email"
                                required
                                placeholder="Email..."
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label="Senha:"
                                label-for="senha"
                            >
                                <b-form-input
                                id="senha"
                                type="password"
                                v-model="login.nm_senha"
                                required
                                placeholder="Senha de acesso..."
                                ></b-form-input>
                            </b-form-group>
                            <br>
                            <b-button type="submit" block variant="info">Entrar</b-button>

                        </b-form>
                    </b-card>
                </div>
            </b-col>
            
            <b-col></b-col>
        </b-row>

        
    </div>
</template>

<script>

import LoginService from '../services/login';

export default {
    data() {
        return {

            login: {
                nm_email: '',
                nm_senha: ''
            }

        }
    },
    methods: {

        onLogin() {

            LoginService.logar(this.login).then(
                (response) => {

                    if(response.data.cod != '1') {
                        
                        this.$swal({
                            position: 'center',
                            type: 'error',
                            title: response.data.msg,
                            showConfirmButton: false,
                            timer: 2000
                        });

                    } else {
                        this.$store.state.usuario = response.data.usr[0]
                        this.$store.state.grupo = response.data.grupo
                        this.$router.push('/painel/')
                    }

                    
                    //console.log(response)
                }
            );

        }

    },
    mounted() {
        
    }
}
</script>

<style>

</style>
