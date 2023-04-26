import { Geometry, createBoxGeometry } from '../geometry/index';
import { Scene } from '../../entity/scene/scene';
import { scale } from '../../../../core/math/transform';
import { number } from '../../../../types';
import { Mesh, MeshOptions } from './mesh';

type BoxOptions = MeshOptions & {
  width?: number;
  height?: number;
  depth?: number;
};

class BoxMesh extends Mesh {
  width: number = 1;
  height: number = 1;
  depth: number = 1;
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
