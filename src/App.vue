<template>
  <div id="app">
    <nav>
      <ul>
        <li><a @click="setTheme(1)">🌞<span>Tema Claro</span></a></li>
        <li><a @click="setTheme(0)">🌙<span>Tema Escuro</span></a></li>
        <li><a @click="setTheme(2)">📔<span>Tema Sépia</span></a></li>
        <li><a @click="setTheme(3)">👓<span>Alto Contraste</span></a></li>
        <li><a @click="viewStats = true">💹<span>Estatísticas</span></a></li>
      </ul>
    </nav>
    <game></game>
    <stats v-show="viewStats"></stats>
    <span v-show="viewStats" class="close-stats" @click="viewStats = false">X</span>
  </div>
</template>

<script>
import { setTheme, setFontSize, loadStats } from "@/js/base.js";
import Game from "@/components/Game.vue";
import Stats from "@/components/Stats.vue";

export default {
  name: 'App',
  components: {Game, Stats},
  computed: {
    theme() { 
      return this.$store.state.theme 
    },
  },
  data() {
    return {
      viewStats: false
    };
  },
  methods: {
    setTheme,
    setFontSize,
    loadStats
  },
  watch: {
    theme: function () {
      this.setTheme(this.theme);
    },
  },
  mounted() {
    this.setTheme(this.theme);
    this.setFontSize('1.48');
  },
  created() {
    this.loadStats();
  }
}
</script>

<style lang="scss">
@import "assets/base.scss"
</style>
