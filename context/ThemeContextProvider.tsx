import React, { createContext, useContext, useState } from 'react';
import { ThemeContextType } from '../@types/contextType';

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

type Props = {
    children?: React.ReactNode
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [dark, setDark] = useState<boolean>(true);

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext);