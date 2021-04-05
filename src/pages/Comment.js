import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

import api from '../services/api';
import io from 'socket.io-client';

import './Comment.css';

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg"

const Comment = (props) => {
    const history = useHistory();

    const [post, setPost] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsShow, setCommentsShow] = useState(false);
    const [postInfo, setPostInfo] = useState([]);
    const [commentForm, setCommentForm] = useState('');
    const [authorForm, setAuthorForm] = useState('');

    useEffect(() => {
        registerToSocket();
        async function loadComments() {
            const response = await api.get(`/posts/${post}/comment`);
            let commentsArray = response.data;
            let commentsReverse = commentsArray.reverse();

            setComments(commentsReverse);
            if(commentsReverse.length > 0) {
                setCommentsShow(true);
            }
        }
        loadComments();
        
        if(loaded && post == undefined) {
            return history.goBack();
        }
    }, [post, comments])

    useEffect(() => {
        const postId = props.location.postId;
        setPost(postId);
        setLoaded(true);

        async function loadPhoto() {
            const response = await api.get(`/posts/${postId}`);
            setPostInfo(response.data);
        }
        loadPhoto();

    }, [])

    function registerToSocket() {
        const socket = io('https://api--instagram-clone.herokuapp.com:443/');
        socket.on('comment', newComment => {
            setComments([newComment, ...comments]);
        });
    }

    async function handleSubmitComment(e) {
        e.preventDefault();
        const form = {
            author: authorForm,
            comment: commentForm,
        }
        const respose = await api.post(`/posts/${post}/comment`, form);
    }

    return (
        <div id="container-comments">
            <button className="back" onClick={() => {history.goBack()}}>X</button>
            <div className="area-float-comments">
                <div className="post-photo">
                    <img src={`https://api--instagram-clone.herokuapp.com:443/files/${postInfo.image}`}/>
                </div>
                <div className="area-comments">
                    <div className="user-info">
                        <div className="user-name">
                            <span>{postInfo.author}</span>
                            <span className="place">{postInfo.place}</span>
                        </div>
                        <div className="action">
                            <img src={more} alt="mais"/>
                        </div>
                    </div>
                    <ul className="box-comments">
                        {commentsShow ?
                            comments.map(comment => {
                                return (
                                    <li key={comment._id}>
                                        <span className="name">{comment.author}</span>
                                        <span>{comment.comment}</span>
                                    </li>
                                )
                            })
                            :
                            <div>
                                <p>Nenhum comentário</p> 
                            </div>
                        }
                    </ul>
                    <div className="actions">
                        <div className="actions-area">
                            <button type="button" >
                                <img src={like} />
                            </button>
                            <img src={comment} />
                            <img src={send} />
                        </div>
                        <p>{postInfo.likes} curtidas</p>
                    </div>
                    <div className="input">
                        <div className="inputs">
                        <input onChange={(e) => setAuthorForm(e.target.value)} placeholder="Adicione seu nome..."/>
                            <input onChange={(e) => setCommentForm(e.target.value)} placeholder="Adicione um comentário..."/>
                        </div>
                        <button onClick={handleSubmitComment} >Publicar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;