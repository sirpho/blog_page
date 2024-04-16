import { defineComponent, ref } from "vue";
import './index.less'
import { Icon } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useStoreUser } from "@/stores/modules/user";
import { removeStorage } from "@/utils/storage";

const IconFont = Icon.addFromIconFontCn({ src: 'iconfont.js' })
export default defineComponent({
  components: { IconFont },
  setup() {
    const router = useRouter()
    const userStore: any = useStoreUser()
    const keyword = ref('')
    /**
     * 跳转主页
     */
    const goHome = () => {
      router.push('/')
    }
    /**
     * 跳转登录页
     */
    const goLogin = async () => {
      removeStorage(`user`)
      await router.push('/login')
      window.location.reload()
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
     * 退出登录
     */
    const logout = () => {
      removeStorage(`user`)
      window.location.reload()
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
              {
                userStore.user?.token ? [
                  <li key='write' class="nav-item" onClick={goMarkdown}>
                    <icon-font type="icon-svgwrite" />
                    创作
                  </li>,
                  <li key='folder' class="nav-item" onClick={goFiles}>
                    <icon-font type="icon-folder" />
                    文件柜
                  </li>,
                  <li key='logout' class="nav-item" onClick={logout}>
                    <icon-font type="icon-guanji" />
                    退出
                  </li>
                ] : (
                  <li class="nav-item" onClick={goLogin}>
                    <icon-font type="icon-zhiwendenglu" />
                    登录
                  </li>
                )
              }
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
