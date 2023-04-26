import { useEntityId } from '../../../core/utils';
import { Component } from '../component/component';

export class Entity {
  components: Component[] = [];
  id: number;
  constructor() {
    this.id = useEntityId();
  }
  onCreate() {}
  onInit() {}
  onUpdate() {}
  onDestory() {}
  isRenderable() {}
  isCamera() {}
  isLight() {}
  isMesh() {}
  addSystem() {}

  addComponent(component: Component) {
    this.components.push(component);
  }
}
