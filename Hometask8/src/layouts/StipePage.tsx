import React from "react";
import { ExhibitPropsI } from "../api/exhibitActions";
import Post from "../components/Post";


const StipePage: React.FC<{exhibits: ExhibitPropsI[]}> = ({exhibits}) => {
    console.log(exhibits);

    return (
        <>
        {exhibits.map((exhibit) => (
                <Post key={exhibit.id} exhibit={exhibit} />
            ))}
        </>
    )
}

export default StipePage;