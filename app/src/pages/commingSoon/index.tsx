import { IMAGES } from '../../constants';

const CommingSoon = () => {
    return (
        <>
            <div className="wrapper coming_soon_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="cmtk_group">
                                <div className="ct-logo">
                                    <a href="index.html">
                                        <img src={IMAGES.ct_logo} alt="" />
                                    </a>
                                </div>
                                <div className="cmtk_dt">
                                    <div className="col-lg-8 no-float no-padding center-block">
                                        <ul className="clock block clearfix">
                                            <li>
                                                <span className="remaining-days" id="days">
                                                    00
                                                </span>
                                                <label>Days</label>
                                            </li>
                                            <li className="sep">:</li>
                                            <li>
                                                <span className="remaining-hours" id="hours">
                                                    00
                                                </span>
                                                <label>hours</label>
                                            </li>
                                            <li className="sep">:</li>
                                            <li>
                                                <span className="remaining-minutes" id="minutes">
                                                    00
                                                </span>
                                                <label>minutes</label>
                                            </li>
                                            <li className="sep">:</li>
                                            <li>
                                                <span className="remaining-seconds" id="seconds">
                                                    00
                                                </span>
                                                <label>seconds</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="thnk_title1">We’ll be coming soon!</h4>
                                    <div className="col-lg-4 col-md-6 no-float no-padding noti-block">
                                        <form>
                                            <div className="ui search focus">
                                                <div className="ui left icon input swdh11 thykh19">
                                                    <input
                                                        className="prompt srch_explore"
                                                        type="email"
                                                        name="emailaddress"
                                                        value=""
                                                        id="id_email"
                                                        required
                                                        maxLength={64}
                                                        placeholder="Email address"
                                                    />
                                                    <button className="noti-btn" type="submit">
                                                        Notify Me
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="tc_footer_main">
                                    <div className="tc_footer_left">
                                        <ul>
                                            <li>
                                                <a href="about_us.html">About</a>
                                            </li>
                                            <li>
                                                <a href="press.html">Press</a>
                                            </li>
                                            <li>
                                                <a href="contact_us.html">Contact Us</a>
                                            </li>
                                            <li>
                                                <a href="coming_soon.html">Advertise</a>
                                            </li>
                                            <li>
                                                <a href="coming_soon.html">Developers</a>
                                            </li>
                                            <li>
                                                <a href="terms_of_use.html">Copyright</a>
                                            </li>
                                            <li>
                                                <a href="terms_of_use.html">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="terms_of_use.html">Terms</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tc_footer_right">
                                        <p>
                                            © 2020 <strong>Cursus</strong>. All Rights Reserved.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommingSoon;
