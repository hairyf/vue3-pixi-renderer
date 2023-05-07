import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

interface Props {
  textures: PIXI.Texture[]
  width?: number
  height?: number

  anchor?: PIXI.IPointData | number
  anchorX?: number
  anchorY?: number

  blendMode?: PIXI.BLEND_MODES

  pluginName?: string

  tint?: PIXI.ColorSource

  clampMargin?: number

  tilePosition?: PIXI.IPointData
  tileScale?: PIXI.IPointData
  tileTransform?: PIXI.Transform

  uvMatrix?: PIXI.TextureMatrix

  animationSpeed?: number
  autoUpdate?: number

  currentFrame?: number
  loop?: boolean

  updateAnchor?: boolean
}

type Events = PixiEvents & {
  complete: []
  frameChange: [number]
  'update:currentFrame': [number]
  loop: []
}

export type PixiAnimatedSpriteComponent = DefineComponent<
  Props,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<Props> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>