import React from 'react';
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm"
import BlogPostsContainer from "./BlogPostsContainer"
import BlogPostContainer from "./BlogPostContainer"
import Header from "./Header";
import {requests} from "../agent";
import connect from "react-redux/lib/connect/connect";
import {userProfileFetch, userSetId} from "../actions/actions";

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch, userSetId
};


class App extends React.Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
        if(token){
            requests.setToken(token)
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if(userId) {
            userSetId(userId)
        }
    }

    componentDidUpdate(prevProps) {
        const {userId,userData, userProfileFetch} = this.props;
        if(prevProps.userId !== userId && userId !==null && userData ===null) {
            console.log(`Old user id ${prevProps.userId} new user ${userId}`)
            userProfileFetch(userId);
        }
    }

    render() {
        const {isAuthenticated, userData} = this.props;
        return (
            <div>
                <Header isAuthenticated={isAuthenticated} userData = {userData}/>
            <Switch>
                <Route path="/login" component={LoginForm}/>
                <Route path="/blog-posts/:id" component={BlogPostContainer}/>
                <Route path="/" component={BlogPostsContainer}/>
            </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);