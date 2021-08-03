import { User } from './models/User';

const user = new User({ id: 3 });

user.set({ name: 'Pedro', age: 18 });

user.save();
