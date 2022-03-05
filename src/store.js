import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  theme: 0,
  stats: {
    theme: 0,
    win: 0,
    loss: 0,
    matches: 0,
    bestWinSeq: 0,
    atualWinSeq: 0,
  }
}

const mutations = {
  setTheme(state, payload) {
    state.theme = payload;
    state.stats.theme = payload;
    localStorage.treinoStats = JSON.stringify(state.stats);
  },
  setStats(state, payload) {
    state.stats = payload;
    localStorage.treinoStats = JSON.stringify(payload);
  }
}

export default new Vuex.Store({ 
    state, 
    mutations 
})
