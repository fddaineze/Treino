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

    <div :class="'keyboard' + ((complete) ? ' finished' : '')">
      <div class="keyboard-row">
        <div class="key" v-for="(key, i) in keylist.slice(0,10)" :key="i" @click="keyPressed({code: 'Key'+key,key: key})" :id="key">{{key}}</div>
      </div>

      <div class="keyboard-row">
        <div class="key" v-for="(key, i) in keylist.slice(10,20)" :key="i" @click="keyPressed({code: 'Key'+key,key: key})" :id="key">{{key}}</div>
      </div>

      <div class="keyboard-row">
        <div class="key" v-for="(key, i) in keylist.slice(20,28)" :key="i" @click="keyPressed({code: 'Key'+key,key: key})" :id="key">{{key}}</div>
      </div>
    </div>

    <p class="obs">Este jogo é um jogo de estudo baseado em term.ooo e wordle. Ele irá gerar uma nova palavra toda vez que atualizar a página. Aproveite!</p>
  </main>
</template>

<script>
import { lowlist, autocomplete, list, keylist } from "@/js/db.js";
import store from '@/store'

export default {
  name: 'Game',
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
    confirmWord() {
      let myWord = this.wordLines[this.line].join("").toLowerCase();

      // Check Word
      if(!this.list.includes(myWord)) {
        if(!this.lowlist.has(myWord)) {
          if(this.autocomplete[myWord]) {
            myWord = this.autocomplete[myWord];
          } else {
            this.incorrect = true;
            return;
          }
        }
      }

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

      this.wordLines[this.line] = [...myWord.toUpperCase()];

      this.letter = 0;
      this.line += 1;

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

    setKeyColor(key, color) {
      document.getElementById(key).classList.add(color);
    }
  },
  watch: {},
  mounted() {
    this.theWord = [...this.list[Math.floor(Math.random()*list.length)].toUpperCase()];
    
    let stats = this.stats;
    stats.matches += 1;
    store.commit("setStats", stats);
    
    window.addEventListener("keydown", e => {
      this.keyPressed(e);
    });
  },
  created() {}
}
</script>

<style lang="scss">
@import "../assets/base.scss"
</style>
