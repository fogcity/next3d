import { useNodeId } from './core/common';
import { Matrix4 } from './math/matrix';
import { rotate, translate } from './math/transform';
import { vec4, Vector4 } from './math/vector';
import { Scene } from './scene';

export type NodeOptions = {};
export class Node {
  id: number;
  parent: Node;
  children: Node;
  scene: Scene;
   transform:Matrix4
   position:Vector4
  constructor(public name: string, scene: Scene, options?: NodeOptions) {
    this.id = useNodeId();
    scene.addNode(this);
  }
  translate(x:number,y:number,z:number) {
    const m = translate(x,y,z)
    m.apply(this.position)
  }
  
  rotate(x:number,y:number,z:number) {
    const m = rotate(x,y,z)
    m.apply(this.position)
  }
  getPosition(){
   return Matrix4.Apply(this.transform,this.position)
  }
  getOriginPosition(){
    return this.position
  }
  getTransform() {
    return this.transform
  }
  getModelViewMatrix() {}
  getEngine() {
    return this.scene.engine;
  }
  getScene() {
    return this.scene;
  }
}
