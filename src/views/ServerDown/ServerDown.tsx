import { Heading, Text, VStack, Button, Image } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router';

const ServerDown: FC = (): ReactElement => {
    const navigate = useNavigate();

    return (
        <VStack w="100%" align="center" justify="center" mt={20} gap={4}>
            <Image
                // eslint-disable-next-line max-len
                src={'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-03-circle.png?alt=media&token=ef09ae4e-d74c-4aa5-ab94-3b6ad19b8580&_gl=1*avjg7q*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjQxMDg2NC45OC4xLjE2ODY0MTEwMjkuMC4wLjA.'}
                w='100px'
                h='100px'
            />
            <Heading
                textAlign="center"
                lineHeight={1.1}
                fontWeight={900}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                <Text
                    as={'span'}>
                    Error 500
                </Text>
                <br />
                <Text as={'span'} color={'brand.red'}>
                    Server Down
                </Text>
            </Heading>
            <Text>Uh-Oh... our server is currently having some issues... We are sure that it will be up and running in no time!</Text>
            <Text>Please try again a bit later!</Text>
            <Button colorScheme="teal" onClick={() => navigate('/')}>Back to Home</Button>
        </VStack>
    );
};

export default ServerDown;
