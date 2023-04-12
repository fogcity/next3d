import { useNodeId } from './common';
import { Scene } from './scene';

export type NodeOptions = {};
export class Node {
  id: number;
  parent: Node;
  children: Node;
  scene: Scene;
  constructor(public name: string, scene: Scene, options?: NodeOptions) {
    this.id = useNodeId();
    scene.addNode(this);
  }
  translate() {}
  getWorldMatrix() {}
  getEngine() {
    return this.scene.engine;
  }
  getScene() {
    return this.scene;
  }
}
