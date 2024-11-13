/* eslint-disable no-unused-vars */
export interface StateStorage {
  setItem<T = any>(key: string, value: T): Promise<void>;
  getItem<T = any>(key: string): Promise<T | undefined>;
  removeItem(key: string): Promise<void>;
}

export class Storage implements StateStorage {
  private services: Map<string, any> = new Map();

  async setItem<T = any>(key: string, value: T) {
    this.services.set(key, value);
  }

  async getItem<T = any>(key: string): Promise<T | undefined> {
    return this.services.get(key) as T;
  }

  async removeItem(key: string): Promise<void> {
    this.services.delete(key);
  }
}
