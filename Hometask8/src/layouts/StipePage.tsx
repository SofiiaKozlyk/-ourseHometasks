import React, { useEffect, useState } from "react";
import { ExhibitPropsI } from "../api/exhibitActions";
import Post from "../components/Post";
import { useRequest } from 'ahooks';
import { fetchExhibits, removeExhibit } from "../api/exhibitActions";
import { Box } from '@mui/material';
import Pagination from "../components/Pagination";

interface StripePagePropsI {
    filter: string;
}

let refreshPosts: () => void;

const StipePage: React.FC<StripePagePropsI> = ({ filter }) => {
    const [exhibits, setExhibits] = useState<ExhibitPropsI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const { loading, error, run: fetchExhibitsAction } = useRequest(() => fetchExhibits(currentPage, limit, filter), {
        manual: true,
        onSuccess: (data) => {
            setTotalPages(data.lastPage);
            setExhibits(data.data);
        },
    });

    const { run: deleteExhibit } = useRequest(removeExhibit, {
        manual: true,
        onSuccess: () => {
            fetchExhibitsAction();
        }
    });

    const handleDeleteItem = (id: number) => {
        deleteExhibit(id);
    };

    useEffect(() => {
        fetchExhibitsAction();
    }, [currentPage]);

    refreshPosts = () => {
        if (currentPage === 1 && filter === '') {
            fetchExhibitsAction();
        }
    };

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
                            width: '500px',
                            overflow: 'hidden',
                        }}
                    >
                        <Post key={exhibit.id} exhibit={exhibit} onDelete={() => handleDeleteItem(exhibit.id)} />
                    </Box>
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

export { refreshPosts };
export default StipePage;