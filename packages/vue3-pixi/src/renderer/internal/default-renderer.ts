// imported by default
import 'pixi.js/accessibility'
import 'pixi.js/app'
import 'pixi.js/events'
import 'pixi.js/filters'
import 'pixi.js/sprite-tiling'
import 'pixi.js/text'
import 'pixi.js/text-bitmap'
import 'pixi.js/text-html'
import 'pixi.js/graphics'
import 'pixi.js/mesh'
import 'pixi.js/sprite-nine-slice'

// not added by default, everyone needs to import these manually
import 'pixi.js/advanced-blend-modes'
import 'pixi.js/unsafe-eval'
import 'pixi.js/prepare'
import 'pixi.js/math-extras'
import 'pixi.js/dds'
import 'pixi.js/ktx'
import 'pixi.js/ktx2'
import 'pixi.js/basis'

import {
  AlphaFilter,
  AnimatedSprite,
  BitmapText,
  BlurFilter,
  ColorMatrixFilter,
  Container,
  DisplacementFilter,
  Graphics,
  Mesh,
  // -- Strange thing
  // -- why are these three empty?
  // MeshPlane,
  // MeshRope,
  // NineSliceSprite,
  NoiseFilter,
  Sprite,
  Text,
  TilingSprite,
} from 'pixi.js'
import { patchProp as defuPatchProp, patchBooleanProp } from '../patchProp'
import { normalizeTexture } from '../utils'
import { setObjectProperty, setPropertyValue, setSkipFirstValue } from './setter'
import type { Renderer, RendererOptions } from './types'

const ContainerRender: RendererOptions = {
  name: 'Container',
  createElement: () => new Container(),
}

const SpriteRender: RendererOptions = {
  name: 'Sprite',
  createElement: props => new Sprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
  remove: (node: Sprite) => node.destroy(),
}

const GraphicsRender: RendererOptions = {
  name: 'Graphics',
  createElement: props => new Graphics(props.geometry),
}

const TextRender: RendererOptions = {
  name: 'Text',
  createElement: props => new Text({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: Text, key, prev, next) {
    switch (key) {
      case 'text':
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        setSkipFirstValue(el, key, () => setObjectProperty(el, key, prev, next))
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const BitmapTextRender: RendererOptions = {
  name: 'BitmapText',
  createElement: props => new BitmapText({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: BitmapText, key, prev, next) {
    switch (key) {
      case 'text':
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        break
      case 'sortDirty':
      case 'roundPixels':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const TilingSpriteRender: RendererOptions = {
  name: 'TilingSprite',
  createElement: props => new TilingSprite({
    texture: normalizeTexture(props!.texture),
    width: props.width,
    height: props.height,
  }),
  patchProp(el: TilingSprite, key, prev, next) {
    switch (key) {
      case 'width':
      case 'height':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      case 'uvRespectAnchor':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const AnimatedSpriteRender: RendererOptions = {
  name: 'AnimatedSprite',
  createElement: (props) => {
    return new AnimatedSprite(
      props.textures.map(normalizeTexture),
      props['auto-update'] || props.autoUpdate,
    )
  },
  patchProp(el: AnimatedSprite, key, prev, next) {
    switch (key) {
      case 'textures':
        setSkipFirstValue(el, key, () => {
          el.textures = next.map(normalizeTexture)
          el.loop && el.gotoAndPlay(0)
        })
        break
      case 'playing':
        const isPlaying = (next === '') || !!next
        setPropertyValue(el, key, () => isPlaying ? el.play() : el.stop())
        break
      case 'gotoAndPlay':
        setPropertyValue(el, key, () => el.gotoAndPlay(next))
        break
      case 'loop':
      case 'updateAnchor':
        patchBooleanProp(el, key, prev, next)
        break
      case 'onComplete':
      case 'onFrameChange':
      case 'onLoop':
        Reflect.set(el, key, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const MeshRender: RendererOptions = {
  name: 'Mesh',
  // TODO(drawMode): undetermined
  createElement: props => new Mesh(props as any),
  patchProp(el: Mesh, key, prev, next) {
    switch (key) {
      case 'geometry':
      case 'shader':
      case 'state':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      case 'roundPixels':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

// const NineSliceSpriteRender: RendererOptions = {
//   name: 'NineSliceSprite',
//   createElement: props => new NineSliceSprite(
//     normalizeTexture(props.texture),
//   ),
//   patchProp(el: NineSliceSprite, key, prev, next) {
//     switch (key) {
//       case 'roundPixels':
//       case 'autoResize':
//         patchBooleanProp(el, key, prev, next)
//         break
//       default:
//         defuPatchProp(el, key, prev, next)
//     }
//   },
// }

// TODO: SimplePlane -> MeshPlane files
// const MeshPlaneRender: RendererOptions = {
//   name: 'MeshPlane',
//   createElement: (props) => {
//     return new MeshPlane({
//       texture: normalizeTexture(props.texture),
//       width: props.width,
//       height: props.height,
//     })
//   },
// }

// const MeshRopeRender: RendererOptions = {
//   name: 'MeshRope',
//   createElement: (props) => {
//     return new MeshRope({
//       texture: normalizeTexture(props.texture),
//       points: props.points,
//     })
//   },
//   patchProp(el: NineSliceSprite, key, prev, next) {
//     switch (key) {
//       case 'texture':
//       case 'points':
//         break
//       default:
//         defuPatchProp(el, key, prev, next)
//     }
//   },
// }

const BlurFilterRender: RendererOptions = {
  name: 'BlurFilter',
  createElement: props => new BlurFilter(props as any),
}

const AlphaFilterRender: RendererOptions = {
  name: 'AlphaFilter',
  createElement: props => new AlphaFilter(props.alpha),
}

const DisplacementFilterRender: RendererOptions = {
  name: 'DisplacementFilter',
  createElement: props => new DisplacementFilter(
    props.sprite,
    props.scale,
  ),
  patchProp(el: DisplacementFilter, key, prev, next) {
    switch (key) {
      case 'sprite':
      case 'scale':
        // setSkipFirstValue(el, key, () => el.scale = next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const ColorMatrixFilterRender: RendererOptions = {
  name: 'ColorMatrixFilter',
  createElement: () => new ColorMatrixFilter(),
}

const NoiseFilterRender: RendererOptions = {
  name: 'NoiseFilter',
  createElement: props => new NoiseFilter(props as any),
  patchProp(el: NoiseFilter, key, prev, next) {
    switch (key) {
      case 'noise':
      case 'seed':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

export const defaultRenderer: Renderer = [
  ContainerRender,
  SpriteRender,
  GraphicsRender,
  TextRender,
  BitmapTextRender,
  TilingSpriteRender,
  AnimatedSpriteRender,
  MeshRender,
  // NineSliceSpriteRender,
  // MeshPlaneRender,
  // MeshRopeRender,
  BlurFilterRender,
  AlphaFilterRender,
  DisplacementFilterRender,
  ColorMatrixFilterRender,
  NoiseFilterRender,
]
