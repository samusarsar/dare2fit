import { FC, ReactElement } from 'react';
import { VStack, useColorModeValue } from '@chakra-ui/react';
import CreateExercise from '../../components/Exercises/CreateExercise/CreateExercise';

const ExercisesView: FC = (): ReactElement => {
    return (
        <VStack p={5} bg={useColorModeValue('brand.light', 'brand.dark')}>
            <CreateExercise />
        </VStack>
    );
};

export default ExercisesView;
