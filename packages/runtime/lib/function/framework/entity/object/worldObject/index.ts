import { PositionComponent } from '../../../component/position';
import { Entity } from '../../entity';
import { TransformComponent } from '../../../component/transform';

export class WorldObject extends Entity {
  name: string;
  transform;
  bound: any;
  constructor() {
    super();
    const position = new PositionComponent();
    const transform = new TransformComponent();
    this.addComponent(position);
    this.addComponent(transform);
  }

  getPosition() {}
  getTransoform() {}
}

export function createWorldObject() {
  const wo = new WorldObject();
  return wo;
}
