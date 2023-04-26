import { Component } from './component';

export class GeometryComponent extends Component {
  constructor(
    public vertex: Float32Array,
    public index: Int32Array | Uint32Array | Uint16Array,
    public vertexCount: number,
    public indexCount: number,
  ) {
    super('geometry');
  }
  public static Ground = new GeometryComponent();
}
