import type { Application, Renderer } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export function useRenderer(app?: Ref<Application>): Ref<Renderer> {
  const useApp = app || useApplication()
  return computed(() => unref(useApp)?.renderer)
}
