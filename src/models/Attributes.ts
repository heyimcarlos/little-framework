export class Attributes<T> {
  constructor(private data: T) {}
  // constraints limits the type = extends.

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  getAll = (): T => this.data;

  set(updateObj: T): void {
    Object.assign(this.data, updateObj);
  }
}
