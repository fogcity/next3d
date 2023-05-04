import { System } from '../system';
import { Entity } from '../../entity/entity';

export class ColorSystem extends System {
  public static extensions = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
    getColor: () => {},
  };
}
