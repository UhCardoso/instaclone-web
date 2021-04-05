import React, {Component, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from "../services/api";
import io from 'socket.io-client';

import './Feed.css';

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg"

export default class Feed extends Component {
    state = {
        feed: [],
        comments: []
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');
        this.setState({feed: response.data});
    }

    registerToSocket = () => {
        const socket = io('https://api--instagram-clone.herokuapp.com:443');
        
        socket.on('post', newPost => {
            this.setState({feed: [newPost, ... this.state.feed]});
        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => (
                    post._id == likedPost._id ? likedPost : post
                ))
            });
        });
    }

    handlelike = id => {
        api.post(`/posts/${id}/like`);
    }

    handleLoadComments(post) {
        this.props.history.push({
            pathname: `/p`,
            postId: post
        })
    }

    render() {
        return (   
            <section id="post-list">
                {this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src={more} alt="mais"/>
                        </header>

                        <img src={`https://api--instagram-clone.herokuapp.com:443/files/${post.image}`}/>
                    
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handlelike(post._id)}>
                                    <img src={like} />
                                </button>
                                <img src={comment} />
                                <img src={send} />
                            </div>

                            <strong>{post.likes} curtidas</strong>

                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                        <div className="comments">
                            <a onClick={() => this.handleLoadComments(post._id)}><p>Ver todos os comentários</p></a>
                        </div>
                    </article>
                ))}
            </section>
        )  
    }
}
   