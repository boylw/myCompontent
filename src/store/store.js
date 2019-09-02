import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Login = {
    state: {
        loginStatus: false
    },
    mutations: {
        loginStatusC(state, status) {
            state.loginStatus = status;
        }
    },
    actions: {
        loginStatusM({commit}, status) {
            commit('loginStatusC',status);
        }
    }
}

const store = new Vuex.Store({
    modules: {
        login: Login
    }
})

export default store
