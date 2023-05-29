// eslint-disable-next-line max-len
import { Box, Button, ButtonGroup, Collapse, HStack, IconButton, InputGroup, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure } from '@chakra-ui/react';
import { FC, ReactElement, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { getEnumValue } from '../../../common/helper';
import { Units } from '../../../common/enums';

const ActivityLogButton: FC = (): ReactElement => {
    const [activityType, setActivityType] = useState<string>('');

    const { isOpen, onToggle } = useDisclosure();

    const units = activityType ? getEnumValue(Units, activityType) : null;

    return (
        <Box>
            <Collapse in={isOpen} animateOpacity>
                <HStack
                    rounded='md'
                    px={1}
                    py={3}
                >
                    <Select
                        icon={<MdArrowDropDown />}
                        value={activityType}
                        placeholder="Select activity"
                        onChange={(e) => setActivityType(e.target.value)}>
                        <optgroup label="Lifestyle Sports">
                            <option value="walking">Walking</option>
                            <option value="running">Running</option>
                            <option value="cycling">Cycling</option>
                            <option value="swimming">Swimming</option>
                        </optgroup>
                        <optgroup label="Workouts">
                            <option value="workout">Any Workout</option>
                            <option value="strength">Strength</option>
                            <option value="stamina">Stamina</option>
                            <option value="stretching">Stretching</option>
                        </optgroup>
                    </Select>
                    {(activityType && units === 'workouts') ?
                        (<Select
                            icon={<MdArrowDropDown />}
                            placeholder='Select workout'>
                            <optgroup label="My Workouts">
                                <option value="workout">Any Workout</option>
                                <option value="strength">Strength</option>
                                <option value="stamina">Stamina</option>
                                <option value="stretching">Stretching</option>
                            </optgroup>
                            <optgroup label="Saved Workouts">
                                <option value="workout">Any Workout</option>
                                <option value="strength">Strength</option>
                                <option value="stamina">Stamina</option>
                                <option value="stretching">Stretching</option>
                            </optgroup>
                        </Select>) :
                        (<>
                            {units &&
                                (<InputGroup>
                                    <NumberInput min={1} rounded='lg'>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <InputRightAddon>
                                        {units}
                                    </InputRightAddon>
                                </InputGroup>)}
                        </>)}
                </HStack>
            </Collapse>
            {!isOpen ?
                <Button w='100%' colorScheme='yellow' onClick={onToggle}>Log Activity</Button> :
                (<ButtonGroup w='100%' isAttached>
                    <Button w='100%' colorScheme='yellow' >Log Activity</Button>
                    <IconButton icon={<IoIosArrowUp />} aria-label='hide' onClick={() => {
                        onToggle();
                        setActivityType('');
                    }} />
                </ButtonGroup>)}
        </Box>
    );
};

export default ActivityLogButton;
