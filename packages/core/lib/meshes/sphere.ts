import { createSphereGeometry } from '../geometry/index';
import { Scene } from '../scene';
import { scale, translate } from '../math/transform';
import { float, int } from '../types';
import { Mesh } from './mesh';
type SphereOptions = {
  r: number;
};

const defaulSphereOptions = {
  r: 1,
};
class SphereMesh extends Mesh {
  r: float;
  constructor(name: string, scene: Scene, options?: SphereOptions) {
    super(name, scene);

    for (const key in defaulSphereOptions) {
      if (Object.prototype.hasOwnProperty.call(options || {}, key)) {
        this[key] = options[key];
      } else this[key] = defaulSphereOptions[key];
    }

    this.geometry = createSphereGeometry();
    this.transform = scale(this.r, this.r, this.r);
  }
}

export function createSphere(name: string, scene: Scene, options?: SphereOptions) {
  return new SphereMesh(name, scene, options);
}
