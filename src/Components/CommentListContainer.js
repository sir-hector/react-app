import React from "react";
import {commentListFetch, commentListUnload} from "../actions/actions";
import connect from "react-redux/lib/connect/connect";
import {Spinner} from "./Spinner";
import CommentList from "./CommentList";

const mapStateToProps = state => ({
        ...state.commentList
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

    render(){
        const {isFetching,commentList} = this.props;
        if(isFetching){
            return (<Spinner/>)
        }
        return (
            <CommentList commentList={commentList}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)