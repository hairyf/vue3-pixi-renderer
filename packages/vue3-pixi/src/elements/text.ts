import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface TextProps {
  text?: string | number
  style?: PIXI.TextStyle | Partial<PIXI.TextStyle>

  context?: PIXI.ICanvasRenderingContext2D

  width?: number
}

export interface TextEvents extends PixiEvents {
  render: [TextInst]
}

export type TextInst = PIXI.Text & EventTarget

export type TextComponent = DefineComponent<
TextProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof TextEvents)[],
  keyof TextEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<TextProps> & {
    [key in keyof TextEvents as `on${Capitalize<key>}`]?:
    | ((...args: TextEvents[key]) => any)
    | undefined;
  },
  {}
>
