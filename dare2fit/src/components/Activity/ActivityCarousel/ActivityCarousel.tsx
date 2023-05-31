import { Dispatch, FC, SetStateAction } from 'react';

import { Flex, IconButton } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

interface IActivityCarouselProps {
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
    length: number,
}

const ActivityCarousel: FC<IActivityCarouselProps> = ({ index, setIndex, length }) => {

    return (
        <Flex
            width='40%'
            justifyContent='space-between'
            alignItems='center'>
            <IconButton
                aria-label="left-arrow"
                borderRadius="full"
                size='sm'
                onClick={() => setIndex(index - 1)}
                isDisabled={index <= 0}>
                <BiLeftArrowAlt />
            </IconButton>
            <IconButton
                aria-label="right-arrow"
                borderRadius="full"
                size='sm'
                onClick={() => setIndex(index + 1)}
                isDisabled={index >= length - 1}>
                <BiRightArrowAlt />
            </IconButton>
        </Flex>
    );
};

export default ActivityCarousel;
