# Mesh

Creates a [Mesh](https://pixijs.download/release/docs/PIXI.Mesh.html)

This component empowers you to have maximum flexibility to render any kind of WebGL visuals you can think of. This component assumes a certain level of WebGL knowledge.

Pretty much all WebGL can be broken down into the following:

- Geometry - The structure and data for the mesh. This can include anything from positions, uvs, normals, colors etc.
- Shader - This is the shader that PixiJS will render the geometry with (attributes in the shader must match the geometry)
- State - This is the state of WebGL required to render the mesh.

<demo src="./demo/mesh.vue" :width="300" :height="300" />

## API

### Mesh Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `BLEND_MODES.NORMAL` | The blend mode to be applied to the sprite. |
| draw-mode | <api-draw-mode /> | `Topology` | The draw mode to be used. |
| geometry | ^[object]`PIXI.Geometry` | `undefined` | The geometry the mesh will use. |

> more props in [Container Props](/guide/elements/container#container-props) and [PIXI.Mesh](https://pixijs.download/release/docs/PIXI.Mesh.html)

### Mesh Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: Mesh): void` | Call your drawing functions on the PIXI.Mesh instance here |

> more events in [Container Events](/guide/elements/container#container-events)