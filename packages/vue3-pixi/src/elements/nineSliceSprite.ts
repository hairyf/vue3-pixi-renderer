import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface NineSliceSpriteProps {
  texture: PIXI.Texture | string
  leftWidth?: number
  rightWidth?: number
  topHeight?: number
  bottomHeight?: number
  verticesX?: number
  verticesY?: number

  shader?: PIXI.Shader
  blendMode?: PIXI.BLEND_MODES
  drawMode?: PIXI.Topology
  material?: PIXI.Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: PIXI.State

  tint?: PIXI.ColorSource
  canvasPadding?: number

  autoResize?: boolean
}

export interface NineSliceEvents extends PixiEvents {
  render: [NineSliceInst]
}

export type NineSliceInst = PIXI.NineSliceSprite & EventTarget

export type NineSliceSpriteComponent = DefineComponent<
  NineSliceSpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof NineSliceEvents)[],
  keyof NineSliceEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<NineSliceSpriteProps> & {
    [key in keyof NineSliceEvents as `on${Capitalize<key>}`]?:
    | ((...args: NineSliceEvents[key]) => any)
    | undefined;
  },
  {}
>
