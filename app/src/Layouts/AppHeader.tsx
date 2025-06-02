import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { CATEGORIES, IMAGES } from '../constants';

const AppHeader = () => {
    const night_mode_switch = useRef<HTMLAnchorElement>(null);
    const onNightModeSwitch = (event: Event) => {
        event.preventDefault();
        document.documentElement.classList.toggle('night-mode');
        if (document.documentElement.classList.contains('night-mode')) {
            localStorage.setItem('gmtNightMode', 'true');
            return;
        }
        localStorage.removeItem('gmtNightMode');
    };

    useEffect(() => {
        ($('.ui.dropdown') as any).dropdown();
        // === Model === //
        ($('.ui.modal') as any).modal({ blurring: true }).modal('show');
        // === Tab === //
        ($('.menu .item') as any).tab();
        // === checkbox Toggle === //
        ($('.ui.checkbox') as any).checkbox();
        // === Toggle === //
        $('.enable.button').on('click', function () {
            ($(this).nextAll('.checkbox') as any).checkbox('enable');
        });

        if (night_mode_switch.current) {
            night_mode_switch.current.addEventListener('click', onNightModeSwitch);
        }
    }, []);

    return (
        <header className="header clearfix">
            <button type="button" id="toggleMenu" className="toggle_menu">
                <i className="uil uil-bars"></i>
            </button>
            <button id="collapse_menu" className="collapse_menu">
                <i className="uil uil-bars collapse_menu--icon "></i>
                <span className="collapse_menu--label"></span>
            </button>
            <div className="main_logo" id="logo">
                <Link to="/">
                    <img src={IMAGES.logo} alt="Logo" />
                </Link>
                <Link to="/">
                    <img className="logo-inverse" src={IMAGES.ct_logo} alt="Logo" />
                </Link>
            </div>
            <div className="top-category">
                <div className="ui compact cate-dpdwn cate-wrapper">
                    <div className="ui simple dropdown item">
                        <div className="option_links p-0" title="categories">
                            <i className="uil uil-apps"></i>
                        </div>
                        <div className="menu dropdown_category5">
                            {CATEGORIES.map((item) => {
                                return (
                                    <a key={item.name} href={item.link} className="item channel_item">
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="search120">
                <div className="ui search">
                    <div className="ui left icon input swdh10">
                        <input
                            className="prompt srch10"
                            type="text"
                            placeholder="Search for Tuts Videos, Tutors, Tests and more.."
                        />
                        <i className="uil uil-search-alt icon icon1"></i>
                    </div>
                </div>
            </div>
            <div className="header_right">
                <ul>
                    <li>
                        <Link to="/instructor/createCourse">
                            <div className="upload_btn" title="Create New Course">
                                Create New Course
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/shoppingCart" className="option_links" title="Cart">
                            <i className="uil uil-shopping-cart-alt"></i>
                            <span className="noti_count">2</span>
                        </Link>
                    </li>
                    <li className="ui dropdown">
                        <a href="##" className="option_links" title="Messages">
                            <i className="uil uil-envelope-alt"></i>
                            <span className="noti_count">4</span>
                        </a>
                        <div className="menu dropdown_ms">
                            <a href="#" className="channel_my item">
                                <div className="profile_link">
                                    <img src={IMAGES.img_6} alt="" />
                                    <div className="pd_content">
                                        <h6>Zoena Singh</h6>
                                        <p>Hi! Sir, How are you. I ask you one thing please explain it this video price.</p>
                                        <span className="nm_time">2 min ago</span>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="channel_my item">
                                <div className="profile_link">
                                    <img src={IMAGES.img_5} alt="" />
                                    <div className="pd_content">
                                        <h6>Joy Dua</h6>
                                        <p>Hello, I paid you video tutorial but did not play error 404.</p>
                                        <span className="nm_time">10 min ago</span>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="channel_my item">
                                <div className="profile_link">
                                    <img src={IMAGES.img_8} alt="" />
                                    <div className="pd_content">
                                        <h6>Jass</h6>
                                        <p>Thanks Sir, Such a nice video.</p>
                                        <span className="nm_time">25 min ago</span>
                                    </div>
                                </div>
                            </a>
                            <Link to="/instructor/messages">
                                <div className="vbm_btn">
                                    View All <i className="uil uil-arrow-right"></i>
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className="ui dropdown">
                        <a href="##" className="option_links" title="Notifications">
                            <i className="uil uil-bell"></i>
                            <span className="noti_count">3</span>
                        </a>
                        <div className="menu dropdown_mn">
                            <a href="#" className="channel_my item">
                                <div className="profile_link">
                                    <img src={IMAGES.img_1} alt="" />
                                    <div className="pd_content">
                                        <h6>Rock William</h6>
                                        <p>
                                            Like Your Comment On Video <strong>How to create sidebar menu</strong>.
                                        </p>
                                        <span className="nm_time">2 min ago</span>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="channel_my item">
                                <div className="profile_link">
                                    <img src={IMAGES.img_2} alt="" />
                                    <div className="pd_content">
                                        <h6>Jassica Smith</h6>
                                        <p>
                                            Added New Review In Video <strong>Full Stack PHP Developer</strong>.
                                        </p>
                                        <span className="nm_time">12 min ago</span>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="channel_my item">
                                <div className="profile_link">
                                    <img src={IMAGES.img_9} alt="" />
                                    <div className="pd_content">
                                        <p>
                                            {' '}
                                            Your Membership Approved <strong>Upload Video</strong>.
                                        </p>
                                        <span className="nm_time">20 min ago</span>
                                    </div>
                                </div>
                            </a>
                            <Link to="/instructor/notifications">
                                <div className="vbm_btn">
                                    View All <i className="uil uil-arrow-right"></i>
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className="ui dropdown">
                        <a href="#" className="opts_account" title="Account">
                            <img src={IMAGES.avatar} alt="" />
                        </a>
                        <div className="menu dropdown_account">
                            <div className="channel_my">
                                <div className="profile_link">
                                    <img src={IMAGES.avatar} alt="" />
                                    <div className="pd_content">
                                        <div className="rhte85">
                                            <h6>Joginder Singh</h6>
                                            <div className="mef78" title="Verify">
                                                <i className="uil uil-check-circle"></i>
                                            </div>
                                        </div>
                                        <span>gambol943@gmail.com</span>
                                    </div>
                                </div>
                                <Link to="/myInstructorProfile" className="dp_link_12">
                                    View Instructor Profile
                                </Link>
                            </div>
                            <div className="night_mode_switch__btn">
                                <a href="###" id="night-mode" className="btn-night-mode" ref={night_mode_switch}>
                                    <i className="uil uil-moon" style={{ display: 'flex' }}></i> Night mode
                                    <span className="btn-night-mode-switch">
                                        <span className="uk-switch-button"></span>
                                    </span>
                                </a>
                            </div>
                            <Link to="/instructor/dashboard" className="item channel_item">
                                Cursus dashboard
                            </Link>
                            <Link to="/paidMembership" className="item channel_item">
                                Paid Memberships
                            </Link>
                            <Link to="/settings" className="item channel_item">
                                Setting
                            </Link>
                            <Link to="/help" className="item channel_item">
                                Help
                            </Link>
                            <Link to="/feedback" className="item channel_item">
                                Send Feedback
                            </Link>
                            <Link to="/signIn" className="item channel_item">
                                Sign Out
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default AppHeader;
