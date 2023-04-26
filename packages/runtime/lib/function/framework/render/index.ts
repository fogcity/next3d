import { System } from '../../../core/system';

export class RenderSystem extends System {
  private constructor() {
    super();
  }
  public static forwardRendering() {}
  public static deferredRendering() {}
}
