// eslint-disable-next-line max-len
import { Alert, AlertIcon, Box, Button, ButtonGroup, Collapse, HStack, IconButton, InputGroup, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { MdArrowDropDown } from 'react-icons/md';
import { getEnumValue } from '../../../common/helper';
import { Units, UserRoles } from '../../../common/enums';
import { getWorkoutsByHandle } from '../../../services/workout.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { ITodayLog, IWorkout } from '../../../common/types';
import { logActivity } from '../../../services/activity.services';

const ActivityLogButton: FC<{ todayLog: ITodayLog | null }> = ({ todayLog }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [activityType, setActivityType] = useState<string>('');
    const [loggedValue, setLoggedValue] = useState<string | number | null>(null);
    const [userWorkouts, setUserWorkouts] = useState<IWorkout[] | []>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | []>([]);
    const [trainingWith, setTrainingWith] = useState<string>('');

    const { isOpen, onToggle } = useDisclosure();

    const units = activityType ? getEnumValue(Units, activityType) : null;

    const toast = useToast();

    const userWorkoutOptions = (activityType === 'workout') ?
        userWorkouts :
        userWorkouts.filter(workout => workout.category === activityType);

    const savedWorkoutOptions = (activityType === 'workout') ?
        savedWorkouts :
        savedWorkouts.filter(workout => workout.category === activityType);

    const userFriends = userData!.friends ? Object.keys(userData!.friends) : null;

    const workoutIsLogged = todayLog ?
        Object.keys(todayLog).includes('workout') :
        false;

    const amBlocked = userData!.role === UserRoles.Blocked;

    const handleLog = () => {
        if (!!activityType && !!loggedValue) {
            logActivity({ handle: userData!.handle, activityType, loggedValue })
                .then(() => {
                    if (trainingWith.length > 0) {
                        logActivity({ handle: trainingWith, activityType, loggedValue });
                    }
                })
                .then(() => {
                    toast({
                        title: `Activity logged successfully!`,
                        description: `You have added to you activity log.`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                        variant: 'subtle',
                    });
                })
                .then(() => {
                    onToggle();
                    setActivityType('');
                    setLoggedValue(null);
                })
                .catch(() => {
                    toast({
                        title: 'Error logging activity!',
                        description: 'Please try again later.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                        variant: 'subtle',
                    });
                });
        }
    };

    const handleHide = () => {
        onToggle();
        setActivityType('');
        setLoggedValue(null);
        setTrainingWith('');
    };

    useEffect(() => {
        getWorkoutsByHandle(userData!.handle)
            .then(resultArr => {
                setUserWorkouts(resultArr.filter(workout => workout.author === userData!.handle));
                setSavedWorkouts(resultArr.filter(workout => workout.author !== userData!.handle));
            })
            .catch(() => {
                setUserWorkouts([]);
                setSavedWorkouts([]);
            });
    }, []);

    return (
        <Box>
            <Collapse in={isOpen} animateOpacity>
                <VStack py={3} w='100%'>
                    <HStack rounded='md' w='100%'>
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
                                    {userWorkoutOptions.map(workout =>
                                        <option key={workout.workoutId} value={`${workout.workoutName}_${workout.category}_${workout.workoutId}`}>{workout.workoutName}</option>,
                                    )}
                                </optgroup>
                                <optgroup label="Saved Workouts">
                                    {savedWorkoutOptions.map(workout =>
                                        <option key={workout.workoutId} value={`${workout.workoutName}_${workout.category}_${workout.workoutId}`}>{workout.workoutName}</option>,
                                    )}
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
                    {(userFriends && activityType) &&
                    <Select
                        placeholder='Add friend to activity'
                        icon={<MdArrowDropDown />}
                        value={trainingWith}
                        onChange={(e) => setTrainingWith(e.target.value)}>
                        <optgroup label='Friends'>
                            {userFriends.map(friend => <option key={friend} value={friend}>{friend}</option>)}
                        </optgroup>
                    </Select>}
                </VStack>
            </Collapse>
            {!isOpen ?
                (<>
                    {amBlocked &&
                    <Alert status='error'>
                        <AlertIcon />
                            You are blocked and can&apos;t log activities.
                    </Alert>}
                    <Button w='100%' isDisabled={amBlocked} colorScheme='yellow' onClick={onToggle}>Log Activity</Button>
                </>) :
                (<ButtonGroup w='100%' isAttached>
                    <Button w='100%' colorScheme='yellow' isDisabled={!activityType || !loggedValue} onClick={handleLog}>Log Activity</Button>
                    <IconButton icon={<IoIosArrowUp />} aria-label='hide' onClick={handleHide} />
                </ButtonGroup>)}
        </Box>
    );
};

export default ActivityLogButton;
