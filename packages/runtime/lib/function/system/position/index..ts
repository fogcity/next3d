import { System } from '../system';
import { Entity } from '../../entity/entity';

export class PositionSystem extends System {
  public static extensions = {
    x: 0,
    y: 0,
    z: 0,
  };
}
