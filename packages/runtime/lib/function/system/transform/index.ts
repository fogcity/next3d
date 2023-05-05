import { System } from '../system';
import { Entity } from '../../entity/entity';

export class TransformSystem extends System {
  public static extensions = {
    translate: () => {},
    rotate: () => {},
    scale: () => {},
  };
}
