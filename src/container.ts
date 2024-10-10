import { ContainerName } from './types/container';

export class Container {
  private services: Map<ContainerName, any> = new Map();

  register<T>(name: ContainerName, instance: T): void {
    this.services.set(name, instance);
  }

  resolve<T>(name: ContainerName): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found in container`);
    }
    return service as T;
  }
}

export const container = new Container();
