import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'
export interface BitmapTextProps {
  text?: string | number
  style?: Partial<PIXI.TextStyle>

  align?: string

  anchor?: Partial<PIXI.PointData> | number
  anchorX?: number
  anchorY?: number

  dirty?: boolean

  fontName?: string
  fontSize?: number
  letterSpacing?: number
  maxWidth?: number
  resolution?: number
  roundPixels?: boolean

  tint?: PIXI.ColorSource
}

export interface BitmapTextEvents extends PixiEvents {
  'update:dirty': [boolean]
  render: [BitmapTextInst]
}

export type BitmapTextInst = PIXI.BitmapText & EventTarget

export type BitmapTextComponent = DefineComponent<
BitmapTextProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof BitmapTextEvents)[],
  keyof BitmapTextEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<BitmapTextProps> & {
    [key in keyof BitmapTextEvents as `on${Capitalize<key>}`]?:
    | ((...args: BitmapTextEvents[key]) => any)
    | undefined;
  },
  {}
>
