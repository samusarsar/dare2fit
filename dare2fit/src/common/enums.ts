/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export enum UserRoles {
    Base = 'base',
    WantAdmin = 'wantAdmin',
    Admin = 'admin',
    Blocked = 'blocked',
}

export enum Units {
    walking = 'steps',
    running = 'km',
    swimming = 'm',
    cycling = 'km',
    workout = 'workouts',
    strength = 'workouts',
    stamina = 'workouts',
    stretching = 'workouts',
}

export enum FriendRequestType {
    sent = 'sent',
    received = 'received',
}

export enum ExerciseTypes {
    cardio = 'cardio',
    olympic_weightlifting = 'olympic weightlifting',
    plyometrics = 'plyometrics',
    powerlifting = 'powerlifting',
    strength = 'strength',
    stretching = 'stretching',
    strongman = 'strongman',
}

export enum ExerciseDifficulty {
    beginner = 'beginner',
    intermediate = 'intermediate',
    expert = 'expert',
}

export enum ExerciseMuscle {
    abdominals = 'abdominals',
    abductors = 'abductors',
    adductors = 'adductors',
    biceps = 'biceps',
    calves = 'calves',
    chest = 'chest',
    forearms = 'forearms',
    glutes = 'glutes',
    hamstrings = 'hamstrings',
    lats = 'lats',
    lower_back = 'lower back',
    middle_back = 'middle back',
    neck = 'neck',
    quadriceps = 'quadriceps',
    traps = 'traps',
    triceps = 'triceps',
}

export enum ExerciseUnits {
    reps = 'reps',
    mins = 'mins',
}
