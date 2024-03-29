import {
  createBindingGroup,
  createIndexBuffer,
  createStorageBuffer,
  createUniformBuffer,
  createVertexBuffer,
} from './core/buffer';
import { Node } from './node';
import { Camera, createOrthographicCamera, createPerspectiveCamera } from './camera';
import { createDepthStencil, createPipline, createPrimitive } from './core/platform';
import { Engine } from './engine';
import { Light } from './light';
import { Matrix4 } from './math/matrix';
import { Mesh } from './meshes/mesh';
import { lookAt, translate } from './math/transform';
import vertShaderCode from './shaders/vert.wgsl?raw';
import fragShaderCode from './shaders/frag.wgsl?raw';
import shadowShaderCode from './shaders/shadow.wgsl?raw';
import { vec4 } from './math/vector';
import { createBox, createSphere } from './meshes/index';
type MeshBuffer = {
  vertex: GPUBuffer;
  index: GPUBuffer;
};

type SceneOptions = Partial<{
  label: string;
  shadow: boolean;
  onBufferInit: () => any;
  onCreate: () => any;
  onInit: () => any;
  onDataInit: () => any;
  onRenderPiplineInit: () => any;
  onShadowPiplineInit: () => any;
  onRenderStart: () => any;
  onRenderEnd: () => any;
  onMeshesUpdated: (m: Float32Array[]) => any;
  onCameraUpdated: (m: Float32Array) => any;
  onLightsUpdated: (m: Float32Array[]) => any;
}>;
const defaultSceneOptions = {
  label: '',
  shadow: true,

  onMeshesUpdated: () => {},
  onCameraUpdated: () => {},
  onLightsUpdated: () => {},
  onBufferInit: () => {},
  onCreate: () => {},
  onInit: () => {},
  onDataInit: () => {},
  onRenderPiplineInit: () => {},
  onShadowPiplineInit: () => {},
  onRenderStart: () => {},
  onRenderEnd: () => {},
};

/**
 * 场景有点像舞台，所有网格mesh都放置在舞台上以供查看，并且放置了摄像机camera和灯光light以使其可见。
 * 当然，让场景成为用户良好体验的不仅仅是网格、相机和灯光，例如用户ui界面。
 * 还有一些特殊效果可以使环境更加逼真。想要重叠两个或多个场景也是可以的。
 */
export class Scene {
  camera?: Camera;
  lights?: Light[] = [];
  meshes?: Mesh[] = [];

  renderPipeline: GPURenderPipeline;
  shadowPipeline: GPURenderPipeline;
  vertexShaderBindingGroup: GPUBindGroup;
  fragmentShaderBindingGroup: GPUBindGroup;
  shadowBindingGroup?: GPUBindGroup;
  transforms: Float32Array;
  colors: Float32Array;
  lightBuffer: GPUBuffer;
  meshBuffers: MeshBuffer[];
  modelViewBuffer: GPUBuffer;
  cameraProjectionBuffer: GPUBuffer;
  lightProjectionBuffer: GPUBuffer;
  onCameraUpdated: (m: Float32Array) => any;
  onLightsUpdated: (m: Float32Array[]) => any;
  onMeshesUpdated: () => any;
  onBufferInit: () => {};
  onCreate: () => {};
  onInit: () => {};
  onDataInit: () => {};
  onRenderPiplineInit: () => {};
  onShadowPiplineInit: () => {};
  onRenderStart: () => {};
  onRenderEnd: () => {};
  colorBuffer: GPUBuffer;
  shadow: boolean;
  label: string;
  nodes: Node[] = [];
  viewProjectionMatrix: Matrix4;
  constructor(public engine: Engine, options?: SceneOptions) {
    engine.addScene(this);

    for (const key in defaultSceneOptions) {
      if (Object.prototype.hasOwnProperty.call(options || {}, key)) {
        this[key] = options[key];
      } else this[key] = defaultSceneOptions[key];
    }
    this.onCreate();
  }

