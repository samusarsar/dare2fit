import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Spinner, VStack, useColorModeValue } from '@chakra-ui/react';
import CreateExercise from '../../components/Exercises/CreateExercise/CreateExercise';
import ExerciseTable from '../../components/Exercises/ExerciseTable/ExerciseTable';
import { getExercisesByHandle } from '../../services/exercise.services';
import { AppContext } from '../../context/AppContext/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import ExerciseList from '../../components/Exercises/ExerciseList/ExerciseList';

const ExercisesView: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [exercises, setExercises] = useState<[] | null>(null);
    const [savedExercises, setSavedExercises] = useState<[] | null>(null);

    useEffect(() => {
        if (!userData) return;
        onValue(ref(db, `users/${userData.handle}/exercises`), () => {
            getExercisesByHandle(userData.handle)
                .then(data => setExercises(Object.values(data)))
                .catch(() => setExercises([]));
        });
    }, [userData]);

    return (
        <VStack p={5} bg={useColorModeValue('brand.light', 'brand.dark')} gap={4}>
            <CreateExercise />
            <ExerciseList title='My Exercises'>
                {(exercises && (exercises.every(el => el.exerciseId) || !exercises.length)) ?
                    <ExerciseTable exercises={exercises} /> :
                    <Spinner size='xl' />}
            </ExerciseList>
            {(savedExercises && (savedExercises.every(el => el.exerciseId) || !savedExercises.length)) ?
                <ExerciseList title='Saved Exercises'>
                    <ExerciseTable exercises={savedExercises} />
                </ExerciseList> :
                <Spinner size='xl' />}
        </VStack>
    );
};

export default ExercisesView;
