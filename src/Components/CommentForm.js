import React from 'react'
import {Field, reduxForm, SubmissionError} from "redux-form";
import {connect} from 'react-redux'
import {renderField} from "../form";
import {commentAdd} from "../actions/actions";


const mapDispatchToProps = {
    commentAdd
}

class CommentForm extends React.Component {
    onSubmit(values) {

        const {commentAdd, blogPostId} = this.props
        console.log(blogPostId)
        return commentAdd(values.content,blogPostId)

    }
    render() {
        const {handleSubmit, submitting} = this.props;
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="content" label="Dodaj komentarz" type="textarea" component={renderField}/>

                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}> dodaj komentarz </button>

                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'CommentForm'
})(connect(null,mapDispatchToProps)(CommentForm))