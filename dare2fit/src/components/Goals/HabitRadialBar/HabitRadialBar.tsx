import { Box, Text, VStack } from '@chakra-ui/layout';
import { RadialBarDatum, RadialBarSerie, ResponsiveRadialBar } from '@nivo/radial-bar';
import { FC, useState } from 'react';
import { IGoal } from '../../../common/types';
import { COLOR_BRAND_BLUE, COLOR_BRAND_GREEN, COLOR_BRAND_RED, COLOR_BRAND_YELLOW } from '../../../common/constants';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Icon } from '@chakra-ui/icon';
import { AiOutlineCheck } from 'react-icons/ai';

const HabitRadialBar: FC<{ goal: IGoal }> = ({ goal }) => {
    let hoverText: string;
    const habitProgress = (goal[goal.author] as number) / goal.target * 100;
    const habitProgressText = `${habitProgress.toFixed(0)}%`;
    const habitUnitsLeft = goal.target - (goal[goal.author] as number);
    const habitUnitsLeftText = `${habitUnitsLeft.toFixed(0)} ${goal.units} left`;
    const circleInfoColor = habitProgress < 50 ? COLOR_BRAND_RED :
        habitProgress < 80 ? COLOR_BRAND_YELLOW :
            habitProgress < 100 ? COLOR_BRAND_BLUE :
                COLOR_BRAND_GREEN;
    const trackColor = useColorModeValue('rgba(0, 0, 0, 0.24)', 'rgba(255, 255, 255, 0.24)');

    const [circleInfo, setCircleInfo] = useState(habitProgressText);

    switch (goal.type) {
    case 'walking':
        hoverText = 'Steps Taken';
        break;
    case 'running':
        hoverText = 'Kilometers Ran';
        break;
    case 'cycling':
        hoverText = 'Kilometers Cycled';
        break;
    case 'swimming':
        hoverText = 'Meters Swam';
        break;
    default:
        hoverText = 'Workouts Completed';
        break;
    }

    const radialData: RadialBarSerie<RadialBarDatum>[] = [{
        'id': `${hoverText}`,
        'data': [
            {
                'y': goal[goal.author] as number,
            },
        ],
    }];

    return (
        <Box h='100%' w='280px' position='relative'>
            <ResponsiveRadialBar
                data={radialData}
                maxValue={goal.target}
                valueFormat=">-0,.0~f"
                startAngle={0}
                endAngle={360}
                innerRadius={0.4}
                padding={0.4}
                cornerRadius={4}
                colors={circleInfoColor}
                tracksColor={trackColor}
                enableRadialGrid={false}
                radialAxisStart={null}
                circularAxisOuter={null}
                isInteractive={false}
                motionConfig="molasses"
                transitionMode="startAngle"
            />
            <VStack align='center'
                bg={circleInfoColor}
                h='100px'
                w='100px'
                p={3}
                rounded='full'
                justify='center'
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                transition='0.2s ease-in'
                onMouseEnter={() => setCircleInfo(habitUnitsLeftText)}
                onMouseLeave={() => setCircleInfo(habitProgressText)}>
                {habitProgress < 100 ?
                    <Text textAlign='center' fontSize='lg'>{circleInfo}</Text> :
                    <Icon as={AiOutlineCheck} fontSize='3xl'/>}
            </VStack>
        </Box>
    );
};

export default HabitRadialBar;
