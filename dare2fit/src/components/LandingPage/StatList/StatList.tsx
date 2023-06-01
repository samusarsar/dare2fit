import { FC, useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/user.services';
import { getAllLogs } from '../../../services/activity.services';
import { ITodayLog } from '../../../common/types';
import { Center, Flex, VStack } from '@chakra-ui/react';
import MiniStat from '../MiniStat/MiniStat';
import { FiUsers } from 'react-icons/fi';
import { FaBiking, FaRunning, FaSwimmer, FaWalking } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';

const StatList: FC = () => {
    const [userCount, setUserCount] = useState<number | null>(null);
    const [activityStats, setActivityStats] = useState<{ [key:string]: number | null }>({
        walkingCount: null,
        runningCount: null,
        cyclingCount: null,
        swimmingCount: null,
        workoutsCount: null,
    });

    useEffect(() => {
        getAllUsers()
            .then(data => setUserCount(Object.keys(data).length))
            .catch(() => setUserCount(0))
            .then(() => getAllLogs())
            .then(data => {
                let walkingCount = 0;
                let runningCount = 0;
                let cyclingCount = 0;
                let swimmingCount = 0;
                let workoutsCount = 0;

                Object.values(data).forEach((userLog: {[key: string]: ITodayLog}) => {
                    Object.values(userLog).forEach((dayLog: ITodayLog) => {
                        walkingCount += dayLog.walking || 0;
                        runningCount += dayLog.running || 0;
                        cyclingCount += dayLog.cycling || 0;
                        swimmingCount += dayLog.swimming || 0;
                        workoutsCount += dayLog.workout ? 1 : 0;
                    });
                });

                setActivityStats({
                    walkingCount,
                    runningCount,
                    cyclingCount,
                    swimmingCount,
                    workoutsCount,
                });
            })
            .catch(() => setActivityStats({
                walkingCount: 0,
                runningCount: 0,
                cyclingCount: 0,
                swimmingCount: 0,
                workoutsCount: 0,
            }));
    }, []);

    return (
        <VStack w='100%'>
            <Center p={6} maxW='5xl'>
                <Flex flexWrap='wrap' gridGap={6} justify="center">
                    <MiniStat title={'Total Users'} amount={userCount} units='' icon={FiUsers} color='brand.red' />
                    <MiniStat title={'Walked'} amount={activityStats?.walkingCount} units='steps' icon={FaWalking} color='brand.green' />
                    <MiniStat title={'Ran '} amount={activityStats?.runningCount} units='km' icon={FaRunning} color='brand.yellow' />
                    <MiniStat title={'Cycled'} amount={activityStats?.cyclingCount} units='km' icon={FaBiking} color='brand.purple' />
                    <MiniStat title={'Swam'} amount={activityStats?.swimmingCount} units='m' icon={FaSwimmer} color='brand.blue' />
                    <MiniStat title={'Workouts'} amount={activityStats?.workoutsCount} units='done' icon={GiWeightLiftingUp} color='teal' />
                </Flex>
            </Center>
        </VStack>
    );
};

export default StatList;
