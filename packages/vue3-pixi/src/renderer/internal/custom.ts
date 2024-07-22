import type { ContainerOptions } from 'pixi.js'
import { Container } from 'pixi.js'

export class Empty extends Container {
  constructor(options?: ContainerOptions) {
    super(options)
    this.visible = false
    this.renderable = false
  }

  _vp_empty = true
}
