export abstract class Matrix {
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
