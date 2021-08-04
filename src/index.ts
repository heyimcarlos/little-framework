import { User } from './models/User';

const user = new User({ id: 1, name: 'Juan', age: 87 });

user.on('save', () => {
  console.log(user);
});

user.save();
