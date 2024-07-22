# MeshRope

Creates a [MeshRope](https://pixijs.download/release/docs/PIXI.MeshRope.html)

The rope allows you to draw a texture across several points and then manipulate these points

<demo src="./demo/mesh-rope.vue" :width="400" />

## API

### MeshRope Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`PIXI.Texture` | `undefined` | The texture to use on the MeshRope. |
| points | ^[Array<object>]`PIXI.IPoint[]` | `undefined` | An array of points or point-like objects to construct this rope. |

> more props in [Container Props](/guide/elements/container#container-props) and [PIXI.MeshRope](https://pixijs.download/release/docs/PIXI.MeshRope.html)

### MeshRope Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: MeshRope): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)