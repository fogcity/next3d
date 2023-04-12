import { Geometry, createGroundGeometry } from '../geometry/index';
import { Scene } from '../scene';
import { scale } from '../math/transform';
import { float } from '../types';
import { Mesh, MeshOptions } from './mesh';
type GroundOptions = MeshOptions & {
  width?: float;
  height?: float;
};

class GroundMesh extends Mesh {
  width: float = 1;
  height: float = 1;

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
