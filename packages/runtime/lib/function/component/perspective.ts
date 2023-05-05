import { Component } from './component';

export class PerspectiveComponent extends Component {
  constructor(public zn: number, public zf: number, public fov: number = 150, public aspectRatio: number = 1) {
    super('perspective');
  }
}
