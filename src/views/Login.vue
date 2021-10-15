<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height>
                <v-layout class="align-center justify-center">
                    <v-flex xs12 sm8 md6 lg5 xl3>
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="login_form">
                                    <v-text-field label="account" name="account" prepend-icon="mdi-account" type="text" v-model="loginForm.account" :rules="[rules.required]"></v-text-field>

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="mdi-lock"
                                        :type="passwordDisplay ? 'text' : 'password'"
                                        v-model="loginForm.password"
                                        :append-icon="passwordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="passwordDisplay = !passwordDisplay"
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :loading="loginLoading" color="primary" @click="userLogin">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
        <v-snackbar top :color="snackbar.color" v-model="snackbar.show">
            {{ snackbar.text }}
            <v-btn text @click="snackbar.show = false">Close</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import { initRouterRoles } from '../router/permission'

export default {
    name: 'Login',
    data: () => ({
        passwordDisplay: false,
        loginLoading: false,
        loginForm: {
            account: 'admin',
            password: 'admin'
        },
        rules: {
            required: value => !!value || 'Required.'
        },
        snackbar: {
            show: false,
            text: '',
            color: 'primary'
        }
    }),
    methods: {
        userLogin() {
            if (!this.$refs.login_form.validate()) return
            // 表单验证成功
            this.loginLoading = true
            this.$store
                .dispatch('user/LOGIN', this.loginForm)
                .then(res => {
                    if (res.code === 200) {
                        this.loginLoading = false
                        this.goDashboard()
                    } else {
                        // console.error(res)
                        this.snackbarShow(res?.msg || '登陆异常')
                    }
                })
                .catch(({ msg }) => {
                    this.snackbarShow(msg, 'error')
                })
                .finally(() => {
                    this.loginLoading = false
                })
        },
        goDashboard() {
            // 获取角色信息并打开主界面
            initRouterRoles()
                .then(() => {
                    this.$router.replace('/')
                })
                .catch(() => {
                    this.snackbarShow('认证失败，请重新登陆', 'error')
                })
        },
        snackbarShow(text, color) {
            this.snackbar = {
                show: true,
                text,
                color
            }
        }
    }
}
</script>
