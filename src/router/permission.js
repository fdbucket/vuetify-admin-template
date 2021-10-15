import router from './index'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '../util/cookie'

/**
 * 获取用户信息并根据用户角色生成路由表
 * @returns Promise
 */
export const initRouterRoles = () => {
    // console.log('获取用户信息')
    return new Promise((resolve, reject) => {
        store
            .dispatch('user/GET_USER_INFO')
            .then(async res => {
                const { roles } = res
                // 根据用户角色生成路由表
                await store.dispatch('permission/GENERATE_ROUTES', roles).then(() => {
                    router.addRoutes(store.getters['permission/asyncRoutes']) // 动态添加可访问路由表
                    resolve()
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

// 全局路由守卫，验证用户是否登录
router.beforeEach(async (to, from, next) => {
    NProgress.start()

    if (getToken()) {
        // 拥有Token 不需要再登陆
        if (to.path === '/login') {
            next('/')
            NProgress.done()
        } else {
            // 查看是否有角色信息
            if (store.getters['user/userRole'].length > 0) {
                next()
            } else {
                // console.log('不含有角色信息，获取用户信息')
                initRouterRoles()
                    .then(() => {
                        next(to.path)
                    })
                    .catch(async (err = '认证失败，请重新登陆') => {
                        await store.dispatch('user/FONT_LOGOUT').then(() => {
                            alert(err)
                            next('/login')
                            NProgress.done()
                        })
                    })
            }
        }
    } else {
        // 注意下面的if/else，如果只写 next('/login')，将一直跳转/login,导致堆栈溢出
        if ('/login' === to.path) {
            next()
        } else {
            next('/login')
        }
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})
