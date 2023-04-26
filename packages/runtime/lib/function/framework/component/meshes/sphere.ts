import { Geometry, createSphereGeometry } from '../geometry/index';
import { Scene } from '../../scene/scene';
import { scale, translate } from '../../../../core/math/transform';
import { Mesh, MeshOptions } from './mesh';
type SphereOptions = MeshOptions & {
  r: number;
};

class SphereMesh extends Mesh {
  r: number;
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