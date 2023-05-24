import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightAddon, Select, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { FC, ReactElement, useContext, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { addGoal } from '../../../../services/goal.services';
import { AppContext } from '../../../../context/AppContext/AppContext';
import { GOAL_NAME_MAX_LENGTH, GOAL_NAME_MIN_LENGTH } from '../../../../common/constants';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { getEnumValue } from '../../../../common/helper';
import { Units } from '../../../../common/enums';

const ChallengeForm: FC<{ onClose: () => void }> = ({ onClose }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [startDate, setStartDate] = useState(new Date());
    const [startDateError, setStartDateError] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [endDateError, setEndDateError] = useState(false);
    const [units, setUnits] = useState('-');

    const [creating, setCreating] = useState(false);
    const cancelColor = useColorModeValue('blackAlpha', 'gray');

    const toast = useToast();

    return (
        <Formik
            initialValues={{
                name: '',
                type: '',
                target: 0,
            }}
            onSubmit={({ name, type, target }) => {
                setCreating(true);
                addGoal({ author: userData!.handle, name, type, startDate: startDate.toLocaleDateString(), endDate: endDate.toLocaleDateString(), target, units: units })
                    .then(() => {
                        onClose();
                        toast({
                            title: 'Exercise created successfully!',
                            description: 'You have added a new exercise.',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                            position: 'top',
                            variant: 'subtle',
                        });
                    })
                    .catch(() => {
                        toast({
                            title: 'Error creating exercise!',
                            description: 'Please try again later.',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'top',
                            variant: 'subtle',
                        });
                    })
                    .finally(() => {
                        setCreating(false);
                    });
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <VStack w='100%' gap={1}>
                        <FormControl
                            isInvalid={!!errors.name && touched.name}
                            isRequired={true}
                        >
                            <FormLabel>Challenge Name</FormLabel>
                            <Field
                                as={Input}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Challenge Name"
                                validate={(value: string) => {
                                    return value.length < GOAL_NAME_MIN_LENGTH || value.length > GOAL_NAME_MAX_LENGTH ?
                                        'Goal name must be between 4 and 30 characters.' :
                                        null;
                                }}
                            />
                            <FormErrorMessage>
                                {errors.name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired={true}>
                            <FormLabel htmlFor="type">Challenge Type</FormLabel>
                            <Field
                                as={Select}
                                icon={<MdArrowDropDown />}
                                placeholder="Select type"
                                id="type"
                                name="type"
                                validate={(value: string) => setUnits(getEnumValue(Units, value) as string)}
                            >
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
                            </Field>
                        </FormControl>
                        <VStack w='100%'>
                            <FormControl isRequired={true} isInvalid={startDateError}>
                                <FormLabel htmlFor="startDate">
                                            From:
                                </FormLabel>
                                <DatePicker
                                    id="startDate"
                                    name="startDate"
                                    selected={startDate}
                                    onChange={(date: Date) => {
                                        if (moment().diff(date, 'days') > 0) {
                                            setStartDateError(true);
                                        } else {
                                            setStartDateError(false);
                                            setStartDate(date);
                                        }
                                    }}/>
                                <FormErrorMessage>Start date must not be in the past</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired={true} isInvalid={endDateError}>
                                <FormLabel htmlFor="endDate">
                                            To:
                                </FormLabel>
                                <DatePicker
                                    id="endDate"
                                    name="endDate"
                                    selected={endDate}
                                    onChange={(date: Date) => {
                                        if (startDate > date) {
                                            setEndDateError(true);
                                        } else {
                                            setEndDateError(false);
                                            setEndDate(date);
                                        }
                                    }}/>
                                <FormErrorMessage>End date must not be before start date</FormErrorMessage>
                            </FormControl>
                        </VStack>
                        <FormControl isRequired={true} isInvalid={!!errors.target && touched.target}>
                            <FormLabel htmlFor="target">
                                        Target:
                            </FormLabel>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    icon={<MdArrowDropDown />}
                                    id="target"
                                    name="target"
                                    type='number'
                                    validate={(value: number) => {
                                        if (value <= 0) {
                                            return 'Target value must be positive.';
                                        } else {
                                            return null;
                                        }
                                    }}/>
                                <InputRightAddon>
                                    {units}
                                </InputRightAddon>
                            </InputGroup>
                            <FormErrorMessage>{errors.target}</FormErrorMessage>
                        </FormControl>
                    </VStack>
                    <HStack w="100%" justify="center" mt={10}>
                        <Button
                            w="40%"
                            colorScheme="green"
                            type="submit"
                            isLoading={creating}
                            loadingText="Creating"
                        >
                            Add Goal
                        </Button>
                        <Button
                            w="40%"
                            colorScheme={cancelColor}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </HStack>
                </form>
            )}
        </Formik>
    );
};

export default ChallengeForm;
