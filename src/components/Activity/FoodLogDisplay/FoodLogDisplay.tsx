import { FC } from 'react';

import { Badge, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { IoMdRemove } from 'react-icons/io';

import { ITodayLog } from '../../../common/types';

const FoodLogDisplay: FC<{ todayLog: ITodayLog | null }> = ({ todayLog }) => {

    const badgeColorScheme = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'linkedin', 'facebook', 'messenger'];

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
                                onClick={(e) => console.log(e)} />
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
