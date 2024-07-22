import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface AnimatedSpriteProps extends AllowedPixiProps {
  textures: (PIXI.Texture | PIXI.FrameObject | string)[]
  width?: number
  height?: number

  playing?: boolean
  gotoAndPlay?: number

  anchor?: Partial<PIXI.PointData> | number
  anchorX?: number
  anchorY?: number

  blendMode?: PIXI.BLEND_MODES

  tint?: PIXI.ColorSource

  animationSpeed?: number
  autoUpdate?: PIXI.AnimatedSprite['autoUpdate']

  currentFrame?: number
  loop?: boolean

  updateAnchor?: boolean

  roundPixels?: boolean
}

export interface AnimatedSpriteEvents extends PixiEvents {
  complete: []
  frameChange: [number]
  // TODO: test this
  'update:currentFrame': [number]
  loop: []
  render: [AnimatedSpriteInst]
}

export type AnimatedSpriteInst = PIXI.AnimatedSprite & EventTarget

export type AnimatedSpriteComponent = DefineComponent<
  AnimatedSpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof AnimatedSpriteEvents)[],
  keyof AnimatedSpriteEvents,
  VNodeProps,
  Readonly<AnimatedSpriteProps> & {
    [key in keyof AnimatedSpriteEvents as `on${Capitalize<key>}`]?:
    | ((...args: AnimatedSpriteEvents[key]) => any)
    | undefined;
  },
  {}
>
