import { Dispatch, FC, SetStateAction } from 'react';

import { Flex, IconButton, Text } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

interface IActivityCarouselProps {
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
    length: number,
}

const ActivityCarousel: FC<IActivityCarouselProps> = ({ index, setIndex, length }) => {

    return (
        <Flex
            my={2}
            justifyContent='center'
            alignItems='center'>
            <IconButton
                aria-label="left-arrow"
                borderRadius="full"
                size='sm'
                onClick={() => setIndex(index - 1)}
                isDisabled={index === 0}>
                <BiLeftArrowAlt />
            </IconButton>
            <Text mx={5} fontSize='sm'>{index + 1} of {length}</Text>
            <IconButton
                aria-label="right-arrow"
                borderRadius="full"
                size='sm'
                onClick={() => setIndex(index + 1)}
                isDisabled={index === length - 1}>
                <BiRightArrowAlt />
            </IconButton>
        </Flex>
    );
};

export default ActivityCarousel;
