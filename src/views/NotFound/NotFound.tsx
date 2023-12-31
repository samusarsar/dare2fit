import { Heading, Text, VStack, Button, Image } from '@chakra-ui/react';
import { FC, ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AppContext } from '../../context/AppContext/AppContext';

const NotFound: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

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
                    Error 404
                </Text>
                <br />
                <Text as={'span'} color={'brand.red'}>
                    Page Not Found
                </Text>
            </Heading>
            <Text>Hmm... looks like the page you are trying to access doesn&apos;t exist... That&apos;s okay, though! </Text>
            <Text>Why don&apos;t you head back to the home page and explore dare2fit from there? {!userData && 'Or go ahead and log in or sign up!'}</Text>
            <Button colorScheme="teal" onClick={() => navigate('/')}>Back to Home</Button>
        </VStack>
    );
};

export default NotFound;
