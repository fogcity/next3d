import { useMesh } from '.';
import { GeometryComponent } from '../../../component/geometry';
import { MaterialComponent } from '../../../component/material';
import { vertex, index, vertexCount, indexCount } from '../../../../../resource/geometry/box';

export function useBoxMesh(material: MaterialComponent) {
  const geo = new GeometryComponent(vertex, index, vertexCount, indexCount);
  return useMesh(geo, material);
}
