import { FC, useEffect, useState } from 'react';
import { IWorkout } from '../../../common/types';
import WorkoutDetails from '../WorkoutDetails/WorkoutDetails';
import { HStack, Heading, Icon, Select, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { ImFilesEmpty } from 'react-icons/im';


const WorkoutsList: FC<{ heading: string, workouts: IWorkout[] | [], type: string}> = ({ heading, workouts, type }) => {
    const [filterCategory, setFilterCategory] = useState('anyCategory');
    const [filterDifficulty, setFilterDifficulty] = useState('anyDifficulty');
    const [workoutsToShow, setWorkoutsToShow] = useState(workouts);

    const background = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        if (workouts) {
            if (filterCategory === 'anyCategory' && filterDifficulty === 'anyDifficulty') {
                setWorkoutsToShow(workouts);
            } else if (filterCategory === 'anyCategory') {
                setWorkoutsToShow(workouts.filter(workout => workout.difficulty === filterDifficulty));
            } else if (filterDifficulty === 'anyDifficulty') {
                setWorkoutsToShow(workouts.filter(workout => workout.category === filterCategory));
            } else {
                setWorkoutsToShow(workouts.filter(workout => workout.category === filterCategory && workout.difficulty === filterDifficulty));
            }
        }
    }, [filterCategory, filterDifficulty, workouts]);

    return (
        <VStack align='start' p={4} w='100%' rounded='lg'>
            <HStack>
                <Heading as='h2' size='lg'>{heading}</Heading>
                <HStack flexWrap='wrap' spacing={0} gap={2}>
                    <Select w='150px' onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value='anyCategory'>Any Category</option>
                        <option value='strength'>Strength</option>
                        <option value='stamina'>Stamina</option>
                        <option value='stretching'>Stretching</option>
                    </Select>
                    <Select w='150px' onChange={(e) => setFilterDifficulty(e.target.value)}>
                        <option value='anyDifficulty'>Any Difficulty</option>
                        <option value='beginner'>Beginner</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='advanced'>Advanced</option>
                    </Select>
                </HStack>
            </HStack>
            {workoutsToShow.length === 0 ?
                <HStack align='start' py={5} mb={2} w='100%' gap={2} overflowX='auto'>

                    <HStack width='sm' h='250px' rounded='md' justify='center' boxShadow='lg' bg={background}>
                        <Icon as={ImFilesEmpty} fontSize='2em' />
                        <Text>No workouts</Text>
                    </HStack>
                </HStack> :
                <HStack align='start' py={5} pb={8} mb={2} w='100%' gap={2} overflowX='auto'>
                    { workoutsToShow.map(workout => (<WorkoutDetails key={workout.workoutId} workout={workout} />)) }
                </HStack>}
        </VStack>
    );
};

export default WorkoutsList;
