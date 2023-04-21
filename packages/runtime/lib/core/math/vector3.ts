import { vec4 } from '../..';
import { vec2 } from './vector2';
import { Vector } from './vector';
export class Vector3 extends Vector {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
    super();
    this.setFrom(Float32Array.of(x, y, z));
  }
  toVector4(w: number = 1) {
    return vec4(this.x, this.y, this.z, w);
  }
  toVector2() {
    return vec2(this.x, this.y);
  }
  clone() {
    return vec3().setFrom(this.toArray());
  }

  setOf(x: number, y: number, z: number) {
    const d = this.toArray();
    d[0] = x;
    d[1] = y;
    d[2] = z;
  }

  equils(v: Vector3) {
    let e = false;
    if (v.getOffset() == this.getOffset()) {
      if (this.toArray().toString() == v.toArray().toString()) e = true;
    }
    return e;
  }
  mulInPlace(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] *= t[0];
    d[1] *= t[1];
    d[2] *= t[2];
    return this;
  }
  mul(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] * t[0];
    const b = d[1] * t[1];
    const c = d[2] * t[2];
    return vec3(a, b, c);
  }
  addInPlace(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] += t[0];
    d[1] += t[1];
    d[2] += t[2];
    return this;
  }
  add(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] + t[0];
    const b = d[1] + t[1];
    const c = d[2] + t[2];
    return vec3(a, b, c);
  }
  subInPlace(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] -= t[0];
    d[1] -= t[1];
    d[2] -= t[2];
    return this;
  }
  sub(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] - t[0];
    const b = d[1] - t[1];
    const c = d[2] - t[2];
    return vec3(a, b, c);
  }
  scale(t: number) {
    const d = this.toArray();
    d[0] *= t;
    d[1] *= t;
    d[2] *= t;
    return this;
  }
  getNorm() {
    const d = this.toArray();
    const r = d[0] ** 2 + d[1] ** 2 + d[2] ** 2;
    return Math.sqrt(r);
  }
  getLength() {
    return this.getNorm();
  }
  normalizing() {
    const d = this.toArray();
    const n = this.getNorm();

    d[0] /= n;
    d[1] /= n;
    d[2] /= n;
    return this;
  }
  dot(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    return d[0] * t[0] + d[1] * t[1] + d[2] * t[2];
  }
  cross(v: Vector3) {
    const d = this.toArray();
    const t = v.toArray();
    return vec3(d[1] * t[2] - d[2] * t[1], d[0] * t[2] - d[2] * t[0], d[0] * t[1] - d[1] * t[0]);
  }
  getCosAngleWith(v: Vector3) {
    return (this.dot(v) / this.getNorm()) * v.getNorm();
  }
  isOrthogonalWith(v: Vector3) {
    return this.dot(v) == 0;
  }
}

export function vec3(x: number = 0, y: number = 0, z: number = 0) {
  return new Vector3(x, y, z);
}
