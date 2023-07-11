import { computed, defineComponent, onMounted, reactive } from "vue";
import './index.less'
import avatar from '@/assets/avatar.jpg'
import { Icon } from '@arco-design/web-vue'
import { useStoreDict } from "@/stores/modules/dict";
import { getSiteInfo } from "@/services/site";

const IconFont = Icon.addFromIconFontCn({ src: 'iconfont.js' })

export default defineComponent({
  components: { IconFont },
  setup() {
    const storeDict: any = useStoreDict()
    const tagsCount = computed(() => storeDict.data['TAGS']?.length || 0)
    const categoriesCount = computed(() => storeDict.data['CATEGORIES']?.length || 0)
    const state = reactive({
      articlesCount: 0,
      motto: '',
      github: '',
      avatar: '',
      email: ''
    })

    onMounted(async () => {
      const res = await getSiteInfo()
      if(res.code === 200 && res.data) {
        state.motto = res.data.motto
        state.github = res.data.github
        state.avatar = res.data.avatar
        state.email = res.data.email
        state.articlesCount = res.data.articlesCount
      }
    })

    /**
     * 头像加载失败
     */
    const avatarError = () => {
      state.avatar = avatar
    }

    return () => {
      return (
        <a-card class="page-info">
          <div class="avatar-wrapper">
            <a-avatar size={100}>
              <img src={state.avatar} alt="" onError={avatarError} />
            </a-avatar>
          </div>
          <div class="site-describe">{state.motto}</div>
          <a-divider />
          <div class="site-state">
            <div class="site-state-item">
              <span class="site-state-item-count">{state.articlesCount}</span>
              <span class="site-state-item-name">文章</span>
            </div>

            <a-divider direction="vertical" />
            <div class="site-state-item">
              <span class="site-state-item-count">{categoriesCount.value}</span>
              <span class="site-state-item-name">分类</span>
            </div>

            <a-divider direction="vertical" />
            <div class="site-state-item">
              <span class="site-state-item-count">{tagsCount.value}</span>
              <span class="site-state-item-name">标签</span>
            </div>
          </div>
          <div class="contact">
            <a class="contact-item" href={state.github} target="_blank">
              <icon-font type="icon-github-fill" />
              <span>github</span>
            </a>
            <a class="contact-item" href={`mailto:${state.email}`}>
              <icon-font type="icon-email-fill" />
              <span>E-mail</span>
            </a>
          </div>
        </a-card>
      )
    }
  }
})
