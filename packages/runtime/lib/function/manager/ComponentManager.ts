import { Component } from "../component/component";
import { Entity } from "../entity/entity";

export class ComponentManager {
  private static instance: ComponentManager;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!ComponentManager.instance) {
      ComponentManager.instance = new ComponentManager(engine);
    }

    return ComponentManager.instance;
  }
  public proof = []
  addComponent(entity:Entity ,component:Component){
    this.proof.push({
      id:entity.id,component
    })
  }
  removeComponent(){
    
  }
}

export function useComponentManager() {
  return ComponentManager.getInstance();
}
