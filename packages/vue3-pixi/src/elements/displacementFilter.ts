import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { DisplacementFilter, Sprite } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface DisplacementFilterProps extends ExtractFilterProps<DisplacementFilter> {
  sprite: Sprite
}

export interface DisplacementFilterEvents {
  render: [DisplacementFilterInst]
}

export type DisplacementFilterInst = DisplacementFilter

export type DisplacementFilterComponent = DefineComponent<
DisplacementFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof DisplacementFilterEvents)[],
  keyof DisplacementFilterEvents,
  VNodeProps & AllowedFilterProps,
  Readonly<DisplacementFilterProps> & {
    [key in keyof DisplacementFilterEvents as `on${Capitalize<key>}`]?:
    | ((...args: DisplacementFilterEvents[key]) => any)
    | undefined;
  },
  {}
>
