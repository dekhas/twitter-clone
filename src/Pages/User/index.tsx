import React from "react";
import {useParams} from "react-router";

interface Params {
    id: string
}

const UserPage = () => {
    const {id}: Params = useParams();

    return (
        <div>{id}</div>
    )
};

// @ts-ignore
export default UserPage