import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface SimplePlaneProps {
  texture: string | PIXI.Texture
  points: PIXI.Point[]

  shader?: PIXI.Shader | PIXI.MeshMaterial
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

export interface SimplePlaneEvents extends PixiEvents {
  render: [SimplePlaneInst]
}

export type SimplePlaneInst = PIXI.SimplePlane & EventTarget

export type SimplePlaneComponent = DefineComponent<
SimplePlaneProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SimplePlaneEvents)[],
  keyof SimplePlaneEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<SimplePlaneProps> & {
    [key in keyof SimplePlaneEvents as `on${Capitalize<key>}`]?:
    | ((...args: SimplePlaneEvents[key]) => any)
    | undefined;
  },
  {}
>
