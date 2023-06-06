import { FC } from 'react';

import { Accordion, Heading, Text } from '@chakra-ui/react';

import SingleFood from '../SingleFood/SingleFood';
import { IFood } from '../../../common/types';

const FoodsLayout: FC<{ foods: IFood[] | [] }> = ({ foods }) => {
    if (foods.length === 0) {
        return (
            <Text>No foods match the searching criteria</Text>
        );
    }
    return (
        <Accordion allowMultiple>
            <Heading size='md' mb={5}>Select Foods</Heading>

            {foods.map(f => (
                <SingleFood key={f.name} food={f} />
            ))}
        </Accordion>
    );
};

export default FoodsLayout;
