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
    const amCompeting = currGoal.competingWith ? Object.keys(currGoal.competingWith).includes(userData!.handle) : false;

    let allProgressesLoaded: boolean;
    if (currGoal.competingWith) {
        allProgressesLoaded = progress ?
            Object.keys(progress).length === (Object.keys(currGoal.competingWith).length + 1) :
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
                    return [handle, 0];
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
                });
                return [handle, progressCalc];
            })
            .catch(() => [handle, 0]);
    };

    useEffect(() => {
        return onValue(ref(db, `goals/${goal.goalId}`), (snapshot) => {
            setCurrGoal(snapshot.val());
        });
    }, [goal]);

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        return onValue(ref(db, `logs/${(!authorIsMe && amCompeting) ? userData!.handle : goal.author}/${todayDate}`), () => {
            if (currGoal.competingWith) {
                const competitors = Object.keys(currGoal.competingWith);
                competitors.push(goal.author);

                Promise.all(competitors.map(handle => calculateProgressByHandle(handle)))
                    .then(resultArr => {
                        const progressObj: IGoalProgresses = {};
                        resultArr.forEach(resEl => {
                            const [handleEl, progressEl] = resEl;
                            progressObj[handleEl] = +progressEl;
                        });

                        setProgress(progressObj);
                    });
            } else {
                calculateProgressByHandle(goal.author)
                    .then(result => {
                        const progressObj: IGoalProgresses = {};

                        const [handleEl, progressEl] = result;
                        progressObj[handleEl] = +progressEl;

                        setProgress(progressObj);
                    });
            }
        });
    }, [currGoal, goal]);

    if (currGoal && progress && allProgressesLoaded) {
        return (
            <Box bg={background} rounded='lg' boxShadow='lg' minH='100%' p={4} position='relative'>
                {(authorIsMe || currGoal.category === GoalTypes.challenge) && <GoalOptionsButton goal={currGoal} />}
                <Box h='200px'>
                    {currGoal.category === GoalTypes.habit ?
                        <HabitRadialBar goal={currGoal} progress={progress} /> :
                        <ChallengeRadialBar goal={currGoal} progress={progress} />}
                </Box>
                {currGoal.category === GoalTypes.habit ?
                    <HabitLabels goal={currGoal} progress={progress} /> :
                    <ChallengeLabels goal={currGoal} progress={progress} />}
            </Box>
        );
    }

    return null;
};

export default SingleGoal;
