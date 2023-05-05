import { Component } from './component';

export class MaterialComponent extends Component {
  constructor(public specular: number, public shininess: number, public diffuse: number, public ambient: number = 1) {
    super('material');
  }
}
