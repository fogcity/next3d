let id = 0;

const useEntityId = () => {
  return ++id;
};

export type Archetype = 'camera' | 'light' | 'mesh';
export class Entity {
  id: number;
  constructor() {
    this.id = useEntityId();
  }
}
