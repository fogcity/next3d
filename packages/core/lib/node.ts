import { useNodeId } from './core/common';
import { Matrix } from './math/matrix';
import { Vector } from './math/vector';
import { Scene } from './scene';

export type NodeOptions = {};
export class Node {
  id: number;
  parent: Node;
  children: Node;
  scene: Scene;
  transform:Matrix
  position:Vector
  constructor(public name: string, scene: Scene, options?: NodeOptions) {
    this.id = useNodeId();
    scene.addNode(this);
  }
  translate() {}
  rotate(){}

  getWorldMatrix() {}
  getEngine() {
    return this.scene.engine;
  }
  getScene() {
    return this.scene;
  }
}
