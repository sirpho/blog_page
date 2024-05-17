import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '@arco-design/web-vue'

import './index.less'
import { useRouter } from 'vue-router'

const IconFont = Icon.addFromIconFontCn({ src: 'iconfont.js' })
export default defineComponent({
  props: {
    // 标签
    tags: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  components: { IconFont },
  setup(props) {
    const router = useRouter()
    const goTagArticleList = async (tag: any) => {
      await router.push(`/classification/tag/${tag}`)
    }

    return () => {
      return (
        <>
          {props.tags?.length > 0 ? (
            <div class="post-tags">
              <icon-font type="icon-24gf-tags" />
              <a-space>
                {props.tags.map((item: string) => (
                  <a-tag size="large" onClick={() => goTagArticleList(item)}>
                    {item}
                  </a-tag>
                ))}
              </a-space>
            </div>
          ) : null}
        </>
      )
    }
  }
})
