import { Color, createColor } from '../color';
import { Geometry } from '../geometry/index';
import { Material } from '../material';
import { Matrix } from '../math/matrix';
import { Scene } from '../scene';
import { translate } from '../math/transform';
import { Node } from '../node';
export type MeshOptions = {
  transform?: Matrix;
  material?: Material;
  color?: Color;
};
export class Mesh extends Node {
  transform: Matrix;
  material: Material;
  geometry: Geometry;
  color: Color;
  constructor(public name: string, scene: Scene) {
    super(name, scene);
    this.color = createColor(1, 1, 1);
    scene.addMesh(this);
  }
}
