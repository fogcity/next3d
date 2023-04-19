import { vec3, vec4, Vector3, Vector4 } from './vector';

abstract class Matrix {
  private data: Float32Array;
  constructor(data: number[] | number[][]) {
    this.data = Float32Array.from(data.flat());
  }

  getSize() {
    return this.data.length;
  }
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
export class Matrix4 extends Matrix {
  toMatrix3() {
    const d = this.toArray();
    return mat3([...d.slice(0, 3), ...d.slice(3, 6), ...d.slice(6, 9)]);
  }
  setOf(
    e1: number,
    e2: number,
    e3: number,
    e4: number,
    e5: number,
    e6: number,
    e7: number,
    e8: number,
    e9: number,
    e10: number,
    e11: number,
    e12: number,
    e13: number,
    e14: number,
    e15: number,
    e16: number,
  ) {
    const d = this.toArray();
    d[0] = e1;
    d[1] = e2;
    d[2] = e3;
    d[3] = e4;
    d[4] = e5;
    d[5] = e6;
    d[6] = e7;
    d[7] = e8;
    d[8] = e9;
    d[9] = e10;
    d[10] = e11;
    d[11] = e12;
    d[12] = e13;
    d[13] = e14;
    d[14] = e15;
    d[15] = e16;
  }
  clone() {
    return mat4().setFrom(this.toArray());
  }
  inverses() {}

  mul(target: Matrix4) {
    const d = this.toArray();
    const t = target.toArray();
    const v1 = d[0] * t[0] + d[1] * t[4] + d[2] * t[8] + d[3] * t[12];
    const v2 = d[0] * t[1] + d[1] * t[5] + d[2] * t[9] + d[3] * t[13];
    const v3 = d[0] * t[2] + d[1] * t[6] + d[2] * t[10] + d[3] * t[14];
    const v4 = d[0] * t[3] + d[1] * t[7] + d[2] * t[11] + d[3] * t[15];
    const v5 = d[4] * t[0] + d[5] * t[4] + d[6] * t[8] + d[7] * t[12];
    const v6 = d[4] * t[1] + d[5] * t[5] + d[6] * t[9] + d[7] * t[13];
    const v7 = d[4] * t[2] + d[5] * t[6] + d[6] * t[10] + d[7] * t[14];
    const v8 = d[4] * t[3] + d[5] * t[7] + d[6] * t[11] + d[7] * t[15];
    const v9 = d[8] * t[0] + d[9] * t[4] + d[10] * t[8] + d[11] * t[12];
    const v10 = d[8] * t[1] + d[9] * t[5] + d[10] * t[9] + d[11] * t[13];
    const v11 = d[8] * t[2] + d[9] * t[6] + d[10] * t[10] + d[11] * t[14];
    const v12 = d[8] * t[3] + d[9] * t[7] + d[10] * t[11] + d[11] * t[15];

    const v13 = d[12] * t[0] + d[13] * t[4] + d[14] * t[8] + d[15] * t[12];
    const v14 = d[12] * t[1] + d[13] * t[5] + d[14] * t[9] + d[15] * t[13];
    const v15 = d[12] * t[2] + d[13] * t[6] + d[14] * t[10] + d[15] * t[14];
    const v16 = d[12] * t[3] + d[13] * t[7] + d[14] * t[11] + d[15] * t[15];
    const result = [v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16];
    return mat4(result);
  }

