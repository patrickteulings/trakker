<template>
  <div>
    <div class="c-top-navigation">
      <div class="c-top-navigation__image"><img v-if="profile" class="c-top-navigation__image" v-bind:src="profile.photoURL" v-bind:alt="profile.displayName"></div>
      <div class="c-top-navigation__image"></div>
    </div>
    <div class="hello">
      <h1>{{ msg }} <span v-if="profile">{{profile.displayName}}</span></h1>
        <router-link to="/">Back home</router-link>
        <router-link to="/Login">login</router-link>
        <minicard v-for="(trakker, index) in trakkers" v-bind:trakkerData="trakker" :key="index"></minicard>
        <div class="c-modal c-modal--add box-shadow--level-4 u-hidden">
          <div>
            <input id="username" v-model="trakkerTitle" type="text" placeholder="What did you do">
            <input id="cat" v-model="trackerCategory" type="text" placeholder="Category">
            <input id="amount" v-model="trackerAmount" type="number" placeholder="1">
            <label for="username"></label>
          </div>
          <div class="actions">
            <a @click.prevent="postCat" class="c-btn c-btn--white">
              POST A TRACKER
            </a>
          </div>
        </div>
        <button class="c-btn c-btn--add" @click="toggleAddModel"><i class="fa fa-plus"></i>Add</button>

          <span class="profile__image-small" v-if="profile">
            <img v-bind:src="profile.photoURL" alt="profileImage">
          </span>
          <span v-else>
            ANDERS
          </span>
        </div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';
import minicard from '@/components/cards/minicard';

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome back',
      title: '',
      token: '',
      trakkerTitle: null,
      trackerCategory: null,
      trackerAmount: '1'
    };
  },
  components: {
    minicard
  },
  computed: {
    ...mapState({
      user: state => state.user,
      trakkers: state => state.trakkers
    }),
    profile () {
      // user = this.$store.getters.getUser;
      if (this.$store.getters.getUser) {
        return this.$store.getters.getUser;
      }
    },
    myCats () {
      // user = this.$store.getters.getUser;
      return this.$store.getters.getCats;
    }
  },
  mounted () {
    this.getCats();
  },
  methods: {
    getCats: function () {
      this.$store.dispatch('getUserTrakkers');
    },
    postCat: function () {
      this.$store.dispatch('addUserCat',
        {comment: this.trakkerTitle,
          category: this.trackerCategory,
          timestamp: new Date().toString(),
          amount: this.trackerAmount});
    },
    toggleAddModel: function () {
      document.querySelector('.c-modal--add').classList.toggle('u-hidden');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
