import Vue from 'vue'
import App from './App.vue'
//import App from './pages/lists.vue'
//import App from './pages/Auth.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import { routes } from './routes.js';



Vue.use(VueRouter); 
Vue.use(VueResource); 

const router = new VueRouter({
	routes,
	mode:'history'
});
Vue.http.interceptors.push(function(request, next) {

  // modify headers
  request.headers.set('Authorization', 'Bearer:'+localStorage.getItem('token'));

  // continue to next interceptor
  next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
