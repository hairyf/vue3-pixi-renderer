import type { Container, Filter } from 'pixi.js'

export function insertFilter(child: Filter, parent: Container, _anchor: any) {
  parent.filters ??= []
  parent.filters = Array.isArray(parent.filters) ? parent.filters : [parent.filters]

  function remove() {
    const index = parent.filters.indexOf(child)
    parent.filters?.splice(index >>> 0, 1)
  }
  child.parent = parent
  child.destroy = remove

  parent.filters.push(child)
}

export function nextSiblingFilter(node: Filter) {
  node.parent.filters ??= []
  node.parent.filters = Array.isArray(parent.filters) ? parent.filters : [parent.filters]

  const index = node.parent.filters!.indexOf(node)
  if (node.parent.filters!.length <= index + 1)
    return null
  return node.parent.filters?.[index + 1]
}

export function insertContainer(child: Container, parent: Container, anchor?: Container | null) {
  if (anchor)
    parent?.addChildAt(child, parent.getChildIndex(anchor))
  else if (child)
    parent.addChild(child)
}

export function nextSiblingContainer(node: Container) {
  const index = node.parent.getChildIndex(node)
  if (node.parent.children.length <= index + 1)
    return null
  return node.parent.getChildAt(index + 1) as Container ?? null
}

