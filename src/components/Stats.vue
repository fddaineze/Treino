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
          <strong>{{((100*(stats.win + stats.loss))/stats.matches).toFixed(1)}}%</strong>
        </p>

        <p>
          <span class="font-sm">Ganhas</span>
          <strong>{{((100*stats.win)/(stats.win + stats.loss)).toFixed(1)}}%</strong> 
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
  },
  watch: {},
  mounted() {},
  created() {}
}
</script>

<style lang="scss">
@import "../assets/base.scss"
</style>
