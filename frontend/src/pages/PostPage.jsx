import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";

const PostPage = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
            const response = await PostService.getById(params.id)
            setPost(response.data)
        }
    )
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
            const response = await PostService.getCommentsByPostId(params.id)
            setComments(response.data)
        }
    )

    useEffect(
        () => {
            fetchPostById()
            fetchComments()
        }, []
    )
    return (
        <div className="text-light h-100 d-flex justify-content-center align-items-center">
            {isLoading ? <Loader/> :
            <div>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <MyButton >Назад</MyButton>

                <h3 className="mt-3">Комментарии</h3>
                {
                    isCommentsLoading ? <Loader/> :
                        <ul className="list-group d-flex justify-content-end">
                            {comments.map((comment =>
                            <li key={comment.id} className="d-flex flex-column justify-content-end list-group-item bg-dark text-light border-0 mt-3 w-50">
                                <div className="row d-flex justify-content-between">
                                    <div className="col"><h4><i className="bi bi-person"/> {comment.email}</h4></div>
                                    <div className="col text-muted">{comment.name}</div>
                                </div>
                                <div className="row">{comment.body}</div>
                            </li>
                        ))}
                        </ul>
                }
            </div>
            }
        </div>
    );
};

export default PostPage;