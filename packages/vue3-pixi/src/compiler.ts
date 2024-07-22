const elementNames = [
  'container',
  'sprite',
  'graphics',
  'text',
  'bitmap-text',
  'tiling-sprite',
  'animated-sprite',
  'mesh',
  'simple-plane',
  'nine-slice-sprite',
  'mesh-rope',

  'filter',
  'blur-filter',
  'alpha-filter',
  'displacement-filter',
  'color-matrix-filter',
]

const prefix = 'pixi-'

export function isCustomElement(name: string) {
  let normalizedName = name.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
  if (normalizedName.startsWith('-'))
    normalizedName = normalizedName.slice(1)

  const isPixiElement = elementNames.includes(normalizedName)
  const isPrefixElement
    = normalizedName.startsWith(prefix)
    && elementNames.includes(normalizedName.slice(prefix.length))

  return isPixiElement || isPrefixElement
}

export const compilerOptions = {
  isCustomElement,
}

export const transformAssetUrls = {
  sprite: ['texture'],
}
