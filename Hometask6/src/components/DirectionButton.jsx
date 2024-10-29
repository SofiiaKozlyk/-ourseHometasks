import React from 'react';
import { Button } from '@mui/material';

function DirectionButton({onClick, direction}){
    const handleClick = () => {
        onClick(direction);
      };
    return (
        <>
            <Button variant="outlined" onClick={handleClick}>{direction.charAt(0).toUpperCase() + direction.slice(1)}</Button>
        </>
    );
}

export default DirectionButton;