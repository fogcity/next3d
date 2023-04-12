import { Geometry, createBoxGeometry } from '../geometry/index';
import { Scene } from '../scene';
import { scale } from '../math/transform';
import { float } from '../types';
import { Mesh, MeshOptions } from './mesh';

type BoxOptions = MeshOptions & {
  width?: float;
  height?: float;
  depth?: float;
};

class BoxMesh extends Mesh {
  width: float = 1;
  height: float = 1;
  depth: float = 1;
  constructor(name: string, scene: Scene, options?: BoxOptions) {
    super(name, scene);

    for (const key in options) {
      this[key] = options[key];
    }
    this.geometry = Geometry.Box;
    this.transform = scale(this.width, this.height, this.depth);
  }
}

export function createBox(name: string, scene: Scene, options?: BoxOptions) {
  return new BoxMesh(name, scene, options);
}
