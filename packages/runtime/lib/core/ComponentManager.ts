export class ComponentManager {
  private static instance: ComponentManager;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!ComponentManager.instance) {
      ComponentManager.instance = new ComponentManager(engine);
    }

    return ComponentManager.instance;
  }
}

export function useComponentManager() {
  return ComponentManager.getInstance();
}
