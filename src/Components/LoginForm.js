import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";
import {connect} from "react-redux";
import {userLoginAttempt} from "../actions/actions";

const mapDispatchToProps = {
    userLoginAttempt
}
const mapStateToProps = state => ({
    ...state.auth
})


class LoginForm extends React.Component {
    componentDidUpdate(prevProps) {
        if(prevProps.token !== this.props.token) {
            this.props.history.push('/')
        }
    }

    onSubmit(values) {
        console.log(values)
        return this.props.userLoginAttempt(
            values.username,
            values.password
        )
    }

    render() {
        const {handleSubmit,error} = this.props;

        return(
            <div className="text-center container col-xs-12 col-md-6 col-lg-3">
                {error && <div className="alert alert-danger">Username or Password is invalid</div>}
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="username" label="Nazwa użytkownika" type="text" component={renderField}/>
                    <Field name="password" label="Hasło" type="password" component={renderField}/>
                    <button type="submit" className="btn btn-primary btn-block rounded-pill"> Zaloguj</button>
                </form>
            </div>

        )
    }
}

export default reduxForm({
    form: 'LoginForm'
})(connect(mapStateToProps,mapDispatchToProps)(LoginForm));
