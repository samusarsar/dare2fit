import { FC, ReactElement } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Button, Divider, Heading, Icon, VStack, useColorModeValue } from '@chakra-ui/react';

import { IoMdAdd } from 'react-icons/io';
import MyWorkouts from '../../components/Workouts/MyWorkouts';

const WorkoutsView: FC = (): ReactElement => {

    return (
        <VStack p={5} bg={useColorModeValue('brand.light', 'brand.dark')} gap={4}>
            <Button
                as={Link}
                to='create'
                w='80%' h='100px' colorScheme='purple'
            >
                <Icon as={IoMdAdd} boxSize={6} mr={2} />
                Create Workout
            </Button>
            <Outlet />

            <Divider />
            <Heading>My workouts</Heading>
            <MyWorkouts />
            <Divider />
            <Heading>Saved workouts</Heading>

        </VStack>
    );
};

export default WorkoutsView;
