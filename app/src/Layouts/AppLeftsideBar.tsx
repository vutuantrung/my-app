import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { CATEGORIES, IMAGES } from '../constants';
import { generateRandomNumber } from '../helpers/helpers';

const AppLeftsideBar = () => {
    return (
        <nav className="vertical_nav">
            <div className="left_section menu_left" id="js-menu">
                <div className="left_section">
                    <ul>
                        <li className="menu--item">
                            <NavLink to="/" className="menu--link menu--label" title="Home">
                                <i className="uil uil-home-alt menu--icon"></i>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/liveStream" className="menu--link menu--label" title="Live Streams">
                                <i className="uil uil-kayak menu--icon"></i>
                                <span>Live Streams</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/explore" className="menu--link menu--label" title="Explore">
                                <i className="uil uil-search menu--icon"></i>
                                <span>Explore</span>
                            </NavLink>
                        </li>
                        <li className="menu--item menu--item__has_sub_menu">
                            <label className="menu--link" title="Categories">
                                <i className="uil uil-layers menu--icon"></i>
                                <span>Categories</span>
                            </label>
                            <ul className="sub_menu">
                                {CATEGORIES.map((item) => {
                                    return (
                                        <li key={item.name} className="sub_menu--item">
                                            <a href={item.link} className="sub_menu--link">
                                                {item.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className="menu--item  menu--item__has_sub_menu">
                            <label className="menu--link" title="Tests">
                                <i className="uil uil-clipboard-alt menu--icon"></i>
                                <span>Tests</span>
                            </label>
                            <ul className="sub_menu">
                                <li className="sub_menu--item">
                                    <Link to="/certificateCenter" className="sub_menu--link">
                                        Certification Center
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/certificateFillForm" className="sub_menu--link">
                                        Certification Fill Form
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/certificateTestView" className="sub_menu--link">
                                        Test View
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/certificateTestResult" className="sub_menu--link">
                                        Test Result
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link
                                        to="http://www.gambolthemes.net/html-items/edututs+/Instructor_Dashboard/my_certificates.html"
                                        className="sub_menu--link"
                                    >
                                        My Certification
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="menu--item  menu--item__has_sub_menu">
                            <label className="menu--link" title="Tests">
                                <i className="uil uil-clipboard-alt menu--icon"></i>
                                <span>Working</span>
                            </label>
                            <ul className="sub_menu">
                                <li className="sub_menu--item">
                                    <Link to="/working/monsterelectrico" className="sub_menu--link">
                                        Monster Electrico
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/perspectiveSlider" className="sub_menu--link">
                                        3D Perspective Slider
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/clipBlinds" className="sub_menu--link">
                                        Clip Blinds
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/expandingFlexCards" className="sub_menu--link">
                                        Expanding Flex Cards
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/foodCart" className="sub_menu--link">
                                        Food Cart
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/splitShowcase" className="sub_menu--link">
                                        Split Showcase
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/splitImage" className="sub_menu--link">
                                        Split Image
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/fullImageReveal" className="sub_menu--link">
                                        Full Image Reveal
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/motionRevealSlidesShow" className="sub_menu--link">
                                        Motion Reveal SlidesShow
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/imageSlider" className="sub_menu--link">
                                        Image Slider Sample
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/freewall" className="sub_menu--link">
                                        Freewall
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/working/pageFlipLayout" className="sub_menu--link">
                                        Page Flip Layout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/savedCourses" className="menu--link menu--label" title="Saved Courses">
                                <i className="uil uil-heart-alt menu--icon"></i>
                                <span>Saved Courses</span>
                            </NavLink>
                        </li>
                        <li className="menu--item menu--item__has_sub_menu">
                            <label className="menu--link menu--label" title="Pages">
                                <i className="uil uil-file menu--icon"></i>
                                <span>Pages</span>
                            </label>
                            <ul className="sub_menu">
                                <li className="sub_menu--item">
                                    <Link to="/about" className="sub_menu--link">
                                        About
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/cardSamples" className="sub_menu--link">
                                        Cards
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/signIn" className="sub_menu--link">
                                        Sign In
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/signUp" className="sub_menu--link">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/signUpSteps" className="sub_menu--link">
                                        Sign Up Steps
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/paidMembership" className="sub_menu--link">
                                        Paid Membership
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/coursDetails/12345" className="sub_menu--link">
                                        Course Detail View
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/checkoutMembership" className="sub_menu--link">
                                        Checkout
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/invoice" className="sub_menu--link">
                                        Invoice
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="about/career" className="sub_menu--link">
                                        Career
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/applyJob/1111" className="sub_menu--link">
                                        Job Apply
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="about/ourBlog" className="sub_menu--link">
                                        Our Blog
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/blogSingleView" className="sub_menu--link">
                                        Blog Detail View
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/companyDetails" className="sub_menu--link">
                                        Company Details
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/press" className="sub_menu--link">
                                        Press
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/liveStream/output/12345" className="sub_menu--link">
                                        Live Stream View
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/liveStream/add" className="sub_menu--link">
                                        Add live Stream
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/searchResult" className="sub_menu--link">
                                        Search Result
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/thankyou" className="sub_menu--link">
                                        Thank You
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/commingSoon" className="sub_menu--link">
                                        Coming Soon
                                    </Link>
                                </li>
                                <li className="sub_menu--item">
                                    <Link to="/error404" className="sub_menu--link">
                                        Error 404
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="left_section">
                    <h6 className="left_title">SUBSCRIPTIONS</h6>
                    <ul>
                        <li className="menu--item">
                            <NavLink to={`/instructorProfile/view/${12345}`} className="menu--link user_img">
                                <img src={IMAGES.avatar_instructor_0} alt="" />
                                Rock Smith
                                <div className="alrt_dot"></div>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to={`/instructorProfile/view/${54321}`} className="menu--link user_img">
                                <img src={`./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`} alt="" />
                                Jassica William
                                <div className="alrt_dot"></div>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to={`/instructorProfile/view/${342}`} className="menu--link user_img">
                                <img src={`./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`} alt="" />
                                Sukhwinder Singh
                                <div className="alrt_dot"></div>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to={`/instructorProfile/view/${7445}`} className="menu--link user_img">
                                <img src={`./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`} alt="" />
                                Neha Smith
                                <div className="alrt_dot"></div>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to={`/instructorProfile/view/${6666}`} className="menu--link user_img">
                                <img src={`./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`} alt="" />
                                Saloni Prabhakar
                                <div className="alrt_dot"></div>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/instructorProfile/all" className="menu--link menu--label" title="Browse Instructors">
                                <i className="uil uil-plus-circle menu--icon"></i>
                                <span>Browse Instructors</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="left_section pt-2">
                    <ul>
                        <li className="menu--item">
                            <NavLink to="/settings" className="menu--link menu--label" title="Setting">
                                <i className="uil uil-cog menu--icon"></i>
                                <span>Setting</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/help" className="menu--link menu--label" title="Help">
                                <i className="uil uil-question-circle menu--icon"></i>
                                <span>Help</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/reportHistory" className="menu--link menu--label" title="Report History">
                                <i className="uil uil-windsock menu--icon"></i>
                                <span>Report History</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="/feedback" className="menu--link menu--label" title="Send Feedback">
                                <i className="uil uil-comment-alt-exclamation menu--icon"></i>
                                <span>Send Feedback</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="left_footer">
                    <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/about/press">Press</Link>
                        </li>
                        <li>
                            <Link to="/contactUs">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/commingSoon">Advertise</Link>
                        </li>
                        <li>
                            <Link to="/commingSoon">Developers</Link>
                        </li>
                        <li>
                            <Link to="/termsOfUse">Copyright</Link>
                        </li>
                        <li>
                            <Link to="/termsOfUse">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/termsOfUse">Terms</Link>
                        </li>
                    </ul>
                    <div className="left_footer_content">
                        <p>
                            © 2020 <strong>Cursus</strong>. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppLeftsideBar;
