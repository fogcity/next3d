import { DType, mat4 } from './matrix';

export class Vector {
  private data: Float32Array;
  ndim: number = 4;
  constructor(x: number, y: number, z: number = 0, w: number = 0) {
    this.data = new Float32Array([x, y, z, w]);
  }
  getOffset() {
    return this.data.byteLength;
  }
  toArray() {
    return this.data;
  }
  set(data: number[]) {
    this.data = new Float32Array(data);
  }
  equils(v: Vector) {
    let e = false;
    if (v.data.byteLength == this.data.byteLength) {
      if (this.data.toString() == v.data.toString()) e = true;
    }
    return e;
  }
  mulInPlace(v: Vector) {
    this.data[0] *= v.data[0];
    this.data[1] *= v.data[1];
    this.data[2] *= v.data[2];
    return this;
  }
  mul(v: Vector) {
    const a = this.data[0] * v.data[0];
    const b = this.data[1] * v.data[1];
    const c = this.data[2] * v.data[2];
    return vec3(a, b, c);
  }
  addInPlace(v: Vector) {
    this.data[0] += v.data[0];
    this.data[1] += v.data[1];
    this.data[2] += v.data[2];
    return this;
  }
  add(v: Vector) {
    const a = this.data[0] + v.data[0];
    const b = this.data[1] + v.data[1];
    const c = this.data[2] + v.data[2];
    return vec3(a, b, c);
  }
  subInPlace(v: Vector) {
    this.data[0] -= v.data[0];
    this.data[1] -= v.data[1];
    this.data[2] -= v.data[2];
    return this;
  }
  sub(v: Vector) {
    const a = this.data[0] - v.data[0];
    const b = this.data[1] - v.data[1];
    const c = this.data[2] - v.data[2];
    return vec3(a, b, c);
  }
  times(t: number) {
    this.data[0] *= t;
    this.data[1] *= t;
    this.data[2] *= t;
    return this;
  }
  norm() {
    const r = this.data[0] ** 2 + this.data[1] ** 2 + this.data[2] ** 2;
    return Math.sqrt(r);
  }
  normalizing() {
    const n = this.norm();

    this.data[0] /= n;
    this.data[1] /= n;
    this.data[2] /= n;
    return this;
  }
  dot(v: Vector) {
    return this.data[0] * v.data[0] + this.data[1] * v.data[1] + this.data[2] * v.data[2];
  }
  cross(v: Vector) {
    return vec3(
      this.data[1] * v.data[2] - this.data[2] * v.data[1],
      this.data[0] * v.data[2] - this.data[2] * v.data[0],
      this.data[0] * v.data[1] - this.data[1] * v.data[0],
    );
  }
  cos(v: Vector) {
    return (this.dot(v) / this.norm()) * v.norm();
  }
  orthogonal(v: Vector) {
    return this.dot(v) == 0;
  }
}

export function vec2(x: number, y: number) {
  return new Vector(x, y);
}
export function vec3(x: number, y: number, z: number) {
  return new Vector(x, y, z);
}
