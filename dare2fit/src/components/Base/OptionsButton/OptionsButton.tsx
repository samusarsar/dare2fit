import { FC, ReactElement } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { IGoal, IWorkout } from '../../../common/types';
import EditGoal from '../../Goals/EditGoal/EditGoal';
import GoalOptions from './GoalOptions/GoalOptions';
import WorkoutOptions from './WorkoutOptions/WorkoutOptions';
import EditWorkout from '../../Workouts/EditWorkout/EditWorkout';

const OptionsButton: FC<{ goal?: IGoal, workout?: IWorkout }> = ({ goal, workout }): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex justifyContent="center" mt={4} position='absolute' top={0} right={3} zIndex={1}>
            {goal && <EditGoal isOpen={isOpen} onClose={onClose} goal={goal} />}
            {workout && <EditWorkout isOpen={isOpen} onClose={onClose} workout={workout} />}
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="More server options"
                        icon={<BsThreeDotsVertical />}
                        variant="solid"
                        w="fit-content"
                    />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                        {goal && <GoalOptions goal={goal} onOpen={onOpen} />}
                        {workout && <WorkoutOptions workout={workout} onOpen={onOpen} />}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

export default OptionsButton;
