import { System } from '../system';
import { Scene } from '../../entity/scene/scene';

export class RenderSystem extends System {
  private constructor() {
    super();
  }
  public static forwardRendering(scene: Scene) {}
  public static deferredRendering(scene: Scene) {}
}
