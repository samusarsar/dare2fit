import { FC } from 'react';

import { Accordion, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

import SingleFood from '../SingleFood/SingleFood';
import { IFood } from '../../../common/types';

const FoodsLayout: FC<{ foods: IFood[] | []}> = ({ foods }) => {
    if (foods.length === 0) {
        return (
            <Text>No foods match the searching criteria</Text>
        );
    }
    return (
        <Card>
            <CardHeader>
                <Heading size='md'>Foods</Heading>
            </CardHeader>
            <CardBody>
                <Accordion allowMultiple>
                    {foods.map(f => (
                        <SingleFood key={f.name} food={f}/>
                    ))}
                </Accordion>
            </CardBody>
        </Card >
    );
};

export default FoodsLayout;
