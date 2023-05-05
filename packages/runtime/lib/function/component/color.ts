import { Component } from './component';

export class ColorComponent extends Component {
  constructor(public r: number, public g: number, public b: number, public a: number) {
    super('color');
  }
}
