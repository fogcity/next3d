import { Vector4, vec4 } from '../../../core/math';
import { Component } from './component';

export class CameraComponent extends Component {
  constructor(public target: Vector4 = vec4(0, 0, 0), public up: Vector4 = vec4(0, 1, 0)) {
    super('camera');
  }
}
