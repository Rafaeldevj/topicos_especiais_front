<template>
    <div>
        <div class="container">
            <br>
            <h1>Início</h1>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {

        logout() {
            this.$store.state.usuario = { cd_usuario: null, nm_usuario: null, nm_email: null, fl_ativo: null, created_at: null }
        }
    },
    mounted() {
        //console.log(this.$store.state.usuario)
    }
}
</script>

<style>

</style>
