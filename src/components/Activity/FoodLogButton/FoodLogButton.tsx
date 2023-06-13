import { FC, useContext, useState } from 'react';

import { Alert, AlertIcon, Box, Button, ButtonGroup, Collapse, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import { IoIosArrowUp } from 'react-icons/io';
import { UserRoles } from '../../../common/enums';
import { AppContext } from '../../../context/AppContext/AppContext';
import SearchFood from '../../Foods/SearchFood/SearchFood';

const FoodLogButton: FC = () => {
    const { userData } = useContext(AppContext);

    const [foodName, setFoodName] = useState('');

    const { isOpen, onToggle } = useDisclosure();

    const amBlocked = userData!.role === UserRoles.Blocked;

    const handleHide = () => {
        setFoodName('');
        onToggle();
    };

    return (
        <Box>
            <Collapse in={isOpen} animateOpacity>
                <HStack rounded='md' px={1} py={3}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='foodName'>Search</FormLabel>
                        <FormErrorMessage>Required</FormErrorMessage>
                        <Input
                            value={foodName}
                            onChange={e => setFoodName(e.target.value)}
                            id='foodName'
                            name='foodName'
                            placeholder='search for food by name or water' />
                    </FormControl>
                </HStack>
            </Collapse>
            {
                !isOpen ?
                    (<>
                        {amBlocked &&
                            <Alert status='error'>
                                <AlertIcon />
                                    You are blocked and can&apos;t log food and water.
                            </Alert>}
                        <Button w='100%' colorScheme='yellow' onClick={onToggle} isDisabled={amBlocked}>Log Food & Water</Button>
                    </>) :
                    (<ButtonGroup w='100%' isAttached>

                        <SearchFood foodName={foodName} />

                        <IconButton icon={<IoIosArrowUp />} aria-label='hide' onClick={handleHide} />
                    </ButtonGroup>)
            }

        </Box >
    );
};

export default FoodLogButton;
