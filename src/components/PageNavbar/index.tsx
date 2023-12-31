import { defineComponent, ref } from "vue";
import './index.less'
import { Icon } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const IconFont = Icon.addFromIconFontCn({ src: 'iconfont.js' })
export default defineComponent({
  components: { IconFont },
  setup() {
    const router = useRouter()
    const keyword = ref('')
    /**
     * 跳转主页
     */
    const goHome = () => {
      router.push('/')
    }
    /**
     * 跳转创作页
     */
    const goMarkdown = () => {
      router.push('/markdown')
    }
    /**
     * 跳转文件柜
     */
    const goFiles = () => {
      router.push('/files/list')
    }
    /**
     * 相关文章列表
     */
    const goArticleList = async (e: KeyboardEvent) => {
      if(e.code === 'Enter') {
        const word = keyword.value.trim()
        if(word) {
          await router.push(`/classification/keyword/${word}`)
        } else {
          router.push(`/`)
        }
      }
    }
    return () => {
      return (
        <div class="page-navbar">
          <div class="content">
            <ul>
              <li class="logo" onClick={goHome}></li>
              <li class="nav-item" onClick={goHome}>
                <icon-font type="icon-home" />
                主页
              </li>
              <li class="nav-item" onClick={goMarkdown}>
                <icon-font type="icon-svgwrite" />
                创作
              </li>
              <li class="nav-item" onClick={goFiles}>
                <icon-font type="icon-folder" />
                文件柜
              </li>
            </ul>

            <div class="search">
              <a-input-search v-model={keyword.value} onKeyup={(e:KeyboardEvent) => goArticleList(e)} />
            </div>
          </div>
        </div>
      )
    }
  }
})
