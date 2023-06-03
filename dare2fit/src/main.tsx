import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { extendTheme, ChakraProvider } from '@chakra-ui/react';

import App from './App';

const theme = extendTheme({
    colors: {
        brand: {
            white: '#FFFFFF',
            light: '#EDF2F7',
            red: '#F24968',
            blue: '#6929F2',
            purple: '#9B72F2',
            green: '#14D990',
            yellow: '#F2B807',
            grey: '#2D3748',
            dark: '#1A202C',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ChakraProvider theme={theme} >
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </ChakraProvider>,
);
