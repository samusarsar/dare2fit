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
            <IconButton icon={<AiOutlineCheck />} aria-label="submit-edit" {...getSubmitButtonProps()} />
            <IconButton icon={<AiOutlineClose />} aria-label="cancel-edit" {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        <Flex justifyContent='center' my='auto'>
            <IconButton size='xs' icon={<AiOutlineEdit />} aria-label="open-edit" {...getEditButtonProps()} />
        </Flex>
    );
};

export default EditableControls;
