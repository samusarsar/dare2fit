import { FC, ReactElement, useContext, useRef, useState } from 'react';
// eslint-disable-next-line max-len
import { Badge, Box, Button, Center, HStack, Icon, Input, Select, Switch, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, useColorModeValue, useNumberInput } from '@chakra-ui/react';
import { TiFeather } from 'react-icons/ti';
import { TbWeight } from 'react-icons/tb';
import { BsCheck } from 'react-icons/bs';
import { BiHealth } from 'react-icons/bi';

import { calculateBmr, calculateCalories, editUserHealthData, editUserHealthNumberData } from '../../../services/user.services';
import { ActivityLevel, Gender, WeightGoal } from '../../../common/enums';
import { AppContext } from '../../../context/AppContext/AppContext';
import { ACTIVITY_LEVEL_DATA, WEIGHT_GOAL_DATA } from '../../../common/constants';

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

    const recommendedWaterTargetImperial = userData!.health?.weightImperial ?
        userData!.health?.weightImperial / 2 :
        null;
    const recommendedWaterTargetMetric = recommendedWaterTargetImperial ?
        recommendedWaterTargetImperial / 0.0338 :
        null;


    const inputColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400');

    const weightInputRef = useRef<HTMLInputElement | null>(null);
    const heightInputRef = useRef<HTMLInputElement | null>(null);
    const waterInputRef = useRef<HTMLInputElement | null>(null);

    const { getInputProps: getInputPropsWeight, getIncrementButtonProps: getIncrementButtonPropsWeight, getDecrementButtonProps: getDecrementButtonPropsWeight } = useNumberInput({
        step: 0.5,
        min: 1,
    });

    const { getInputProps: getInputPropsHeight, getIncrementButtonProps: getIncrementButtonPropsHeight, getDecrementButtonProps: getDecrementButtonPropsHeight } = useNumberInput({
        step: 0.1,
        min: 1,
    });

    const { getInputProps: getInputPropsWater, getIncrementButtonProps: getIncrementButtonPropsWater, getDecrementButtonProps: getDecrementButtonPropsWater } = useNumberInput({
        step: 25,
        min: 500,
    });

    const incWeight = getIncrementButtonPropsWeight();
    const decWeight = getDecrementButtonPropsWeight();
    const inputWeight = getInputPropsWeight();

    const incHeight = getIncrementButtonPropsHeight();
    const decHeight = getDecrementButtonPropsHeight();
    const inputHeight = getInputPropsHeight();

    const incWater = getIncrementButtonPropsWater();
    const decWater = getDecrementButtonPropsWater();
    const inputWater = getInputPropsWater();

    const profileActivityLevel = userData!.health?.activityLevel || ActivityLevel.noActivity;
    const profileWeightGoal = userData!.health?.weightGoal || WeightGoal.maintainWeight;

    const profileBmr = calculateBmr(userData!); // TODO
    const profileCalories = calculateCalories(userData!);

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

    const handleEditWeightGoal = (value: string) => {
        editUserHealthData(userData!.handle, 'weightGoal', value);
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
                                                .map(activity => (<option key={activity} value={activity}>{ACTIVITY_LEVEL_DATA[activity].description}</option>))
                                            }
                                        </Select>
                                    </HStack>
                                </VStack>
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>
                                <Text fontWeight='bold'>Calorie Calculator:</Text>
                                {(profileCalories > 0 && profileCalories <= 1200) &&
                                        <Text mt='2' color='red' fontStyle='italic' fontSize='0.8em'>
                                            It is not recommended to consume less than 1200 calories a day. Please consult a doctor!
                                        </Text>}
                            </Td>
                            <Td>
                                <HStack>
                                    <Text>{profileCalories || 'Insufficient data for calorie calculation.'}</Text>
                                    {profileCalories && <Badge colorScheme='red' fontSize='0.8em'>kcal/day</Badge>}
                                </HStack>
                            </Td>
                            <Td pl='0'>
                                <VStack>
                                    <HStack>
                                        <Select
                                            bg={inputColor}
                                            size='md'
                                            defaultValue={profileWeightGoal}
                                            onChange={e => handleEditWeightGoal(e.target.value)}>
                                            {Object.values(WeightGoal)
                                                .map(wGoal => (<option key={wGoal} value={wGoal}>{WEIGHT_GOAL_DATA[wGoal].description}</option>))
                                            }
                                        </Select>
                                    </HStack>
                                </VStack>
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>
                                <Text fontWeight='bold'>Water Target:</Text>
                                {(recommendedWaterTargetMetric && recommendedWaterTargetImperial) &&
                                    (isMetric ?
                                        <Text mt='2' fontStyle='italic' fontSize='0.8em'>(recommended water intake: {recommendedWaterTargetMetric.toFixed(0)} ml)</Text> :
                                        <Text mt='2' fontStyle='italic' fontSize='0.8em'>(Recommended water intake: {recommendedWaterTargetImperial.toFixed(1)} fl oz)</Text>)}
                            </Td>
                            <Td>{!userData!.health?.waterTargetMetric ?
                                ('No entry yet') :
                                (<>
                                    {isMetric ?
                                        userData!.health?.waterTargetMetric :
                                        userData!.health?.waterTargetImperial} <Badge fontSize='0.8em' colorScheme={isMetric ? 'blue' : 'pink'}>{isMetric ? 'ml' : 'fl oz'}</Badge>
                                </>)}
                            </Td>
                            <Td>
                                <VStack>
                                    <HStack>
                                        <Button {...decWater} colorScheme='facebook'>-</Button>
                                        <Input {...inputWater} ref={waterInputRef} bg={inputColor} />
                                        <Button {...incWater} colorScheme='facebook'>+</Button>
                                    </HStack>
                                    <Button variant='ghost' colorScheme='teal' onClick={() => handleEditNumberData(+waterInputRef.current!.value, 'waterTarget')}>
                                        Update in {isMetric ? 'ml' : 'fl oz'}
                                    </Button>
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
