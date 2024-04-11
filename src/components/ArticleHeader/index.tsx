import type { PropType } from 'vue'
import { Icon } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import './index.less'
import dayjs from 'dayjs'
import { useStoreUser } from "@/stores/modules/user";

const IconFont = Icon.addFromIconFontCn({ src: 'iconfont.js' })

export default defineComponent({
  props: {
    id: {
      type: String
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
    // 展示编辑
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['handleClickArticle', 'handleClickAuthor', 'handleEdit'],
  components: { IconFont },
  setup(props, { emit }) {

    const useUser:any = useStoreUser()

    /**
     * 点击文章标题
     */
    const handleClickArticle = () => {
      emit('handleClickArticle', props.id)
    }
    /**
     * 点击作者
     */
    const handleClickAuthor = () => {
      emit('handleClickAuthor', {
        author: props.author,
        id: props.id
      })
    }
    /**
     * 点击编辑
     */
    const onHandleEdit = () => {
      emit('handleEdit', {
        id: props.id
      })
    }
    return () => {
      return (
        <header class="post-header">
          <a class="post-title" onClick={handleClickArticle}>
            {props.title || '--'}
          </a>
          <div class="post-meta">
            <div class="post-meta-item">
              <icon-font type="icon-shijian" />
              <time>{props.createTime ? dayjs(props.createTime).format('YYYY-MM-DD HH:mm') : '--'}</time>
            </div>
            <a-divider direction="vertical" />
            <div class="post-meta-item" style={{cursor: 'pointer'}}  onClick={handleClickAuthor}>
              <icon-font type="icon-xiezuo" />
              <span>{props.author || '--'}</span>
            </div>
            <a-divider direction="vertical" />
            <div class="post-meta-item">
              <icon-font type="icon-a-10shuomingwenzi" />
              <span>{props.wordCount}字</span>
            </div>
            {
              (useUser.token && props.showEdit) && [
                <a-divider direction="vertical" />,
                <div onClick={onHandleEdit} class="post-meta-item admin-edit">
                <icon-font type="icon-edit-role" />
                  <span>编辑</span>
              </div>]
            }
          </div>
        </header>
      )
    }
  }
})
