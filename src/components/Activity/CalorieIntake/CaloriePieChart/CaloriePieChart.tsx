import { FC, ReactElement } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useColorModeValue } from '@chakra-ui/color-mode';

const CaloriePieChart: FC<{ calorieLog: {[key: string]: number} }> = ({ calorieLog }): ReactElement => {
    const tooltipColor = useColorModeValue('#F7FAFC', '#171923');
    const contrastColor = useColorModeValue('#171923', '#F7FAFC');

    const data = Object.keys(calorieLog).map(food => {
        return {
            id: food,
            label: food,
            value: calorieLog[food],
        };
    });

    return (
        <ResponsivePie
            data={
                data
            }
            theme={{
                tooltip: {
                    container: {
                        background: tooltipColor,
                    },
                },
            }}
            margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
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
            enableArcLinkLabels={false}
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
        />
    );
};

export default CaloriePieChart;
