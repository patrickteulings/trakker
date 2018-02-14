// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
// import firebase from './services/firebase';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    // console.log(this.$store.getters.user);
    if (this.$store.getters.user === undefined) {
      console.log('stop');
    }
    this.$store.dispatch('checkUserStatus')
      .then((user) => {
        this.$router.push('/home');
        console.log('hiero!', user);
      })
      .catch((err) => {
        this.$router.push('/login');
        console.log(err);
      });
  },
  beforeCreate () {
    console.log('I\'ve  got a user: ', this.$store.getters.getUser);
    // this.$router.beforeEach((to, from, next) => {
    //   console.log('iver got a user: ', this.$store.getters.getLoggedIn);
    // });
  }
});
