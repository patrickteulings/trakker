<template>
  <div class="hello">
    <h1>{{ msg }} {{user}}</h1>
    <h2>Login or create a new account</h2>
      <router-link to="/">Back home</router-link> |
      <router-link to="/home">Home</router-link>
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
  name: 'login',
  data () {
    return {
      msg: 'Please login',
      title: '',
      user: 'bla',
      token: '',
      profilePic: ''
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
    postCat () {
      this.$root.$firebaseRefs.cat.push(
        {
          'url': 'cat-url',
          'comment': this.title,
          'info': 'Posted by Charles on Tuesday',
          'created_at': -1 * new Date().getTime()
        })
        .then(this.$router.push('/'));
    },
    signIn () {
      const provider = new firebase.fb.auth.GoogleAuthProvider();
      const self = this;
      firebase.fb.auth().signInWithPopup(provider).then(function (result) {
        self.profilePic = result.additionalUserInfo.profile.picture;
        // This gives you a Google Access Token. You can use it to access the Google API.
        self.token = result.credential.accessToken;
        // The signed-in user info.
        self.user = result.user;
        self.$store.commit('SET_USER', result.user);
        // ...
      }).catch(function (error) {
        console.log(error);
        // Handle Errors here.
        // let errorCode = error.code
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
    },
    signOut () {
      const self = this;
      firebase.fb.auth().signOut().then(function () {
        // Sign-out successful.
        self.$store.commit('SET_USER', null);
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
