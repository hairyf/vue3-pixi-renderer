import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface MeshRopeProps {
  texture: string | PIXI.Texture
  points: PIXI.Point[]
  textureScale?: number
  autoUpdate?: number
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
}

export interface MeshRopeEvents extends PixiEvents {
  render: [MeshRopeInst]
}

export type MeshRopeInst = PIXI.MeshRope & EventTarget

export type MeshRopeComponent = DefineComponent<
MeshRopeProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof MeshRopeEvents)[],
  keyof MeshRopeEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<MeshRopeProps> & {
    [key in keyof MeshRopeEvents as `on${Capitalize<key>}`]?:
    | ((...args: MeshRopeEvents[key]) => any)
    | undefined;
  },
  {}
>
