import { PositionComponent } from '../../../component/position';
import { Entity } from '../../entity';
import { TransformComponent } from '../../../component/transform';
import { Component } from '../../../component/component';
import { PositionSystem } from '../../../system/position/index.';
import { TransformSystem } from '../../../system/transform';
const handler = {
  get: function (obj: any, prop: string) {
    if (prop in obj) {
      return obj[prop];
    } else {
      const component = obj.components.filter(c => prop in c);
      if (component.length > 0) {
        return component[prop];
      } else throw new Error('No this prop');
    }
  },
};
export class WorldObject extends Entity {
  name: string;
  components: Component[] = [];
  constructor() {
    super();
    const position = new PositionComponent();
    const transform = new TransformComponent();
    this.addComponent(position);
    this.addComponent(transform);
  }
  addComponent(component: Component) {
    this.components.push(component);
    let extensions = {};
    // Reflect.defineProperty(this, 'x', { value: 70 });
    switch (component.type) {
      case 'position':
        extensions = {
          x: 0,
          y: 0,
          z: 0,
        };
        break;
      case 'transform':
        extensions = TransformSystem.extensions;
        break;

      default:
        break;
    }
    this.mountExtension(extensions);
  }
  mountExtension(extension: object) {
    Object.assign(this, extension);

    // const psk = Object.keys(extension);
    // for (const k of psk) {
    //   // Object.defineProperty(this, k, extension[k]);
    //   // Reflect.defineProperty(this, k, extension[k]);
    // }
  }
  unmountExtension(extension: object) {
    const psk = Object.keys(extension);
    for (const k of psk) {
      Reflect.deleteProperty(this, k);
    }
  }
  removeComponent(component: Component) {
    this.components.filter(c => c.type != component.type);
    let extensions = {};
    switch (component.type) {
      case 'position':
        extensions = PositionSystem.extensions;
        break;
      case 'transform':
        extensions = TransformSystem.extensions;
        break;
      default:
        break;
    }

    this.unmountExtension(extensions);
  }
}

export function createWorldObject() {
  const wo = new WorldObject();

  return wo;
}
