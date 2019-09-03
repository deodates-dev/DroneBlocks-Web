import config from '../../../env/config.json';

firebase.initializeApp(config);

const db = firebase.firestore();

db.enablePersistence();

export default db;
