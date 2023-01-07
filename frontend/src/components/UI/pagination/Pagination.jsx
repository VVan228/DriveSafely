import React from 'react';
import MyButton from "../button/MyButton";
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {

    const pagesArray = getPagesArray(totalPages)
    return (
        <div>
            {pagesArray.map(p => <MyButton onClick={() => changePage(p)} key={p} className={
                p === page ? 'current_page ms-3' : 'ms-3'
            }>{p}</MyButton>)}
        </div>
    );
};

export default Pagination;