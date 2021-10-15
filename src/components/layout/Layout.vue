<template>
    <v-app id="inspire">
        <!-- 顶部导航栏-->
        <app-bar />
        <!-- 侧边导航栏 -->
        <navigation-bar />
        <!--  内容区  -->
        <v-main>
            <breadcrumbs />
            <v-container fluid>
                <v-scroll-x-transition mode="out-in">
                    <keep-alive> <router-view /></keep-alive>
                </v-scroll-x-transition>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import NavigationBar from './navigation/NavigationBar'
import AppBar from './app/AppBar'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'

export default {
    name: 'Layout',
    components: { NavigationBar, AppBar, Breadcrumbs }
}
</script>
