<template>
  <main id="stats">
    <p class="font-lg">Partidas Iniciadas: <strong>{{stats.matches}}</strong></p>
    <p class="font-lg">Partidas Concluídas: <strong>{{stats.win + stats.loss}}</strong></p>
    <p class="font-lg">Palavras Descobertas: <strong>{{stats.win}}</strong></p>
    <p class="font-lg">Palavras Perdidas: <strong>{{stats.loss}}</strong></p>
    <p class="font-lg">Melhor Seq. de Acertos: <strong>{{stats.bestWinSeq}}</strong></p>
    <p class="font-lg">Sequência Atual: <strong>{{stats.atualWinSeq}}</strong></p>
  </main>
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
