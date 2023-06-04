import { FC, ReactElement } from 'react';
import SearchUsers from '../../components/Users/SearchUsers/SearchUsers';
import { Accordion, AccordionItem, AccordionButton, Box, AccordionPanel, VStack, Heading, HStack, AccordionIcon } from '@chakra-ui/react';
import FriendsList from '../../components/Users/FriendsList/FriendsList';
import FriendRequestsList from '../../components/Users/FriendRequests/FriendRequests';
import { FriendRequestType } from '../../common/enums';

const CommunityView: FC = (): ReactElement => {
    return (
        <Box>
            <HStack justify="center" w="100%" p={4}>
                <VStack
                    w={{ base: '100%', md: '80%' }}
                    h='fit-content'
                    minH="100px"
                    bg='brand.yellow'
                    rounded="xl"
                    justify='center'
                    p={3}>
                    <SearchUsers />
                </VStack>
            </HStack>
            <Accordion mt={2} defaultIndex={0} allowToggle>
                <h2>
                    <AccordionItem borderColor='transparent'>
                        <AccordionButton h='80px' _expanded={{ color: 'brand.yellow' }}>
                            <Box as='span' flex='1' textAlign='left'>
                                <Heading as='h2' size='lg'>My Community:</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <FriendsList />
                        </AccordionPanel>
                    </AccordionItem>
                </h2>

                <h2>
                    <AccordionItem borderColor='transparent'>
                        <AccordionButton h='80px' _expanded={{ color: 'brand.yellow' }}>
                            <Box as='span' flex='1' textAlign='left'>
                                <Heading as='h2' size='lg'>Friend Requests:</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <VStack w='100%' gap={3}>
                                <FriendRequestsList type={FriendRequestType.sent} />
                                <FriendRequestsList type={FriendRequestType.received} />
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                </h2>
            </Accordion>
        </Box>
    );
};

export default CommunityView;
