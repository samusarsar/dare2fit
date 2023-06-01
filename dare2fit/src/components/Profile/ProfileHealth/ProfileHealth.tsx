import { FC, ReactElement, useContext, useRef, useState } from 'react';
import { IUserData } from '../../../common/types';
import { Badge, Box, Button, Center, HStack, Icon, Input, Switch, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, useColorModeValue, useNumberInput } from '@chakra-ui/react';
import { TiFeather } from 'react-icons/ti';
import { TbWeight } from 'react-icons/tb';
import { BsCheck } from 'react-icons/bs';
import { BiHealth } from 'react-icons/bi';
import { editUserHealthNumberData } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';

const ProfileHealth: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [isMetric, setIsMetric] = useState(true);

    const profileBMI = (profile.health?.weightMetric && profile.health?.heightMetric) ?
        (profile.health?.weightMetric / ((profile.health?.heightMetric / 100) ** 2)) :
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

    const { getInputProps: getInputPropsWeight, getIncrementButtonProps: getIncrementButtonPropsWeight, getDecrementButtonProps: getDecrementButtonPropsWeight } = useNumberInput({
        step: 0.5,
        min: 1,
    });

    const incWeight = getIncrementButtonPropsWeight();
    const decWeight = getDecrementButtonPropsWeight();
    const inputWeight = getInputPropsWeight();

    const { getInputProps: getInputPropsHeight, getIncrementButtonProps: getIncrementButtonPropsHeight, getDecrementButtonProps: getDecrementButtonPropsHeight } = useNumberInput({
        step: 0.1,
        min: 1,
    });

    const heightInputRef = useRef<HTMLInputElement | null>(null);

    const incHeight = getIncrementButtonPropsHeight();
    const decHeight = getDecrementButtonPropsHeight();
    const inputHeight = getInputPropsHeight();

    const handleEditNumberData = (value: number, prop: string) => {
        if (!!value && !isNaN(value)) {
            editUserHealthNumberData({ handle: userData!.handle, propKey: prop, propValue: value, isMetric });
        }
    };

    return (
        <VStack w='100%' align='end'>
            <HStack m={2}>
                <Text >Metric</Text>
                <Switch size='lg' onChange={() => setIsMetric(!isMetric)}/>
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
                            <Td fontWeight='bold'>Weight:</Td>
                            <Td>{!profile.health?.weightMetric ?
                                ('No entry yet') :
                                (<>
                                    {isMetric ?
                                        profile.health?.weightMetric :
                                        profile.health?.weightImperial} <Badge fontSize='0.8em' colorScheme={isMetric ? 'blue' : 'pink'}>{isMetric ? 'kg' : 'lbs'}</Badge>
                                </>)}
                            </Td>
                            <Td>
                                <VStack>
                                    <HStack>
                                        <Button {...incWeight} colorScheme='facebook'>+</Button>
                                        <Input {...inputWeight} ref={weightInputRef} bg={inputColor} />
                                        <Button {...decWeight} colorScheme='facebook'>-</Button>
                                    </HStack>
                                    <Button variant='ghost' colorScheme='teal' onClick={() => handleEditNumberData(+weightInputRef.current!.value, 'weight')}>
                                        Update in {isMetric ? 'kg' : 'lbs'}
                                    </Button>
                                </VStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight='bold'>Height:</Td>
                            <Td>{!profile.health?.heightMetric ?
                                ('No entry yet') :
                                (<>
                                    {isMetric ?
                                        profile.health?.heightMetric :
                                        profile.health?.heightImperial} <Badge fontSize='0.8em' colorScheme={isMetric ? 'blue' : 'pink'}>{isMetric ? 'cm' : 'ft'}</Badge>
                                </>)}
                            </Td>
                            <Td>
                                <VStack>
                                    <HStack>
                                        <Button {...incHeight} colorScheme='facebook'>+</Button>
                                        <Input {...inputHeight} ref={heightInputRef} bg={inputColor} />
                                        <Button {...decHeight} colorScheme='facebook'>-</Button>
                                    </HStack>
                                    <Button variant='ghost' colorScheme='teal' onClick={() => handleEditNumberData(+heightInputRef.current!.value, 'height')}>
                                        Update in {isMetric ? 'cm' : 'ft'}
                                    </Button>
                                </VStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight='bold'>BMI:</Td>
                            <Td>
                                <HStack>
                                    <Text>{profileBMI ? profileBMI.toFixed(1) : 'Insufficient data for BMI calculation.'}</Text>
                                    <Badge colorScheme={bmiData.color} fontSize='0.8em'>{bmiData.category}</Badge>
                                </HStack>
                            </Td>
                            <Td><Center p={4}><Icon as={bmiData.icon} color={bmiData.color} fontSize='2.5em' /></Center></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};

export default ProfileHealth;
