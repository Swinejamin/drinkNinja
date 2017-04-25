import * as firebase from 'firebase';
// const serviceAccount = require('./firebase.json');
const config = {
    apiKey: 'AIzaSyAu0WdxVgdV_HPz28RoYfHb-W7P7aIGkN0',
    authDomain: 'drinkme-6efd3.firebaseapp.com',
    databaseURL: 'https://drinkme-6efd3.firebaseio.com',
    storageBucket: 'drinkme-6efd3.appspot.com'
}

var app = firebase.initializeApp(config);

export const database = app.database();
export const auth = app.auth();

