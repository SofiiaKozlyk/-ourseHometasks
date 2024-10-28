import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import Home from './layouts/Home';
import About from './layouts/About';
import Navbar from './components/Navbar';

function App() {

    return (
        <>
            <Router>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '15%', width: 'calc(100% - 15%)' }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                </Box>
            </Router>
        </>
    );
}

export default App;