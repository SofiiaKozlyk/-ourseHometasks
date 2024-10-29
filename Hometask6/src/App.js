import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './layouts/Home';
import About from './layouts/About';
import Heroes from './layouts/Heroes';
import Hero from './layouts/Hero';
import Navbar from './components/Navbar';
import ThemeSwitch from './components/ThemeSwitch';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '15%', width: 'calc(100% - 15%)' }}>
                    <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
                        <Toolbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/heroes" element={<Heroes />}>
                                <Route path=":id" element={<Hero />} />
                            </Route>
                        </Routes>
                    </Box>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;