import { FC, ReactElement, useContext } from 'react';
import { Avatar, Badge, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';
import { IGoal, IGoalProgresses } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';

const ChallengeLabels: FC<{ goal: IGoal, progress: IGoalProgresses }> = ({ goal, progress }): ReactElement => {
    const { userData } = useContext(AppContext);

    const { handle } = useParams();
    const navigate = useNavigate();

    const authorIsMe = userData!.handle === goal.author;
    const authorIsHim = handle === goal.author;
    const amCompeting = goal.competingWith ? Object.keys(goal.competingWith).includes(userData!.handle) : false;
    const isCompeting = (goal.competingWith && handle) ? Object.keys(goal.competingWith).includes(handle) : false;
    const isActive = moment(new Date().toLocaleDateString(), 'DD/MM/YYYY') <= moment(goal.duration?.endDate, 'DD/MM/YYYY');

    const participantsList = !goal.competingWith ?
        [goal.author!] :
        (userData!.handle === goal.author) ?
            [goal.author, ...Object.keys(goal.competingWith)] :
            (progress[userData!.handle]) ?
                [userData?.handle, goal.author, ...Object.keys(goal.competingWith).filter(el => el !== userData!.handle)] :
                [goal.author, ...Object.keys(goal.competingWith)];

    return (
        <VStack>
            <HStack>
                {!handle ?
                    (<>
                        {authorIsMe && (<Badge colorScheme='teal'>Host</Badge>)}
                        {amCompeting && <Badge colorScheme='pink'>Challenger</Badge>}
                    </>) :
                    (<>
                        {authorIsHim && (<Badge colorScheme='teal'>Host</Badge>)}
                        {isCompeting && <Badge colorScheme='pink'>Challenger</Badge>}
                    </>)
                }
                {isActive ?
                    <Badge colorScheme='blue'>Active</Badge> :
                    <Badge colorScheme='red'>Expired</Badge>}
            </HStack>
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
        </VStack>
    );
};

export default ChallengeLabels;
