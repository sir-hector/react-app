import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWritePost} from "../apiUtils";
import {Redirect} from "react-router";
import {renderField} from "../form";
import {blogPostFormUnload, imageDelete, postAdd} from "../actions/actions";
import ImageUpload from "./ImageUpload";
import {ImageBrowser} from "./ImageBrowser";



const mapDispatchToProps = {
    postAdd,
    blogPostFormUnload,
    imageDelete
}

const mapStateToProps = state => ({
        userData: state.auth.userData,
        ...state.blogPostForm
    }
)
class BlogPostForm extends React.Component {

    onSubmit(values) {
        const {postAdd, reset, history, images}= this.props;
        return postAdd(values.title, values.content, images)
            .then(()=>{
                reset();
                history.push('/');
            })
    }

    componentWillUnmount() {
        this.props.blogPostFormUnload();
    }

    render() {
        if(!canWritePost(this.props.userData)) {
            return <Redirect to={"/login"}/>
        }
        const {submitting, handleSubmit, error, images, isImageUploading, imageDelete} = this.props
        return(
            <div className={"card mt-3 mb-6 shadow-sm container"}>
                <div className={"card-body"}>
                    {error && <div className={"alert alert-danger"}>{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="title" label="Tytuł" type="text" component={renderField}/>
                        <Field name="content" label="Zawartość" type="textarea" component={renderField}/>
                        <ImageUpload/>
                        <ImageBrowser images={images} deleteHandler={imageDelete} isLocked={isImageUploading}/>

                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting || isImageUploading}> Dodaj Ogłoszenie </button>
                    </form>

                </div>

            </div>
        )
    }
}

export default reduxForm({
    form: 'BlogPostForm'
})(connect(mapStateToProps,mapDispatchToProps)(BlogPostForm))