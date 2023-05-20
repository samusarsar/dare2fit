import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            light: '#FFFFFF',
            dark: '#1A202C',
            red: '#F24968',
            blue: '#6929F2',
            purple: '#9B72F2',
            green: '#14D990',
            yellow: '#F2B807',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ChakraProvider theme={theme} >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ChakraProvider>,
);
