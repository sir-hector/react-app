import React from 'react'
import BlogPosts from "./BlogPosts";
import {blogPostListFetch} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";

const mapStateToProps = state => ({
        ...state.blogPostList
    }
);

const mapDispatchToProps = {
    blogPostListFetch,
}

class BlogPostsContainer extends React.Component {
    componentDidMount() {
        this.props.blogPostListFetch();
    }

    render() {
        const {posts, isFetching} = this.props;

        if(isFetching){
            return (<Spinner/>)
        }

        return (<BlogPosts posts={posts} />)
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(BlogPostsContainer)