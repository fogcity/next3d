import { useNodeId } from './core/common';
import { vec4, Vector4, Matrix4, rotate, translate } from './math';
import { Scene } from './scene';

export type NodeOptions = {};
export class Node {
  id: number;
  parent: Node;
  children: Node;
  scene: Scene;
  transform: Matrix4 = Matrix4.I();
  private position: Vector4 = vec4(0, 0, 0);
  constructor(public name: string, scene?: Scene, options?: NodeOptions) {
    this.id = useNodeId();

    scene && scene.addNode(this);
  }
  translate(x: number, y: number, z: number) {
    const m = translate(x, y, z);
    this.applyTransform(m);
  }

  rotate(x: number, y: number, z: number) {
    const m = rotate(x, y, z);
    this.applyTransform(m);
  }
  applyTransform(m: Matrix4) {
    this.transform = m.mul(this.transform);
  }
  getPosition() {
    return Matrix4.Apply(this.transform, this.position);
  }
  getOriginPosition() {
    return this.position;
  }
  getTransform() {
    return this.transform;
  }
  getModelViewMatrix() {}
  getEngine() {
    return this.scene.engine;
  }
  getScene() {
    return this.scene;
  }
}
