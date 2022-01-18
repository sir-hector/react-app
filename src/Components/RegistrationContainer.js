import React from "react";
import RegisterForm from "./RegisterForm";
import connect from "react-redux/lib/connect/connect";
import ConfirmationForm from "./ConfirmationForm";
import {userRegisterComplete} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.registration
})

const mapDispatchToProps = {
    userRegisterComplete
}

 class RegistrationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: 10};
    }
    componentDidUpdate(prevProps,prevState) {
        const {confirmationSuccess, history, userRegisterComplete} = this.props
        if(prevProps.confirmationToken !== confirmationSuccess && confirmationSuccess) {
            this.timer = setInterval(
                () => {
                    this.setState({counter: prevState.counter -1})
                },1000
            )
        }
        if(prevState.counter !== this.state.counter && this.state.counter <= 0) {
            userRegisterComplete();
            history.push('/')
        }
    }

     componentWillUnmount() {
        userRegisterComplete();
        if(this.timer){
            clearInterval(this.timer)
        }
    }

     render(){
        const {registrationSuccess, confirmationSuccess} =this.props;
        if(!registrationSuccess) {
            return <RegisterForm/>
        }
        if(!confirmationSuccess) {
            return <ConfirmationForm/>
        }
        return (
            <div className={"card mt-3 mb-6 shadow-sm"}>
                <div className={"card-body"}>
                    <h2>Gratulacje! </h2>
                    <p className={"card-text"}> Twoje konto zostało potwierdzone, zostaniesz przekierowany na stronę główną za&nbsp;
                        {this.state.counter} sekund.
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(RegistrationContainer)