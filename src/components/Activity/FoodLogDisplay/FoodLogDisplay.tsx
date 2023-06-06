import { FC, useContext } from 'react';

import { Badge, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { IoMdRemove } from 'react-icons/io';

import { ITodayLog } from '../../../common/types';
import { unlogFood } from '../../../services/food.services';
import { AppContext } from '../../../context/AppContext/AppContext';

const FoodLogDisplay: FC<{ todayLog: ITodayLog | null }> = ({ todayLog }) => {

    const { userData } = useContext(AppContext);

    const badgeColorScheme = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'linkedin', 'facebook', 'messenger'];

    const handleUnlog = (foodName: string) => {
        console.log(foodName);
        unlogFood(userData!.handle, foodName);
    };

    if (todayLog && todayLog.calories) {
        return (
            <VStack align='start' pb={2}>
                {Object.entries(todayLog.calories).map((foodEntry, index) => (
                    <Box key={foodEntry[0]} w='100%' px={{ base: 0, md: 4 }} py={2} display={{ base: 'block', xl: 'flex' }}>
                        <Badge colorScheme={badgeColorScheme[index]} h='fit-content' p={2} rounded='full'>
                            {foodEntry[0]}:
                        </Badge>
                        <HStack w='100%' justify='right' pt={2}>
                            <Text>{foodEntry[1]} kcal</Text>
                            <IconButton
                                size='xs'
                                icon={<IoMdRemove />}
                                colorScheme='red'
                                aria-label='remove activity'
                                onClick={() => handleUnlog(foodEntry[0])} />
                        </HStack>
                    </Box>
                ))
                }
            </VStack>
        );
    }

    return null;
};

export default FoodLogDisplay;
