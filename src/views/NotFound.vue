<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height class="align-center justify-center">
                <div align="center">
                    <h1>Not Found</h1>
                    <br />
                    <br />
                    <v-btn color="primary" :to="{ name: 'Dashboard' }">Back To Home </v-btn>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>
