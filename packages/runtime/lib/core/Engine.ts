import { AssetManager, useAssetManager } from './AssetManager';
import { ComponentManager, useComponentManager } from './ComponentManager';
import { useConfigManager, ConfigManager } from './ConfigManager';
import { EntityManager, useEntityManager } from './EntityManager';
import { SceneManager, useSceneManager } from './SceneManager';
import { initGPU } from './gpu/pipline';
export type EngineOptions = {};
export class Engine {
  private static instance: Engine;

  configManager: ConfigManager;
  assetManager: AssetManager;
  sceneManager: SceneManager;
  componentManager: ComponentManager;
  entityManager: EntityManager;
  private constructor(public canvas: HTMLCanvasElement, options?: EngineOptions) {
    this.configManager = useConfigManager();
    this.assetManager = useAssetManager();
    this.sceneManager = useSceneManager();
    this.componentManager = useComponentManager();
    this.entityManager = useEntityManager();
  }

  public static getInstance(canvas: HTMLCanvasElement, options?: EngineOptions) {
    if (!Engine.instance) {
      Engine.instance = new Engine(canvas, options);
    }

    return Engine.instance;
  }

  async init() {
    const { device, context, format } = await initGPU(this.canvas);

    this.device = device;
    this.queue = device.queue;
    this.context = context;
    this.format = format;
    const size = { width: this.canvas.width, height: this.canvas.height };

    this.shadowDepthTexture = device.createTexture({
      size: [5096, 5096],
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
      format: 'depth32float',
    });
    this.renderDepthTexture = device.createTexture({
      size,
      format: 'depth32float',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    // create depthTextureView
    this.shadowDepthView = this.shadowDepthTexture.createView();
    this.renderDepthView = this.renderDepthTexture.createView();
    this.onEngineInit();
  }

  async loop(frameRenderFunction: (currentFrame: number) => void, frame?: number) {
    await this.init();
    await this.scene.init();

    let frameId = 0;
    let currentFrame = 1;
    const render = (duration: DOMHighResTimeStamp) => {
      this.onFrameRenderStart(currentFrame, duration);
      frameRenderFunction(currentFrame);

      this.onFrameRenderEnd(currentFrame, duration);
      if (frame) {
        if (currentFrame < frame) {
          frameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(frameId);
        }
      } else {
        requestAnimationFrame(render);
      }
      currentFrame++;
    };
    requestAnimationFrame(render);
  }
}

export function useEngine(canvas: HTMLCanvasElement, options?: EngineOptions) {
  return Engine.getInstance(canvas, options);
}
