<template>
  <div id="app">
    <nav>
      <ul>
        <li><a @click="setTheme(1)">🌞<span>Tema Claro</span></a></li>
        <li><a @click="setTheme(0)">🌙<span>Tema Escuro</span></a></li>
        <li><a @click="setTheme(2)">📔<span>Tema Sépia</span></a></li>
        <li><a @click="setTheme(3)">👓<span>Alto Contraste</span></a></li>
        <li><a @click="viewStats = true">💹<span>Estatísticas</span></a></li>
        <li><a @click="viewHelp = true">❔<span>Ajuda</span></a></li>
      </ul>
    </nav>
    <game v-if="viewGame" v-on:reload="reloadGame()"></game>
    <stats v-show="viewStats" v-on:closed="closeModal()"></stats>
    <help v-show="viewHelp" v-on:closed="closeModal()"></help>
  </div>
</template>

<script>
import { setTheme, setFontSize, loadStats } from "@/js/base.js";
import Game from "@/components/Game.vue";
import Stats from "@/components/Stats.vue";
import Help from "@/components/Help.vue";

export default {
  name: 'App',
  components: {Game, Stats, Help},
  computed: {
    theme() { 
      return this.$store.state.theme 
    },
  },
  data() {
    return {
      viewStats: false,
      viewHelp: true,
      viewGame: true
    };
  },
  methods: {
    setTheme,
    setFontSize,
    loadStats,
    reloadGame() {
      this.viewGame = false;
      this.$nextTick(() => { this.viewGame = true });
    },
    closeModal() {
      this.viewStats = false;
      this.viewHelp = false;
    }
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
