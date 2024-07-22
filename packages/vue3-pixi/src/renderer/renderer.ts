/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Container } from 'pixi.js'

import type { Renderer as _Renderer } from 'vue-demi'
import { createRenderer as _createRenderer } from 'vue-demi'

import { patchProp } from './patchProp'
import { nodeOps as _nodeOps } from './nodeOps'
import type { use } from './internal'
import { rendererWithCapture, rendererWithOptions } from './internal'

export interface VuePIXIRenderer<T = Container<Container>>
  extends _Renderer<T> {
  use: typeof use
}

export function createRenderer(options: { prefix?: string } = {}) {
  const { createElement, setText, ...nodeOps } = _nodeOps
  const { prefix = 'pixi' } = options
  const rendererOptions = rendererWithCapture({
    // @ts-expect-error
    createElement: (...args) => createElement(prefix, ...args),
    setElementText: (...args) => setText(prefix, ...args),
    setText: (...args) => setText(prefix, ...args),
    patchProp,
    ...nodeOps,
  })
  return _createRenderer<Container, Container>(rendererOptions)
}

export const renderer = createRenderer() as VuePIXIRenderer

rendererWithOptions(renderer)

export const createApp = renderer.createApp
export const render = renderer.render
