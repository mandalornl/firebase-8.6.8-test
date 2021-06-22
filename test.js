const firebase = require('firebase/app');
require('firebase/firestore');

firebase.initializeApp({
  projectId: 'sometest-78e8d'
}, 'test');

firebase.firestore.setLogLevel('debug');

const app = firebase.app('test');

const firestore = app.firestore();

firestore.useEmulator('localhost', 8900);

(async () => {
  const ref = await firestore.collection('test').add({
    createdAt: firebase.firestore.Timestamp.now()
  });

  await ref.update({
    updatedAt: firebase.firestore.Timestamp.now()
  });
})()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);

    process.exit(1);
  });
