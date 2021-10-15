'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 文件打包后 在index.html中引用的位置，与 process.env.BASE_URL相同
    // publicPath: process.env.NODE_ENV === 'production' ? '/vuetify-admin-template/' : '/',
    publicPath: '/',
    transpileDependencies: ['vuetify'],
    chainWebpack: config => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
    productionSourceMap: false,
    css: {
        sourceMap: false
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: defaultSettings.title,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
