import { mat4, Matrix4 } from './matrix';
import { Vector4 } from './vector';

export function radians(angle: number) {
  return (angle * Math.PI) / 180;
}
function triangle(angle: number) {
  return [Math.sin(radians(angle)), Math.cos(radians(angle))];
}

// 为了解决平移，引入齐次坐标
export function translate(x: number = 0, y: number = 0, z: number = 0) {
  return mat4([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
}

function rotateX(angle: number) {
  const [s, c] = triangle(angle);
  return mat4([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
}

function rotateY(angle: number) {
  const [s, c] = triangle(angle);
  return mat4([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
}

function rotateZ(angle: number) {
  const [s, c] = triangle(angle);
  return mat4([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

export function rotate(x: number, y?: number, z?: number) {
  let r = Matrix4.I();
  if (x) {
    r = rotateX(x).mul(r);
  }

  if (y) {
    r = rotateY(y).mul(r);
  }

  if (z) {
    r = rotateZ(z).mul(r);
  }
  return r;
}

export function scale(x?: number, y?: number, z?: number) {
  return mat4([x || 1, 0, 0, 0, 0, y || 1, 0, 0, 0, 0, z || 1, 0, 0, 0, 0, 1]);
}
export function scaleX(x: number) {
  return mat4([x || 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
export function scaleY(y: number) {
  return mat4([1, 0, 0, 0, 0, y || 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
export function scaleZ(z: number) {
  return mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, z || 1, 0, 0, 0, 0, 1]);
}

export function reflect(x?: boolean, y?: boolean, z?: boolean) {
  return mat4([x ? -1 : 1, 0, 0, 0, 0, y ? -1 : 1, 0, 0, 0, 0, z ? -1 : 1, 0, 0, 0, 0, 1]);
}
/**
 * view transform
 * @param position Point
 * @param target Point
 * @param up Direction
 * @returns View Matrix Mat4x4
 */
export function lookAt(position: Vector4, target: Vector4, up: Vector4) {
  // 相当于物体相对于相机相对于原点的运动
  // 先平移相机到原点

  const ap = position.toArray();

  const tv = translate(-ap[0], -ap[1], -ap[2]);

  // 再旋转相机坐标系到原坐标系
  // 由于不好算，先算逆，即原坐标系旋转到相机坐标系
  // 又由于正交矩阵的逆等于转置
  // 用lookat叉乘up得到x方向

  const ng = target.sub(position).normalizing();
  const nt = up.normalizing();
  const nx = nt.cross(ng).normalizing();
  const ang = ng.toArray();
  const ant = nt.toArray();
  const anx = nx.toArray();
  // const nx = g.cross(up);
  const rotate = mat4([anx[0], anx[1], anx[2], 0, ant[0], ant[1], ant[2], 0, ang[0], ang[1], ang[2], 0, 0, 0, 0, 1]);
  return rotate.mul(tv);
}
export function orthographic(l: number, r: number, b: number, t: number, n: number, f: number) {
  // 把世界坐标区域缩放到对应技术平台的标准NDC
  // 这里是webgpu的左手坐标系的z位0-1的区域
  const translateMat = translate(-(r + l) / 2, -(t + b) / 2, -(f + n) / 2);
  const scaleMat = scale(2 / (r - l), 2 / (t - b), 2 / (f - n));
  return scaleMat.mul(translateMat);
}

export function perspective(n: number, f: number, fov: number = 150, aspectRatio: number = 1) {
  const t = Math.tan(radians(fov / 2)) * n;
  const r = aspectRatio * t;
  const l = -r;
  const b = -t;
  // 先把视锥体压缩成透视正交体
  const frustumToOrthMat = mat4([n, 0, 0, 0, 0, n, 0, 0, 0, 0, n + f, -n * f, 0, 0, 1, 0]);

  // 再用正交投影
  const orth = orthographic(l, r, b, t, n, f);

  return orth.mul(frustumToOrthMat);
}
