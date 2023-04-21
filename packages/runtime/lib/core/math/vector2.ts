import { vec4 } from '../..';
import { vec3 } from './vector3';
import { Vector } from './vector';
export class Vector2 extends Vector {
  constructor(public x: number = 0, public y: number = 0) {
    super();
    this.setFrom(Float32Array.of(x, y));
  }
  toVector4(z: number = 0, w: number = 1) {
    return vec4(this.x, this.y, z, w);
  }
  toVector3(z: number = 0) {
    return vec3(this.x, this.y, z);
  }
  clone() {
    return new Vector2().setFrom(this.toArray());
  }

  setOf(x: number, y: number) {
    const d = this.toArray();
    d[0] = x;
    d[1] = y;
  }

  equils(v: Vector2) {
    let e = false;
    if (v.getOffset() == this.getOffset()) {
      if (this.toArray().toString() == v.toArray().toString()) e = true;
    }
    return e;
  }
  mulInPlace(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] *= t[0];
    d[1] *= t[1];
    return this;
  }
  mul(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] * t[0];
    const b = d[1] * t[1];

    return vec2(a, b);
  }
  addInPlace(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] += t[0];
    d[1] += t[1];

    return this;
  }
  add(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] + t[0];
    const b = d[1] + t[1];
    return vec2(a, b);
  }
  subInPlace(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] -= t[0];
    d[1] -= t[1];
    return this;
  }
  sub(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] - t[0];
    const b = d[1] - t[1];
    return vec2(a, b);
  }
  scale(t: number) {
    const d = this.toArray();
    d[0] *= t;
    d[1] *= t;

    return this;
  }
  getNorm() {
    const d = this.toArray();
    const r = d[0] ** 2 + d[1] ** 2;
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
    return this;
  }
  dot(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    return d[0] * t[0] + d[1] * t[1];
  }
  cross(v: Vector2) {
    const d = this.toArray();
    const t = v.toArray();
    return d[0] * t[1] - d[1] * t[0];
  }
  getCosAngleWith(v: Vector2) {
    return (this.dot(v) / this.getNorm()) * v.getNorm();
  }
  isOrthogonalWith(v: Vector2) {
    return this.dot(v) == 0;
  }
}
export function vec2(x: number = 0, y: number = 0) {
  return new Vector2(x, y);
}
