import axios, { AxiosResponse } from 'axios';

// User class that handles all their data.
// age, name, update name, randomize age.

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

enum Events {
  click = 'click',
}

type Callback = () => void;

export class User {
  public events: { [key: string]: Callback[] } = {};
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(updateObj: UserProps): void {
    Object.assign(this.data, updateObj);
  }

  on(eventName: string, cb: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(cb);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers: Callback[] | undefined = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach((cb: Callback) => cb());
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    // if id exists we do a put request.
    const id = this.get('id');

    if (!id) {
      axios.post('http://localhost:3000/users', this.data).then(res => console.log(res.data));
    } else {
      axios.put(`http://localhost:3000/users/${id}`, this.data).then(res => console.log(res.data));
    }
  }
}
