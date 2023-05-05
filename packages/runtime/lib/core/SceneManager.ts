export class SceneManager {
  private static instance: SceneManager;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager(engine);
    }

    return SceneManager.instance;
  }
}

export function useSceneManager() {
  return SceneManager.getInstance();
}
