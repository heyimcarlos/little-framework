import { AxiosPromise, AxiosResponse } from 'axios';
import { Callback } from './Eventing';

interface Events {
  on(e: string, cb: Callback): void;
  trigger(e: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(obj: T): void;
  getAll(): T;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  get = this.attributes.get;
  getAll = this.attributes.getAll;
  on = this.events.on;
  trigger = this.events.trigger;

  public set(updateObj: T): void {
    this.attributes.set(updateObj);
    this.events.trigger('save');
  }

  public fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') throw new Error('No Id');

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  public save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
