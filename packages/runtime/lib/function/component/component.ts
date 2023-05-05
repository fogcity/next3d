export type ComponentType =
  | 'color'
  | 'position'
  | 'node'
  | 'camera'
  | 'light'
  | 'material'
  | 'geometry'
  | 'transform'
  | 'orthographic'
  | 'perspective'
  | 'renderer';
export class Component {
  constructor(public type: ComponentType) {}
  onInit() {
    // 该函数在组件被创建时调用，可以用来初始化内部的变量
  }
  onMount() {}
  onBeforeRender() {}
  // 覆写 渲染开始
  start() {
    // 该函数在组件开始渲染前被调用，
    // 此时可以访问 this.object3D, 可以用来获取节点的属性或其他组件
  }

  update() {
    // 每帧渲染循环调用，通常定义节点的循环逻辑
  }
}
