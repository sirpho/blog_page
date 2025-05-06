import { defineComponent, nextTick, onMounted, reactive } from 'vue'
import { queryList, deleteFile } from '@/services/file'
import dayjs from 'dayjs'
import type { TableColumnData, TableData } from '@arco-design/web-vue'
import './index.less'
import { Message } from '@arco-design/web-vue'
import { download } from '@/services/common'
import { useThrottleFn } from '@vueuse/core'
import { useStoreUser } from '@/stores/modules/user'
import { getStorage } from "@/utils/storage";
type TableRenderType = { record: TableData; column: TableColumnData; rowIndex: number }
export default defineComponent({
  setup() {

    const userStore = useStoreUser()
    const state = reactive({
      pageSize: 10,
      pageNum: 1,
      total: 1,
      sortParams: {} as any,
      list: [] as any[],
      loading: true,
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 120,
          align: 'center',
          render: ({ rowIndex }: TableRenderType): number => {
            return (state.pageNum - 1) * state.pageSize + rowIndex + 1
          }
        },
        {
          title: '文件名',
          dataIndex: 'name',
          align: 'center',
          width: 160,
          minWidth: 160,
          render: ({ record }: TableRenderType) => {
            if (isImage(record)) {
              return (
                <a-link onClick={() => handlePreview(record)} hoverable={false}>
                  {record.name}
                </a-link>
              )
            } else {
              return record.name
            }
          }
        },
        {
          title: '后缀名',
          dataIndex: 'suffix',
          width: 120,
          align: 'center',
          sortable: {
            sortDirections: ['ascend', 'descend'],
            sorter: true
          }
        },
        {
          title: '文件大小',
          dataIndex: 'size',
          width: 120,
          align: 'center',
          sortable: {
            sortDirections: ['ascend', 'descend'],
            sorter: true
          },
          render: ({ record }: TableRenderType) => {
            return <span>{formatSize(record.size)}</span>
          }
        },
        {
          title: '上传时间',
          dataIndex: 'createTime',
          align: 'center',
          width: 220,
          sortable: {
            sortDirections: ['ascend', 'descend'],
            sorter: true
          },
          render: ({ record }: TableRenderType) => {
            return <time>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</time>
          }
        },
        {
          title: '操作',
          dataIndex: 'option',
          align: 'center',
          width: 250 + (userStore.user?.token ? 50 : 0),
          render: ({ record }: TableRenderType) => {
            return (
              <a-space>
                <a-button onClick={() => handleDownload(record)}>下载</a-button>
                {!!navigator?.clipboard?.writeText && (
                  <a-button onClick={() => handleCopy(record)}>复制下载链接</a-button>
                )}
                {!!userStore.user?.token && (
                  <a-popconfirm
                    disabled={state.loadingMap[record.id]}
                    content="是否删除源文件?"
                    type="info"
                    okText="删除"
                    cancelText="保留"
                    content-class="file-popconfirm"
                    position="rb"
                    onOk={() => handleRemove(record.id, 'Y')}
                    onCancel={() => handleRemove(record.id, 'N')}
                  >
                    <a-button loading={state.loadingMap[record.id]} type="dashed" status="danger">
                      删除
                    </a-button>
                  </a-popconfirm>
                )}
              </a-space>
            )
          }
        }
      ],
      loadingMap: {} as { [key: string]: boolean },
      previewSRC: '',
      previewVisible: false,
      // 上传请求附加的头信息
      headers: {
        token: userStore.user?.token
      } as any,
      // 上传请求附加的数据
      data: {
        keepName: 'N',
        obs: 'N'
      } as any,
      uploadAction: `${import.meta.env.VITE_BASE_URL}file/upload`
    })

    onMounted(async () => {
      state.pageNum = 1
      await handleQuery()
    })

    /**
     * 判断是否是图片文件
     * @param record
     */
    const isImage = (record: any) => {
      return [
        'webp',
        'awebp',
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'tiff',
        'tif',
        'ico',
        'svg',
        'ps',
        'psd'
      ].includes(record.suffix)
    }

    /**
     * 预览
     */
    const handlePreview = (record: any) => {
      state.previewSRC = record.url
      nextTick(() => {
        state.previewVisible = true
      })
    }

    /**
     * 下载
     */
    const handleDownload = async (record: any) => {
      await download({
        url: record.url,
        name: record.name,
        direct: true
      })
    }

    /**
     * 复制下载链接
     */
    const handleCopy = (record: any) => {
      navigator.clipboard.writeText(record.url)
      Message.success("复制成功")
    }

    /**
     * 删除文件
     */
    const handleRemove = async (id: string, deleteSource: string) => {
      state.loadingMap[id] = true
      const res = await deleteFile({ id, deleteSource }).finally(() => {
        state.loadingMap[id] = false
      })
      if (res.code === 200) {
        Message.success(res.data ? '源文件已删除' : '记录已删除，源文件保留')
        if (state.list.length <= 1) {
          state.pageNum = state.pageNum - 1 <= 0 ? 1 : state.pageNum - 1
        }
        await handleQuery()
      } else {
        Message.error(res.msg || '操作失败')
      }
    }

    /**
     * 文件大小格式化
     */
    const formatSize = (bits: number) => {
      const units = ['B', 'KB', 'MB', 'G']
      let i = 0
      while (bits >= 1024) {
        bits /= 1024
        i++
      }
      return bits.toFixed(1) + ' ' + units[i]
    }

    /**
     * 查询
     */
    const handleQuery = async () => {
      state.loading = true
      const res = await queryList({
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        ...state.sortParams
      }).finally(() => {
        state.loading = false
      })

      if (res.code === 200) {
        state.list = res.data?.records || []
        state.total = res.data?.total
      }
    }

    const handleThrottle = useThrottleFn(handleQuery, 500)

    /**
     * 排序规则发生改变时触发
     */
    const handleSorterChange = async (dataIndex: string, direction: string) => {
      if (dataIndex && direction) {
        state.sortParams.orderBy = dataIndex
        state.sortParams.order = direction === 'descend' ? 'desc' : 'asc'
      } else {
        state.sortParams = {}
      }
      await handleQuery()
    }

    /**
     * 改变页数
     */
    const changePage = async (current: number) => {
      state.pageNum = current
      await handleQuery()
      window.scrollTo(0, 0)
    }

    /**
     * 上传成功回调
     */
    const handleSuccess = async (fileItem: any) => {
      if (fileItem?.response?.code !== 200) {
        Message.error(fileItem?.response?.msg || '上传失败')
        return
      }
      await handleThrottle()
    }

    return () => {
      return (
        <div class="files-page">
          <div class="table-wrapper">
            <a-table
              index
              loading={state.loading}
              columns={state.columns}
              data={state.list}
              sticky-header={100}
              onSorterChange={handleSorterChange}
              pagination={{
                total: state.total,
                current: state.pageNum,
                pageSize: state.pageSize,
                onChange: changePage
              }}
            />
          </div>
          {!!userStore.user?.token && (
            <div class="upload-wrapper">
              <div class="checkbox-wrapper">
                <a-switch
                  type="round"
                  v-model={state.data.obs}
                  checked-value="N"
                  unchecked-value="Y"
                  v-slots={{
                    checked: () => {
                      return '同步上传到资源服务器'
                    },
                    unchecked: () => {
                      return '不同步上传'
                    }
                  }}
                ></a-switch>
              </div>
              <a-upload
                draggable
                name="files"
                headers={state.headers}
                data={state.data}
                multiple
                show-file-list={false}
                onSuccess={handleSuccess}
                action={state.uploadAction}
              />
              <div class="checkbox-wrapper">
                <a-switch
                  type="round"
                  v-model={state.data.keepName}
                  checked-value="N"
                  unchecked-value="Y"
                  v-slots={{
                    checked: () => {
                      return '系统重命名'
                    },
                    unchecked: () => {
                      return '保持原文件名'
                    }
                  }}
                ></a-switch>
              </div>
            </div>
          )}
          <a-image-preview src={state.previewSRC} v-model:visible={state.previewVisible} />
        </div>
      )
    }
  }
})
