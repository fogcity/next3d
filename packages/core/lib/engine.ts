import { initDepthStencil, initGPU } from './core';
import { createScene, Scene } from './scene';

type EngineOptions = Partial<{
  antialias: boolean;
  preserveDrawingBuffer: boolean;
  stencil: boolean;
  onFrameRenderStart: () => any;
  onFrameRenderEnd: () => any;
  onEngineInit: () => any;
}>;
const defaultEngineOptions = {
  antialias: false,
  preserveDrawingBuffer: false,
  stencil: false,
  onFrameRenderStart: () => {},
  onFrameRenderEnd: () => {},
  onEngineInit: () => {},
};
export class Engine {
  scene: Scene;
  device: GPUDevice;
  context: GPUCanvasContext;
  format: GPUTextureFormat;
  queue: GPUQueue;
  onFrameRenderStart: () => any;
  onFrameRenderEnd: () => any;
  onEngineInit: () => any;
  primitive: GPUPrimitiveState;
  depthStencil: GPUDepthStencilState;
  renderDepthTexture: GPUTexture;
  shadowDepthTexture: GPUTexture;
  shadowDepthView: GPUTextureView;
  renderDepthView: GPUTextureView;

  constructor(public canvas: HTMLCanvasElement, options?: EngineOptions) {
    for (const key in defaultEngineOptions) {
      if (Object.prototype.hasOwnProperty.call(options || {}, key)) {
        this[key] = options[key];
      } else this[key] = defaultEngineOptions[key];
    }
  }

  createDefaultScene() {
    const scene = createScene(this);
    this.addScene(scene);
    return scene;
  }

  addScene(scene: Scene) {
    this.scene = scene;
  }

  async init() {
    this.primitive = {
      topology: 'triangle-list',
      cullMode: 'back',
    };
    this.depthStencil = {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth32float',
    };
    const { device, context, format } = await initGPU(this.canvas);

    // const { depthFormat, depthTexture } = await initDepthStencil(
    //   device,
    //   this.canvas
    // );

    this.device = device;
    this.queue = device.queue;
    this.context = context;
    this.format = format;
    const size = { width: this.canvas.width, height: this.canvas.height };

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

  async loop(frameRenderFunction: () => void, frames?: number) {
    await this.init();
    this.onEngineInit();

    await this.scene.init();
    const renderFrame = () => {
      this.onFrameRenderStart();
      frameRenderFunction();
      this.onFrameRenderEnd();
      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  }
}

export function createEngine(canvas: HTMLCanvasElement, options?: EngineOptions) {
  return new Engine(canvas, options);
}
