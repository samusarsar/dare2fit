import { FC, useContext } from 'react';
import { Badge, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { IoMdRemove } from 'react-icons/io';
import { unlogActivity } from '../../../services/activity.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { ITodayLog } from '../../../common/types';

const ActivityLogDisplay: FC<{ todayLog: ITodayLog | null }> = ({ todayLog }) => {
    const { userData } = useContext(AppContext);

    const workoutIsLogged = todayLog ?
        Object.keys(todayLog).includes('workout') :
        false;

    const walkingIsLogged = todayLog ?
        Object.keys(todayLog).includes('walking') :
        false;

    const runningIsLogged = todayLog ?
        Object.keys(todayLog).includes('running') :
        false;

    const cyclingIsLogged = todayLog ?
        Object.keys(todayLog).includes('cycling') :
        false;

    const swimmingIsLogged = todayLog ?
        Object.keys(todayLog).includes('swimming') :
        false;

    const handleUnlog = (activityType: string) => {
        unlogActivity({ handle: userData!.handle, activityType });
    };

    if (todayLog) {
        return (
            <VStack align='start' pb={2}>
                {!!workoutIsLogged &&
                    <Box w='100%' px={{ base: 0, md: 4 }} py={2} display={{ base: 'block', xl: 'flex' }}>
                        <Badge colorScheme='pink' h='fit-content' p={2} rounded='full'>
                            Workout:
                        </Badge>
                        <HStack w='100%' justify='right' pt={2}>
                            <Text>{todayLog.workout?.name}</Text>
                            <IconButton
                                size='xs'
                                icon={<IoMdRemove />}
                                colorScheme='red'
                                aria-label='remove activity'
                                onClick={() => handleUnlog('workout')}/>
                        </HStack>
                    </Box>}
                {!!walkingIsLogged &&
                    <Box w='100%' px={{ base: 0, md: 4 }} py={4} display={{ base: 'block', lg: 'flex' }} >
                        <Badge colorScheme='teal' h='fit-content' p={2} rounded='full'>
                        Walking:
                        </Badge>
                        <HStack w='100%' justify='right' pt={2} flexWrap='wrap-reverse'>
                            <Text>{todayLog.walking} steps</Text>
                            <IconButton
                                size='xs'
                                icon={<IoMdRemove />}
                                colorScheme='red'
                                aria-label='remove activity'
                                onClick={() => handleUnlog('walking')}/>
                        </HStack>
                    </Box>}
                {!!runningIsLogged &&
                    <Box w='100%' px={{ base: 0, md: 4 }} py={4} display={{ base: 'block', lg: 'flex' }} >
                        <Badge colorScheme='purple' h='fit-content' p={2} rounded='full'>
                        Running:
                        </Badge>
                        <HStack w='100%' justify='right' pt={2} flexWrap='wrap-reverse'>
                            <Text>{todayLog.running} km</Text>
                            <IconButton
                                size='xs'
                                icon={<IoMdRemove />}
                                colorScheme='red'
                                aria-label='remove activity'
                                onClick={() => handleUnlog('running')}/>
                        </HStack>
                    </Box>}
                {!!cyclingIsLogged &&
                    <Box w='100%' px={{ base: 0, md: 4 }} py={4} display={{ base: 'block', lg: 'flex' }} >
                        <Badge colorScheme='orange' h='fit-content' p={2} rounded='full'>
                        Cycling:
                        </Badge>
                        <HStack w='100%' justify='right' pt={2} flexWrap='wrap-reverse'>
                            <Text>{todayLog.cycling} km</Text>
                            <IconButton
                                size='xs'
                                icon={<IoMdRemove />}
                                colorScheme='red'
                                aria-label='remove activity'
                                onClick={() => handleUnlog('cycling')}/>
                        </HStack>
                    </Box>}
                {!!swimmingIsLogged &&
                    <Box w='100%' px={{ base: 0, md: 4 }} py={4} display={{ base: 'block', lg: 'flex' }} >
                        <Badge colorScheme='blue' h='fit-content' p={2} rounded='full'>
                        Swimming:
                        </Badge>
                        <HStack w='100%' justify='right' pt={2} flexWrap='wrap-reverse'>
                            <Text>{todayLog.swimming} m</Text>
                            <IconButton
                                size='xs'
                                icon={<IoMdRemove />}
                                colorScheme='red'
                                aria-label='remove activity'
                                onClick={() => handleUnlog('swimming')}/>
                        </HStack>
                    </Box>}
            </VStack>
        );
    }

    return null;
};

export default ActivityLogDisplay;
