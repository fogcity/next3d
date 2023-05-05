import { useEntityId } from '../utils';
import { Component } from '../component/component';
import { PositionSystem } from '../system/position/index.';
import { System } from '../system/system';
import { TransformSystem } from '../system/transform';
export type Archetype = 'camera' | 'light' | 'mesh';
export type EntityProps = {};
export class Entity {
  id: number;
  constructor() {
    this.id = useEntityId();
  }
}
