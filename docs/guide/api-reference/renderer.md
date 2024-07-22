# Renderer

vue3-pixi changes the rules for rendering different tags through custom renderers. Each element will be rendered as a different `PIXI` instance.

Currently, the following PixiJS objects are supported out of the box:

- [Container](http://pixijs.download/release/docs/PIXI.Container.html)
- [Sprite](http://pixijs.download/release/docs/PIXI.Sprite.html)
- [Graphics](http://pixijs.download/release/docs/PIXI.Graphics.html)
- [Text](http://pixijs.download/release/docs/PIXI.Text.html)
- [BitmapText](http://pixijs.download/release/docs/PIXI.BitmapText.html)
- [AnimatedSprite](http://pixijs.download/release/docs/PIXI.AnimatedSprite.html)
- [SimpleMesh](http://pixijs.download/release/docs/PIXI.SimpleMesh.html)
- [SimplePlane](http://pixijs.download/release/docs/PIXI.SimplePlane.html)
- [TilingSprite](http://pixijs.download/release/docs/PIXI.TilingSprite.html)
- [NineSlicePlane](http://pixijs.download/release/docs/PIXI.NineSlicePlane.html)
- [MeshRope](http://pixijs.download/release/docs/PIXI.MeshRope.html)
- [Mesh](http://pixijs.download/release/docs/PIXI.AnimatedSprite.html)
- [BlurFilter](https://pixijs.download/release/docs/PIXI.BlurFilter.html)
- [AlphaFilter](https://pixijs.download/release/docs/PIXI.AlphaFilter.html)
- [DisplacementFilter](https://pixijs.download/release/docs/PIXI.DisplacementFilter.html)
- [ColorMatrixFilter](https://pixijs.download/release/docs/PIXI.ColorMatrixFilter.html)
- [NoiseFilter](https://pixijs.download/release/docs/PIXI.NoiseFilter.html)
- [FXAAFilter](https://pixijs.download/release/docs/PIXI.FXAAFilter.html)

## Namespaces

To avoid conflicts with other tags, such as `<filter>`, you can use the `pixi-` prefix or capitalize the first letter with `<Filter>`.

```html
<Filter />
<!-- or -->
<pixi-filter />
```

All elements (including custom elements) can use the `pixi-` prefix or capitalize the first letter to avoid conflicts with other tags.

## Using a Custom Element

You can add custom `PIXI` instances to the `renderer` if you have a custom class (whether it's your own or from a third-party library).

```ts
// main.js
import { Text } from 'pixi.js'
import { pathProp as defPathProp, renderer } from 'vue3-pixi'

class YellowText extends Text {
  constructor(text, style) {
    super(text, style)
    this.style.fill = 'yellow'
  }
}

renderer.use({
  name: 'YellowText',
  createElement: props => new YellowText(props.text, props.style),
  pathProp(el, key, prevValue, nextValue) {
    // handle special prop here..

    // or fallback to default
    return defPathProp(el, key, prevValue, nextValue)
  },
  // nextSibling
  // insert
  // setElementText
  // setText
  // parentNode
})

```

> Please note that if you modify any of these configurations, the default configuration for that will be overridden.

To prevent Vue program from issuing warnings and to handle them, you need to add the following content in the Vue plugin configuration.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { isCustomElement, transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for custom elements and remove the unknown element warnings
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag === 'yellow-text' || isCustomElement(tag)
          }
        },
      },
    }),
  ],
})
```

If you are using TypeScript, you can add types to custom elements by declaring `GlobalComponents` from the `@vue/runtime-core` module.

```ts
import type { TextProps } from 'vue3-pixi'

interface YellowTextProps extends TextProps {
  text: string
  style: TextStyle
  // ...
}

interface YellowTextComponent {
  (props: YellowTextProps): any
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    YellowText: YellowTextComponent
    PixiYellowText: YellowTextComponent
  }
}
```