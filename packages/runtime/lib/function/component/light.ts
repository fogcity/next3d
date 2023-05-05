import { Component } from './component';

export class LightComponent extends Component {
  constructor(public intensity: number, public radius: number) {
    super('light');
  }
}
