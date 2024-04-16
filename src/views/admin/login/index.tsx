import { defineComponent, reactive } from 'vue'
import './index.less'
import {login} from "@/services/admin";
import {useStoreUser} from "@/stores/modules/user";
import { useRouter, useRoute } from "vue-router";
import { setStorage } from "@/utils/storage";

export default defineComponent({
  setup() {
    const userStore: any = useStoreUser()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      form: {
        name: '',
        password: ''
      },
      loading: false
    })

    const handleSubmit = async () => {
      if(state.form.name && state.form.password) {
        state.loading = true
        const res = await login(state.form).finally(() => {
          state.loading = false
        })
        if(res.code === 200) {
          userStore.setStoreUser(res.data)
          setStorage({
            key: `user`,
            value: res.data,
            expired: 60 * 1000 * 60 * 3
          })
          const {redirect} = route.query
          if(redirect) {
            router.push(redirect as string)
          } else {
            router.push("/")
          }
        }
      }
    }

    return () => {
      return (
        <div class="login-page">
          <div class="login-box">
          <a-form model={state.form} onSubmit={handleSubmit}>
            <a-form-item>
              <div class="logo">login</div>
            </a-form-item>
            <a-form-item field="name" label="账号">
              <a-input v-model={state.form.name} placeholder="请输入账号" />
            </a-form-item>
            <a-form-item field="password" label="密码">
              <a-input v-model={state.form.password} type='password' placeholder="请输入密码" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" loading={state.loading}>登录</a-button>
            </a-form-item>
          </a-form>
          </div>
        </div>
      )
    }
  }
})
