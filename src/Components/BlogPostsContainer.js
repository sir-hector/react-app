import React from 'react'
import BlogPosts from "./BlogPosts";
import {blogPostAdd, blogPostList} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
        ...state.blogPostList
    }
);

const mapDispatchToProps = {
    blogPostList,
    blogPostAdd
}

class BlogPostsContainer extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (<BlogPosts posts={this.props.posts}/>)
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(BlogPostsContainer)