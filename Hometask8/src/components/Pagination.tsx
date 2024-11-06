import React from 'react';
import { Box, Button } from '@mui/material';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
            <Button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>
            <Box sx={{ mx: 1 }}>{`${currentPage} / ${totalPages}`}</Box>
            <Button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </Box>
    );
};

export default Pagination;