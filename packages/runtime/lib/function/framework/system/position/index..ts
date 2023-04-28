import { System } from '../system';
import { Entity } from '../../entity/entity';

export class PositionSystem extends System {
  private constructor() {
    super();
  }
  public static extension = {
    x: 0,
    y: 0,
    z: 0,
    getPosition: () => {},
  };
  public static extendEntity() {
    Object.assign(Entity.prototype, PositionSystem.extension);
  }
}
