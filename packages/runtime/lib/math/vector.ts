export abstract class Vector {
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
