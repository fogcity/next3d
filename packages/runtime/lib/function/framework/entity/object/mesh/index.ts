import { createWorldObject } from '..';
import { GeometryComponent } from '../../../component/geometry';
import { MaterialComponent } from '../../../component/material';

export function useMesh(geo: GeometryComponent, material: MaterialComponent) {
  const mesh = createWorldObject();
  mesh.addComponent(geo);
  mesh.addComponent(material);
}
