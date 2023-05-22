export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 20;
export const FIRST_NAME_MIN_LENGTH = 3;
export const LAST_NAME_MIN_LENGTH = 3;
export const FIRST_NAME_MAX_LENGTH = 32;
export const LAST_NAME_MAX_LENGTH = 32;
export const USER_PHONE_LENGTH = 10;
export const EXERCISE_TITLE_MIN_LENGTH = 4;
export const EXERCISE_TITLE_MAX_LENGTH = 30;
export const GOAL_NAME_MIN_LENGTH = 4;
export const GOAL_NAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 6;
export const RESTRICTED_CHARS: string[] = ['.', '#', '$', '[', ']'];
// export const BASE_ROLE = 'base';
// export const WANT_ADMIN_ROLE = 'wantAdmin';
// export const ADMIN_ROLE = 'admin';
// export const BLOCKED_ROLE = 'blocked';

export enum Roles {
    Base = 'base',
    WantAdmin = 'wantAdmin',
    Admin = 'admin',
    Blocked = 'blocked',
}
