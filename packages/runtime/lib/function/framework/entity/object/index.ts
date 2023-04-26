import { PositionComponent } from '../../component/position';
import { Component } from '../../component/component';
import { Entity } from '../entity';
import { TransformComponent } from '../../component/transform';

export class WorldObject extends Entity {
  constructor() {
    super();
  }
}

export function createWorldObject() {
  const wo = new WorldObject();
  const position = new PositionComponent();
  const transform = new TransformComponent();
  wo.addComponent(position);
  wo.addComponent(transform);
  return new WorldObject();
}
