import { Dispatch, FC, ReactElement, SetStateAction } from 'react';

import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

interface IActivityCarouselProps {
    children: ReactElement,
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
    length: number,
}

const ActivityCarousel: FC<IActivityCarouselProps> = ({ children, index, setIndex, length }) => {

    if (!length) {
        return (
            <Text>You don&apos;t have anything, yet...</Text>
        );
    }

    return (
        <VStack align='start' p={4} w='100%' rounded='lg'>
            <Box height='300px' overflow='auto'>
                {children}
            </Box>
            <Flex
                width='full'
                justifyContent='space-between'
                alignItems='center'>
                <IconButton
                    aria-label="left-arrow"
                    borderRadius="full"
                    size='sm'
                    onClick={() => setIndex(index - 1)}
                    isDisabled={index === 0}>
                    <BiLeftArrowAlt />
                </IconButton>
                <Text fontSize='sm'>{index + 1} of {length}</Text>
                <IconButton
                    aria-label="right-arrow"
                    borderRadius="full"
                    size='sm'
                    onClick={() => setIndex(index + 1)}
                    isDisabled={index === length - 1}>
                    <BiRightArrowAlt />
                </IconButton>
            </Flex>
        </VStack>


    );
};

export default ActivityCarousel;
