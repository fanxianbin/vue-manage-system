// import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题

Vue.use(ELEMENT, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');