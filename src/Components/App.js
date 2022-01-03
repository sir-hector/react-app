import React from 'react';
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm"
import BlogPostsContainer from "./BlogPostsContainer"
import BlogPostContainer from "./BlogPostContainer"
import Header from "./Header";


class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
            <Switch>
                <Route path="/login" component={LoginForm}/>
                <Route path="/blog-posts/:id" component={BlogPostContainer}/>
                <Route path="/" component={BlogPostsContainer}/>
            </Switch>
            </div>
        );
    }
}

export default App;