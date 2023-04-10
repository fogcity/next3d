import { Color, color3 } from './color';
import { Scene } from './scene';
import { FloatArray } from './types';
import { vec3, Vector } from './math/vector';
export type LightOptions = {
  color?: Vector;
  position: Vector;
  intensity?: number;
  radius?: number;
  render?: boolean;
};
const defaulLightOptions = {
  position: vec3(0, 0, 0),
  color: color3(1, 1, 1),
  intensity: 1,
  radius: 5,
  render: false,
};
export abstract class Light {
  radius: number;
  position: Vector;
  color: Vector;
  intensity: number;
  render: boolean;
  constructor(public name: string, options: LightOptions, scene: Scene) {
    for (const key in defaulLightOptions) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      } else this[key] = defaulLightOptions[key];
    }
    console.log('this', this);

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
  constructor(public name: string, options: LightOptions, scene: Scene) {
    super(name, options, scene);
  }
}

export function createPointLight(name: string, options: LightOptions, scene: Scene) {
  return new PointLight(name, options, scene);
}
