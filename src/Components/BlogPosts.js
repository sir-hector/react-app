import React from 'react'
import timeago from 'timeago.js'
import {Link} from "react-router-dom";
import {BlogPost} from "./blogPost";
import './css/blogPosts.css'

class BlogPosts extends React.Component {
    render() {
        const {posts} = this.props;
        console.log(posts)
        return (<div>
            <ul>
                {posts && posts.map (post => (

                    <div className="card mb-3 mt-3 shadow-sm" key={post.id}>
                        <div className="card-body card-body-list">
                            <div className={"left-panel"}>
                            <h3>
                            <Link to={`/blog-posts/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="card-text border-top">
                            <small className="text-muted">
                                {timeago().format(post.published)}
                            </small>
                        </p>
                            </div>
                            <div className={"right-panel"}>
                            <img src={`http://localhost:8080${post.images[0].url}`}
                                 className="img-fluid"/>
                            </div>
                        </div>

                    </div>
                ))}
            </ul>
        </div>)
    }
}

export default BlogPosts

