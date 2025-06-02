import { Link } from 'react-router-dom';
import { NavLink, Route, Routes } from 'react-router-dom';

import { IMAGES } from '../../../constants';
import AboutMe from './AboutMe';
import Discussions from './Discussions';
import MyCourses from './MyCourses';
import PurchasedCourses from './PurchasedCourses';
import Subscriptions from './Subscriptions';
import AppFooter from '../../../Layouts/AppFooter';

const Body = () => {
    return (
        <>
            {/* <!-- Profile --> */}
            <div className="_216b01">
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-md-10">
                            <div className="section3125 rpt145">
                                <div className="row">
                                    <div className="col-lg-7">
                                        {/* <a href="#" className="_216b22">
                                            <span>
                                                <i className="uil uil-cog"></i>
                                            </span>
                                            Setting
                                        </a> */}
                                        <div className="dp_dt150">
                                            <div className="img148">
                                                <img src={IMAGES.avatar} alt="" />
                                            </div>
                                            <div className="prfledt1">
                                                <h2>Joginder Singh</h2>
                                                <span>UI / UX Designer and Web Developer</span>
                                            </div>
                                        </div>
                                        <ul className="_ttl120">
                                            <li>
                                                <div className="_ttl121">
                                                    <div className="_ttl122">Enroll Students</div>
                                                    <div className="_ttl123">612K</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="_ttl121">
                                                    <div className="_ttl122">Courses</div>
                                                    <div className="_ttl123">8</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="_ttl121">
                                                    <div className="_ttl122">Reviews</div>
                                                    <div className="_ttl123">11K</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="_ttl121">
                                                    <div className="_ttl122">Subscriptions</div>
                                                    <div className="_ttl123">452K</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-5">
                                        <Link to="/settings" className="_216b12">
                                            <span>
                                                <i className="uil uil-cog"></i>
                                            </span>
                                            Setting
                                        </Link>
                                        <div className="rgt-145">
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
                                        <ul className="_bty149">
                                            <li>
                                                <Link to="/instructorDashboard">
                                                    <button className="studio-link-btn btn500">Cursus Studio</button>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/settings">
                                                    <button className="msg125 btn500">Edit</button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Nav-bar header --> */}
            <div className="_215b15">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="course_tabs">
                                <nav>
                                    <div className="nav nav-tabs tab_crse" id="nav-tab" role="tablist">
                                        <NavLink defaultValue={'aboutMe'} to="aboutMe" className="nav-item nav-link">
                                            About
                                        </NavLink>
                                        <NavLink to="discussions" className="nav-item nav-link">
                                            Discussion
                                        </NavLink>
                                        <NavLink to="myCourses" className="nav-item nav-link">
                                            Courses
                                        </NavLink>
                                        <NavLink to="purchasedCourses" className="nav-item nav-link">
                                            Purchased
                                        </NavLink>
                                        <NavLink to="subscriptions" className="nav-item nav-link">
                                            Subscriptions
                                        </NavLink>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Nav-bar content --> */}
            <div className="_215b17">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="course_tab_content">
                                <Routes>
                                    <Route path="" Component={AboutMe} />
                                    <Route path="aboutMe" Component={AboutMe} />
                                    <Route path="discussions" Component={Discussions} />
                                    <Route path="myCourses" Component={MyCourses} />
                                    <Route path="purchasedCourses" Component={PurchasedCourses} />
                                    <Route path="subscriptions" Component={Subscriptions} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Footer --> */}
            <AppFooter />
        </>
    );
};
export default Body;
