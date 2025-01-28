import admin from 'firebase-admin';

import serviceAccount from './auth.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nba-twitter-default-rtdb.firebaseio.com',
});

const db = admin.database();
export default db;
