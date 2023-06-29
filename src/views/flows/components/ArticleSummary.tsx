import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import ArticleHeader from '@/components/ArticleHeader/index'
import ArticleTags from '@/components/ArticleTags/index'
import { useRouter } from 'vue-router'

import './index.less'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    // 标题
    title: {
      type: String
    },
    // 创建时间
    createTime: {
      type: String
    },
    // 更新时间
    lastUpdateTime: {
      type: String
    },
    // 摘要
    summary: {
      type: String
    },
    // 字数
    wordCount: {
      type: Number
    },
    // 作者
    author: {
      type: String
    },
    // 标签
    tags: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    // 分类
    categories: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  components: { ArticleHeader, ArticleTags },
  setup(props) {
    const router = useRouter()
    const handleClickArticle = (id: string) => {
      router.push(`/article/${id}`)
    }

    return () => {
      return (
        <a-card hoverable class="article-summary">
          <article>
            <ArticleHeader {...props} onHandleClickArticle={(id) => handleClickArticle(id)} />
            <div class="post-content">
              {props.summary}...
            </div>
            <ArticleTags tags={props.tags}/>
          </article>
        </a-card>
      )
    }
  }
})
