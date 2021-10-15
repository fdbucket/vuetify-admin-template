<template>
    <v-navigation-drawer v-model="$store.state.navigationDrawer" app mobile-breakpoint="600" :expand-on-hover="$vuetify.breakpoint.smOnly">
        <navigation-header />
        <nested-list :propsRoutes="$store.getters['permission/routes']" />
    </v-navigation-drawer>
</template>

<script>
import NavigationHeader from './NavigationHeader'
import NestedList from './NestedList'

export default {
    name: 'NavigationBar',
    components: {
        NavigationHeader,
        NestedList
    }
}
</script>
