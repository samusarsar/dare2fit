// eslint-disable-next-line max-len
import { Button, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, HStack, Input, InputGroup, InputRightAddon, Select, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { FC, ReactElement, useContext, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { addGoal } from '../../../../services/goal.services';
import { AppContext } from '../../../../context/AppContext/AppContext';
import { Units } from '../../../../common/enums';
import { getEnumValue } from '../../../../common/helper';

const HabitForm: FC<{ onClose: () => void }> = ({ onClose }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [creating, setCreating] = useState(false);
    const [units, setUnits] = useState('-');

    const cancelColor = useColorModeValue('blackAlpha', 'gray');

    const toast = useToast();

    return (
        <Formik
            initialValues={{
                type: '',
                repeat: '',
                target: 0,
            }}
            onSubmit={({ type, repeat, target }) => {
                setCreating(true);
                addGoal({ author: userData!.handle, type, repeat, target, units: units })
                    .then(() => {
                        onClose();
                        toast({
                            title: 'Habit created successfully!',
                            description: 'You have added a new habit.',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                            position: 'top',
                            variant: 'subtle',
                        });
                    })
                    .catch(() => {
                        toast({
                            title: 'Error creating habit!',
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
                        <FormControl isRequired={true}>
                            <FormLabel htmlFor="type">Habit Type</FormLabel>
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
                        <Grid templateColumns='1fr 1fr' gap={2} display={{ base: 'flex', md: 'grid' }} flexWrap='wrap'>
                            <GridItem>
                                <FormControl isRequired={true}>
                                    <FormLabel htmlFor="repeat">
                                        Repeat:
                                    </FormLabel>
                                    <Field
                                        as={Select}
                                        icon={<MdArrowDropDown />}
                                        placeholder='Select repeat'
                                        id="repeat"
                                        name="repeat">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </Field>
                                </FormControl>
                            </GridItem>
                            <GridItem>
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
                            </GridItem>
                        </Grid>
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

export default HabitForm;
