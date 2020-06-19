import Firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyB9EcRQO9sVl4thwMqqU6pVQMy0OjVzMy8',
	authDomain: 'moneytracker-289f7.firebaseapp.com',
	databaseURL: 'https://moneytracker-289f7.firebaseio.com',
	projectId: 'moneytracker-289f7',
	storageBucket: 'moneytracker-289f7.appspot.com',
	messagingSenderId: '1017715016287',
	appId: '1:1017715016287:web:7fcf8ba6e6854afab5d1ea'
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);

export default Firebase;
