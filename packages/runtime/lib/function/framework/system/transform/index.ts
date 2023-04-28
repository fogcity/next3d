import { System } from '../system';
import { Entity } from '../../entity/entity';

export class TransformSystem extends System {
  private constructor() {
    super();
  }
  public static extension = {
    translate: () => {},
    rotate: () => {},
    scale: () => {},
  };
  public static extendEntity() {
    Object.assign(Entity.prototype, TransformSystem.extension);
  }
}
