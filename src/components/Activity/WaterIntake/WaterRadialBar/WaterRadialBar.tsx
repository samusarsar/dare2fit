import { RadialBarDatum, RadialBarSerie, ResponsiveRadialBar } from '@nivo/radial-bar';
import { FC } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Button } from '@chakra-ui/react';

const WaterRadialBar: FC<{ waterLog: number, waterTarget: number }> = ({ waterLog, waterTarget }) => {
    const trackColor = useColorModeValue('rgba(0, 0, 0, 0.24)', 'rgba(255, 255, 255, 0.24)');
    const tooltipColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');

    const radialData: RadialBarSerie<RadialBarDatum>[] = [{
        'id': 'Water',
        'data': [
            {
                'x': 'Water',
                'y': waterLog,
            },
        ],
    }];

    return (
        <ResponsiveRadialBar
            data={radialData}
            maxValue={waterTarget || waterLog}
            valueFormat=">-0,.0~f"
            startAngle={0}
            endAngle={360}
            innerRadius={0.4}
            padding={0.4}
            cornerRadius={4}
            colors={{ scheme: 'category10' }}
            tracksColor={trackColor}
            enableRadialGrid={false}
            radialAxisStart={null}
            circularAxisOuter={null}
            isInteractive={true}
            tooltip={(el) => {
                return (
                    <Button bg={tooltipColor}>{el.bar.category}: {el.bar.value}</Button>
                );
            }}
            motionConfig="molasses"
            transitionMode="startAngle"
        />
    );
};

export default WaterRadialBar;
