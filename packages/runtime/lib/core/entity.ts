import { Component } from './component';

export class Entity {
  components: Component[] = [];
  constructor() {}
  onCreate() {}
  onInit() {}
  onUpdate() {}
  onDestory() {}
  isRenderable() {}
  isCamera() {}
  isLight() {}
  isMesh() {}
  addSystem() {}
  addComponent() {}
}
