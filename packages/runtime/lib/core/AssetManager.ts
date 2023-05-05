export class AssetManager {
  private static instance: AssetManager;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager(engine);
    }

    return AssetManager.instance;
  }
}

export function useAssetManager() {
  return AssetManager.getInstance();
}
