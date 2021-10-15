<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title class="text-h6">{{ title }}</v-list-item-title>
            <v-list-item-subtitle>{{ subTitle }}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import { title, subTitle } from '../../../settings'

export default {
    name: 'NavigationHeader',
    // components: {  },
    data: () => ({
        title,
        subTitle
    })
}
</script>
