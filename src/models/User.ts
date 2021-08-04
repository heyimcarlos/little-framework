import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Callback, Eventing } from './Eventing';
import { Sync } from './Sync';

// User class that handles all their data.
// age, name, update name, randomize age.

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const serverURL = 'http://localhost:3000/users';
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(serverURL);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  public get get() {
    return this.attributes.get;
  }

  public get on() {
    return this.events.on;
  }

  public get trigger() {
    return this.events.trigger;
  }

  public set(updateObj: UserProps): void {
    this.attributes.set(updateObj);
    this.events.trigger('change');
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
