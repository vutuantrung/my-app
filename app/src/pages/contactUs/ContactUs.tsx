import { Link } from 'react-router-dom';
import AppFooter from '../../Layouts/AppFooter';
import PageHeader from '../../Layouts/PageHeader';
import { IMAGES } from '../../constants';

const ContactUs = () => {
    return (
        <>
            <PageHeader />
            <div className="wrapper _bg4586 _new89 app-footer-padding">
                <div className="_215b15">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title125">
                                    <div className="titleleft">
                                        <div className="ttl121">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item">
                                                        <Link to="/">Home</Link>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        Contact Us
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="titleright">
                                        <a href="index.html" className="blog_link">
                                            <i className="uil uil-angle-double-left"></i>Back to Home
                                        </a>
                                    </div>
                                </div>
                                <div className="title126">
                                    <h2>Contact Us</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact1256">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <a href="help.html" className="contact_link_step">
                                    <img src={IMAGES.helpIcon} alt="" />
                                    <h4>Help Center</h4>
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="our_blog.html" className="contact_link_step">
                                    <img src={IMAGES.blog} alt="" />
                                    <h4>Blog</h4>
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="career.html" className="contact_link_step">
                                    <img src={IMAGES.careers} alt="" />
                                    <h4>Careers</h4>
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="coming_soon.html" className="contact_link_step">
                                    <img src={IMAGES.developerArea} alt="" />
                                    <h4>Developer Area</h4>
                                </a>
                            </div>
                            <div className="col-lg-8">
                                <div className="contact_map">
                                    <div id="map"></div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="contact_info">
                                    <div className="checkout_title">
                                        <h4>Contact Information</h4>
                                        <img src="images/line.svg" alt="" />
                                    </div>
                                    <ul className="contact_list_info">
                                        <li>
                                            <div className="txt_cntct">
                                                <span className="cntct_895">
                                                    <i className="uil uil-location-point"></i>Main Address :
                                                </span>
                                                <p>#1235 Sks Nagar St No. 8 Phase 3, Pakhowal Road, 141001, LDH, Punjab, India</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="txt_cntct">
                                                <span className="cntct_895">
                                                    <i className="uil uil-envelope"></i>Email Address :
                                                </span>
                                                <p>Info@edututsplus@gmail.com</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="txt_cntct">
                                                <span className="cntct_895">
                                                    <i className="uil uil-mobile-android-alt"></i>Phone Number :
                                                </span>
                                                <p>+911234567890, 01610000000</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="edututs_links_social">
                                        <ul className="tutor_social_links">
                                            <li>
                                                <a href="#" className="fb">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="tw">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="ln">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="yu">
                                                    <i className="fab fa-youtube"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AppFooter />
            </div>
        </>
    );
};

export default ContactUs;
