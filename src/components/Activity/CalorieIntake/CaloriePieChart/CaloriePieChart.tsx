import { FC, ReactElement } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useColorModeValue } from '@chakra-ui/color-mode';

const CaloriePieChart: FC = (): ReactElement => {
    const tooltipColor = useColorModeValue('#F7FAFC', '#171923');
    const contrastColor = useColorModeValue('#171923', '#F7FAFC');

    return (
        <ResponsivePie
            data={
                [
                    {
                        'id': 'python',
                        'label': 'python',
                        'value': 148,
                        'color': 'hsl(76, 70%, 50%)',
                    },
                    {
                        'id': 'haskell',
                        'label': 'haskell',
                        'value': 490,
                        'color': 'hsl(213, 70%, 50%)',
                    },
                    {
                        'id': 'php',
                        'label': 'php',
                        'value': 246,
                        'color': 'hsl(283, 70%, 50%)',
                    },
                ]
            }
            theme={{
                tooltip: {
                    container: {
                        background: tooltipColor,
                    },
                },
            }}
            margin={{ top: 0, right: 60, bottom: 0, left: 60 }}
            innerRadius={0.05}
            padAngle={3}
            cornerRadius={5}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'set1' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2,
                    ],
                ],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={contrastColor}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            enableArcLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.6,
                    ],
                ],
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'c',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'go',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'python',
                    },
                    id: 'lines',
                },
                {
                    match: {
                        id: 'scala',
                    },
                    id: 'lines',
                },
                {
                    match: {
                        id: 'lisp',
                    },
                    id: 'lines',
                },
                {
                    match: {
                        id: 'elixir',
                    },
                    id: 'lines',
                },
                {
                    match: {
                        id: 'javascript',
                    },
                    id: 'lines',
                },
            ]}
        />
    );
};

export default CaloriePieChart;