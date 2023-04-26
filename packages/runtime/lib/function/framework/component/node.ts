import { Scene } from '../../..';
import { Component } from './component';
export class NodeComponent extends Component {
  parent?: Node;
  children?: Node;

  constructor(public scene: Scene) {
    super('node');
  }
}
