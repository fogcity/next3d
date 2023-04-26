import { Geometry, createGroundGeometry } from '../geometry/index';
import { Scene } from '../../entity/scene/scene';
import { scale } from '../../../../core/math/transform';
import { number } from '../../../../types';
import { Mesh, MeshOptions } from './mesh';
type GroundOptions = MeshOptions & {
  width?: number;
  height?: number;
};

class GroundMesh extends Mesh {
  width: number = 1;
  height: number = 1;

  constructor(name: string, scene: Scene, options?: GroundOptions) {
    super(name, scene);

    for (const key in options) {
      this[key] = options[key];
    }
    this.geometry = Geometry.Ground;
    this.transform = scale(this.width, 1, this.height);
  }
}

export function createGround(name: string, scene: Scene, options?: GroundOptions) {
  return new GroundMesh(name, scene, options);
}
