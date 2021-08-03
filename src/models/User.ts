// User class that handles all their data.
// age, name, update name, randomize age.

interface UserProps {
  name?: string;
  age?: number;
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
    // if (!this.events[eventName]) this.events[eventName] = [];
    const handlers = this.events[eventName] || [];
    handlers.push(cb);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const callbacks: Callback[] = this.events[eventName];
    for (const cb of callbacks) {
      cb();
    }
  }
}
