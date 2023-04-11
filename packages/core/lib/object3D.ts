export type Object3DOptions = {};
export class Object3D {
  id: number;
  constructor(public name: string, options: Object3DOptions) {
    this.id = useObject3DId();
  }
  translate() {}
}
