import { createGroundGeometry } from '../geometry/index';
import { Scene } from '../scene';
import { scale } from '../math/transform';
import { float } from '../types';
import { Mesh } from './mesh';
type GroundOptions = {
  width?: float;
  height?: float;
};

const defaulGroundOptions = {
  width: 1,
  height: 1,
};
class GroundMesh extends Mesh {
  width: float;
  height: float;

  constructor(name: string, scene: Scene, options?: GroundOptions) {
    super(name, scene);

    for (const key in defaulGroundOptions) {
      if (Object.prototype.hasOwnProperty.call(options || {}, key)) {
        this[key] = options[key];
      } else this[key] = defaulGroundOptions[key];
    }
    this.geometry = createGroundGeometry();
    this.transform = scale(this.width, 1, this.height);
  }
}

export function createGround(name: string, scene: Scene, options?: GroundOptions) {
  return new GroundMesh(name, scene, options);
}
