import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/layout';
import { RadialBarDatum, RadialBarSerie, ResponsiveRadialBar } from '@nivo/radial-bar';
import { FC } from 'react';
import { IGoal, IGoalProgresses } from '../../../common/types';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Icon } from '@chakra-ui/icon';
import { Button } from '@chakra-ui/button';
import { AiFillCalendar } from 'react-icons/ai';

const ChallengeRadialBar: FC<{ goal: IGoal, progress: IGoalProgresses }> = ({ goal, progress }) => {
    const trackColor = useColorModeValue('rgba(0, 0, 0, 0.24)', 'rgba(255, 255, 255, 0.24)');
    const tooltipColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');

    const authorProgress: RadialBarSerie<RadialBarDatum> = {
        'id': goal.author,
        'data': [{
            'x': goal.author,
            'y': progress[goal.author],
        }],
    };

    let jointProgress: RadialBarSerie<RadialBarDatum>[] = [];

    if (goal.competingWith) {
        jointProgress = Object.keys(goal.competingWith).map(handle => ({
            'id': handle,
            'data': [{
                'x': handle,
                'y': progress[handle],
            }],
        }));
    }

    jointProgress = [authorProgress, ...jointProgress];

    return (
        <Box h='100%' w='280px' position='relative'>
            <ResponsiveRadialBar
                data={jointProgress}
                maxValue={goal.target}
                valueFormat=">-0,.0~f"
                startAngle={-90}
                endAngle={90}
                innerRadius={0.4}
                padding={0.4}
                cornerRadius={4}
                colors={{ scheme: 'paired' }}
                tracksColor={trackColor}
                enableRadialGrid={false}
                radialAxisStart={null}
                circularAxisOuter={null}
                tooltip={(el) => {
                    return (
                        <Button bg={tooltipColor}>{el.bar.category}: {el.bar.value}</Button>
                    );
                }}
                motionConfig="molasses"
                transitionMode="startAngle"
            />
            <VStack
                w='100%'
                align='center'
                position='absolute'
                top='75%'
                left='50%'
                transform='translate(-50%, -50%)'>
                <Heading as='h3' size='md'>{goal.name}</Heading>
                <HStack>
                    <Icon as={AiFillCalendar} />
                    <Text>{goal.duration!.startDate} - {goal.duration!.endDate}</Text>
                </HStack>
            </VStack>
        </Box>
    );
};

export default ChallengeRadialBar;
