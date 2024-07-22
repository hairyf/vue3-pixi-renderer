import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import type { Application } from 'pixi.js'
import { Rectangle } from 'pixi.js'

import { computedWithControl, useResizeObserver } from '@vueuse/core'
import { useApplication } from './useApplication'

export function useScreen(app?: Ref<Application>): Ref<Rectangle> {
  const useApp = app || useApplication()
  const view = computed(() => unref(useApp).view as HTMLCanvasElement)
  const defaultRectangle = new Rectangle()

  const screen = computedWithControl(
    () => view.value,
    () => useApp.value?.screen || defaultRectangle,
  )

  useResizeObserver(view, screen.trigger)

  return screen
}

