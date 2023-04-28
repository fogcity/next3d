import { useMesh } from '.';
import { GeometryComponent } from '../../../component/geometry';
import { MaterialComponent } from '../../../component/material';
import { vertex, index, vertexCount, indexCount } from '../../../../../resource/geometry/ground';

export function useGroundMesh(material: MaterialComponent) {
  const geo = new GeometryComponent(vertex, index, vertexCount, indexCount);
  const ground = useMesh(geo, material);
  return ground;
}
