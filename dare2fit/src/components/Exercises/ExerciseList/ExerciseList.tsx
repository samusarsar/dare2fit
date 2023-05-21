import { FC, ReactElement } from 'react';
import { Box, Card, CardBody, CardHeader, Text, useColorModeValue } from '@chakra-ui/react';

const ExerciseList: FC<{ title: string, children: ReactElement }> = ({ title, children }): ReactElement => {
    const textColor = useColorModeValue('gray.700', 'white');

    return (
        <Box maxWidth='100%'>
            <Card overflowX={{ sm: 'scroll', xl: 'hidden' }} p={6}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        {title}
                    </Text>
                </CardHeader>
                <CardBody>
                    {children}
                </CardBody>
            </Card>
        </Box>
    );
};

export default ExerciseList;
