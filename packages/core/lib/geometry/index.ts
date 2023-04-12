import { FloatArray, IndicesArray, int } from '../types';

import * as box from './box';
import * as sphere from './sphere';
import * as ground from './ground';

export class Geometry {
  constructor(public vertex: FloatArray, public index: IndicesArray, public vertexCount: int, public indexCount: int) {}

  static Box = new Geometry(box.vertex, box.index, box.vertexCount, box.indexCount);
  static Sphere = new Geometry(box.vertex, box.index, box.vertexCount, box.indexCount);
  static Ground = new Geometry(box.vertex, box.index, box.vertexCount, box.indexCount);
}

export function createBoxGeometry() {
  return new Geometry(box.vertex, box.index, box.vertexCount, box.indexCount);
}
export function createSphereGeometry() {
  return new Geometry(sphere.vertex, sphere.index, sphere.vertexCount, sphere.indexCount);
}
export function createGroundGeometry() {
  return new Geometry(ground.vertex, ground.index, ground.vertexCount, ground.indexCount);
}
