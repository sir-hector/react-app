import React from "react";
import {Link} from "react-router-dom";
import {Spinner} from "./Spinner";
import "./css/app.css"

export default class Header extends React.Component {

    renderUser() {
        const {userData, logout} = this.props;
        if(null === userData) {
            return (<Spinner />)
        }
        return (<span>Witaj {userData.name}, &nbsp; <button className="btn btn-link" href="#" onClick={logout}>Wyloguj</button> </span>)
    }


    render() {
        const {isAuthenticated} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light nav-fill w-100 font-poppins">
                <Link to="/" className="navbar-brand ml-5">
                    <a className='navbar-brand font-poppins'>
                    <img className="header-logo" src="./Assets/ico.png"  width="30" height="30" class="d-inline-block align-top"></img>
                    Adopciak
                </a>
                </Link>

                <div className={'float-right nav-item mr-4'}>
                <ul className='navbar-nav float-right'>
                    {!isAuthenticated &&
                    (
                    <li className='nav-item'>
                        <Link to='/register' className="nav-link font-poppins"> Zarejestruj</Link>
                    </li>
                    )
                    }
                    {isAuthenticated &&
                    (
                        <li className='nav-item'>
                            <Link to='/dodaj-ogloszenie' className="nav-link font-poppins mt-2"> Dodaj ogłoszenie</Link>
                        </li>
                    )
                    }
                </ul>
                <span className="navbar-text float-right">
                    {isAuthenticated ?  this.renderUser() : <Link to="/login">Zaloguj </Link>}
                </span>
               </div>
            </nav>
        )
    }
}
