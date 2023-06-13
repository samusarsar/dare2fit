import { FC, useContext, useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    useColorModeValue,
    Box,
    Spinner,
    Button,
} from '@chakra-ui/react';
import { getChallengeLogHistory, getHabitLogHistory } from '../../../services/goal.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { IGoal } from '../../../common/types';
import moment, { MomentInput } from 'moment';
import { ResponsiveLine, Serie } from '@nivo/line';
import { CalendarDatum, ResponsiveCalendar } from '@nivo/calendar';
import { GoalTypes } from '../../../common/enums';

const GoalLog: FC<{ isOpen: boolean, onClose: () => void, goal: IGoal }> = ({ isOpen, onClose, goal }) => {
    const { userData } = useContext(AppContext);

    const [lineChartData, setLineChartData] = useState<Serie[] | null>(null);
    const [calendarChartData, setCalendarChartData] = useState<CalendarDatum[] | null>(null);

    const tooltipColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');
    const contrastColor = useColorModeValue('#171923', '#F7FAFC');

    const typeIsWorkout = goal.type === 'workout';
    const typeIsWorkoutCategory = goal.type === 'strength' || goal.type === 'stamina' || goal.type === 'stretching';

    useEffect(() => {
        const getLogFn = () => {
            const startDate = moment(goal.duration?.startDate as MomentInput, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const endDate = moment(goal.duration?.endDate as MomentInput, 'DD/MM/YYYY').format('YYYY-MM-DD');

            return goal.category === GoalTypes.habit ?
                getHabitLogHistory(userData!.handle) :
                getChallengeLogHistory(userData!.handle, startDate, endDate);
        };

        getLogFn()
            .then((data) => {
                const lineChartDataRec: Serie[] = [{
                    'id': goal.name || goal.type,
                    'data': [],
                }];

                const calendarChartDataRec: CalendarDatum[] = [];

                Object.entries(data).forEach(([date, log]) => {
                    let value: number;
                    if (typeIsWorkoutCategory) {
                        value = log.workout ? (log.workout.category === goal.type ? 1 : 0) : 0;
                    } else if (goal.type === 'workout') {
                        value = log.workout ? 1 : 0;
                    } else {
                        value = log[goal.type] ? (log[goal.type] as number) : 0;
                    }
                    if (typeIsWorkout || typeIsWorkoutCategory) {
                        calendarChartDataRec.push({ 'value': 1, 'day': date });
                    } else {
                        lineChartDataRec[0].data.push({ 'x': moment(date).format('DD/MM/YYYY'), 'y': value });
                    }
                });

                if (typeIsWorkout || typeIsWorkoutCategory) {
                    setCalendarChartData(calendarChartDataRec);
                } else {
                    setLineChartData(lineChartDataRec);
                }
            })
            .catch(() => {
                setCalendarChartData([]);
                setLineChartData([{
                    'id': goal.name || goal.type,
                    'data': [],
                }]);
            });
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                px={6}
                py={4}
                minW='80%'>
                <ModalCloseButton />
                <ModalHeader>Your Goal Log</ModalHeader>
                <ModalBody w='100%' overflowX='auto'>
                    <Box h='400px' minW='lg'>
                        {!(typeIsWorkout || typeIsWorkoutCategory) ?
                            (lineChartData ?
                                <ResponsiveLine
                                    data={lineChartData}
                                    theme={{
                                        axis: {
                                            legend: {
                                                text: {
                                                    fontSize: '1em',
                                                    fill: contrastColor,
                                                },
                                            },
                                            ticks: {
                                                line: {
                                                    stroke: contrastColor,
                                                },
                                                text: {
                                                    fontSize: '0.8em',
                                                    fill: contrastColor,
                                                },
                                            },
                                        },
                                    }}
                                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                    xScale={{ type: 'point' }}
                                    yScale={{
                                        type: 'linear',
                                        min: 0,
                                        max: 'auto',
                                        stacked: true,
                                        reverse: false,
                                    }}
                                    yFormat=" >-.2f"
                                    curve="cardinal"
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={null}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: goal.units,
                                        legendOffset: -50,
                                        legendPosition: 'middle',
                                    }}
                                    colors={{ scheme: 'accent' }}
                                    lineWidth={4}
                                    pointSize={10}
                                    pointColor={{ theme: 'background' }}
                                    pointBorderWidth={2}
                                    pointBorderColor={{ from: 'serieColor' }}
                                    pointLabelYOffset={-12}
                                    enableArea={true}
                                    enableCrosshair={false}
                                    tooltip={({ point }) => {
                                        return (
                                            <Button bg={tooltipColor}>{point.data.x as string}: {point.data.y as string} {goal.units}</Button>
                                        );
                                    }}
                                    useMesh={true}
                                    legends={[
                                        {
                                            anchor: 'right',
                                            direction: 'column',
                                            justify: false,
                                            translateX: 119,
                                            translateY: 0,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemsSpacing: 4,
                                            symbolSize: 20,
                                            symbolShape: 'circle',
                                            itemDirection: 'left-to-right',
                                            itemTextColor: contrastColor,
                                            effects: [
                                                {
                                                    on: 'hover',
                                                    style: {
                                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                                        itemOpacity: 1,
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                    motionConfig="default"
                                /> :
                                <Spinner />) :
                            (calendarChartData ?
                                <ResponsiveCalendar
                                    data={calendarChartData}
                                    theme={{
                                        labels: {
                                            text: {
                                                fontSize: '1em',
                                                fill: contrastColor,
                                            },
                                        },
                                    }}
                                    from={moment(goal.duration?.startDate as MomentInput, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                                    to={moment(goal.duration?.endDate as MomentInput, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                                    emptyColor="#eeeeee"
                                    colors={['#61cdbb']}
                                    margin={{ top: 0, right: 0, bottom: 0, left: 30 }}
                                    yearSpacing={40}
                                    monthBorderWidth={3}
                                    monthBorderColor="#171923"
                                    daySpacing={1}
                                    dayBorderColor='#CBD5E0'
                                    dayBorderWidth={1}
                                    legends={[
                                        {
                                            anchor: 'bottom-right',
                                            direction: 'row',
                                            translateY: 36,
                                            itemCount: 4,
                                            itemWidth: 42,
                                            itemHeight: 36,
                                            itemsSpacing: 14,
                                            itemDirection: 'right-to-left',
                                        },
                                    ]}
                                    tooltip={(el) => {
                                        return (
                                            <Button bg={tooltipColor}>{moment(el.day).format('dddd, MMM Do, YY')}: Workout Completed</Button>
                                        );
                                    }}
                                /> :
                                <Spinner />)}
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default GoalLog;
