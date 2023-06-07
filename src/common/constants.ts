/* eslint-disable no-shadow */
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
export const WORKOUT_NAME_MIN_LENGTH = 4;
export const WORKOUT_NAME_MAX_LENGTH = 30;
export const GOAL_NAME_MIN_LENGTH = 4;
export const GOAL_NAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 6;
export const TELEPHONE_LENGTH = 10;
export const RESTRICTED_CHARS: string[] = ['.', '#', '$', '[', ']'];
export const COLOR_BRAND_LIGHT = '#F7FAFC';
export const COLOR_BRAND_DARK = '#1A202C';
export const COLOR_BRAND_RED = '#F24968';
export const COLOR_BRAND_BLUE = '#6929F2';
export const COLOR_BRAND_PURPLE = '#9B72F2';
export const COLOR_BRAND_GREEN = '#14D990';
export const COLOR_BRAND_YELLOW = '#F2B807';
export const COLOR_BRAND_WHITE = '#FFFFFF';
export const COLOR_BRAND_GRAY = '#2D3748';

export const API_NINJAS_EXERCISES = 'https://api.api-ninjas.com/v1/exercises';
export const API_NINJAS_FOOD = 'https://api.api-ninjas.com/v1/nutrition';
export const API_NINJAS_KEY = 'cn6dW1SAvI817LEXzpf+cg==0msk7WrGU2sy3MKb';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const ACTIVITY_LEVEL_DATA = {
    noActivity: {
        description: 'No activity (while resting)',
        index: 1,
    },
    sedentary: {
        description: 'Sedentary (little or no exercise)',
        index: 1.2,
    },
    lightlyActive: {
        description: 'Lightly active (light exercise/sports 1-3 days/week)',
        index: 1.375,
    },
    moderately: {
        description: 'Moderately active (moderate exercise/sports 3-5 days/week)',
        index: 1.55,
    },
    veryActive: {
        description: 'Very active (hard exercise/sports 6-7 days a week)',
        index: 1.725,
    },
    superActive: {
        description: 'Super active (very hard exercise/physical job & exercise 2x/day)',
        index: 1.9,
    },
};


export const WEIGHT_GOAL_DATA = {
    extremeWeightLoss: {
        description: 'Extreme weight loss (1 kg/week)',
        index: 0.47,
    },
    weightLoss: {
        description: 'Weight loss (0.5 kg/week)',
        index: 0.74,
    },
    mildWeightLoss: {
        description: 'Mild weight loss (0.25 kg/week)',
        index: 0.87,
    },
    maintainWeight: {
        description: 'Maintain weight',
        index: 1,
    },
    mildWeightGain: {
        description: 'Mild weight gain (0.25 kg/week)',
        index: 1.13,
    },
    weightGain: {
        description: 'Weight gain (0.5 kg/week)',
        index: 1.26,
    },
    fastWeightGain: {
        description: 'Fast Weight gain (1 kg/week)',
        index: 1.53,
    },
};

export const badgeColorScheme = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
];
