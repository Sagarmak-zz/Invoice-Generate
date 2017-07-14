import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDZsaw-NDvS-kyAQXkuIMf96Nt1l22KoQc",
  authDomain: "swbilling-c4071.firebaseapp.com",
  databaseURL: "https://swbilling-c4071.firebaseio.com",
  projectId: "swbilling-c4071",
  storageBucket: "",
  messagingSenderId: "962109615802"
};
export const firebaseApp =   firebase.initializeApp(config);
