<template>
  <main id="game">
    <p class="alert" v-if="!complete && !incorrect">Descubra a Palavra!</p>

    <p class="alert sucesso" v-if="complete && vitory">A resposta era {{theWord.join("")}}!</p>
    <p class="alert derrota" v-if="complete && !vitory">A resposta era {{theWord.join("")}}!</p>
    <p class="alert aviso" v-if="incorrect">Palavra não encontrada</p>

    <div class="word-lines">
      <div 
        :class="'word-line' + ((line_i == line) ? ' selected' : '')" 
        v-for="(line_v, line_i) in wordLines" 
        :key="line+letter+line_i"
      >
        <span 
          :class="'word-letter ' + wordTips[line_i][letter_i]
            + ((line_i == line && letter_i == letter ) ? ' selected' : '')" 
          v-for="(letter_v, letter_i) in line_v" 
          :key="line+letter+letter_i"
          @click="setLetter(line_i, letter_i)"
        >
          {{(letter_v == '') ? ' ' : letter_v}}
        </span>
      </div>
    </div>

    <keyboard @key="keyPressed($event)" :complete="complete"></keyboard>
  </main>
</template>

<script>
import { lowlist, autocomplete, list, keylist } from "@/js/db.js";
import Keyboard from "@/components/game/Keyboard.vue";
import store from '@/store'

export default {
  name: 'Game',
  components: {Keyboard},
  computed: {
    stats() { 
      return this.$store.state.stats 
    },
  },
  data() {
    return {
      // listas prontas
      autocomplete,
      list,
      lowlist,
      keylist,

      // desafio
      theWord: ['','','','',''],

      // tentativas
      wordLines: [
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','','']
      ],
      wordTips: [
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','','']
      ],

      // tentativa atual
      line: 0,
      letter: 0,

      // status
      complete: false,
      vitory: false,
      incorrect: false,
    };
  },
  methods: {
    keyPressed(key) {
      if(this.complete) {
        if(key.code == 'Enter' || key.code == 'NumpadEnter' || key.code == 'KeyENTER') {
          this.$emit('reload');
          return;
        }
        return;
      }

      this.incorrect = false;
      if(/^Key([A-Z])$/.test(key.code)) {
        if (this.letter < 5) {
          this.wordLines[this.line][this.letter] = key.key.toUpperCase();
          this.letter += 1;
        }
      }
      if(key.code == 'Backspace' || key.code == 'Key<') {
        if (this.letter >= 0) {
          if (this.wordLines[this.line][this.letter] == '' || this.wordLines[this.line][this.letter] == undefined) {
            this.wordLines[this.line][this.letter-1] = '';
            this.letter = (this.letter > 0) ? this.letter-1 : 0;
          } else {
            this.wordLines[this.line][this.letter] = '';
            this.letter += 1; this.letter -= 1;
          }
        }
      }
      if(key.code == 'Enter' || key.code == 'NumpadEnter' || key.code == 'KeyENTER') this.confirmWord();
    },
    setLetter(line, letter) {
      if(line == this.line) this.letter = letter;
    },
    setKeyColor(key, color) {
      document.getElementById(key).classList.add(color);
    },
    isWord(myWord) {
      if(!this.list.includes(myWord)) {
        if(!this.lowlist.has(myWord)) {
          if(this.autocomplete[myWord]) {
            return this.autocomplete[myWord];
          } else {
            this.incorrect = true;
            return null;
          }
        }
      }
      return myWord;
    },
    isComplete() {
      if(this.line > 5 ) this.complete = true;
      if(this.wordTips[this.line-1].every( e => e=='correct')) {
        this.vitory = true;
        this.complete = true;

        let stats = this.stats;
        stats.win += 1;
        stats.atualWinSeq += 1;
        if(stats.atualWinSeq > stats.bestWinSeq) stats.bestWinSeq = stats.atualWinSeq;
        store.commit("setStats", stats);
      } else {
        if(this.line > 5 ) {
          let stats = this.stats;
          stats.loss += 1;
          stats.atualWinSeq = 0;
          store.commit("setStats", stats);
        }
      }
    },
    getIndexes(arr, val) {
        let indexes = [], i= -1;
        while ((i = arr.indexOf(val, i+1)) != -1) {
          indexes.push(i);
        }
        return indexes;
    },
    confirmWord() {
      let myWord = this.wordLines[this.line].join("").toLowerCase();
      myWord = this.isWord(myWord);
      if (!myWord) return;

      // Normalize
      let clear = this.theWord.join("").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      clear = [...clear.toUpperCase()];

      // Set Tips
      this.wordLines[this.line].forEach((e, i) => {
        if(e == clear[i]) {
          this.wordTips[this.line][i] = 'correct';
          this.setKeyColor(e, 'correct-key');
          return;
        }
        if(clear.includes(e)) {
          this.wordTips[this.line][i] = 'hot';
          this.setKeyColor(e, 'hot-key');
          return;
        }
        this.wordTips[this.line][i] = 'not';
        this.setKeyColor(e, 'not-key');
        return;
      });

      // Colors
      let line = this.wordLines[this.line];
      let tips = this.wordTips[this.line];
      if (tips.includes('hot')) {
        let hotList = this.getIndexes(tips, 'hot');

        hotList.forEach(i => {

          let warning = false;
          let letter = line[i];
          let letterList = this.getIndexes(line, letter);

          if (letterList.length > 1) {
            warning = false;

            for (const [i, v] of clear.entries()) {
              if(v == letter) {
                if(tips[i] == 'not') {
                  warning = false;
                  break;
                } else {
                  warning = true;
                }
              }
            };

            if(warning) for (const [i, v] of line.entries()) {
              if (v == letter && tips[i] == 'hot') {
                this.wordTips[this.line][i] = 'not';
                tips = this.wordTips[this.line];
                warning = false;
                break;
              }
            };
          }
        });

        // clear : palavra atual
        // line : palavra tentada
        // tips : lista de dicas
      }

      this.wordLines[this.line] = [...myWord.toUpperCase()];

      this.letter = 0;
      this.line += 1;
      this.isComplete();
    },
  },
  watch: {},
  mounted() {
    this.theWord = [...this.list[Math.floor(Math.random()*list.length)].toUpperCase()];
    
    let stats = this.stats;
    stats.matches += 1;
    store.commit("setStats", stats);
  },
  created() {}
}
</script>

<style lang="scss">
@import "../assets/base.scss"
</style>
