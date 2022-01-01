module.exports = {
	runtimeCompiler: true,
	publicPath: process.env.VUE_APP_PUBLIC_PATH,
	// 发布模式
	chainWebpack: config => {
		config.when(process.env.NODE_ENV === 'prod', config => {
			config.entry('app').clear().add('./src/main-prod.js')
			config.set('externals', {
				vue: 'Vue',
				'vue-router': 'VueRouter',
				axios: 'axios',
				lodash: '_',
				echarts: 'echarts',
				nprogress: 'NProgress',
				jquery: '$'
			})
			config.plugin('html').tap(args => {
				args[0].isProd = true
				return args
			})
		})

		// 开发模式
		config.when(process.env.NODE_ENV === 'dev', config => {
			config.entry('app').clear().add('./src/main-dev.js')
			config.plugin('html').tap(args => {
				args[0].isProd = false
				return args
			})
		})
	}
}
