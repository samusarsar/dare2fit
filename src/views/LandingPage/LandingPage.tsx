import { FC } from 'react';
import Hero from '../../components/LandingPage/Hero/Hero';
import { VStack } from '@chakra-ui/react';
import StatList from '../../components/LandingPage/StatList/StatList';
import FeaturesList from '../../components/LandingPage/FeaturesList/FeaturesList';

const LandingPage: FC = () => {
    return (
        <VStack>
            <Hero />
            <StatList />
            <FeaturesList />
        </VStack>
    );
};

export default LandingPage;
