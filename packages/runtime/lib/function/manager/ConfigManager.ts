import { initGPU } from "../../core/gpu/pipline";

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
  async init(canvas:HTMLCanvasElement){
   return await initGPU(canvas)
  }
}

export function useConfigManager() {
  return ConfigManager.getInstance();
}