  apply(target: Vector4, lh: false) {
    const d = this.toArray();
    console.log(target);

    const t = target.toArray();
    const v1 = t[0] * d[0] + t[1] * d[1] + t[2] * d[2] + t[3] * d[3];
    const v2 = t[0] * d[4] + t[1] * d[5] + t[2] * d[6] + t[3] * d[7];
    const v3 = t[0] * d[8] + t[1] * d[9] + t[2] * d[10] + t[3] * d[11];
    const v4 = t[0] * d[12] + t[1] * d[13] + t[2] * d[14] + t[3] * d[15];
    target.setOf(v1, v2, v3, v4);
  }
  static Transpose(matrix: Matrix): Matrix4 {
    const d = matrix.toArray();
    const nd = new Float32Array(16);
    nd[0] = d[0];
    nd[1] = d[4];
    nd[2] = d[8];
    nd[3] = d[12];
    nd[4] = d[1];
    nd[5] = d[5];
    nd[6] = d[9];
    nd[7] = d[13];
    nd[8] = d[2];
    nd[9] = d[6];
    nd[10] = d[10];
    nd[11] = d[14];
    nd[12] = d[3];
    nd[13] = d[7];
    nd[14] = d[11];
    nd[15] = d[15];
    const r = mat4();
    r.setFrom(nd);
    return r;
  }
  transpose() {
    const d = this.toArray();
    const nd = new Float32Array(16);
    nd[0] = d[0];
    nd[1] = d[4];
    nd[2] = d[8];
    nd[3] = d[12];
    nd[4] = d[1];
    nd[5] = d[5];
    nd[6] = d[9];
    nd[7] = d[13];
    nd[8] = d[2];
    nd[9] = d[6];
    nd[10] = d[10];
    nd[11] = d[14];
    nd[12] = d[3];
    nd[13] = d[7];
    nd[14] = d[11];
    nd[15] = d[15];
    this.setFrom(nd);
    return this;
  }
  static Apply(matrix: Matrix4, vector: Vector4) {
    const m = matrix.toArray();
    const t = vector.toArray();

    const v1 = t[0] * m[0] + t[1] * m[1] + t[2] * m[2] + t[3] * m[3];

    const v2 = t[0] * m[4] + t[1] * m[5] + t[2] * m[6] + t[3] * m[7];
    const v3 = t[0] * m[8] + t[1] * m[9] + t[2] * m[10] + t[3] * m[11];
    const v4 = t[0] * m[12] + t[1] * m[13] + t[2] * m[14] + t[3] * m[15];
    return vec4(v1, v2, v3, v4);
  }
  static Muls(ms: Matrix4[]) {
    return ms.reverse().reduce((a, v) => {
      a.mul(v);
      return a;
    }, Matrix4.I());
  }
  static I() {
    return new Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
}
export class Matrix3 extends Matrix {
  toMatrix4() {
    const d = this.toArray();
    return mat4([...d.slice(0, 3), 0, ...d.slice(3, 6), 0, ...d.slice(6, 9), 0, 0, 0, 0, 1]);
  }
  setOf(
    e1: number,
    e2: number,
    e3: number,
    e4: number,
    e5: number,
    e6: number,
    e7: number,
    e8: number,
    e9: number,
    e10: number,
    e11: number,
    e12: number,
  ) {
    const d = this.toArray();
    d[0] = e1;
    d[1] = e2;
    d[2] = e3;
    d[3] = e4;
    d[4] = e5;
    d[5] = e6;
    d[6] = e7;
    d[7] = e8;
    d[8] = e9;
    d[9] = e10;
    d[10] = e11;
    d[11] = e12;
  }
  clone() {
    return mat4().setFrom(this.toArray());
  }
  inverses() {}

  mul(target: Matrix) {
    const d = this.toArray();
    const t = target.toArray();
    const v1 = d[0] * t[0] + d[1] * t[3] + d[2] * t[6];

    const v2 = d[0] * t[1] + d[1] * t[4] + d[2] * t[7];

    const v3 = d[0] * t[2] + d[1] * t[5] + d[2] * t[8];

    const v4 = d[3] * t[0] + d[4] * t[3] + d[5] * t[6];

    const v5 = d[3] * t[1] + d[4] * t[4] + d[5] * t[7];

    const v6 = d[6] * t[2] + d[7] * t[5] + d[8] * t[8];
    const v7 = d[6] * t[0] + d[7] * t[3] + d[8] * t[6];

    const v8 = d[6] * t[1] + d[7] * t[4] + d[8] * t[7];

    const v9 = d[6] * t[2] + d[7] * t[5] + d[8] * t[8];

    const result = [v1, v2, v3, v4, v5, v6, v7, v8, v9];
    return mat4(result);
  }
  apply(target: Vector3) {
    const d = this.toArray();
    const t = target.toArray();
    const v1 = t[0] * d[0] + t[1] * d[1] + t[2] * d[2];
    const v2 = t[0] * d[3] + t[1] * d[4] + t[2] * d[5];
    const v3 = t[0] * d[6] + t[1] * d[7] + t[2] * d[8];

    target.setOf(v1, v2, v3);
  }

  transpose() {
    const d = this.toArray();
    const nd = new Float32Array(9);
    nd[0] = d[0];
    nd[1] = d[3];
    nd[2] = d[6];
    nd[3] = d[1];
    nd[4] = d[4];
    nd[5] = d[7];
    nd[6] = d[2];
    nd[7] = d[5];
    nd[8] = d[8];

    this.setFrom(nd);
    return this;
  }
  static Apply(m: Matrix3, v: Vector3) {
    const t = v.toArray();
    const v1 = t[0] * m[0] + t[1] * m[1] + t[2] * m[2];
    const v2 = t[0] * m[3] + t[1] * m[4] + t[2] * m[5];
    const v3 = t[0] * m[6] + t[1] * m[7] + t[2] * m[8];

    return vec3(v1, v2, v3);
  }
  // 多个矩阵级联
  static Muls(ms: Matrix3[]) {
    return ms.reverse().reduce((a, v) => {
      a.mul(v);
      return a;
    }, Matrix3.I());
  }
  static I() {
    return new Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }
}
export function mat4(m?: number[] | number[][]) {
  return m ? new Matrix4(m) : Matrix4.I();
}

export function mat3(m?: number[] | number[][]) {
  return m ? new Matrix3(m) : Matrix3.I();
}
