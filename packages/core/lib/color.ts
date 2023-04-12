import { DType, mat4 } from './math/matrix';
import { Vector } from './math/vector';

export class Color extends Vector {
  constructor(r: number, g: number, b: number, a: number = 1) {
    super(r, g, b, a);
  }
}

export function createColor(r: number, g: number, b: number, a: number = 1) {
  return new Color(r, g, b, a);
}
