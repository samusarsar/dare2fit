import { FC, ReactElement } from 'react';
import SearchUsers from '../../components/Users/SearchUsers/SearchUsers';
import { Accordion, AccordionItem, AccordionButton, Box, AccordionPanel, VStack, Heading } from '@chakra-ui/react';
import FriendsList from '../../components/Users/FriendsList/FriendsList';
import FriendRequestsList from '../../components/Users/FriendRequests/FriendRequests';
import { FriendRequestType } from '../../common/enums';

const CommunityView: FC = (): ReactElement => {
    return (
        <Box>
            <SearchUsers />
            <Accordion mt={5} defaultIndex={0} allowToggle>
                <h2>
                    <AccordionItem>
                        <AccordionButton h='80px' _expanded={{ color: 'brand.yellow' }}>
                            <Heading as='h2' size='lg'>My Community:</Heading>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <FriendsList />
                        </AccordionPanel>
                    </AccordionItem>
                </h2>

                <h2>
                    <AccordionItem>
                        <AccordionButton h='80px' _expanded={{ color: 'brand.yellow' }}>
                            <Heading as='h2' size='lg'>Friend Requests:</Heading>
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
