import { useEntityId } from '../utils';
import { Component } from '../component/component';
import { PositionSystem } from '../system/position/index.';
import { System } from '../system/system';
import { TransformSystem } from '../system/transform';
export type Archetype = 'camera' | 'light' | 'mesh';
export type EntityProps = {
  onCreate: () => {};
  onInit: () => {};
  onUpdate: () => {};
};
export class Entity {
  components: Component[] = [];
  id: number;
  constructor() {
    this.id = useEntityId();
    this.onCreate();
  }
  onCreate() {}
  onInit() {}
  onUpdate() {}

  addComponent(component: Component) {
    this.components.push(component);
    switch (component.type) {
      case 'position':
        PositionSystem.extendEntity();
        break;
      case 'transform':
        TransformSystem.extendEntity();
        break;

      default:
        break;
    }
  }
  unmountExtension(extension: object) {
    const psk = Object.keys(extension);
    for (const k of psk) {
      delete this[k];
    }
  }
  removeComponent(component: Component) {
    this.components.filter(c => c.type != component.type);
    let ext;
    switch (component.type) {
      case 'position':
        ext = PositionSystem.extension;
        break;
      case 'transform':
        ext = TransformSystem.extension;
        break;
      default:
        break;
    }

    this.unmountExtension(ext);
  }
}
