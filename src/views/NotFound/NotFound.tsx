import { Heading, Text, VStack, Button } from '@chakra-ui/react';
import { FC, ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AppContext } from '../../context/AppContext/AppContext';

const NotFound: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    return (
        <VStack w="100%" align="center" justify="center" mt={20} gap={4}>
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
