import React from 'react'
import BlogPosts from "./BlogPosts";
import {blogPostListFetch} from "../actions/actions";
import {connect} from "react-redux";

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

        return (<BlogPosts posts={this.props.posts} isFetching = {this.props.isFetching}/>)
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(BlogPostsContainer)