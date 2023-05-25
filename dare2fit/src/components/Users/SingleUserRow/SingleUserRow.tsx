import { FC, ReactElement } from 'react';

import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { IUserData } from '../../../common/types';

const SingleUserRow: FC<{ user: IUserData }> = ({ user }): ReactElement => {
    const textColor = useColorModeValue('gray.700', 'white');

    return (
        <Tr>
            <Td>
                <Flex align="center" minWidth='100%' flexWrap="nowrap">
                    <Avatar name={user.handle} w="80px" h='80px' borderRadius="12px" me="18px" p={2} />
                    <Flex direction="column" gap={1}>
                        <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {user.firstName} {user.lastName}
                        </Text>
                        <Text fontSize="md" color='gray.400' fontWeight="bold">
                            @{user.handle}
                        </Text>
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            Email: {user.email}
                        </Text>
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Badge
                    fontSize="14px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {user.role}
                </Badge>
            </Td>
            <Td>
                <VStack align='start'>
                    <Button bg="transparent">
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            variant='ghost'
                        >
                            Edit
                        </Text>
                    </Button>
                    <Button bg="transparent" variant='ghost' colorScheme='pink'>
                        <Text
                            fontSize="md"
                            color="brand.red"
                            fontWeight="bold"
                        >
                            Delete
                        </Text>
                    </Button>
                </VStack>
            </Td>
        </Tr>
    );
};

export default SingleUserRow;
