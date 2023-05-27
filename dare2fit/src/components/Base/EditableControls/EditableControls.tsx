import { ButtonGroup, Flex, IconButton, useEditableControls } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';

const EditableControls: FC = (): ReactElement => {

    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
        <ButtonGroup justifyContent='center' size='xs' my='auto'>
            <IconButton icon={<AiOutlineCheck />} {...getSubmitButtonProps()} />
            <IconButton icon={<AiOutlineClose />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        <Flex justifyContent='center' my='auto'>
            <IconButton size='xs' icon={<AiOutlineEdit />} {...getEditButtonProps()} />
        </Flex>
    );
};

export default EditableControls;
