<template>
  <div class="modal-backdrop">
    <aside class="modal" id="stats">
      <div class="content">
        <p>
          <span class="font-sm">Partidas<br>Iniciadas</span>
          <strong>{{stats.matches}}</strong>
        </p>
        <p>
          <span class="font-sm">Concluídas</span>
          <strong>{{ (finishPercent() == 0) ? 0 : finishPercent() }}%</strong>
        </p>

        <p>
          <span class="font-sm">Ganhas</span>
          <strong>{{ winPercent() }}%</strong> 
        </p>

        <p>
          <span class="font-sm">Sequência<br>de Vitórias</span>
          <strong>{{stats.atualWinSeq}}</strong>
        </p>
        <p>
          <span class="font-sm">Melhor<br>Sequência</span>
          <strong>{{stats.bestWinSeq}}</strong>
          
        </p>
      </div>

      <span class="close-stats" @click="$emit('closed');">X</span>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  computed: {
    stats() { 
      return this.$store.state.stats 
    },
  },
  data() {
    return {};
  },
  methods: {
    finishPercent() {
      return (this.stats.matches != 0)
        ? ((100 * (this.stats.win + this. stats.loss)) / this.stats.matches).toFixed(1)
        : 0;
    },
    winPercent() {
      return ((this.stats.win + this.stats.loss) != 0) 
        ? ((100 * this.stats.win) / (this.stats.win + this.stats.loss)).toFixed(1)
        : 0;
    }
  },
  watch: {},
  mounted() {},
  created() {}
}
</script>

<style lang="scss">
@import "../assets/base.scss"
</style>
