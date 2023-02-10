import Vue from 'vue'
import App from './App'
import store from './static/js/store.js'
import commonJs from './static/js/common.js'
import tuiIcon from "@/components/thorui/tui-icon/tui-icon.vue"
import tuiButton from '@/components/thorui/tui-button/tui-button.vue'
import tuiNavigationBar from '@/components/thorui/tui-navigation-bar/tui-navigation-bar.vue'
import tabbar from '@/components/tabbar/tab-bar-curtain.vue'
import zPaging from '@/components/z-paging/z-paging.vue'

Vue.component('tui-icon', tuiIcon)
Vue.component('tui-button', tuiButton)
Vue.component('tui-navigation-bar', tuiNavigationBar)
Vue.component('tab-bar', tabbar)
Vue.component('z-paging', zPaging)

Vue.config.productionTip = false

Vue.prototype.$commonJs = commonJs
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
