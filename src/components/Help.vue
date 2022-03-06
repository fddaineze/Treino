<template>
  <div class="modal-backdrop">
    <aside class="modal" id="help">
      <div class="content">
        <p>Descubra a palavra secreta em 6 tentativas. Depois de uma tentativa, as letras se revelam.</p>
        <p>Se a letra ficar verde, é porque faz parte da palavra, e está na posição certa.</p>
        <p class="word">
            <span class="word-letter"> T </span>
            <span class="word-letter"> E </span>
            <span class="word-letter"> R </span>
            <span class="word-letter"> N </span>
            <span class="word-letter correct"> O </span>
        </p>
        <p>Se a letra ficar amarela, é porque faz parte, mas em outra posição.</p>
        <p class="word">
            <span class="word-letter"> C </span>
            <span class="word-letter"> A </span>
            <span class="word-letter hot"> S </span>
            <span class="word-letter"> C </span>
            <span class="word-letter"> O </span>
        </p>
        <p>Se a letra não mudar de cor, é porque ela não faz parte da palavra</p>
        <p>Não use acentos ou cedilha, eles serão colocados quando preciso.</p>
      </div>

      <span class="close-stats" @click="$emit('closed');">X</span>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Help',
  computed: {
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
