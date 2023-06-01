// Chakra imports
import { As, Card, CardBody, Flex, Icon, Spinner, Stat, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const MiniStat: FC<{ title: string, amount: number | null, units: string, icon: As, color: string }> = ({ title, amount, units, icon, color }) => {

    return (
        <Card minH='110px' minW='290px' boxShadow='lg' transition='0.2s ease-in-out' _hover={{ transform: 'scale(1.1)' }}>
            <CardBody>
                <Flex flexDirection='row' align='center' justify='center' w='100%' gap={4}>
                    <Stat me='auto'>
                        <StatLabel
                            fontSize='lg'
                            color='gray.400'
                            fontWeight='bold'
                            pb='.1rem'>
                            {title}
                        </StatLabel>
                        <Flex justify='end'>
                            {amount !== null ?
                                <StatNumber fontSize='2xl'>
                                    {amount}
                                </StatNumber> :
                                <Spinner />}
                            <StatHelpText
                                alignSelf='flex-end'
                                justifySelf='flex-end'
                                m='0px'
                                fontWeight='bold'
                                ps='3px'
                                fontSize='md'>
                                {units}
                            </StatHelpText>
                        </Flex>
                    </Stat>
                    <VStack h='60px' w='60px' bg={color} rounded='lg' justify='center'>
                        <Icon as={icon} fontSize='1.5em' />
                    </VStack>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default MiniStat;
