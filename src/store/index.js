import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pagesData: [],
    user: null,
    isLoggedIn: false,
    trakkers: []
  },
  actions: {
    checkUserStatus ({ commit, state }) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('SET_USER_ID', user.uid);
            commit('SET_USER', user);
            resolve(user.uid);
          } else {
            commit('SET_NO_USER');
            reject(new Error('User is not logged in.'));
          }
        });
      });
    },
    getUserTrakkers ({commit, state}) {
      // var that = this;
      // firebase.database.ref('users/xAMRYK39FLZZCyPwnDXaiT7L5k62/cat/').orderByChild('created_at');
      firebase.database().ref('users/xAMRYK39FLZZCyPwnDXaiT7L5k62/cat').on('value', function (snapshot) {
        commit('SET_USER_CATS', snapshot);
      });
    },
    addUserCat (context, value) {
      console.log(context, value);
      firebase.database().ref('users/xAMRYK39FLZZCyPwnDXaiT7L5k62/cat').push(value);
    }
  },
  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
      state.isLoggedIn = true;
    },
    SET_USER: (state, user) => {
      state.user = user;
      state.isLoggedIn = true;
    },
    SET_NO_USER: (state, user) => {
      state.isLoggedIn = false;
    },
    SET_USER_CATS: (state, snapshot) => {
      let returnArr = [];

      snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
      });

      state.trakkers = returnArr;
    }
  },
  getters: {
    getPageData: state => {
      return state.pagesData;
    },
    getProjects: state => {
      return state.projectData;
    },
    getCats: state => {
      return state.cats;
    },
    getProjectDetailData: state => {
      return state.projectData;
    },
    getUser: (state) => {
      return state.user;
    },
    getLoggedIn: (state) => {
      return state.isLoggedIn;
    }
  }
});

export default store;
