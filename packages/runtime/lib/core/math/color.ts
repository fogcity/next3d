

export class Color {
  private data: Float32Array;
  constructor(public r: number=1, public g: number=1,public  b: number=1,public  a: number = 1) {
    this.data = Float32Array.of(r,g,b,a);
  }
  getOffset() {
    return this.data.byteLength;
  }
  toArray() {
    return this.data;
  }
  clone(){
    return color().setFrom(this.data)
  }
  setOf(r: number, g: number, b: number, a: number ) {
    this.data[0]=r;
    this.data[1]=g;
    this.data[2]=b;
    this.data[3]=a;
  }
  setFrom(colors:ArrayLike<number> ) {
    this.data[0]=colors[0];
    this.data[1]=colors[1];
    this.data[2]=colors[2];
    this.data[3]=colors[3];
  }
  equils(v: Color) {
    let e = false;
    if (v.data.byteLength == this.data.byteLength) {
      if (this.data.toString() == v.data.toString()) e = true;
    }
    return e;
  }
}

export function randomColor(a: number = 1) {
  return new Color(Math.random(), Math.random(), Math.random(), a);
}
export function color(r: number=1, g: number=1, b: number=1, a: number = 1) {
  return new Color(r, g, b, a);
}
