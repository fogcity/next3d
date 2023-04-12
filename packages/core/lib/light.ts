import { createColor } from './color';
import { Scene } from './scene';
import { FloatArray } from './types';
import { vec3, Vector } from './math/vector';
import { Node } from './node';
export type LightOptions = {
  color?: Vector;
  position: Vector;
  intensity?: number;
  radius?: number;
  render?: boolean;
};
const defaulLightOptions = {
  position: vec3(0, 0, 0),
  color: createColor(1, 1, 1),
  intensity: 1,
  radius: 5,
  render: false,
};
export abstract class Light extends Node {
  radius: number;
  position: Vector;
  color: Vector;
  intensity: number;
  render: boolean = false;
  enabled: boolean = true;
  constructor(public name: string, scene: Scene, options?: LightOptions) {
    super(name, scene);
    for (const key in options) {
      this[key] = options[key];
    }
    scene.addLight(this);
  }
  toArray() {
    return new Float32Array([
      this.position.toArray()[0],
      this.position.toArray()[1],
      this.position.toArray()[2],
      this.color.toArray()[0],
      this.color.toArray()[1],
      this.color.toArray()[2],
      this.intensity,
      this.radius,
    ]);
  }
}
export class PointLight extends Light {
  constructor(public name: string, scene: Scene, options: LightOptions) {
    super(name, scene, options);
  }
}
export class SpotLight extends Light {
  constructor(public name: string, scene: Scene, options: LightOptions) {
    super(name, scene, options);
  }
}

export function createPointLight(name: string, scene: Scene, options: LightOptions) {
  return new PointLight(name, scene, options);
}
