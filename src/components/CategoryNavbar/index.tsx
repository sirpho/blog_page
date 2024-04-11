import { defineComponent } from 'vue'
import './index.less'
import { useDict } from '@/utils/hooks/useDict'
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter()
    const [categoriesList] = useDict(['STATISTICS'])
    /**
     * 相关文章列表
     */
    const goCategoryArticleList = async (tag: any) => {
      await router.push(`/classification/category/${tag.name}`)
    }

    return () => {
      return (
        <a-card title="分类导航" hoverable class="category-navbar">
          <div class="content">
            {categoriesList.value?.map((item: any) => (
              <div class="category-item" key={item.id} onClick={() => goCategoryArticleList(item)}>
                <span class="title">{item.name}</span>
                <span class="quantity">{item.count}</span>
              </div>
            ))}
            {
              categoriesList.value?.length <= 0 ? <a-empty /> : null
            }
          </div>
        </a-card>
      )
    }
  }
})
