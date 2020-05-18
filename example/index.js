import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import './style.css';

import List from './List.vue';
import componentNames from '../config';

Vue.use(VueRouter);

const routes =[{
  path:'/',
  name:'list',
  component:List
}];

componentNames.forEach(name=>{
  routes.push({
    path:`/${name}`,
    name:`${name}`,
    component: ()=>import(`../compontents/${name}/demo/index.vue`)
  })
})

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
