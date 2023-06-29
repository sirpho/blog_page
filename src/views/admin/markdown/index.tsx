import { defineComponent, reactive, watch } from 'vue'
import { browseArticle, removeArticle, updateArticle } from '@/services/article'
import { useRoute, useRouter } from 'vue-router'
import { useDict } from '@/utils/hooks/useDict'
import './index.less'
import { Message } from '@arco-design/web-vue'
import { uploadFile } from '@/services/file'
import { delayAsync } from '@sirpho/utils/delayAsync'
import { useStoreUser } from '@/stores/modules/user'
import { resetDict } from '@/utils/hooks/resetDict'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const storeUser: any = useStoreUser()
    const [tagList, categoriesList] = useDict(['TAGS', 'CATEGORIES'])
    const resetRelatedDict = resetDict(['TAGS', 'CATEGORIES'])
    const state = reactive({
      article: {
        createTime: '',
        lastUpdateTime: '',
        deleted: 'N',
        published: 'Y',
        id: '',
        title: '',
        summary: '',
        content: '',
        wordCount: 0,
        author: storeUser.user?.name,
        creationType: '原创',
        source: '',
        tags: [],
        categories: []
      } as articleType,
      submitLoading: false,
      removeLoading: false
    })

    watch(
      () => route?.params,
      async (current) => {
        const { id } = current
        if (id) {
          const res = await browseArticle(id as string)
          if (res.code === 200 && res.data) {
            state.article = res.data as articleType
          }
        } else {
          state.article = {
            createTime: '',
            lastUpdateTime: '',
            deleted: 'N',
            published: 'Y',
            id: '',
            title: '',
            summary: '',
            content: '',
            wordCount: 0,
            author: storeUser.user?.name,
            creationType: '原创',
            source: '',
            tags: [],
            categories: []
          }
        }
      },
      {
        immediate: true
      }
    )

    /**
     * 发布
     */
    const submit = async () => {
      if (!state.article.title) {
        Message.warning('请填写文章标题')
        return
      }
      if (!state.article.content) {
        Message.warning('请填写文章内容')
        return
      }
      if (!state.article.author) {
        Message.warning('请填写文章作者')
        return
      }
      if (!state.article.categories || state.article.categories.length <= 0) {
        Message.warning('请填写文章分类')
        return
      }
      state.submitLoading = true
      const res = await updateArticle(state.article).finally(() => {
        state.submitLoading = false
      })
      if (res.code === 200) {
        Message.success('发布成功')
        resetRelatedDict()
        await delayAsync(1)
        router.push('/')
      }
    }

    /**
     * 删除文章
     */
    const handleRemove = async () => {
      state.removeLoading = true
      const res = await removeArticle(state.article).finally(() => {
        state.removeLoading = false
      })
      if (res.code === 200) {
        Message.success('删除成功')
        resetRelatedDict()
        await delayAsync(1)
        router.push('/')
      }
    }

    /**
     * 配置图片上传
     * @param event
     * @param insertImage
     * @param files
     */
    const handleUploadImage = async (event: any, insertImage: any, files: any) => {
      const formData = new FormData()
      formData.append('file', files[0])
      const res = await uploadFile(formData)
      if (res.code === 200) {
        // 此处只做示例
        insertImage({
          url: res.data.url,
          desc: res.data.name,
          width: 'auto',
          height: 'auto'
        })
      }
    }

    return () => {
      return (
        <div class="markdown-page">
          <div class="markdown-wrapper">
            <div class="article-title">
              <a-input
                v-model={state.article.title}
                max-length={50}
                size="large"
                placeholder="文章标题 （50个字以内）"
              />
            </div>
            <v-md-editor
              disabled-menus={[]}
              v-model={state.article.content}
              onUploadImage={handleUploadImage}
            />
          </div>
          <div class="subsidiary-wrapper">
            <a-form model={state.article}>
              <a-form-item field="author" label="作者">
                <a-input v-model={state.article.author} max-length={20} placeholder="作者" />
              </a-form-item>
              <a-form-item field="creationType" label="创作类型">
                <a-radio-group v-model={state.article.creationType}>
                  <a-radio value="原创">原创</a-radio>
                  <a-radio value="转载">转载</a-radio>
                  {/*<a-radio value="二创">二创</a-radio>*/}
                </a-radio-group>
              </a-form-item>
              {state.article?.creationType !== '原创' && (
                <a-form-item field="source" label="原文链接">
                  <a-input v-model={state.article.source} placeholder="原文链接" />
                </a-form-item>
              )}
              <a-form-item field="categories" label="分类">
                <a-select
                  v-model={state.article.categories}
                  placeholder="分类"
                  multiple
                  allow-create
                >
                  {categoriesList.value?.map((item: any) => (
                    <a-option value={item.name} key={item.value} label={item.name} />
                  ))}
                </a-select>
              </a-form-item>
              <a-form-item field="tags" label="标签">
                <a-select v-model={state.article.tags} placeholder="标签" multiple allow-create>
                  {tagList.value?.map((item: any) => (
                    <a-option value={item.name} key={item.value} label={item.name} />
                  ))}
                </a-select>
              </a-form-item>
            </a-form>

            <div class="button-wrapper">
              {state.article?.id && (
                <a-popconfirm
                  content="是否删除该文章?"
                  type="info"
                  okText="删除"
                  cancelText="保留"
                  content-class="file-popconfirm"
                  onOk={handleRemove}
                >
                  <a-button
                    loading={state.removeLoading}
                    size="large"
                    type="dashed"
                    status="danger"
                    long
                  >
                    删<span class="blank"></span>除
                  </a-button>
                </a-popconfirm>
              )}
              <a-button
                loading={state.submitLoading}
                size="large"
                type="primary"
                long
                onClick={submit}
              >
                发<span class="blank"></span>布
              </a-button>
            </div>
          </div>
        </div>
      )
    }
  }
})
