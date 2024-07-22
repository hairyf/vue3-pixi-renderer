import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'
export interface SpriteProps extends AllowedPixiProps {
  texture: string | PIXI.Texture
  textureOptions?: PIXI.TextureOptions

  blendMode?: PIXI.BLEND_MODES

  width?: number
  height?: number

  pluginName?: string

  tint?: PIXI.ColorSource
}

export interface SpriteEvents extends PixiEvents {
  render: [SpriteInst]
}

export type SpriteInst = PIXI.Sprite & EventTarget

export type SpriteComponent = DefineComponent<
  SpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SpriteEvents)[],
  keyof SpriteEvents,
  VNodeProps,
  Readonly<SpriteProps> & {
    [key in keyof SpriteEvents as `on${Capitalize<key>}`]?:
    | ((...args: SpriteEvents[key]) => any)
    | undefined;
  },
  {}
>
