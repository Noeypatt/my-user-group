import { Connection } from 'mongoose';
import { UserSchema } from './schema/user.schema';

export const UserProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('user', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
