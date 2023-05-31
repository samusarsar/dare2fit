import { FC, ReactElement } from 'react';

import { Flex, Grid } from '@chakra-ui/react';

import ActivityLogger from '../../components/Activity/ActivityLogger/ActivityLogger';
import WorkoutsCarousel from '../../components/Activity/ActivityCarousel/WorkoutsCarousel';
import GoalsCarousel from '../../components/Activity/ActivityCarousel/GoalsCarousel';

const ActivityView: FC = (): ReactElement => {
    return (
        <Grid gap={5}>
            <Flex justifyContent={{ base: 'center', md: 'flex-start' }} wrap='wrap' gap={2} >
                <WorkoutsCarousel />
                <GoalsCarousel />
            </Flex>

            <ActivityLogger />
        </Grid>
    );
};

export default ActivityView;
