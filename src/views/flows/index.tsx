import { defineComponent, onMounted, reactive, watch } from "vue";
import ArticleSummary from "./components/ArticleSummary";
import { browseArticle, queryList } from "@/services/article";
import "./index.less";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { ArticleSummary },
  setup() {
    const route = useRoute();

    const state = reactive({
      pageSize: 10,
      pageNum: 1,
      total: 1,
      params: {} as any,
      list: [] as any[],
      loading: true
    });

    onMounted(async () => {
      setRouteParams();
      await handleQuery();
    });

    /**
     * 设置路由参数
     */
    const setRouteParams = () => {
      const { type, name } = route.params;
      if (type && name && typeof type === "string" && typeof name === "string") {
        state.params = {
          [type]: name
        };
      } else {
        state.params = {};
      }
    };

    watch(() => route.params, async () => {
      state.pageNum = 1;
      setRouteParams();
      await handleQuery();
    });

    /**
     * 查询
     */
    const handleQuery = async () => {
      state.loading = true;
      const res = await queryList({
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        ...state.params
      }).finally(() => {
        state.loading = false;
      });

      if (res.code === 200) {
        state.list = res.data?.records || [];
        state.total = res.data?.total;
      }
    };

    /**
     * 改变页数
     */
    const changePage = async (current: number) => {
      state.pageNum = current;
      await handleQuery();
      window.scrollTo(0, 0);
    };

    return () => {
      return (
        <main class="flows">
          {state.list.map((item) => (
            <ArticleSummary {...item} />
          ))}
          {state.list.length > 0 ? (
            <div class="pagination-wrapper">
              <a-pagination
                total={state.total}
                current={state.pageNum}
                page-size={state.pageSize}
                onChange={changePage}
              />
            </div>
          ) : null}
          {!state.loading && state.list.length <= 0 ? <a-empty /> : null}
        </main>
      );
    };
  }
});
