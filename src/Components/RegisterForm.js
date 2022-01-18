import React from "react";
import {Field,reduxForm} from "redux-form";
import {renderField} from "../form";
import {connect} from 'react-redux';
import {userRegister} from "../actions/actions";

const mapDispatchToProps = {
    userRegister
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {termsAccepted : false};
    }

    onSubmit (values) {
        return this.props.userRegister(...Object.values(values))
            .then(() => {
                this.props.reset();
            })
    }

    onTermsAcceptedClick(e) {
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}))
    }



    render() {
        const {handleSubmit, submitting} = this.props
        return (
            <div className={'card mt-3 mb-6 shadow-sm container'}>
                    <div className={"card-body"}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field name={"username"} label={'Nazwa użytkownika'} type={"text"} component={renderField}/>
                            <Field name={"password"} label={'Hasło'} type={"password"} component={renderField}/>
                            <Field name={"retypedPassword"} label={'Powtórz hasło'} type={"password"} component={renderField}/>
                            <Field name={"email"} label={'Email'} type={"text"} component={renderField}/>
                            <Field name={"name"} label={'Imie i nazwisko'} type={"text"} component={renderField}/>

                            <div className={"form-check form-group"}>
                                <input className={"form-check-input"} type={"checkbox"} value={false}
                                    onClick={this.onTermsAcceptedClick.bind(this)}
                                />
                                <label className={"form-check-label"} > Akceptuję regulamin</label>
                            </div>
                            <button type={'submit'} className={"btn btn-primary btn-big btn-block"} disabled={submitting || !this.state.termsAccepted}> Zarejestruj</button>
                        </form>
                    </div>

            </div>
        )
    }
}

export default reduxForm({
    form: 'RegisterForm'
})(connect(null,mapDispatchToProps)(RegisterForm))