# NineSlicePlane

Creates a [NineSlicePlane](https://pixijs.download/release/docs/PIXI.NineSlicePlane.html)

Allows you to stretch a texture using 9-slice scaling. The corners will remain unscaled (useful for buttons with rounded corners for example) and the other areas will be scaled horizontally and or vertically

<demo src="./demo/nine-slice-plane.vue" />

## API

### NineSlicePlane Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `BLEND_MODES.NORMAL` | The blend mode to be applied to the sprite. |
| draw-mode | <api-draw-mode /> | `Topology` | The draw mode to be used. |
| texture | ^[string] ^[object]`PIXI.Texture` | `undefined` | The texture to use on the NineSlicePlane. |
| left-width | ^[number] | `undefined` | The width of the left column of the grid |
| right-width | ^[number] | `undefined` | The width of the right column of the grid |
| top-height | ^[number] | `undefined` | The height of the top row of the grid |
| bottom-height | ^[number] | `undefined` | The height of the bottom row of the grid |
| geometry | ^[object]`PIXI.Geometry` | `undefined` | The geometry the mesh will use. |

> more props in [Container Props](/guide/elements/container#container-props) and [PIXI.NineSlicePlane](https://pixijs.download/release/docs/PIXI.NineSlicePlane.html)

### NineSlicePlane Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: NineSlicePlane): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)

<!-- LINKS -->