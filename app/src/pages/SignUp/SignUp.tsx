import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants';

const SignUp = () => {
    return (
        <div className="sign_in_up_bg">
            <div className="container">
                <div className="row justify-content-lg-center justify-content-md-center">
                    <div className="col-lg-12">
                        <div className="main_logo25" id="logo">
                            <Link to="/">
                                <img src={IMAGES.logo} alt="" />
                            </Link>
                            <Link to="/">
                                <img className="logo-inverse" src={IMAGES.ct_logo} alt="" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-8">
                        <div className="sign_form">
                            <h2>Welcome to Edututs+</h2>
                            <p>Sign Up and Start Learning!</p>
                            <form>
                                <div className="ui search focus">
                                    <div className="ui left icon input swdh11 swdh19">
                                        <input
                                            className="prompt srch_explore"
                                            type="text"
                                            name="fullname"
                                            value=""
                                            id="id_fullname"
                                            required
                                            maxLength={64}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>
                                <div className="ui search focus mt-15">
                                    <div className="ui left icon input swdh11 swdh19">
                                        <input
                                            className="prompt srch_explore"
                                            type="email"
                                            name="emailaddress"
                                            value=""
                                            id="id_email"
                                            required
                                            maxLength={64}
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>
                                <div className="ui search focus mt-15">
                                    <div className="ui left icon input swdh11 swdh19">
                                        <input
                                            className="prompt srch_explore"
                                            type="password"
                                            name="password"
                                            value=""
                                            id="id_password"
                                            required
                                            maxLength={64}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="ui form mt-30 checkbox_sign">
                                    <div className="inline field">
                                        <div className="ui checkbox mncheck">
                                            <input type="checkbox" tabIndex={0} className="hidden" />
                                            <label>
                                                I’m in for emails with exciting discounts and personalized recommendations
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button className="login-btn" type="submit">
                                    Next
                                </button>
                            </form>
                            <p className="sgntrm145">
                                By signing up, you agree to our <a href="terms_of_use.html">Terms of Use</a> and{' '}
                                <a href="terms_of_use.html">Privacy Policy</a>.
                            </p>
                            <p className="mb-0 mt-30">
                                Already have an account? <Link to="/signIn">Log In</Link>
                            </p>
                        </div>
                        <div className="sign_footer">
                            <img src={IMAGES.sign_logo} alt="" />© 2020 <strong>Cursus</strong>. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
