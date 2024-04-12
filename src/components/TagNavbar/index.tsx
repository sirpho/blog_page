import { defineComponent } from 'vue'
import './index.less'
import {useDict} from "@/utils/hooks/useDict";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter()
    const [tagList] = useDict(["TAG_STATISTICS"])

    /**
     * 标签相关文章列表
     */
    const goTagArticleList = async (tag: any) => {
      await router.push(`/classification/tag/${tag.name}`)
    }

    // 将一个值从一个范围映射到另一个范围
    const mapRange = (
      value: number,
      inMin: number,
      inMax: number,
      outMin: number,
      outMax: number
    ) => {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    }

    const colors = [
      'red',
      'orangered',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'arcoblue',
      'purple',
      'pinkpurple',
      'magenta',
      'gray'
    ];

    return () => {
      return (
        <a-card title="标签云" hoverable class="tag-navbar">
          <div class="content">
            {tagList.value?.map((item: any, index: number) => (
              <a-tag
                class="tag-item"
                color={colors[Math.floor(Math.random() * colors.length)]}
                style={{ fontSize: `${Math.round(mapRange(item.count, 1, 5, 18, 28))}px` }}
                key={item.id}
                onClick={() => goTagArticleList(item)}
              >
                {item.name}
              </a-tag>
            ))}
            {
              tagList.value?.length <= 0 ? <a-empty /> : null
            }
          </div>
        </a-card>
      )
    }
  }
})
