/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BitmapText,
  Container,
  Filter,
  Text,
  Texture,
} from 'pixi.js'
import { camelize, markRaw, warn } from 'vue-demi'
import { isOn } from './utils'
import { Empty, insertContainer, insertFilter, nextSiblingContainer, nextSiblingFilter, renderers } from './internal'

export function createElement(prefix: string, name: string, _?: boolean, _1?: string, props?: any): any {
  let is
  if (name.startsWith(prefix)) {
    name = camelize(name)
    is = renderers[name.slice(prefix.length)].createElement
  }
  else {
    name = camelize(name)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    is = renderers[name].createElement
  }
  if (!is) {
    warn(`Unknown element ${name}`)
    is = () => new Container()
  }
  const element = is(props ?? {})

  if (element instanceof Container) {
    // @ts-expect-error
    if (isOn(props) && element.eventMode === 'auto')
      // @ts-expect-error
      element.eventMode = 'static'
  }

  if (element instanceof Filter)
    element._vp_filter = true

  markRaw(element)

  return element
}

export function parentNode(node: any) {
  return node?.parent
}

export function createText(text: string) {
  text = text.replace(/\\n/g, '\n')
  return text ? new Text(text) : new Empty(Texture.EMPTY) as any
}

export function createComment() {
  return new Empty(Texture.EMPTY)
}

export function remove(node: Container) {
  node.destroy()
}

export function insert(child: Container, parent: Container, anchor?: Container | null) {
  if (Reflect.get(child, '_vp_filter'))
    insertFilter(child as unknown as Filter, parent, anchor)
  else
    insertContainer(child, parent, anchor)
}

export function nextSibling(node: Container): any {
  if (Reflect.get(node, '_vp_filter'))
    return nextSiblingFilter(node as unknown as Filter)
  else
    return nextSiblingContainer(node)
}

export function setText(prefix: string, node: Container, text: string) {
  text = text.replace(/\\n/g, '\n')
  node instanceof Text || node instanceof BitmapText
    ? node.text = text.trim()
    : warn(`Text is only supported with ${prefix}-text element`)
}

export const nodeOps = {
  createElement,
  parentNode,
  createText,
  createComment,
  remove,
  insert,
  nextSibling,
  setText,
}
