import React from "react";
import {blogPostFetch, blogPostUnload} from "../actions/actions";
import connect from "react-redux/lib/connect/connect";
import {BlogPost} from "./blogPost";
import BlogPosts from "./BlogPosts";
import CommentListContainer from "./CommentListContainer";

const mapStateToProps = state => ({
        ...state.blogPost
    }
);
const mapDispatchToProps = {
    blogPostFetch,
    blogPostUnload

}

class BlogPostContainer extends React.Component {
    componentDidMount() {
        this.props.blogPostFetch(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.blogPostUnload()
    }

    render(){
        const {isFetching,post} = this.props;
        return (
            <div className="container">
            <BlogPost post={post}/>
                <CommentListContainer blogPostId={this.props.match.params.id}/>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer)