import { FC, ReactElement } from 'react';
import { Tabs, TabList, Tab, TabPanel, TabPanels, VStack, Image, Heading } from '@chakra-ui/react';
import Team from '../../components/About/Team/Team';
import Careers from '../../components/About/Careers/Careers';
import FAQ from '../../components/About/FAQ/FAQ';

const AboutView: FC = (): ReactElement => {
    return (
        <VStack>
            <VStack gap={5} py={6}>
                <Image
                    // eslint-disable-next-line max-len
                    src='https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05-circle.png?alt=media&token=c266cfd5-d1be-4e93-91f2-ef7a7f5c9fba&_gl=1*1t8i93k*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NTk2MTg0OC44MC4xLjE2ODU5NjQwODUuMC4wLjA.'
                    h={{ base: '80px', md: '120px' }} />
                <Heading as='h1' size={{ base: '2xl', md: '3xl' }}>About us</Heading>
            </VStack>
            <Tabs align='center' w='100%'>
                <TabList>
                    <Tab w='200px'>Team</Tab>
                    <Tab w='200px'>Careers</Tab>
                    <Tab w='200px'>FAQ</Tab>
                </TabList>

                <TabPanels w={{ sm: '100%', lg: '80%' }} py={5}>
                    <TabPanel >
                        <Team />
                    </TabPanel>
                    <TabPanel>
                        <Careers />
                    </TabPanel>
                    <TabPanel>
                        <FAQ />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
};

export default AboutView;
