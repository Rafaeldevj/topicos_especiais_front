<template>
    <div>
        <Menu />
        <router-view></router-view>
    </div>
</template>

<script>

import Menu from './Menu'

export default {
    components: {
        Menu
    }
}
</script>

<style>

</style>
