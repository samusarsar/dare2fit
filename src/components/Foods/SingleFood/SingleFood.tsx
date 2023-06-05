import { FC, ReactElement } from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, HStack, Heading, Spacer, Text } from '@chakra-ui/react';
import { IFood } from '../../../common/types';

const SingleFood: FC<{ food: IFood, children?: ReactElement}> = ({ food, children }) => {
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
                <HStack>
                    <Text>serving size: </Text>
                    <Spacer />
                    <Badge>{food.serving_size_g} gr</Badge>
                </HStack>
                <HStack>
                    <Text>calories per serving: </Text>
                    <Spacer />
                    <Badge>{food.calories} kcal</Badge>
                </HStack>
                <HStack>
                    <Text>carbohydrates: </Text>
                    <Spacer />
                    <Badge>{food.carbohydrates_total_g} gr</Badge>
                </HStack>
                <HStack>
                    <Text>protein: </Text>
                    <Spacer />
                    <Badge>{food.protein_g} gr</Badge>
                </HStack>
                <HStack>
                    <Text>fat: </Text>
                    <Spacer />
                    <Badge>{food.fat_total_g} gr</Badge>
                </HStack>

            </AccordionPanel>
        </AccordionItem>
    );
};

export default SingleFood;
