import { User } from './models/User';

const collection = User.userCollection();

collection.on('change', () => console.log(collection));

collection.fetch();
