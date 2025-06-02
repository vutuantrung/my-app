import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PageLeftsideBar = () => {
    return (
        <nav className="vertical_nav">
            <div className="left_section menu_left" id="js-menu">
                <div className="left_section">
                    <ul>
                        <li className="menu--item">
                            <NavLink to="dashboard" className="menu--link menu--label" title="Dashboard">
                                <i className="uil uil-apps menu--icon"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="courses" className="menu--link menu--label" title="Courses">
                                <i className="uil uil-book-alt menu--icon"></i>
                                <span className="menu--label">Courses</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="analyics" className="menu--link menu--label" title="Analyics">
                                <i className="uil uil-analysis menu--icon"></i>
                                <span className="menu--label">Analyics</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="createCourse" className="menu--link menu--label" title="Create Course">
                                <i className="uil uil-plus-circle menu--icon"></i>
                                <span className="menu--label">Create Course</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="messages" className="menu--link menu--label" title="Messages">
                                <i className="uil uil-comments menu--icon"></i>
                                <span className="menu--label">Messages</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="notifications" className="menu--link menu--label" title="Notifications">
                                <i className="uil uil-bell menu--icon"></i>
                                <span className="menu--label">Notifications</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="certificates" className="menu--link menu--label" title="My Certificates">
                                <i className="uil uil-award menu--icon"></i>
                                <span className="menu--label">My Certificates</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="reviews" className="menu--link menu--label" title="Reviews">
                                <i className="uil uil-star menu--icon"></i>
                                <span className="menu--label">Reviews</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="earning" className="menu--link menu--label" title="Earning">
                                <i className="uil uil-dollar-sign menu--icon"></i>
                                <span className="menu--label">Earning</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="payout" className="menu--link menu--label" title="Payout">
                                <i className="uil uil-wallet menu--icon"></i>
                                <span className="menu--label">Payout</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="statement" className="menu--link menu--label" title="Statements">
                                <i className="uil uil-file-alt menu--icon"></i>
                                <span className="menu--label">Statements</span>
                            </NavLink>
                        </li>
                        <li className="menu--item">
                            <NavLink to="verification" className="menu--link menu--label" title="Verification">
                                <i className="uil uil-check-circle menu--icon"></i>
                                <span className="menu--label">Verification</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="left_section pt-2">
                    <ul>
                        <li className="menu--item menu--link">
                            <Link to="/settings">
                                <i className="uil uil-cog menu--icon"></i>
                                <span>Setting</span>
                            </Link>
                        </li>
                        <li className="menu--item menu--link">
                            <Link to="/feedback">
                                <i className="uil uil-comment-alt-exclamation menu--icon"></i>
                                <span>Send Feedback</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default PageLeftsideBar;
