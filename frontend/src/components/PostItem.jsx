import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className="post rounded bg-dark text-light mt-3 p-3 px-4">
            <div className="post__content">
                <h3>{props.post.id}. {props.post.title}</h3>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns d-flex flex-column">
                <MyButton
                    onClick={() => navigate(`/posts/${props.post.id}`)}
                >
                    Открыть
                </MyButton>
                <MyButton
                    onClick={() => props.remove(props.post)}
                >
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;