import React from "react";
import style from "./style.module.css"

const Loader = () => {
    return (
        <>
            <div className={style.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
};

export default Loader