import React from 'react';
import timeago from "timeago.js";
import {Spinner} from "./Spinner";
import {Link} from "react-router-dom";

export class Post extends React.Component {
    render() {
        const {post, isFetching} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }
        if (null === post) {
            return (<Spinner message="No blog post exists"/>);
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <h2>{post.title}</h2>
                    <p className="card-text">{post.content}</p>
                    <p className="card-text border-top">
                        <small className="text-muted">{timeago().format(post.published)} przez&nbsp;
                            {post.author.username}</small>
                    </p>
                    {post.images && post.images.map(post => (
                        <div className="mt-2 mb-2" key={post.id}>
                            <img src={`http://localhost:8080${post.url}`}
                                 className="img-fluid"/>
                        </div>
                    ))}
                </div>
            </div>
        )

    }
}