import { Geometry, createSphereGeometry } from '../geometry/index';
import { Scene } from '../scene';
import { scale, translate } from '../math/transform';
import { float, int } from '../types';
import { Mesh, MeshOptions } from './mesh';
type SphereOptions = MeshOptions & {
  r: number;
};

class SphereMesh extends Mesh {
  r: float;
  constructor(name: string, scene: Scene, options?: SphereOptions) {
    super(name, scene);
    for (const key in options) {
      this[key] = options[key];
    }
    this.geometry = Geometry.Sphere;
    this.transform = scale(this.r, this.r, this.r);
  }
}

export function createSphere(name: string, scene: Scene, options?: SphereOptions) {
  return new SphereMesh(name, scene, options);
}
