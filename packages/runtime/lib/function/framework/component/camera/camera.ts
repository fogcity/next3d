import { Vector4, vec4, Scene, Matrix4, lookAt } from '../../../..';
import { Node } from '../../scene/node';
export abstract class Camera extends Node {
  angularSensibility: number;
  moveSensibility: number;
  target: Vector4 = vec4(0, 0, 0);
  up: Vector4 = vec4(0, 1, 0);
  moving: boolean;
  lastMovingInfo: {
    x: number;
    y: number;
  };
  constructor(public name: string, scene: Scene) {
    super(name, scene);
    scene && scene.setCamera(this);
  }
  abstract getViewProjectionMatrix(): Matrix4;
  abstract getProjectionMatrix(): Matrix4;
  view() {
    return lookAt(this.getPosition(), this.target, this.up);
  }
  attachControl(canvas: HTMLCanvasElement) {}
}
