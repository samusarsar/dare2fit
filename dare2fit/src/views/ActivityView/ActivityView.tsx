import { FC, ReactElement } from 'react';

import { Flex, VStack } from '@chakra-ui/react';

import ActivityLogger from '../../components/Activity/ActivityLogger/ActivityLogger';
import WorkoutsCarousel from '../../components/Activity/ActivityCarousel/WorkoutsCarousel';
import GoalsCarousel from '../../components/Activity/ActivityCarousel/GoalsCarousel';

const ActivityView: FC = (): ReactElement => {
    return (
        <VStack gap={5} w='100%' align='center'>
            <ActivityLogger />
            <Flex justifyContent='center' wrap='wrap' gap={3} w='100%'>
                <WorkoutsCarousel />
                <GoalsCarousel />
            </Flex>

        </VStack>
    );
};

export default ActivityView;
