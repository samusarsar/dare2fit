import { FC, ReactElement, useContext, useState } from 'react';

// eslint-disable-next-line max-len
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, FormControl, HStack, Heading, InputGroup, InputRightAddon, NumberInput, NumberInputField, Spacer, Text, useToast } from '@chakra-ui/react';
import { IFood } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import { logFood } from '../../../services/food.services';
import { WATER } from '../../../common/constants';

const SingleFood: FC<{ food: IFood, children?: ReactElement }> = ({ food, children }) => {

    const { userData } = useContext(AppContext);

    const [grams, setGrams] = useState(0);
    const [milliliters, setMilliliters] = useState(0);

    const toast = useToast();

    const calories = Math.floor(food.calories / food.serving_size_g * grams);

    const handleLogFood = (quantity: number) => {
        logFood(userData!.handle, food.name, quantity)
            .then(() => setGrams(0))
            .then(() => {
                toast({
                    title: `Food logged successfully!`,
                    description: `You have logged ${quantity} ${food.name !== WATER ? `kcal` : `ml`} of ${food.name}.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                });
            })
            .catch(() => {
                toast({
                    title: 'Error logging food!',
                    description: 'Please try again later.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                });
            });
    };

    return (
        <AccordionItem key={food.name}>
            <HStack>
                <AccordionButton px={1}>
                    <Box flex='1' textAlign='left'>
                        <Heading size='xs'>{food.name}</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                {children}
            </HStack>
            <AccordionPanel pb={4}>
                <HStack mb={3} flexWrap='wrap' gap={1}>
                    <Box maxW={{ base: '50%', md: '40%' }} >

                        {food.name !== WATER ? (
                            <FormControl isRequired>
                                <InputGroup size='sm' >
                                    <NumberInput onChange={(e) => setGrams(+e)} min={0} value={grams}>
                                        <NumberInputField />
                                    </NumberInput>
                                    <InputRightAddon>gr</InputRightAddon>
                                </InputGroup>
                            </FormControl>
                        ):(
                            <FormControl isRequired>
                                <InputGroup size='sm' >
                                    <NumberInput onChange={(e) => setMilliliters(+e)} min={0} value={milliliters}>
                                        <NumberInputField />
                                    </NumberInput>
                                    <InputRightAddon>ml</InputRightAddon>
                                </InputGroup>
                            </FormControl>
                        )}

                    </Box>
                    <Spacer />
                    {food.name !== WATER && <Badge colorScheme='green'>{calories}kcal</Badge>}

                    {food.name !== WATER ? (
                        <Button
                            size='sm'
                            colorScheme='yellow'
                            isDisabled={!grams}
                            onClick={() => handleLogFood(grams)}>Log food</Button>
                    ):(
                        <Button
                            size='sm'
                            colorScheme='blue'
                            isDisabled={!milliliters}
                            onClick={() => handleLogFood(milliliters)}>Log water</Button>
                    )}

                </HStack>
                {(food.name.toLowerCase() !== WATER) && <>
                    <HStack>
                        <Text>serving size: </Text>
                        <Spacer />
                        <Badge>{Math.floor(food.serving_size_g)} gr</Badge>
                    </HStack>
                    <HStack>
                        <Text>calories per serving: </Text>
                        <Spacer />
                        <Badge>{Math.floor(food.calories)} kcal</Badge>
                    </HStack>
                    <HStack>
                        <Text>carbohydrates: </Text>
                        <Spacer />
                        <Badge>{Math.floor(food.carbohydrates_total_g)} gr</Badge>
                    </HStack>
                    <HStack>
                        <Text>protein: </Text>
                        <Spacer />
                        <Badge>{Math.floor(food.protein_g)} gr</Badge>
                    </HStack>
                    <HStack>
                        <Text>fat: </Text>
                        <Spacer />
                        <Badge>{Math.floor(food.fat_total_g)} gr</Badge>
                    </HStack>
                </>}


            </AccordionPanel>
        </AccordionItem>
    );
};

export default SingleFood;
