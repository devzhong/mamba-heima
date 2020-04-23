// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

import MyServerHttp from '@/plugins/http'
import moment from 'moment'


//使用ElementUI插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)
Vue.config.productionTip = false
Vue.prototype.SERVE_RERROR='服务器内部错误'
//全局过滤器处理日期
Vue.filter('fmtdate', (v)=>{
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
