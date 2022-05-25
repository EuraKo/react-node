//firebase추가
import firebase from 'firebase/compat/app';
//firebase auth 추가
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD8UCQri2BqOdXwkHV9SH72QAjn9XbDfJo',
	authDomain: 'edu-dcode.firebaseapp.com',
	projectId: 'edu-dcode',
	storageBucket: 'edu-dcode.appspot.com',
	messagingSenderId: '676593450956',
	appId: '1:676593450956:web:a1e7bbd76094cc3119a769',
	measurementId: 'G-3Z3S8B1874',
};

//firebase 초기화 구문으로 수정
firebase.initializeApp(firebaseConfig);

//firebase 내보내기
export default firebase;
