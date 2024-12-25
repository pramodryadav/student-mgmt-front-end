import React, { ReactNode, useContext, useMemo } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeConfigProps {
    children: ReactNode;
}

const ThemeConfig:React.FC<ThemeConfigProps> = ({ children }) => {

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={{}}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeConfig