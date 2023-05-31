import { FC, useContext, useEffect, useState } from 'react';
import { IGoal, IGoalProgresses } from '../../../common/types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import ChallengeRadialBar from '../ChallengeRadialBar/ChallengeRadialBar';
import ChallengeLabels from '../ChallengeLabels/ChallengeLabels';
import HabitRadialBar from '../HabitRadialBar/HabitRadialBar';
import HabitLabels from '../HabitLabels/HabitLabels';
import { GoalTypes } from '../../../common/enums';
import GoalOptionsButton from '../GoalOptionsButton/GoalOptionsButton';
import { AppContext } from '../../../context/AppContext/AppContext';
import moment, { MomentInput } from 'moment';
import { getChallengeLogByHandle, getHabitLogByHandle } from '../../../services/goal.services';

const SingleGoal: FC<{ goal: IGoal }> = ({ goal }) => {

    const { userData } = useContext(AppContext);

    const [currGoal, setCurrGoal] = useState<IGoal>(goal);
    const [progress, setProgress] = useState<IGoalProgresses | null>(null);

    const background = useColorModeValue('brand.white', 'brand.grey');

    const typeIsWorkoutCategory = goal.type === 'strength' || goal.type === 'stamina' || goal.type === 'stretching';
    const authorIsMe = userData!.handle === goal.author;

    let allProgressesLoaded: boolean;
    if (goal.competingWith) {
        allProgressesLoaded = progress ?
            Object.keys(progress).length === (Object.keys(goal.competingWith).length + 1) :
            false;
    } else {
        allProgressesLoaded = !!progress;
    }

    const calculateProgressByHandle = (handle: string) => {
        const startDate = moment(goal.startDate as MomentInput).format('YYYY-MM-DD');
        const endDate = moment(goal.endDate as MomentInput).format('YYYY-MM-DD');

        const getLogFn = () =>{
            return goal.category === GoalTypes.habit ?
                getHabitLogByHandle(handle, goal.repeat!) :
                getChallengeLogByHandle(handle, startDate, endDate);
        };

        return getLogFn()
            .then(activities => {
                let progressCalc = 0;
                const relevantActivities = activities.filter(a => a[typeIsWorkoutCategory ? 'workout' : goal.type]);

                if (!relevantActivities.length) {
                    setProgress({
                        ...progress,
                        [handle]: 0,
                    });
                }

                relevantActivities.forEach(a => {
                    if (typeIsWorkoutCategory) {
                        if (a.workout!.category === goal.type) {
                            progressCalc++;
                        }
                    } else if (goal.type === 'workout') {
                        if (a.workout) {
                            progressCalc++;
                        }
                    } else {
                        progressCalc += (a[(goal.type)] as number);
                    }
                    setProgress({
                        ...progress,
                        [handle]: progressCalc,
                    });
                });
            })
            .catch(() => setProgress({
                ...progress,
                [handle]: 0,
            }));
    };

    useEffect(() => {
        return onValue(ref(db, `goals/${goal.goalId}`), (snapshot) => {
            setCurrGoal(snapshot.val());
        });
    }, [goal]);

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');
        return onValue(ref(db, `logs/${goal.author}/${todayDate}`), () => {
            return calculateProgressByHandle(goal.author);
        });
    }, [currGoal]);

    useEffect(() => {
        if (goal.competingWith) {
            const competitors = Object.keys(goal.competingWith);

            Promise.all(competitors.map(handle => calculateProgressByHandle(handle)));
        }
    }, []);


    if (currGoal && progress && allProgressesLoaded) {
        return (
            <Box bg={background} rounded='lg' boxShadow='lg' minH='100%' p={4} position='relative'>
                {(authorIsMe || goal.category === GoalTypes.challenge) && <GoalOptionsButton goal={currGoal} />}
                <Box h='200px'>
                    {goal.category === GoalTypes.habit ?
                        <HabitRadialBar goal={currGoal} progress={progress} /> :
                        <ChallengeRadialBar goal={currGoal} progress={progress} />}
                </Box>
                {goal.category === GoalTypes.habit ?
                    <HabitLabels goal={currGoal} progress={progress} /> :
                    <ChallengeLabels goal={currGoal} progress={progress} />}
            </Box>
        );
    }

    return null;
};

export default SingleGoal;
