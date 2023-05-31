// eslint-disable-next-line max-len
import { Box, Button, ButtonGroup, Collapse, HStack, IconButton, InputGroup, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure } from '@chakra-ui/react';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { getEnumValue } from '../../../common/helper';
import { Units } from '../../../common/enums';
import { getWorkoutsByHandle } from '../../../services/workout.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { ITodayLog, IWorkout } from '../../../common/types';
import { logActivity } from '../../../services/activity.services';

const ActivityLogButton: FC<{ todayLog: ITodayLog | null }> = ({ todayLog }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [activityType, setActivityType] = useState<string>('');
    const [loggedValue, setLoggedValue] = useState<string | number | null>(null);
    const [userWorkouts, setUserWorkouts] = useState<IWorkout[] | []>([]);

    const { isOpen, onToggle } = useDisclosure();

    const units = activityType ? getEnumValue(Units, activityType) : null;

    const workoutOptions = (activityType === 'workout') ?
        userWorkouts :
        userWorkouts.filter(workout => workout.category === activityType);

    const workoutIsLogged = todayLog ?
        Object.keys(todayLog).includes('workout') :
        false;

    const handleLog = () => {
        if (!!activityType && !!loggedValue) {
            logActivity({ handle: userData!.handle, activityType, loggedValue });
            onToggle();
            setActivityType('');
            setLoggedValue(null);
        }
    };

    const handleHide = () => {
        onToggle();
        setActivityType('');
        setLoggedValue(null);
    };

    useEffect(() => {
        getWorkoutsByHandle(userData!.handle)
            .then(resultArr => setUserWorkouts(resultArr))
            .catch(() => setUserWorkouts([]));
    }, []);

    return (
        <Box>
            <Collapse in={isOpen} animateOpacity>
                <HStack rounded='md' px={1} py={3}>
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
                        {!workoutIsLogged &&
                            <optgroup label="Workouts">
                                <option value="workout">Any Workout</option>
                                <option value="strength">Strength</option>
                                <option value="stamina">Stamina</option>
                                <option value="stretching">Stretching</option>
                            </optgroup>}
                    </Select>
                    {(activityType && units === 'workouts') ?
                        (<Select
                            icon={<MdArrowDropDown />}
                            placeholder='Select workout'
                            onChange={(e) => setLoggedValue(e.target.value)}>
                            <optgroup label="My Workouts">
                                {workoutOptions.map(workout =>
                                    <option key={workout.workoutId} value={`${workout.workoutName}_${workout.category}`}>{workout.workoutName}</option>,
                                )}
                            </optgroup>
                            <optgroup label="Saved Workouts">
                                <option value="saved1">Saved Workout 1</option>
                                <option value="saved2">Saved Workout 2</option>
                            </optgroup>
                        </Select>) :
                        (<>
                            {units &&
                                (<InputGroup>
                                    <NumberInput min={1} rounded='lg' onChange={(e) => setLoggedValue(+e)}>
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
                    <Button w='100%' colorScheme='yellow' isDisabled={!activityType || !loggedValue} onClick={handleLog}>Log Activity</Button>
                    <IconButton icon={<IoIosArrowUp />} aria-label='hide' onClick={handleHide} />
                </ButtonGroup>)}
        </Box>
    );
};

export default ActivityLogButton;
