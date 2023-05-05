export class ConfigManager {
  private static instance: ConfigManager;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager(engine);
    }

    return ConfigManager.instance;
  }
}

export function useConfigManager() {
  return ConfigManager.getInstance();
}
