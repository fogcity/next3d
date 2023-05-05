import { AssetManager, useAssetManager } from '../function/manager/AssetManager';
import { ComponentManager, useComponentManager } from '../function/manager/ComponentManager';
import { useConfigManager, ConfigManager } from '../function/manager/ConfigManager';
import { EntityManager, useEntityManager } from '../function/manager/EntityManager';
import { SceneManager, useSceneManager } from '../function/manager/SceneManager';
import { initGPU } from './gpu/pipline';
import { Logger } from './Logger';
export type EngineOptions = {};
export class Engine {
  private static instance: Engine;

  configManager: ConfigManager;
  assetManager: AssetManager;
  sceneManager: SceneManager;
  componentManager: ComponentManager;
  entityManager: EntityManager;
  private constructor( canvas: HTMLCanvasElement, options?: EngineOptions) {
    this.configManager = useConfigManager();
    this.assetManager = useAssetManager();
    this.sceneManager = useSceneManager();
    this.componentManager = useComponentManager();
    this.entityManager = useEntityManager();
    (async () => await this.init(canvas))()
  }

  public static getInstance(canvas: HTMLCanvasElement, options?: EngineOptions) {
    if (!Engine.instance) {
      Engine.instance = new Engine(canvas, options);
    }

    return Engine.instance;
  }

  async init(canvas: HTMLCanvasElement) {
    const { device, context, format } = await this.configManager.init(canvas);
    const { device, context, format } = await this.assetManager.init(canvas);
    const size = { width: canvas.width, height: canvas.height };

    this.shadowDepthTexture = device.createTexture({
      size: [2048, 2048],
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
