import { useMesh } from '.';
import { GeometryComponent } from '../../../component/geometry';
import { MaterialComponent } from '../../../component/material';

export function useGroundMesh(material: MaterialComponent) {
  const geo = new GeometryComponent();
  return useMesh(geo, material);
}
