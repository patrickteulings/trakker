<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Login or create a new account</h2>
      <router-link to="/">Back home</router-link>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A CAT
          </a>
        </div>
        <a @click.prevent="signIn">Log in with Google</a>
        <a @click.prevent="signOut">google sign out</a>
        <span v-if="profile">
        <img v-bind:src="profile.photoURL" alt="profileImage">
        </span>
      </div>    
  </div>
</template>

<script>

import firebase from '@/services/firebase';

export default {
  name: 'header',
  data () {
    return {
      msg: 'I am a header',
      title: '',
      user: '',
      token: ''      
    };
  },
  computed: {
    profile () {
      return this.$store.getters.getUser;
    }
  },
  created () {
  },
  methods: {
    signOut () {
      const self = this;
      firebase.fb.auth().signOut().then(function () {
        // Sign-out successful.
        self.$store.commit('SET_USER', {});
      }, function (error) {
        console.log(error);
        // An error happened.
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
