import React, { useEffect, useState } from "react";
import { ExhibitPropsI } from "../api/exhibitActions";
import Post from "../components/Post";
import { useRequest } from 'ahooks';
import { fetchExhibits } from "../api/exhibitActions";
import { Box } from '@mui/material';
import Pagination from "../components/Pagination";


const StipePage: React.FC = () => {
    const [exhibits, setExhibits] = useState<ExhibitPropsI[]>([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const { loading, error, run: fetchExhibitsAction } = useRequest(() => fetchExhibits(currentPage, limit), {
        manual: true,
        onSuccess: (data) => {
            console.log(data);
            setTotalPages(data.lastPage); 
            setExhibits(data.data); 
        },
    });

    // const { loading, error, run: fetchExhibitsAction } = useRequest(fetchExhibits, {
    //     manual: true,
    //     onSuccess: (data) => {
    //         console.log(data);
    //         setTotalPages(data.lastPage);
    //         setExhibits(data.data);
    //         console.log(data.data);
    //     }
    // });

    useEffect(() => {
        fetchExhibitsAction();
    }, [currentPage]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
                            width: '300px',
                            overflow: 'hidden',
                        }}
                    >
                        <Post key={exhibit.id} exhibit={exhibit} />
                    </Box>
                    // <Post key={exhibit.id} exhibit={exhibit} />
                ))}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </Box>
        </>
    )
}

export default StipePage;