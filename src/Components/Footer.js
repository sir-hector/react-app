import React from "react";
import {Link} from "react-router-dom";
import './css/footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className='footer-container'>
                <section className='footer-subscription'>
                    <p className='footer-subscription-heading'>
                        Dołącz do newslettera
                    </p>
                    <p className='footer-subscription-text'>
                        możesz wypisać się w każdej chwili
                    </p>
                    <div className='input-areas'>
                        <form>
                            <input
                                className='footer-input'
                                name='email'
                                type='email'
                                placeholder='Twój email'
                            />
                            <button className={"btn-primary"} >Dołącz</button>
                        </form>
                    </div>
                </section>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <button className={"btn-primary rounded"}>
                                <h2 className={"pt-2"}>O nas</h2>
                            </button>
                        </div>
                        <div className='footer-link-items'>
                            <button className={"btn-primary rounded"}>
                                <h2 className={"pt-2"}>Kontakt</h2>
                            </button>
                        </div>
                    </div>
                </div>
                <section className='social-media'>
                    <div className='social-media-wrap'>
                        <div className='footer-logo'>
                            <Link to='/' className='social-logo'>
                                ADOPCIAK
                                <img className="header-logo" src="./Assets/ico.png" width="30" height="30"
                                     className="d-inline-block align-top"></img>
                            </Link>
                        </div>
                        <div className='social-icons'>
                            <Link
                                class='social-icon-link facebook'
                                to='/'
                                target='_blank'
                                aria-label='Facebook'
                            >
                                <i className='fab fa-facebook-f'/>
                            </Link>
                            <Link
                                class='social-icon-link instagram'
                                to='/'
                                target='_blank'
                                aria-label='Instagram'
                            >
                                <i className='fab fa-instagram'/>
                            </Link>
                            <Link
                                class='social-icon-link youtube'
                                to='/'
                                target='_blank'
                                aria-label='Youtube'
                            >
                                <i className='fab fa-youtube'/>
                            </Link>
                            <Link
                                class='social-icon-link twitter'
                                to='/'
                                target='_blank'
                                aria-label='Twitter'
                            >
                                <i className='fab fa-twitter'/>
                            </Link>
                            <Link
                                class='social-icon-link twitter'
                                to='/'
                                target='_blank'
                                aria-label='LinkedIn'
                            >
                                <i className='fab fa-linkedin'/>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Footer;
