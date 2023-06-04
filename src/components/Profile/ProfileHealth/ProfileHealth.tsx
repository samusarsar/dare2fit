import { FC, ReactElement, useContext, useRef, useState } from 'react';
// eslint-disable-next-line max-len
import { Badge, Box, Button, Center, HStack, Icon, Input, Select, Switch, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, useColorModeValue, useNumberInput } from '@chakra-ui/react';
import { TiFeather } from 'react-icons/ti';
import { TbWeight } from 'react-icons/tb';
import { BsCheck } from 'react-icons/bs';
import { BiHealth } from 'react-icons/bi';

import { editUserHealthData, editUserHealthNumberData } from '../../../services/user.services';
import { ActivityLevel, Gender } from '../../../common/enums';
import { AppContext } from '../../../context/AppContext/AppContext';
import moment from 'moment';
import { ActivityLevelData } from '../../../common/constants';

const ProfileHealth: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [isMetric, setIsMetric] = useState(true);

    const profileBMI = (userData!.health?.weightMetric && userData!.health?.heightMetric) ?
        (userData!.health?.weightMetric / ((userData!.health?.heightMetric / 100) ** 2)) :
        null;

    const bmiData = !profileBMI ?
        { category: 'none', color: 'gray' } :
        profileBMI < 18.5 ?
            { category: 'underweight', color: 'yellow', icon: TiFeather } :
            (profileBMI >= 18.5 && profileBMI < 25) ?
                { category: 'healthy', color: 'teal', icon: BsCheck } :
                (profileBMI >= 25 && profileBMI < 30) ?
                    { category: 'overweight', color: 'purple', icon: TbWeight } :
                    { category: 'obese', color: 'red', icon: BiHealth };

    const inputColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400');

    const weightInputRef = useRef<HTMLInputElement | null>(null);

    const heightInputRef = useRef<HTMLInputElement | null>(null);

    const { getInputProps: getInputPropsWeight, getIncrementButtonProps: getIncrementButtonPropsWeight, getDecrementButtonProps: getDecrementButtonPropsWeight } = useNumberInput({
        step: 0.5,
        min: 1,
    });

    const { getInputProps: getInputPropsHeight, getIncrementButtonProps: getIncrementButtonPropsHeight, getDecrementButtonProps: getDecrementButtonPropsHeight } = useNumberInput({
        step: 0.1,
        min: 1,
    });

    const incWeight = getIncrementButtonPropsWeight();
    const decWeight = getDecrementButtonPropsWeight();
    const inputWeight = getInputPropsWeight();

    const incHeight = getIncrementButtonPropsHeight();
    const decHeight = getDecrementButtonPropsHeight();
    const inputHeight = getInputPropsHeight();

    const profileActivityLevel = userData!.health?.activityLevel || ActivityLevel.noActivity;

    const calculateBmr = () => {
        if (userData!.health) {
            const { weightMetric, heightMetric, gender } = userData!.health;

            if (weightMetric && heightMetric && gender && userData!.dateOfBirth) {
                const age = moment().diff(moment(userData!.dateOfBirth, 'DD/MM/YYYY'), 'years');
                return gender === Gender.male ? (
                    (10 * weightMetric + 6.25 * heightMetric - 5 * age + 5) * ActivityLevelData[profileActivityLevel].index
                ) : (
                    (10 * weightMetric + 6.25 * heightMetric - 5 * age - 161) * ActivityLevelData[profileActivityLevel].index
                );
            }
        }
        return null;
    };

    const profileBmr = calculateBmr();

    const handleEditNumberData = (value: number, prop: string) => {
        if (!!value && !isNaN(value)) {
            editUserHealthNumberData({ handle: userData!.handle, propKey: prop, propValue: value, isMetric });
        }
    };

    const handleEditGender = (value: string) => {
        editUserHealthData(userData!.handle, 'gender', value);
    };

    const handleEditActivityLevel = (value: string) => {
        editUserHealthData(userData!.handle, 'activityLevel', value);
    };

    return (
        <VStack w='100%' align='end'>
            <HStack m={2}>
                <Text >Metric</Text>
                <Switch size='lg' onChange={() => setIsMetric(!isMetric)} />
                <Text>Imperial</Text>
            </HStack>
            <Box overflowX='auto' w='100%'>
                <Table variant='striped' colorScheme='blackAlpha' layout={{ base: 'inherit', md: 'fixed' }}>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Current Value:</Th>
                            <Th>Updated Value:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td fontWeight='bold'>Gender:</Td>
                            <Td>{!userData!.health?.gender ?
                                ('No entry') :
                                (<Badge fontSize='0.8em' colorScheme={userData!.health.gender === Gender.male ? 'blue' : 'pink'}>{userData!.health.gender}</Badge>)}
                            </Td>
                            <Td>
                                <VStack>
                                    <HStack>
                                        <Select
                                            bg={inputColor}
                                            defaultValue={userData!.health?.gender}
                                            onChange={e => handleEditGender(e.target.value)}>
                                            <option value={''}>{Gender.genderNeutral}</option>
                                            <option value={Gender.male}>{Gender.male}</option>
                                            <option value={Gender.female}>{Gender.female}</option>
                                        </Select>
                                    </HStack>
                                </VStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight='bold'>Weight:</Td>
                            <Td>{!userData!.health?.weightMetric ?
                                ('No entry yet') :
                                (<>
                                    {isMetric ?
                                        userData!.health?.weightMetric :
                                        userData!.health?.weightImperial} <Badge fontSize='0.8em' colorScheme={isMetric ? 'blue' : 'pink'}>{isMetric ? 'kg' : 'lbs'}</Badge>
                                </>)}
                            </Td>
                            <Td>
                                <VStack>
                                    <HStack>
                                        <Button {...decWeight} colorScheme='facebook'>-</Button>
                                        <Input {...inputWeight} ref={weightInputRef} bg={inputColor} />
                                        <Button {...incWeight} colorScheme='facebook'>+</Button>
                                    </HStack>
                                    <Button variant='ghost' colorScheme='teal' onClick={() => handleEditNumberData(+weightInputRef.current!.value, 'weight')}>
                                        Update in {isMetric ? 'kg' : 'lbs'}
                                    </Button>
                                </VStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight='bold'>Height:</Td>
                            <Td>{!userData!.health?.heightMetric ?
                                ('No entry yet') :
                                (<>
                                    {isMetric ?
                                        userData!.health?.heightMetric :
                                        userData!.health?.heightImperial} <Badge fontSize='0.8em' colorScheme={isMetric ? 'blue' : 'pink'}>{isMetric ? 'cm' : 'ft'}</Badge>
                                </>)}
                            </Td>
                            <Td>
                                <VStack>
                                    <HStack>
                                        <Button {...decHeight} colorScheme='facebook'>-</Button>
                                        <Input {...inputHeight} ref={heightInputRef} bg={inputColor} />
                                        <Button {...incHeight} colorScheme='facebook'>+</Button>
                                    </HStack>
                                    <Button variant='ghost' colorScheme='teal' onClick={() => handleEditNumberData(+heightInputRef.current!.value, 'height')}>
                                        Update in {isMetric ? 'cm' : 'ft'}
                                    </Button>
                                </VStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Text fontWeight='bold'>BMI:</Text>
                                <Text>Body Mass Index</Text>
                            </Td>
                            <Td>
                                <HStack>
                                    <Text>{profileBMI ? profileBMI.toFixed(1) : 'Insufficient data for BMI calculation.'}</Text>
                                    <Badge colorScheme={bmiData.color} fontSize='0.8em'>{bmiData.category}</Badge>
                                </HStack>
                            </Td>
                            <Td><Center p={4}><Icon as={bmiData.icon} color={bmiData.color} fontSize='2.5em' /></Center></Td>
                        </Tr>

                        <Tr>
                            <Td>
                                <Text fontWeight='bold'>BMR:</Text>
                                <Text>Basal Metabolic Rate</Text>
                            </Td>
                            <Td>
                                <HStack>
                                    <Text>{profileBmr || 'Insufficient data for BMR calculation.'}</Text>
                                    {profileBmr && <Badge colorScheme='red' fontSize='0.8em'>kcal/day</Badge>}
                                </HStack>
                            </Td>
                            <Td pl='0'>
                                <VStack>
                                    <HStack>
                                        <Select
                                            bg={inputColor}
                                            size='md'
                                            defaultValue={profileActivityLevel}
                                            onChange={e => handleEditActivityLevel(e.target.value)}>
                                            {Object.values(ActivityLevel)
                                                .map(activity => <option key={activity} value={activity}>{ActivityLevelData[activity].description}</option>)
                                            }
                                        </Select>
                                    </HStack>
                                </VStack>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};

export default ProfileHealth;