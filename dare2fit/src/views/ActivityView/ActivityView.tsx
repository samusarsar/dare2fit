import { VStack } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import ActivityLogger from '../../components/Activity/ActivityLogger/ActivityLogger';

const ActivityView: FC = (): ReactElement => {
    return (
        <VStack>
            <ActivityLogger />
        </VStack>
    );
};

export default ActivityView;
