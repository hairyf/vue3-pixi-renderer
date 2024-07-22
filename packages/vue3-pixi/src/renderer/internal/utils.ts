/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Container } from 'pixi.js'
import type { Renderer, RendererOptions } from 'vue-demi'
import { camelize } from 'vue-demi'
import { isCustomElement } from '../../compiler'
import { use } from './hooks'
import { defaultRenderer } from './default-renderer'
import { renderers } from './constants'

export function rendererWithCapture(options: RendererOptions<Container, Container>) {
  const notOverrides = ['createComment', 'insertStaticContent', 'createText', 'querySelector', 'createElement']
  for (const key in options) {
    if (notOverrides.includes(key))
      continue
    // @ts-expect-error
    const fn = options[key]
    if (key === 'patchProp') {
      options[key] = (el, pKey, ...args) => {
        const inFn = renderers[el._vp_name]?.[key]
        pKey = camelize(pKey)
        return inFn
          ? inFn(el, pKey, ...args)
          : fn(el, pKey, ...args)
      }
      continue
    }
    // @ts-expect-error
    options[key] = (el, ...args: any[]) => {
    // @ts-expect-error
      const inFn = renderers[el._vp_name]?.[key]
      return inFn
        ? inFn?.(el, ...args)
        : fn(el, ...args)
    }
  }
  return options
}

export function rendererWithOptions(
  renderer: Renderer<Container<Container>> & Record<string, any>,
) {
  const _createApp = renderer.createApp
  const _render = renderer.render
  function createApp(...args: any[]) {
    const app = (_createApp as any)(...args)
    Object.assign(app.config.compilerOptions, {
      isCustomElement,
    })
    return app
  }

  function render(...args: any[]) {
    return (_render as any)(...args)
  }

  use(defaultRenderer)

  Object.assign(renderer, { createApp, render, use })
}
