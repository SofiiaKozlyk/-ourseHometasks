import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

function CharactersList({ characters }) {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    const handleRowClick = (params) => {
        navigate(`/heroes/${params.id}`);
    };

    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={characters}
                    columns={columns}
                    pageSize={5}
                    onRowClick={handleRowClick}
                    sx={{
                        '& .MuiDataGrid-row': { backgroundColor: 'lightblue' },
                        '& .MuiDataGrid-row:hover': { backgroundColor: 'lightgreen' }
                    }}
                />
            </Box>
        </>
    );
}

export default CharactersList;