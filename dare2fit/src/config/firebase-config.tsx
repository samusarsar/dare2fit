import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: 'AIzaSyARKNVxiD_4lY6UUdhylzzS-2uge_XJpa0',
    authDomain: 'interiorum-6c515.firebaseapp.com',
    projectId: 'interiorum-6c515',
    storageBucket: 'interiorum-6c515.appspot.com',
    messagingSenderId: '621308142785',
    appId: '1:621308142785:web:93dcf8ef0e478d4eb46040',
    databaseURL: 'https://interiorum-6c515-default-rtdb.europe-west1.firebasedatabase.app/',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
