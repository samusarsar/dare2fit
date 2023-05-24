/* eslint-disable no-unused-vars */
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 20;
export const FIRST_NAME_MIN_LENGTH = 3;
export const LAST_NAME_MIN_LENGTH = 3;
export const FIRST_NAME_MAX_LENGTH = 32;
export const LAST_NAME_MAX_LENGTH = 32;
export const USER_PHONE_LENGTH = 10;
export const EXERCISE_NAME_MIN_LENGTH = 4;
export const EXERCISE_NAME_MAX_LENGTH = 30;
export const GOAL_NAME_MIN_LENGTH = 4;
export const GOAL_NAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 6;
export const RESTRICTED_CHARS: string[] = ['.', '#', '$', '[', ']'];

export const ACCEPTED_IMAGE_TYPES: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
export const TYPES_TO_STEPS = ['walking'];
export const TYPES_TO_KM = ['running', 'cycling'];
export const TYPES_TO_M = ['swimming'];
export const TYPES_TO_MINS = ['stretching', 'hi-cardio', 'lo-cardio'];
export const TYPES_TO_REPS = ['arms', 'chest', 'back', 'core', 'legs'];

// eslint-disable-next-line no-shadow
export enum Roles {
    Base = 'base',
    WantAdmin = 'wantAdmin',
    Admin = 'admin',
    Blocked = 'blocked',
}
