import { Connection } from 'mongoose';
import { GroupSchema } from './schema/group.schema';

export const GroupProviders = [
  {
    provide: 'GROUP_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('groups', GroupSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
