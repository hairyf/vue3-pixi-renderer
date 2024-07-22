import type { ContainerChild, ContainerEvents } from 'pixi.js'

export interface PixiEvents<C extends ContainerChild = ContainerChild> extends ContainerEvents<C> { }
