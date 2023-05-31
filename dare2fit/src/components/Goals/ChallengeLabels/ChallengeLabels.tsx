import { FC, ReactElement, useContext } from 'react';
import { Avatar, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';
import { IGoal, IGoalProgresses } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useNavigate } from 'react-router';

const ChallengeLabels: FC<{ goal: IGoal, progress: IGoalProgresses }> = ({ goal, progress }): ReactElement => {
    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    const participantsList = !goal.competingWith ?
        [goal.author!] :
        (userData!.handle === goal.author) ?
            [goal.author, ...Object.keys(goal.competingWith)] :
            (progress[userData!.handle]) ?
                [userData?.handle, goal.author, ...Object.keys(goal.competingWith).filter(el => el !== userData!.handle)] :
                [goal.author, ...Object.keys(goal.competingWith)];

    return (
        <>
            <HStack w='100%' justify='space-between' p={2} rounded='lg'>
                <VStack>
                    {participantsList.map((p) => (
                        <HStack key={p} w='100%'>
                            <Tooltip label={p}>
                                <Avatar name={p} size='xs' _hover={{ cursor: 'pointer' }} onClick={() => navigate(`../../profile/${p}`)}/>
                            </Tooltip>
                            <Text align='center'>{progress[p as string]?.toString()} {goal.units?.toString()}</Text>
                        </HStack>
                    ))}
                </VStack>
                <Icon as={BiTargetLock} fontSize='1.2em'/>
                <Text align='center'>{goal.target} {goal.units?.toString()}</Text>
            </HStack>
        </>
    );
};

export default ChallengeLabels;
