import { Component } from './component';

export class OrthographicComponent extends Component {
  constructor(
    public l: number,
    public r: number,
    public b: number,
    public t: number,
    public n: number,
    public f: number,
  ) {
    super('orthographic');
  }
}
