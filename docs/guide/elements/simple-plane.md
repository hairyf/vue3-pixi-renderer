# SimplePlane

Creates a [SimplePlane](https://pixijs.download/release/docs/PIXI.SimplePlane.html)

The SimplePlane allows you to draw a texture across several points and then manipulate these points

<demo src="./demo/simple-plane.vue" />

## API

### SimplePlane Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| draw-mode | <api-draw-mode /> | `Topology` | The draw mode to be used. |
| texture | ^[string] ^[object]`PIXI.Texture` | `undefined` | The texture to use on the NineSlicePlane. |
| geometry | ^[object]`PIXI.Geometry` | `undefined` | The geometry to use on the SimplePlane. |
| vertices | ^[number]`number` | `10` | The number of vertices in the axis |

> more props in [Container Props](/guide/elements/container#container-props) and [PIXI.SimplePlane](https://pixijs.download/release/docs/PIXI.SimplePlane.html)

### SimplePlane Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: SimplePlane): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)