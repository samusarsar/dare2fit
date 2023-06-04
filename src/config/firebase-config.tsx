import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyA81NZAR0kdRmdADvaYC0tum0dBDejLS8w',
    authDomain: 'dare2fit-f6eb4.firebaseapp.com',
    databaseURL: 'https://dare2fit-f6eb4-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'dare2fit-f6eb4',
    storageBucket: 'dare2fit-f6eb4.appspot.com',
    messagingSenderId: '813135937088',
    appId: '1:813135937088:web:86c1f13ab2e808259229a5',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
