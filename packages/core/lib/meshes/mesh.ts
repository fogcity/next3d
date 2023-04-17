import { Color, color } from '../math/color';
import { Geometry } from '../geometry/index';
import { Material } from '../material';
import { Matrix4 } from '../math/matrix';
import { Scene } from '../scene';
import { translate } from '../math/transform';
import { Node } from '../node';
import { vec4 } from '../math/vector';
export type MeshOptions = {
  transform?: Matrix4;
  material?: Material;
  color?: Color;
};
export class Mesh extends Node {
  material: Material;
  geometry: Geometry;
  color: Color;
  constructor(public name: string, scene: Scene) {
    super(name, scene);
    this.color = color(1, 1, 1);
    scene.addMesh(this);
  }
}
