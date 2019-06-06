<template>
    <div class="container">
        <br>
        <b-row>
            <b-col></b-col>
            <b-col cols="6">
                <b-card title="Dados do Usuário" class="text-center">
                    <b-card-text>
                        <b-list-group>
                            <b-list-group-item>Nome: <strong>{{ this.$store.state.usuario.nm_usuario }}</strong></b-list-group-item>
                            <b-list-group-item>Email: <strong>{{ this.$store.state.usuario.nm_email }}</strong></b-list-group-item>
                            <div v-if="this.$store.state.usuario.fl_ativo == 'S'">
                                <b-list-group-item>Situação: <strong><b-badge variant="success">Ativo</b-badge></strong></b-list-group-item>
                            </div>
                            <div v-else>
                                <b-list-group-item>Situação: <strong><b-badge variant="danger">Inativo</b-badge></strong></b-list-group-item>
                            </div>
                            
                            <b-list-group-item>Grupo: <strong><b-badge variant="info">{{ this.$store.state.grupo.nm_grupo }}</b-badge></strong></b-list-group-item>
                            <b-list-group-item>Data de Cadastro: {{ refatoraDataTabela(this.$store.state.usuario.created_at) }}</b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-card>
            </b-col>
            <b-col></b-col>
        </b-row>
        
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
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
    },
    mounted() {
    }
}
</script>

<style>

</style>
