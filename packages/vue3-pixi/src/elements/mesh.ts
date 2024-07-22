import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface MeshProps {
  geometry: PIXI.Geometry
  shader: PIXI.Shader
  blendMode?: PIXI.BLEND_MODES
  drawMode?: PIXI.Topology
  material?: PIXI.Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: PIXI.State
  texture?: string | PIXI.Texture
  tint?: PIXI.ColorSource
  canvasPadding?: number
}

export interface MeshEvents extends PixiEvents {
  render: [MeshInst]
}

export type MeshInst = PIXI.Mesh & EventTarget

export type MeshComponent = DefineComponent<
MeshProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof MeshEvents)[],
  keyof MeshEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<MeshProps> & {
    [key in keyof MeshEvents as `on${Capitalize<key>}`]?:
    | ((...args: MeshEvents[key]) => any)
    | undefined;
  },
  {}
>
