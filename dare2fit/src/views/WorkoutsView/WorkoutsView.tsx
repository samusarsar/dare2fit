import { FC, ReactElement } from 'react';

import { VStack, useColorModeValue } from '@chakra-ui/react';


const WorkoutsView: FC = (): ReactElement => {


    return (
        <VStack p={5} bg={useColorModeValue('brand.light', 'brand.dark')} gap={4}>

        </VStack>
    );
};

export default WorkoutsView;
