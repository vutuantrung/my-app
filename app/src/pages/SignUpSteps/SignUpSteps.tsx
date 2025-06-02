import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants';
import { useEffect, useState } from 'react';

const SignUpSteps = () => {
    const [docState, setDocState] = useState('');
    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            document.onreadystatechange = () => {
                setDocState(document.readyState);
            };
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
            ($('.ui.dropdown') as any).dropdown();
        }
    }, [docState]);
    return (
        <div className="sign_in_up_bg">
            <div className="container">
                <div className="row justify-content-lg-center justify-content-md-center">
                    <div className="col-lg-12">
                        <div className="main_logo25" id="logo">
                            <Link to="/">
                                <img src={IMAGES.logo} alt="logo" />
                            </Link>
                            <Link to="/">
                                <img className="logo-inverse" src={IMAGES.ct_logo} alt="ct_logo" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-8">
                        <div className="sign_form">
                            <div className="main-tabs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            href="#instructor-signup-tab"
                                            id="instructor-tab"
                                            className="nav-link active"
                                            data-toggle="tab"
                                        >
                                            Instructor Sign Up
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#student-signup-tab" id="student-tab" className="nav-link" data-toggle="tab">
                                            Student Sign Up
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="instructor-signup-tab"
                                    role="tabpanel"
                                    aria-labelledby="instructor-tab"
                                >
                                    <p>Sign Up and Create Course!</p>
                                    <form>
                                        <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                            <option value="">Select Category</option>
                                            <option value="1">Development</option>
                                            <option value="2">Business</option>
                                            <option value="3">Finance & Accounting</option>
                                            <option value="4">IT & Software</option>
                                            <option value="5">Office Productivity</option>
                                            <option value="6">Personal Development</option>
                                            <option value="7">Design</option>
                                            <option value="8">Marketing</option>
                                            <option value="9">Lifestyle</option>
                                            <option value="10">Photography</option>
                                            <option value="11">Health & Fitness</option>
                                            <option value="12">Music</option>
                                            <option value="13">Teaching & Academics</option>
                                        </select>
                                        <div className="ui search focus mt-15">
                                            <div className="ui form swdh30">
                                                <div className="field">
                                                    <textarea
                                                        rows={3}
                                                        name="description"
                                                        id="id_about"
                                                        placeholder="Write a little description about you..."
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="help-block">
                                                Your biography should have at least 12000 characters.
                                            </div>
                                        </div>
                                        <button className="login-btn" type="submit">
                                            Instructor Sign Up Now
                                        </button>
                                    </form>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="student-signup-tab"
                                    role="tabpanel"
                                    aria-labelledby="student-tab"
                                >
                                    <p>Sign Up and Start Learning!</p>
                                    <form>
                                        <div className="ui search focus mt-15">
                                            <div className="ui form swdh30">
                                                <div className="field">
                                                    <textarea
                                                        rows={3}
                                                        name="description"
                                                        id="id_about1"
                                                        placeholder="Write a little description about you..."
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="help-block">
                                                Your biography should have at least 12000 characters.
                                            </div>
                                        </div>
                                        <button className="login-btn" type="submit">
                                            Student Sign Up Now
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <p className="mb-0 mt-30">
                                Already have an account? <Link to="/signIn">Log In</Link>
                            </p>
                        </div>
                        <div className="sign_footer">
                            <img src={IMAGES.sign_logo} alt="sign_logo" />© 2020 <strong>Cursus</strong>. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpSteps;
