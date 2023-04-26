import { Color, color } from '../../../../core/math/color';
import { Geometry } from '../geometry/index';
import { Material } from '../material';
import { Matrix4 } from '../../../../core/math/matrix4';
import { Scene } from '../../entity/scene/scene';

import { Node } from '../node';

export type MeshOptions = {
  transform?: Matrix4;
  material?: Material;
  color?: Color;
};
export class Mesh extends Node {
  material: Material;
  geometry: Geometry;
  color: Color = color(1, 1, 1);
  constructor(public name: string, scene: Scene) {
    super(name, scene);

    scene.addMesh(this);
  }
}
