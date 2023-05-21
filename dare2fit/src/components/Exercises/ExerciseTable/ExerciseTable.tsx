import { FC, ReactElement } from 'react';
import { Table, Tbody, Td, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { IExercise } from '../../../common/types';
import SingleExerciseRow from '../SingleExercise/SingleExercise';

const ExerciseTable: FC<{ exercises: IExercise[] | [] }> = ({ exercises }): ReactElement => {
    const textColor = useColorModeValue('gray.700', 'white');

    return (
        <Table variant='simple' color={textColor}>
            <Thead>
                <Tr my='.8rem' pl='0px' color='gray.400'>
                    <Td>Exercise</Td>
                    <Td>Type</Td>
                    <Td>Difficulty</Td>
                    <Td>Instructions</Td>
                </Tr>
            </Thead>
            <Tbody>
                {exercises.map(exercise =>
                    <SingleExerciseRow
                        key={exercise.exerciseId}
                        exercise={exercise}
                    />)}
            </Tbody>
        </Table>
    );
};

export default ExerciseTable;
