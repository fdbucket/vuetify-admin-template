<template>
    <div id="app">
        <router-view v-wechat-title="pageTitle" img-set="/favicon.ico" />
    </div>
</template>

<script>
import { title } from './settings'

export default {
    name: 'App',
    computed: {
        pageTitle() {
            return `${this.$route.meta.title} - ${title}` || title
        }
    }
}
</script>
