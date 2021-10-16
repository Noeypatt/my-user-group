import * as mongoose from 'mongoose';
import { databaseConfig } from 'src/config/databaseConfig';
const { database } = databaseConfig();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.name}?authSource=admin`,
      ),
  },
];
