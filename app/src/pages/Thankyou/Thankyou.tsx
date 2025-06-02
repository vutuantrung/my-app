import { IMAGES } from '../../constants';

const Thankyou = () => {
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
                                    <h1 className="thnk_coming_title">Thank You</h1>
                                    <h4 className="thnk_title1">Your Order is Confirmed!</h4>
                                    <p className="thnk_des">
                                        Top Print Your Booking Order No.<span> #ABE-ME-12345678</span> (Invoice) -{' '}
                                        <a href="invoice.html">Click Here</a>
                                    </p>
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

export default Thankyou;
