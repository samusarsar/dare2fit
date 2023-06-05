import { Heading, VStack, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

const FAQ: FC = (): ReactElement => {
    return (
        <VStack gap={10}>
            <Heading as='h2'>Frequently Asked Questions</Heading>
            <Accordion w={{ sm: '80%', lg: '60%' }} defaultIndex={[0]} textAlign='left' allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.purple' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                How can I create a profile on dare2fit?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        To create a profile you simply need to click <b>Log In</b> on the top right of the navigation
                        menu or found anywhere else around the website as well and navigate to the <b>Sign Up</b> page from there.
                        Then you need to enter your first and last names,
                        email address, telephone number, select a username, create a password and you&apos;re done!
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.purple' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                What can I do on dare2fit?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        dare2fit is to those who are dedicated to a healthy lifestyle and seek to better themselves!
                        You can create and assemble workout routines, by using our exercises API which can present you with a huge
                        amount of effective exercises. You can set goals to track your progress: either such that repeat daily, weekly, or monthly - habits,
                        or such with a start and end date - challenges. You can log your activities and food intake day by day through the <b>Activity Tab</b>
                        which will automatically count as progress towards your goals. You can browse other users and add them as friends from the <b>Community Tab</b>.
                        If you see a workout of their that you like - save it. You like one of their challenges - compete with them! The possibilities are endless!
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.purple' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                What actions can I do within the app?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        You can create, edit, and delete any of your own workouts or goals. You can add any user as a friend and remove them also.
                        You can apply to be an Admin from your <b>Profile Tab</b> and if you become one, you can block users, approve other admins,
                        moderate Goal and Workout content across the platform.
                        You can choose to save your friends&apos; workouts. You can also choose to compete with them on their challenges.
                    </AccordionPanel >
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.purple' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                How can I start tracking my calories?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Through the <b>Profile Health Tab</b> you can set up your health data, in order for us to begin
                        calculating the necessary calorie balance for you to reach your goals. Go on over there, fill out all the needed information
                        and you can add Calorie-Tracking to your fitness journey right away!
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
    );
};

export default FAQ;
