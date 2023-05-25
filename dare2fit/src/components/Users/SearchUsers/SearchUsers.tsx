// eslint-disable-next-line max-len
import { VStack, Input, HStack, Button, InputGroup, InputRightElement, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Text, MenuButton, Menu, MenuList, MenuItem, MenuOptionGroup, Spacer, Alert, AlertIcon, Modal, ModalOverlay, ModalContent, useDisclosure, ModalBody, ModalCloseButton, ModalHeader, Heading } from '@chakra-ui/react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import UserTable from '../UserTable/UserTable';
import { getAllUsers } from '../../../services/user.services';
import moment from 'moment';
import { IUserData } from '../../../common/types';

const SearchUsers = () => {
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [foundUsers, setFoundUsers] = useState<IUserData[] | []>([]);
    const [searching, setSearching] = useState(false);

    const [fromAge, setFromAge] = useState(0);
    const [toAge, setToAge] = useState(100);

    const { onClose } = useDisclosure();

    // const navigate = useNavigate();

    const handleSearch = () => {
        getAllUsers()
            .then(data => Object.values(data))
            .then(users => users.filter(user => {
                if (!searchTerm) return users;

                const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
                const formattedSearchTerm = input.trim().toLowerCase();
                return (user.handle.toLowerCase()).includes(formattedSearchTerm) || (fullName.includes(formattedSearchTerm));
            }))
            .then(users => users.filter(user => {
                const userAge = (moment().diff(moment(user.dateOfBirth, 'DD/MM/YYYY'), 'years'));

                return user.dateOfBirth ?
                    (userAge >= fromAge && userAge <= toAge) :
                    (true);
            }))
            .then(users => {
                setFoundUsers(users);

                if (users.length) {
                    setSearchTerm(input);
                    setInput('');
                    setSearching(true);
                } else {
                    setFoundUsers(users);
                    setSearching(true);
                    setTimeout(() => {
                        setSearching(false);
                    }, 4000);
                }
            });
        // .catch(() => navigate('../../server-down'));
    };

    return (
        <VStack w='100%' align='center'>
            {(searching && !foundUsers.length) &&
            <Alert status='warning' w={{ base: '100%', md: '70%' }}>
                <AlertIcon />
                    No users found for these search parameters!
            </Alert>}
            <InputGroup w={{ base: '100%', md: '70%' }}>
                <Input pr='120px' size='lg' h='70px' w='100%' type='text' placeholder='Search community' focusBorderColor='brand.yellow'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}></Input>
                <InputRightElement w='120px' mt={4}>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} colorScheme='yellow'>Search</MenuButton>
                        <MenuList w='100%'>
                            <MenuOptionGroup title='Set age range: (optional)'>
                                <MenuItem>
                                    <VStack>
                                        <HStack p={2}>
                                            <RangeSlider defaultValue={[0, 100]} min={0} max={100} step={1} w='200px'
                                                onChangeEnd={(val) => {
                                                    setFromAge(val[0]);
                                                    setToAge(val[1]);
                                                }}>
                                                <RangeSliderTrack bg='red.100'>
                                                    <RangeSliderFilledTrack bg='tomato' />
                                                </RangeSliderTrack>
                                                <RangeSliderThumb boxSize={6} index={0} />
                                                <RangeSliderThumb boxSize={6} index={1} />
                                            </RangeSlider>
                                        </HStack>
                                        <HStack w='100%'>
                                            <Text><b>From:</b> {fromAge}</Text>
                                            <Spacer />
                                            <Text><b>To:</b> {toAge}</Text>
                                        </HStack>
                                    </VStack>
                                </MenuItem>
                            </MenuOptionGroup>
                            <MenuItem onClick={handleSearch}>
                                <HStack w='220px' justify='center'>
                                    <Text>
                                        Confirm Search
                                    </Text>
                                </HStack>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </InputRightElement>
            </InputGroup>
            <Modal isOpen={searching && !!foundUsers.length} onClose={() => {
                onClose();
                setSearching(false);
            }}>
                <ModalOverlay />
                <ModalContent maxW={{ base: '100%', md: '70%' }}>
                    <ModalHeader>
                        <Heading as='h3' size='md'>Users found for &apos;{searchTerm}&apos; and between {fromAge} to {toAge} years old: </Heading>
                        <ModalCloseButton/>
                    </ModalHeader>
                    <ModalBody overflowX='auto'>
                        <UserTable users={foundUsers} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </VStack>
    );
};

export default SearchUsers;
