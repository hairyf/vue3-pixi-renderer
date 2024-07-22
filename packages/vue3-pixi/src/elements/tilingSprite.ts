import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface TilingSpriteProps {
  texture: string | PIXI.Texture
  textureOptions?: PIXI.TextureOptions
  width?: number
  height?: number

  anchor?: Partial<PIXI.PointData> | number
  anchorX?: number
  anchorY?: number

  blendMode?: PIXI.BLEND_MODES

  pluginName?: string

  tint?: PIXI.ColorSource

  clampMargin?: number

  tilePosition?: Partial<PIXI.PointData> | number | [number, number]
  tilePositionX?: number
  tilePositionY?: number

  tileScale?: Partial<PIXI.PointData> | number | [number, number]
  tileScaleX?: number
  tileScaleY?: number

  tileTransform?: PIXI.Transform

  uvMatrix?: PIXI.TextureMatrix
  uvRespectAnchor?: boolean
}

export interface TilingSpriteEvents extends PixiEvents {
  render: [TilingSpriteInst]
}

export type TilingSpriteInst = PIXI.TilingSprite & EventTarget

export type TilingSpriteComponent = DefineComponent<
  TilingSpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof TilingSpriteEvents)[],
  keyof TilingSpriteEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<TilingSpriteProps> & {
    [key in keyof TilingSpriteEvents as `on${Capitalize<key>}`]?:
    | ((...args: TilingSpriteEvents[key]) => any)
    | undefined;
  },
  {}
>
