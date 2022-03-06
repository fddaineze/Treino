<template>
    <div id="keyboard" :class="'keyboard' + ((complete) ? ' finished' : '')">
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
</template>

<script>
import { keylist } from "@/js/db.js";

export default {
    name: 'Keyboard',
    computed: {},
    props: {
        complete: Boolean,
    },
    data() {
        return {
            keylist,
        }
    },
    methods: {
        keyPressed(key) {
            key = {
                code: key.code, 
                key: key.key
            }
            this.$emit('key',key);
        }
    },
    mounted() {
        window.addEventListener("keydown", e => {
            this.keyPressed(e);
        });
    },
    }
</script>