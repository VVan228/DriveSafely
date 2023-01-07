import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove, page, totalPages}) => {
    return (
        posts.length != 0 ?
            <div>
                <div className="row d-flex justify-content-end"><span className="col-auto mt-5 text-muted">Страница {page} из {totalPages}</span></div>
                <h1 className="text-center mt-5 text-light">{title}:</h1>
                <TransitionGroup>
                    {posts.map((post, index) =>
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post"
                        >
                            <PostItem remove={remove} number={index + 1} post={post}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>

            </div> :
            <h1 className="text-light text-center">Посты не найдены</h1>
    )
};

export default PostList;