import { vec4, Vector4 } from './math/vector';
import { lookAt, orthographic, perspective } from './math/transform';
import { Scene } from './scene';
import { Matrix4 } from './math/matrix';
import { int } from './types';
import { Node } from './node';
type CameraOptions = {
  position?: Vector4;
  target: Vector4;
  up?: Vector4;
};

type OrthographicCameraOptions = CameraOptions &
  Partial<{
    l: number;
    r: number;
    b: number;
    t: number;
    n: number;
    f: number;
  }>;

type PerspectiveCameraOptions = CameraOptions &
  Partial<{
    n: number;
    f: number;
    fov: number;
    aspectRatio: number;
  }>;
const defaulCameraOptions = {
  position: vec4(0, 0, 0),
  target: vec4(0, 0, 1),
  up: vec4(0, 1, 0),
};
const defaulOrthographicCameraOptions = {
  ...defaulCameraOptions,
  l: 5,
  r: 5,
  b: 5,
  t: 5,
  n: 0,
  f: 5,
};
const defaulPerspectiveCameraOptions = {
  ...defaulCameraOptions,
  n: 0.01,
  f: 1000,
  fov: 150,
  aspectRatio: 1,
};

export abstract class Camera extends Node {
  angularSensibility: number;
  moveSensibility: number;
  target: Vector4;
  up: Vector4;
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

export class OrthographicCamera extends Camera {
  l: int;
  r: int;
  b: int;
  t: int;
  n: int;
  f: int;
  getViewProjectionMatrix(): Matrix4 {
    return this.getProjectionMatrix().mul(this.view());
  }

  constructor(public name: string, options: OrthographicCameraOptions, scene: Scene) {
    super(name, scene);
    for (const key in defaulOrthographicCameraOptions) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      } else this[key] = defaulOrthographicCameraOptions[key];
    }
  }
  getProjectionMatrix() {
    return orthographic(this.l, this.r, this.b, this.t, this.n, this.f);
  }
}
export class PerspectiveCamera extends Camera {
  n: int;
  f: int;
  fov: int = 150;
  aspectRatio: int = 1;
  constructor(public name: string, options: PerspectiveCameraOptions, scene: Scene) {
    super(name, scene);
    for (const key in defaulPerspectiveCameraOptions) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      } else this[key] = defaulPerspectiveCameraOptions[key];
    }
  }
  getProjectionMatrix() {
    return perspective(this.n, this.f, this.fov, this.aspectRatio);
  }
  getViewProjectionMatrix(): Matrix4 {
    return this.getProjectionMatrix().mul(this.view());
  }
}

export function createPerspectiveCamera(name: string, options: PerspectiveCameraOptions, scene?: Scene) {
  return new PerspectiveCamera(name, options, scene);
}
export function createOrthographicCamera(name: string, options: OrthographicCameraOptions, scene?: Scene) {
  return new OrthographicCamera(name, options, scene);
}
