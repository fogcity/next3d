export class Quaternion {
  private data: Float32Array;
  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {
    this.data = new Float32Array([x, y, z, w]);
  }
  getOffset() {
    return this.data.byteLength;
  }
  toArray() {
    return this.data;
  }
  clone() {
    return createQuaternion().setFrom(this.data);
  }
  setOf(r: number, g: number, b: number, a: number) {
    this.data[0] = r;
    this.data[1] = g;
    this.data[2] = b;
    this.data[3] = a;
  }
  setFrom(vector: ArrayLike<number>) {
    this.data[0] = vector[0];
    this.data[1] = vector[1];
    this.data[2] = vector[2];
    this.data[3] = vector[3];
  }
}
export function createQuaternion(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
  return new Quaternion(x, y, z, w);
}
