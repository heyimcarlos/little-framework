import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

// User class that handles all their data.
// age, name, update name, randomize age.

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const serverURL = 'http://localhost:3000/users';
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(serverURL)
    );
  }

  static userCollection(): Collection<User, UserProps> {
    User;
    return new Collection(serverURL, (user: UserProps) => User.buildUser(user));
  }

  isAdmin(): boolean {
    if (this.get('id') === 1) return true;
    else return false;
  }
}
