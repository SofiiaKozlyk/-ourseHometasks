import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

function ThemeSwitch({ darkMode, setDarkMode }) {
    const handleThemeChange = () => setDarkMode(!darkMode);

    return (
        <>
            <FormControlLabel control={<Switch checked={darkMode} onChange={handleThemeChange} />}
                label="Dark Mode"
            />
        </>
    );
}

export default ThemeSwitch;