<template>
  <div>
    <select v-model="index">
      <option :value="index" v-for="(chapter, index) in chapters" :label="chapter" :key="chapter"></option>
    </select>
    <div v-html="content" style="text-align:left;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchGBK, fetchGBK2, parseNovel } from '../utils/index'

export default defineComponent({
  setup() {
  },
  props: ['url'],
  data () {
    return {
      chapters: [],
      contents: [],
      index: 0
    } as {
      chapters: string[],
      contents: string[],
      index: number
    }
  },
  computed: {
    content (): string {
      return (this.contents[this.index] || '').replace(/\n/g, '<br>')
    }
  },
  async mounted () {
    const data = await fetchGBK(this.url)
    // console.log(data)
    const { contents, chapters } = parseNovel(data)
    console.log(chapters.length, contents.length)
    console.log(chapters, contents)
    this.chapters = chapters
    this.contents = contents
    // const data2 = await fetchGBK2(this.url)
    // console.log(data2)
  }
})
</script>
