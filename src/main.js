import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


import "@/assets/css/global.css"
import "@/assets/css/base.css"

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
});


import "@/plugins/element-ui"


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
