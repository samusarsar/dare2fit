import { Box, Flex, Heading, Stack, useColorModeValue, Text } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

const Feature: FC<{ heading: string, description: string, icon: ReactElement }> = ({ heading, description, icon }) => {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            transition='0.2s ease-in-out'
            _hover={{ transform: 'scale(1.1)' }}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}>
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
            </Stack>
        </Box>
    );
};

export default Feature;
