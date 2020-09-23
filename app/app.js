import Vue from "nativescript-vue";



import Home from "./components/Home";

Vue.config.silent = false

Vue.registerElement(
    'CardView',
    () => require('@nstudio/nativescript-cardview').CardView
  );



new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
