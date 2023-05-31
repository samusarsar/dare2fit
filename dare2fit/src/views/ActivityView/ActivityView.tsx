import { FC, ReactElement } from 'react';

import { Grid, VStack } from '@chakra-ui/react';

import ActivityLogger from '../../components/Activity/ActivityLogger/ActivityLogger';
import WorkoutsCarousel from '../../components/Activity/ActivityCarousel/WorkoutsCarousel';
import GoalsCarousel from '../../components/Activity/ActivityCarousel/GoalsCarousel';

const ActivityView: FC = (): ReactElement => {
    return (
        <VStack>
            <Grid templateColumns='1fr 1fr 1fr' >
                <WorkoutsCarousel />
                <GoalsCarousel />
            </Grid>

            <ActivityLogger />
        </VStack>
    );
};

export default ActivityView;
