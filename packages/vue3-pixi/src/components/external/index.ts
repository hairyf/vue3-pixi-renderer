/* eslint-disable vue/one-component-per-file */
import type { App, PropType } from 'vue-demi'
import { createApp, defineComponent, getCurrentInstance, h, inject, onMounted, onUnmounted, ref } from 'vue-demi'
import { appInjectKey } from '../../composables'
import { inheritParent } from '../../utils'

export const External = defineComponent({
  props: {
    tag: String as PropType<keyof HTMLElementTagNameMap>,
    root: Object as PropType<HTMLElement>,
  },
  setup(props, { slots, attrs }) {
    const { appContext } = getCurrentInstance()!
    const element = document.createElement('div')
    const pixiApp = ref(inject(appInjectKey)!)
    const childApp = ref<App>()

    const root = props.root || pixiApp.value.canvas.parentNode as HTMLElement

    function mount() {
      if (!root)
        throw new Error('could not find root')

      const app = createApp({
        render: () => h(props.tag || 'div', attrs, slots),
      })

      inheritParent(app, appContext)

      app.mount(element)

      root.appendChild(element.firstChild!)
      childApp.value = app
    }

    function unmount() {
      if (!childApp.value)
        return

      childApp.value.unmount()
      childApp.value = undefined
    }

    onMounted(mount)
    onUnmounted(unmount)
    return () => null
  },
})

