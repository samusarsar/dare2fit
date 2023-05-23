import { FC, ReactElement, useContext } from 'react';
import { Avatar, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';
import { IGoal } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';

const ChallengeLabels: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
    const { userData } = useContext(AppContext);

    const participantsList = !goal.competingWith ?
        [goal.author] :
        (userData!.handle === goal.author) ?
            [goal.author, ...Object.keys(goal.competingWith)] :
            (goal[userData!.handle]) ?
                [userData?.handle, goal.author, ...Object.keys(goal.competingWith).filter(el => el !== userData!.handle)] :
                [goal.author, ...Object.keys(goal.competingWith)];

    return (
        <>
            <HStack w='100%' justify='space-between' p={2} rounded='lg'>
                <VStack>
                    {participantsList.map((p) => (
                        <HStack key={p}>
                            <Tooltip label={p}>
                                <Avatar name={p} size='xs' />
                            </Tooltip>
                            <Text>{goal[p as string]?.toString()} {goal.units?.toString()}</Text>
                        </HStack>
                    ))}
                </VStack>
                <Icon as={BiTargetLock} fontSize='1.2em'/>
                <Text>{goal.target} {goal.units?.toString()}</Text>
            </HStack>
        </>
    );
};

export default ChallengeLabels;
