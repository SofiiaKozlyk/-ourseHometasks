import React, { useEffect, useState } from "react";
import { ExhibitPropsI } from "../api/exhibitActions";
import Post from "../components/Post";
import { useRequest } from 'ahooks';
import { fetchExhibits } from "../api/exhibitActions";


const StipePage: React.FC = () => {
    const [exhibits, setExhibits] = useState<ExhibitPropsI[]>([]);
    const { loading, error, run: fetchExhibitsAction } = useRequest(fetchExhibits, {
        manual: true,
        onSuccess: (data) => {
            setExhibits(data.data);
            console.log(data.data);
        }
    });

    useEffect(() => {
        fetchExhibitsAction();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {exhibits.map((exhibit) => (
                <Post key={exhibit.id} exhibit={exhibit} />
            ))}
        </>
    )
}

export default StipePage;