import firebase from 'firebase/app';
import 'firebase/firestore';

export default async (ctx, inject) => {
  firebase.initializeApp({
    projectId: 'sometest-78e8d'
  }, 'test');

  firebase.firestore.setLogLevel('debug');

  const app = firebase.app('test');
  const firestore = app.firestore();

  firestore.useEmulator('localhost', 8900);

  ctx.$firebase = firebase;
  ctx.$firestore = firestore;

  inject('firebase', firebase);
  inject('firestore', firestore);
}