  getMeshesCount() {
    return this.meshes.length;
  }

  initBuffers(device: GPUDevice) {
    this.meshBuffers = this.meshes.map(v => ({
      vertex: createVertexBuffer(v.name + ' vertex', v.geometry.vertex.byteLength, device),
      index: createIndexBuffer(v.name + ' index', v.geometry.index.byteLength, device),
    }));

    this.modelViewBuffer = createStorageBuffer('modelBuffer', 16 * 4 * this.getMeshesCount(), device);
    this.cameraProjectionBuffer = createUniformBuffer('cameraProjectionBuffer', 16 * 4, device);

    this.lightBuffer = createStorageBuffer('lightBuffer', 8 * 4 * this.lights.length, device);
    this.colorBuffer = createStorageBuffer('colorBuffer', 4 * 4 * this.getMeshesCount(), device);

    if (this.shadow) {
      this.lightProjectionBuffer = createStorageBuffer('lightProjectionBuffer', 4 * 4 * 4 * this.lights.length, device);
    }

    this.onBufferInit();
  }

  initDatas() {
    this.transforms = new Float32Array(this.getMeshesCount() * 16);
    this.colors = new Float32Array(this.getMeshesCount() * 4);
    this.onDataInit();
  }

  async init() {
    const { shadowDepthView, device, format } = this.engine;

    this.initBuffers(device);

    this.initDatas();
    const primitive = createPrimitive();
    const depthStencil = createDepthStencil();
    const renderPipeline = await createPipline('render pipeline', device, {
      format,
      vertShaderCode: vertShaderCode,
      fragShaderCode: fragShaderCode,
      primitive,
      depthStencil,
    });

    this.renderPipeline = renderPipeline;

    this.vertexShaderBindingGroup = createBindingGroup(
      'renderVertexShaderBindingGroup',
      [this.modelViewBuffer, this.cameraProjectionBuffer, this.lightProjectionBuffer, this.colorBuffer],
      renderPipeline.getBindGroupLayout(0),
      device,
    );

    this.fragmentShaderBindingGroup = createBindingGroup(
      'renderFragmentShaderBindingGroup',
      [
        this.lightBuffer,
        shadowDepthView,
        device.createSampler({
          compare: 'less',
        }),
      ],
      renderPipeline.getBindGroupLayout(1),
      device,
    );
    this.onRenderPiplineInit();

    if (this.shadow) {
      const shadowPipeline = await createPipline('shadow pipline', device, {
        vertShaderCode: shadowShaderCode,
        primitive,
        depthStencil,
      });

      this.shadowPipeline = shadowPipeline;

      this.shadowBindingGroup = createBindingGroup(
        'shadowVertexShaderBindingGroup',
        [this.modelViewBuffer, this.lightProjectionBuffer],
        shadowPipeline.getBindGroupLayout(0),
        device,
      );

      this.onShadowPiplineInit();
    }

    this.onInit();
  }
  render() {
    const { queue, device, context, renderDepthView, shadowDepthView } = this.engine;

    for (const [i, buffer] of this.meshBuffers.entries()) {
      queue.writeBuffer(buffer.vertex, 0, this.meshes[i].geometry.vertex);
      queue.writeBuffer(buffer.index, 0, this.meshes[i].geometry.index);
    }

    for (const [i, mesh] of this.meshes.entries()) {
      this.transforms.set(mesh.transform.toArray(), i * 16);
      this.colors.set(mesh.color.toArray(), i * 4);
    }
    queue.writeBuffer(this.modelViewBuffer, 0, this.transforms);
    queue.writeBuffer(this.colorBuffer, 0, this.colors);

    this.onMeshesUpdated();
    const cameraViewViewProjection = this.camera.getViewProjectionMatrix().toArray();
    queue.writeBuffer(this.cameraProjectionBuffer, 0, cameraViewViewProjection);

    this.onCameraUpdated?.(cameraViewViewProjection);

    let lightViewProjections = [];
    if (this.lights.length > 0)
      for (let i = 0; i < this.lights.length; i++) {
        const light = this.lights[i];
        queue.writeBuffer(this.lightBuffer, i * 8 * 4, light.toArray());
        const camera = createOrthographicCamera('c2', {
          position: light.getPosition(),
          up: vec4(0, 1, 0),
          target: vec4(0, 0, 0),
          l: -100,
          r: 100,
          n: -100,
          f: 100,
          b: -100,
          t: 100,
        });
        const lightViewProjection = camera.getViewProjectionMatrix().toArray();

        lightViewProjections.push(lightViewProjection);
        queue.writeBuffer(this.lightProjectionBuffer, i * 16 * 4, lightViewProjection);
      }
    this.onLightsUpdated?.(lightViewProjections);

    const commandEncoder = device.createCommandEncoder();

    if (this.shadow) {
      const shadowPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [],
        depthStencilAttachment: {
          view: shadowDepthView,
          depthClearValue: 1.0,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
        },
      };
      const shadowPassEncoder = commandEncoder.beginRenderPass(shadowPassDescriptor);

      shadowPassEncoder.setPipeline(this.shadowPipeline);

      shadowPassEncoder.setBindGroup(0, this.shadowBindingGroup);

      for (const [i, buffer] of this.meshBuffers.entries()) {
        shadowPassEncoder.setVertexBuffer(0, buffer.vertex);
        shadowPassEncoder.setIndexBuffer(buffer.index, 'uint16');
        shadowPassEncoder.drawIndexed(this.meshes[i].geometry.indexCount, 1, 0, 0, i);
      }

      shadowPassEncoder.end();
    }
    {
      const renderPassColorAttachment: GPURenderPassColorAttachment = {
        view: context.getCurrentTexture().createView(),
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
      };

      const renderPassDepthAttachment: GPURenderPassDepthStencilAttachment = {
        view: renderDepthView,
        depthClearValue: 1,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
        // stencilClearValue: 0,
        // stencilLoadOp: 'clear',
        // stencilStoreOp: 'store',
      };

      const renderPassDesc: GPURenderPassDescriptor = {
        colorAttachments: [renderPassColorAttachment],
        depthStencilAttachment: renderPassDepthAttachment,
      };

      const renderpassEncoder = commandEncoder.beginRenderPass(renderPassDesc);

      renderpassEncoder.setPipeline(this.renderPipeline);

      // setBindGroups
      renderpassEncoder.setBindGroup(0, this.vertexShaderBindingGroup);

      renderpassEncoder.setBindGroup(1, this.fragmentShaderBindingGroup);

      for (const [i, buffer] of this.meshBuffers.entries()) {
        renderpassEncoder.setVertexBuffer(0, buffer.vertex);
        renderpassEncoder.setIndexBuffer(buffer.index, 'uint16');
        renderpassEncoder.drawIndexed(this.meshes[i].geometry.indexCount, 1, 0, 0, i);
      }

      renderpassEncoder.end();
    }
    this.onRenderStart();
    queue.submit([commandEncoder.finish()]);
    this.onRenderEnd();
  }
  addNode(node: Node) {
    this.nodes.push(node);
  }
  addMesh(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  removeMesh(name: string) {
    this.meshes = this.meshes.filter(m => m.name != name);
  }

  addLight(light: Light) {
    this.lights.push(light);
    // if (light.render) {
    //   const lightSphere = createSphere('light', this, {
    //     r: 0.1,
    //   });
    //   const lp = light.position.toArray();
    //   lightSphere.transform = translate(...lp).mul(lightSphere.transform);
    //   this.addMesh(lightSphere);
    // }
  }

  removeLight(name: string) {
    this.lights = this.lights.filter(l => l.name != name);
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  addTexture() {}
  removeTexture() {}

  createSceneUniformBuffer() {}
  onLoad() {}
  onClick() {}
  onPointer() {}
}

export function createScene(engine: Engine, options?: SceneOptions) {
  const scene = new Scene(engine, options);
  return scene;
}
