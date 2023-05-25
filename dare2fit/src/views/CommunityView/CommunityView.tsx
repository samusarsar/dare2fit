import { FC, ReactElement } from 'react';
import SearchUsers from '../../components/Users/SearchUsers/SearchUsers';
import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, VStack } from '@chakra-ui/react';
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
                            <Box as="span" flex='1' textAlign='left' fontWeight='bold' fontSize='1.2em'>
                                    My Community:
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <FriendsList />
                        </AccordionPanel>
                    </AccordionItem>
                </h2>

                <h2>
                    <AccordionItem>
                        <AccordionButton h='80px' _expanded={{ color: 'brand.yellow' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='bold' fontSize='1.2em'>
                                    Friend Requests:
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
