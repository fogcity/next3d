abstract class Vector {
  private data: Float32Array;

  getOffset() {
    return this.data.byteLength;
  }
  toArray() {
    return this.data;
  }
  setFrom(m: ArrayLike<number>) {
    this.data = Float32Array.from(m);
  }
}
export class Vector4 extends Vector {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {
    super();
    this.setFrom(Float32Array.of(x, y, z, w));
  }
  toVector3() {
    return new Vector3(this.x, this.y, this.z);
  }
  toVector2() {
    return new Vector2(this.x, this.y);
  }
  clone() {
    return vec4().setFrom(this.toArray());
  }
  setOf(x: number, y: number, z: number, w: number) {
    const d = this.toArray();
    d[0] = x;
    d[1] = y;
    d[2] = z;
    d[3] = w;
  }
  equils(v: Vector4) {
    let e = false;
    if (v.getOffset() == this.getOffset()) {
      if (this.toArray().toString() == v.toArray().toString()) e = true;
    }
    return e;
  }
  mulInPlace(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] *= t[0];
    d[1] *= t[1];
    d[2] *= t[2];
    return this;
  }
  mul(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] * t[0];
    const b = d[1] * t[1];
    const c = d[2] * t[2];
    return vec3(a, b, c);
  }
  addInPlace(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] += t[0];
    d[1] += t[1];
    d[2] += t[2];
    return this;
  }
  add(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] + t[0];
    const b = d[1] + t[1];
    const c = d[2] + t[2];
    return vec4(a, b, c);
  }
  subInPlace(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    d[0] -= t[0];
    d[1] -= t[1];
    d[2] -= t[2];
    return this;
  }
  sub(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    const a = d[0] - t[0];
    const b = d[1] - t[1];
    const c = d[2] - t[2];
    return vec4(a, b, c);
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

  dot(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    return d[0] * t[0] + d[1] * t[1] + d[2] * t[2];
  }
  cross(v: Vector4) {
    const d = this.toArray();
    const t = v.toArray();
    return vec4(d[1] * t[2] - d[2] * t[1], d[2] * t[0] - d[0] * t[2], d[0] * t[1] - d[1] * t[0]);
  }
  getCosAngleWith(v: Vector4) {
    return (this.dot(v) / this.getNorm()) * v.getNorm();
  }
  isOrthogonalWith(v: Vector4) {
    return this.dot(v) == 0;
  }
}
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
export function vec3(x: number = 0, y: number = 0, z: number = 0) {
  return new Vector3(x, y, z);
}
export function vec4(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
  return new Vector4(x, y, z, w);
}
