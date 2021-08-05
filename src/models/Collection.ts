import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  public models: T[] = [];
  public events: Eventing = new Eventing();

  constructor(public serverURL: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.serverURL).then((res: AxiosResponse): void => {
      res.data.forEach((item: K) => {
        this.models.push(this.deserialize(item));
      });

      this.trigger('change');
    });
  }
}
