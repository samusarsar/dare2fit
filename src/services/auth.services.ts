import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

/**
 * Registers a new user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<UserCredential>} A Promise that resolves to a UserCredential object.
 */
export const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Logs in an existing user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<UserCredential>} A Promise that resolves to a UserCredential object.
 */
export const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logs out the currently authenticated user.
 * @return {Promise} A Promise that resolves when the sign-out operation is complete.
 */
export const logoutUser = () => {
    return signOut(auth);
};
