import { Component } from './component';

export class TransformComponent extends Component {
  translateX: number;
  translateY: number;
  translateZ: number;
  rotationX: number;
  rotationY: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  constructor() {
    super('transform');
  }
}
