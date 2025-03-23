import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyAZ4Mt8TSY7lrlgJdmVK2RA_n3OOV0HtNg',
    authDomain: 'ise-game-2025.firebaseapp.com',
    projectId: 'ise-game-2025',
    storageBucket: 'ise-game-2025.firebasestorage.app',
    messagingSenderId: '952278346989',
    appId: '1:952278346989:web:2178de1e2fdd31959b70e4',
    measurementId: 'G-PKQ6WQ71WP',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
