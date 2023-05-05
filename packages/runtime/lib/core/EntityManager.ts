export class EntityManager {
  private static instance: EntityManager;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager(engine);
    }

    return EntityManager.instance;
  }
}

export function useEntityManager() {
  return EntityManager.getInstance();
}
