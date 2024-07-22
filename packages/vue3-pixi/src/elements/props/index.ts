import type {
  Container,
  Cursor,
  EventMode,
  Filter,
  IHitArea,
  PointData,
  Rectangle,
} from 'pixi.js'

export interface AllowedPixiProps {
  accessible?: boolean
  accessibleChildren?: number
  accessibleHint?: string
  accessiblePointerEvents?: string
  accessibleTitle?: string
  accessibleType?: string
  alpha?: number

  cursor?: Cursor

  cacheAsBitmap?: boolean
  cacheAsBitmapMultisample?: number | unknown
  cacheAsBitmapResolution?: number | unknown

  cullable?: boolean
  cullArea?: Rectangle

  filterArea?: Rectangle
  filters?: Filter[]

  hitArea?: IHitArea
  eventMode?: EventMode

  mask?: Container | null

  name?: string

  x?: number
  y?: number
  position?: Partial<PointData> | number | [number, number]
  positionY?: number
  positionX?: number

  anchor?: Partial<PointData> | number | [number, number]
  anchorX?: number
  anchorY?: number

  pivot?: Partial<PointData> | number | [number, number]
  pivotX?: number
  pivotY?: number

  renderable?: boolean

  rotation?: number
  angle?: number

  scale?: Partial<PointData> | number | [number, number]
  scaleX?: number
  scaleY?: number
  width?: number
  height?: number

  skew?: Partial<PointData> | number | [number, number]
  skewX?: number
  skewY?: number

  visible?: boolean

  zIndex?: number
}

export interface AllowedFilterProps extends Partial<Omit<Filter, 'destroy'>> {
  is?: (props: any) => Filter
}

export type ExtractFilterProps<T> = Partial<Omit<T, keyof AllowedFilterProps | 'destroy'>>
