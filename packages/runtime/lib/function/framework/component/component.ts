export type ComponentType =
  | 'color'
  | 'position'
  | 'node'
  | 'camera'
  | 'light'
  | 'material'
  | 'geometry'
  | 'transform'
  | 'orthographic'
  | 'perspective';
export class Component {
  constructor(public type: ComponentType) {}
}
