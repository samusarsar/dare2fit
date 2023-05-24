import { FC, ReactElement } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Button, Divider, Icon, VStack, useColorModeValue } from '@chakra-ui/react';

import { IoMdAdd } from 'react-icons/io';

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
            <h1>My workouts</h1>
            <Divider />
            <h1>Saved workouts</h1>

        </VStack>
    );
};

export default WorkoutsView;
