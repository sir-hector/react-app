import React from 'react'
import BlogPosts from "./BlogPosts";
import {blogPostListFetch, blogPostListSetPage} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";
import CommentListContainer from "./CommentListContainer";
import {Paginator} from "./Paginator";
import Carousel from "react-elastic-carousel";
import Card from "./Cards/Card";
import cat from '../images/animals/2.jpeg'
import './css/blogPosts.css'
import Card2 from "./Cards/Card2";
import Card3 from "./Cards/Cards3";

const mapStateToProps = state => ({
        ...state.blogPostList
    }
);

const mapDispatchToProps = {
    blogPostListFetch,blogPostListSetPage
}

class BlogPostsContainer extends React.Component {


    componentDidMount() {
        this.props.blogPostListFetch(this.getQueryParamPage());
    }

    componentDidUpdate(prevProps) {
        const {currentPage, blogPostListFetch,blogPostListSetPage} = this.props

        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            blogPostListSetPage(this.getQueryParamPage());
        }
        if(prevProps.currentPage !== currentPage){
            blogPostListFetch(currentPage)
        }
    }
    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page) {
        const {history, blogPostListSetPage} = this.props;
        blogPostListSetPage(page);
        history.push(`/${page}`);
    }

    onNextPageClick(e) {
        const {currentPage, pageCount} = this.props;
        const newPage = Math.min(currentPage +1, pageCount);
        this.changePage(newPage);
    }

    onPrevPageClick(e) {
        const {currentPage} = this.props;
        const newPage = Math.max(currentPage -1, 1);
        this.changePage(newPage);
    }

    render() {
        const {posts, isFetching,pageCount, currentPage} = this.props;
        const brakePoints = [
            {width: 500, itemsToShow: 1},
            {width: 768, itemsToShow: 2},
            {width: 1200, itemsToShow: 3},
        ]

        if(isFetching){
            return (<Spinner/>)
        }

        return (

            <div className="container">
                <div className={"recommended"}> <h1 className={"recommended-tittle"}>Polecane Ogłoszenia</h1> </div>
                <Carousel className={"carousel"} breakPoints={brakePoints}>
                    <Card number={"1"} url={cat} />
                    <Card2 number={"2"} url={"2.jpeg"}/>
                    <Card3 number={"3"} url={"3.jpeg"}/>
                </Carousel>
            <BlogPosts posts={posts} />
                <Paginator currentPage={currentPage} pageCount={pageCount} setPage={this.changePage.bind(this)}
                           nextPage = {this.onNextPageClick.bind(this)}
                           previousPage = {this.onPrevPageClick.bind(this)} />
            </div>
        )
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(BlogPostsContainer)