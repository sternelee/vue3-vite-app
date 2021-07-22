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
import { fetchGBK, fetchGBK2, parseNovel, Novel } from '../utils/index'

export default defineComponent({
  setup() {
  },
  props: ['url'],
  data () {
    return {
      chapters: [],
      contents: [],
      index: 0,
      novel: null
    } as {
      chapters: string[],
      contents: string[],
      index: number
      novel: any
    }
  },
  computed: {
    content (): string {
      if (!this.novel) return ''
      const content = this.novel.get(Number(this.index))
      // console.log(this.index, content)
      return content.replace(/\n/g, '<br>')
    }
  },
  async mounted () {
    const data = await fetchGBK(this.url)
    // console.log(data)
    this.novel = new Novel(data)
    this.chapters = this.novel.chapters
  }
})
</script>
