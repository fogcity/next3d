import { Color, color } from './math/color';
import { Scene } from './scene';
import { FloatArray } from './types';
import { vec4, Vector4 } from './math/vector';
import { Node } from './node';
export type LightOptions = {
  color?: Color;
  position: Vector4;
  intensity?: number;
  radius?: number;
  render?: boolean;
};
const defaulLightOptions = {
  position: vec4(0, 0, 0),
  color: color(1, 1, 1),
  intensity: 1,
  radius: 5,
  render: false,
};
export abstract class Light extends Node {
  radius: number;
  color: Color;
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
      ...this.position.toVector3().toArray(),
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
