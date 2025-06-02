import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';

const PageFooter = () => {
    return (
        <footer className="footer mt-40">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="item_f1">
                            <Link to="/termsOfUse">Copyright Policy</Link>
                            <Link to="/termsOfUse">Terms</Link>
                            <Link to="/termsOfUse">Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="footer_bottm">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="fotb_left">
                                        <li>
                                            <a href="index.html">
                                                <div className="footer_logo">
                                                    <img src={IMAGES.logo1} alt="" />
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <p>
                                                © 2020 <strong>Cursus</strong>. All Rights Reserved.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <div className="edu_social_links">
                                        <a href="#">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-google-plus-g"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-pinterest-p"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PageFooter;
