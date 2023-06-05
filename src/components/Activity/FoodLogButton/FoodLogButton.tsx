import { FC, useState } from 'react';

import { Box, Button, ButtonGroup, Collapse, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import { IoIosArrowUp } from 'react-icons/io';
import SearchFoodButton from '../../Foods/SearchFoodButton/SearchFoodButton';

const FoodLogButton: FC = () => {

    const [foodName, setFoodName] = useState('');

    const { isOpen, onToggle } = useDisclosure();

    const handleHide = () => {
        setFoodName('');
        onToggle();
    };

    return (
        <Box>
            <Collapse in={isOpen} animateOpacity>
                <HStack rounded='md' px={1} py={3}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='foodName'>Food Name</FormLabel>
                        <FormErrorMessage>Required</FormErrorMessage>
                        <Input
                            value={foodName}
                            onChange={e => setFoodName(e.target.value)}
                            id='foodName'
                            name='foodName'
                            placeholder='search for food by name' />
                    </FormControl>
                </HStack>
            </Collapse>
            {
                !isOpen ?
                    <Button w='100%' colorScheme='yellow' onClick={onToggle}>Log Food</Button> :
                    (<ButtonGroup w='100%' isAttached>

                        <SearchFoodButton foodName={foodName} />

                        <IconButton icon={<IoIosArrowUp />} aria-label='hide' onClick={handleHide} />
                    </ButtonGroup>)
            }

        </Box >
    );
};

export default FoodLogButton;
