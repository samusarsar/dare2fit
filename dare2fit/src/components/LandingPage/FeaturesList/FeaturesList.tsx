import { Box, Container, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { ReactElement, FC } from 'react';
import { FcCalendar, FcElectricity, FcCollaboration, FcBullish, FcMindMap } from 'react-icons/fc';
import Feature from '../Feature/Feature';

const FeaturesList: FC = (): ReactElement => {
    return (
        <Box p={8} pt={20} w='100%'>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize='4xl' fontWeight={'bold'}>
                    Success come to those who <Text color='brand.green'>DARE</Text>
                </Heading>
                <Text color={'gray.500'}>
                    Explore our state-of-the-art fitness and health tracking features, workout creation and assembly,
                    fitness program sharing, goal tracking, and challenges among friends!
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap='wrap' gridGap={6} justify="center">
                    <Feature
                        heading='Tracker'
                        icon={<Icon as={FcCalendar} w={10} h={10} />}
                        description='Track your workouts and lifestyle sports.'/>
                    <Feature
                        heading='Workouts'
                        icon={<Icon as={FcElectricity} w={10} h={10} />}
                        description='Assemble your own workouts using our exercises database.'/>
                    <Feature
                        heading='Goals'
                        icon={<Icon as={FcBullish} w={10} h={10} />}
                        description='Set sport, fitness, and health goals to keep track of your progress.'/>
                    <Feature
                        heading='Dares'
                        icon={<Icon as={FcCollaboration} w={10} h={10} />}
                        description='Challenge your friends or get challenged by them on certain goals.'/>
                    <Feature
                        heading='Community'
                        icon={<Icon as={FcMindMap} w={10} h={10} />}
                        description='Explore the community, add friends, save their workouts, challenge them on their goals.'/>
                </Flex>
            </Container>
        </Box>
    );
};

export default FeaturesList;
