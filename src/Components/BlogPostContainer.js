import React from "react";
import {blogPostFetch, blogPostUnload} from "../actions/actions";
import connect from "react-redux/lib/connect/connect";
import {BlogPost} from "./blogPost";

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
            <BlogPost isFetching = {isFetching} post={post}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer)