import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

(async () => {
  console.log('MONGO ENV:', process.env.MONGODB_URL);

  await initMongoConnection();
  setupServer();
})();
