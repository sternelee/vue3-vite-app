<template>
  <div class="fixed top-0 left-0 flex flex-col bg-amber-100 w-screen h-screen text-left overflow-x-hidden">
    <div class="leading-8 flex-1 overflow-y-auto p-10px" ref="html">
      <div v-html="content"></div>
    </div>
    <p class="bottom-0 left-0 w-screen bg-amber-100 h-40px flex items-center justify-around border-t-1">
      <i class="iconfont icon-caidan" @click="showChapters = true"></i>
      <i class="iconfont icon-brightj2"></i>
      <i class="iconfont icon-A"></i>
    </p>
    <div class="fixed bottom-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-auto bg-black bg-opacity-40" :class="showChapterClass">
      <ul class="p-10px pt-20px mt-50px bg-white rounded-t-20px">
        <li v-for="(chapter, index) in chapters" class="leading-10 border-b-1" :class="{'text-yellow-800': current === index}" @click="getContent(index)" :key="chapter">{{ chapter }}</li>
      </ul>
    </div>
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
      current: 0,
      novel: null,
      showChapters: false
    } as {
      chapters: string[],
      contents: string[],
      current: number
      novel: any
      showChapters: boolean
    }
  },
  computed: {
    content (): string {
      if (!this.novel) return ''
      const content = this.novel.get(Number(this.current))
      // console.log(this.index, content)
      return content.replace(/\n/g, '<br>')
    },
    showChapterClass (): string {
      return this.showChapters ? 'block' : 'hidden'
    }
  },
  methods: {
    getContent (index: number) {
      this.current = index
      this.showChapters = false
      const dom = this.$refs.html as HTMLElement
      if (dom) {
        dom.scrollTop = 0
      }
      console.log(dom)
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
