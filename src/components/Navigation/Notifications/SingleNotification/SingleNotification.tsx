import { Icon } from '@chakra-ui/icon';
import { HStack, Spacer, Text } from '@chakra-ui/layout';
import { As } from '@chakra-ui/system';
import { FC, ReactElement, useContext } from 'react';
import { MdRemoveCircle } from 'react-icons/md';
import { removeNotification } from '../../../../services/notification.services';
import { AppContext } from '../../../../context/AppContext/AppContext';

const SingleNotification: FC<{ notification: string, timestamp?: string, icon: As}> = ({ notification, timestamp, icon }): ReactElement => {
    const { userData } = useContext(AppContext);

    const handleRemove = () => {
        removeNotification(userData!.handle, timestamp!);
    };

    return (
        <HStack w='100%'>
            <Icon as={icon} />
            <Text>{notification}</Text>
            <Spacer />
            {timestamp &&
            <HStack p={2} transition='0.2s ease-in' _hover={{ bg: 'brand.red' }} rounded='lg'>
                <Icon as={MdRemoveCircle} onClick={handleRemove} />
            </HStack>}
        </HStack>
    );
};

export default SingleNotification;
