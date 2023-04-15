import { vec3, Vector } from './math/vector';
import { lookAt, orthographic, perspective } from './math/transform';
import { Scene } from './scene';
import { Matrix } from './math/matrix';
import { int } from './types';
import { Node } from './node';
type CameraOptions = {
  position?: Vector;
  target: Vector;
  up?: Vector;
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
  position: vec3(0, 0, 0),
  target: vec3(0, 0, 1),
  up: vec3(0, 1, 0),
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
  target: Vector;
  up: Vector;
  moving: boolean;
  lastMovingInfo: {
    x: number;
    y: number;
  };
  constructor(public name: string, scene: Scene) {
    super(name, scene);
    scene.setCamera(this);
  }
  abstract getViewProjectionMatrix(): Matrix;
  abstract getProjectionMatrix(): Matrix;
  view() {
    return lookAt(this.position, this.target, this.up);
  }
  attachControl(canvas: HTMLCanvasElement) {
    const d = this.target.sub(this.position).times(1 / 10);
    canvas.addEventListener('wheel', e => {
      if (!this.target.sub(this.position).equils(d)) {
        console.log(e);
        if ((e as any).wheelDelta > 0) this.position.subInPlace(d);
        else this.position.addInPlace(d);
      }
    });
    canvas.addEventListener('mousedown', e => {
      this.moving = true;
      this.lastMovingInfo = {
        x: e.clientX,
        y: e.clientY,
      };
    });
    canvas.addEventListener('mouseup', e => {
      this.moving = false;
    });
    canvas.addEventListener('mousemove', e => {
      if (this.moving && this.lastMovingInfo) {
        const x = e.clientX - this.lastMovingInfo.x;
        console.log([e.clientX, this.lastMovingInfo.x]);

        const left = x >= 0;
        console.log(left);

        const y = e.clientY - this.lastMovingInfo.y;
        const bottom = y >= 0;
        if (x != 0) {
          this.position.addInPlace(vec3(((left ? -1 : 1) * 1) / 10, 0, 0));

          this.target.addInPlace(vec3(((left ? -1 : 1) * 1) / 10, 0, 0));
        }

        if (y != 0) {
          this.position.addInPlace(vec3(0, ((bottom ? -1 : 1) * 1) / 10, 0));

          this.target.addInPlace(vec3(0, ((bottom ? -1 : 1) * 1) / 10, 0));
        }
      }
    });
  }
}

export class OrthographicCamera extends Camera {
  l: int;
  r: int;
  b: int;
  t: int;
  n: int;
  f: int;
  getViewProjectionMatrix(): Matrix {
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
  getViewProjectionMatrix(): Matrix {
    return this.getProjectionMatrix().mul(this.view());
  }
}

export function createPerspectiveCamera(name: string, options: PerspectiveCameraOptions, scene: Scene) {
  return new PerspectiveCamera(name, options, scene);
}
export function createOrthographicCamera(name: string, options: OrthographicCameraOptions, scene: Scene) {
  return new OrthographicCamera(name, options, scene);
}
