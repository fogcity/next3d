import { Component } from './component';
import { vertex, index, vertexCount, indexCount } from '../../../resource/geometry/ground';
import * as Box from '../../../resource/geometry/box';
export class GeometryComponent extends Component {
  constructor(
    public vertex: Float32Array,
    public index: Int32Array | Uint32Array | Uint16Array,
    public vertexCount: number,
    public indexCount: number,
  ) {
    super('geometry');
  }
  public static Ground = new GeometryComponent(vertex, index, vertexCount, indexCount);
  public static Box = new GeometryComponent(Box.vertex, Box.index, Box.vertexCount, Box.indexCount);
}
