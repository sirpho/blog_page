import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { browseArticle } from '@/services/article'
import ArticleHeader from '@/components/ArticleHeader'
import ArticleTags from '@/components/ArticleTags'
import { useStoreUser } from '@/stores/modules/user'
import './index.less'

export default defineComponent({
  components: { ArticleHeader, ArticleTags },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const useUser: any = useStoreUser()
    const state = reactive({
      article: {
        createTime: '',
        lastUpdateTime: '',
        deleted: '',
        published: '',
        id: '',
        title: '',
        summary: '',
        content: '',
        wordCount: 0,
        author: '',
        creationType: '',
        source: '',
        tags: [],
        category: ""
      } as articleType,
      loading: true
    })

    onMounted(async () => {
      const { id } = route.params
      state.loading = true
      const res = await browseArticle(id as string).finally(() => {
        state.loading = false
      })
      if (res.code === 200) {
        state.article = res.data as articleType
      }
    })

    /**
     * 编辑该文章
     */
    const goMarkdown = (params: any) => {
      router.push(`/markdown/${params.id}`)
    }

    return () => {
      return (
        <a-card hoverable class="browse-page">
          {
            state.loading ? (
              <a-skeleton animation>
                <a-skeleton-line rows={5} />
              </a-skeleton>
            ) : (
              <>
                <ArticleHeader {...{...state.article, content: undefined}} showEdit onHandleEdit={goMarkdown} />
                <v-md-editor v-model={state.article.content} mode="preview" />
                <ArticleTags tags={state.article.tags} />
              </>
            )
          }
        </a-card>
      )
    }
  }
})
