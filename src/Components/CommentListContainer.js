import React from "react";
import {commentListFetch, commentListUnload} from "../actions/actions";
import connect from "react-redux/lib/connect/connect";
import {Spinner} from "./Spinner";
import {CommentList} from "./CommentList";
import CommentForm from "./CommentForm";
import {LoadMore} from "./LoadMore";

const mapStateToProps = state => ({
        ...state.commentList,
        isAuthenticated: state.auth.isAuthenticated
    }
);
const mapDispatchToProps = {
    commentListFetch,
    commentListUnload
}

class CommentListContainer extends React.Component {
    componentDidMount() {
        this.props.commentListFetch(this.props.blogPostId)
    }

    componentWillUnmount() {
        this.props.commentListUnload()
    }

    onLoadMoreClick() {
        const {blogPostId, currentPage, commentListFetch} = this.props;
        commentListFetch(blogPostId,currentPage);
    }

    render(){
        const {isFetching,commentList, isAuthenticated, blogPostId ,currentPage, pageCount} = this.props;
        if(isFetching && currentPage === 1){
            return (<Spinner/>)
        }

        const showLoadMore = pageCount > 1  && currentPage <= pageCount;
        return (
            <div>
            <CommentList commentList={commentList}/>
                {pageCount > 1 && currentPage <= pageCount && <LoadMore label={"load more comments"}
                onClick = {this.onLoadMoreClick.bind(this)} disabled={isFetching}
                />
                }

           {isAuthenticated && <CommentForm blogPostId={blogPostId}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)