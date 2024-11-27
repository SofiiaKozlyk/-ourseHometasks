"use client"

import React, { useEffect, useState } from "react";
import { ExhibitPropsI } from "../api/exhibitActions";
import Post from "../components/Post";
import { useRequest } from 'ahooks';
import { fetchExhibits, removeExhibit, ExhibitsResponseI } from "../api/exhibitActions";
import { Box } from '@mui/material';
import MyPagination from "../components/MyPagination";
import { Provider } from "react-redux";
import store from "../store/store";

interface StripePagePropsI {
    exhibits: ExhibitPropsI[],
    totalPages: number;
    page: number;
}

let refreshPosts: () => void;

const StipePage: React.FC<StripePagePropsI> = ({ exhibits, totalPages, page }) => {

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2
            }}>
                {exhibits.map((exhibit) => (
                    <Box
                        key={exhibit.id}
                        sx={{
                            width: '500px',
                            overflow: 'hidden',
                        }}
                    >
                         <Post key={exhibit.id} exhibit={exhibit} /> {/*onDelete={() => handleDeleteItem(exhibit.id)} */}
                    </Box>
                ))}
                <MyPagination
                    currentPage={page}
                    totalPages={totalPages}
                    navigationPath={'/exhibits'}
                /> 
            </Box>
        </>
    )
}

export { refreshPosts };
export default StipePage;