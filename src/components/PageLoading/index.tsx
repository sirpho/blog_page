import { defineComponent, reactive, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isLoading = ref(false)
    const style: any = reactive({
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      display: 'none',
      left: '0',
      top: '0',
      zIndex: 99
    })
    watchEffect(() => {
      isLoading.value = props.loading
      style.display = isLoading.value ? 'block' : 'none'
    })
    return () => (
      <>
        {isLoading.value ? (
          <div style={style}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '0.22rem',
                borderRadius: '10px',
                background: 'rgba(63, 63, 63, 0.4)'
              }}
            >
              <div>加载中</div>
            </div>
          </div>
        ) : null}
      </>
    )
  }
})
