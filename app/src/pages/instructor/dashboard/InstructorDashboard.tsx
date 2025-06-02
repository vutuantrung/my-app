import { Link } from 'react-router-dom';
import { IMAGES } from '../../../constants';
import { useEffect } from 'react';
import PageFooter from '../../../Layouts/PageFooter';

const InstructorDashboard = () => {
    useEffect(() => {
        // Featured Courses home
        ($('.courses_performance') as any).owlCarousel({
            items: 10,
            loop: false,
            margin: 30,
            nav: true,
            dots: false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
                1200: {
                    items: 1,
                },
                1400: {
                    items: 1,
                },
            },
        });

        // Latest News Dashboard
        ($('.edututs_news') as any).owlCarousel({
            items: 10,
            loop: false,
            margin: 30,
            nav: true,
            dots: false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
                1200: {
                    items: 1,
                },
                1400: {
                    items: 1,
                },
            },
        });
    }, []);
    return (
        <div>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-apps"></i> Instructor Dashboard
                            </h2>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card_dash">
                                <div className="card_dash_left">
                                    <h5>Total Sales</h5>
                                    <h2>$350</h2>
                                    <span className="crdbg_1">New $50</span>
                                </div>
                                <div className="card_dash_right">
                                    <img src="images/dashboard/achievement.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card_dash">
                                <div className="card_dash_left">
                                    <h5>Total Enroll</h5>
                                    <h2>1500</h2>
                                    <span className="crdbg_2">New 125</span>
                                </div>
                                <div className="card_dash_right">
                                    <img src="images/dashboard/graduation-cap.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card_dash">
                                <div className="card_dash_left">
                                    <h5>Total Courses</h5>
                                    <h2>130</h2>
                                    <span className="crdbg_3">New 5</span>
                                </div>
                                <div className="card_dash_right">
                                    <img src="images/dashboard/online-course.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card_dash">
                                <div className="card_dash_left">
                                    <h5>Total Students</h5>
                                    <h2>2650</h2>
                                    <span className="crdbg_4">New 245</span>
                                </div>
                                <div className="card_dash_right">
                                    <img src="images/dashboard/knowledge.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card_dash1">
                                <div className="card_dash_left1">
                                    <i className="uil uil-book-alt"></i>
                                    <h1>Jump Into Course Creation</h1>
                                </div>
                                <div className="card_dash_right1">
                                    <Link to="/createNewCourse">
                                        <button className="create_btn_dash">Create Your Course</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="section3125 mt-50">
                                <h4 className="item_title">Latest Courses performance</h4>
                                <div className="la5lo1">
                                    <div className="owl-carousel courses_performance owl-theme">
                                        <div className="item">
                                            <div className="fcrse_1">
                                                <a href="#" className="fcrse_img">
                                                    <img src={IMAGES.img_cours_sample_0} alt="" />
                                                    <div className="course-overlay"></div>
                                                </a>
                                                <div className="fcrse_content">
                                                    <div className="vdtodt">
                                                        <span className="vdt14">First 2 days 22 hours</span>
                                                    </div>
                                                    <a href="#" className="crsedt145">
                                                        Complete Python Bootcamp: Go from zero to hero in Python 3
                                                    </a>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">View</div>
                                                        <div className="crse-perf-right">1.5k</div>
                                                    </div>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">Purchased</div>
                                                        <div className="crse-perf-right">150</div>
                                                    </div>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">Total Like</div>
                                                        <div className="crse-perf-right">1k</div>
                                                    </div>
                                                    <div className="auth1lnkprce">
                                                        <a href="#" className="cr1fot50">
                                                            Go to course analytics
                                                        </a>
                                                        <a href="#" className="cr1fot50">
                                                            See comments (875)
                                                        </a>
                                                        <a href="#" className="cr1fot50">
                                                            See Reviews (105)
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="fcrse_1">
                                                <a href="#" className="fcrse_img">
                                                    <img src={IMAGES.img_cours_sample_0} alt="" />
                                                    <div className="course-overlay"></div>
                                                </a>
                                                <div className="fcrse_content">
                                                    <div className="vdtodt">
                                                        <span className="vdt14">Second 4 days 9 hours</span>
                                                    </div>
                                                    <a href="#" className="crse14s">
                                                        The Complete JavaScript Course 2020: Build Real Projects!
                                                    </a>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">View</div>
                                                        <div className="crse-perf-right">175k</div>
                                                    </div>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">Purchased</div>
                                                        <div className="crse-perf-right">1k</div>
                                                    </div>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">Total Like</div>
                                                        <div className="crse-perf-right">85k</div>
                                                    </div>
                                                    <div className="auth1lnkprce">
                                                        <a href="#" className="cr1fot50">
                                                            Go to course analytics
                                                        </a>
                                                        <a href="#" className="cr1fot50">
                                                            See comments (915)
                                                        </a>
                                                        <a href="#" className="cr1fot50">
                                                            See Reviews (255)
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="fcrse_1">
                                                <a href="#" className="fcrse_img">
                                                    <img src={IMAGES.img_cours_sample_1} alt="" />
                                                    <div className="course-overlay"></div>
                                                </a>
                                                <div className="fcrse_content">
                                                    <div className="vdtodt">
                                                        <span className="vdt14">Third 6 days 11 hours:</span>
                                                    </div>
                                                    <a href="#" className="crse14s">
                                                        Beginning C++ Programming - From Beginner to Beyond
                                                    </a>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">View</div>
                                                        <div className="crse-perf-right">17k</div>
                                                    </div>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">Purchased</div>
                                                        <div className="crse-perf-right">25</div>
                                                    </div>
                                                    <div className="allvperf">
                                                        <div className="crse-perf-left">Total Like</div>
                                                        <div className="crse-perf-right">15k</div>
                                                    </div>
                                                    <div className="auth1lnkprce">
                                                        <a href="#" className="cr1fot50">
                                                            Go to course analytics
                                                        </a>
                                                        <a href="#" className="cr1fot50">
                                                            See comments (155)
                                                        </a>
                                                        <a href="#" className="cr1fot50">
                                                            See Reviews (15)
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="section3125 mt-50">
                                <h4 className="item_title">News</h4>
                                <div className="la5lo1">
                                    <div className="owl-carousel edututs_news owl-theme">
                                        <div className="item">
                                            <div className="fcrse_1">
                                                <a href="#" className="fcrse_img">
                                                    <img src={IMAGES.img_cours_sample_1} alt="" />
                                                </a>
                                                <div className="fcrse_content">
                                                    <a href="#" className="crsedt145 mt-15">
                                                        COVID-19 Updates & Resources
                                                    </a>
                                                    <p className="news_des45">
                                                        See the latest updates to coronavirus-related content, including changes
                                                        to monetization, and access new Creator support resources
                                                    </p>
                                                    <div className="auth1lnkprce">
                                                        <a href="#" className="cr1fot50">
                                                            Learn More
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="fcrse_1">
                                                <a href="#" className="fcrse_img">
                                                    <img src={IMAGES.img_cours_sample_1} alt="" />
                                                </a>
                                                <div className="fcrse_content">
                                                    <a href="#" className="crsedt145 mt-15">
                                                        Watch: Edututs+ interview Mr. Joginder
                                                    </a>
                                                    <p className="news_des45">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
                                                        eleifend ante. Duis ac pulvinar felis. Sed a nibh ligula. Mauris eget
                                                        tortor id mauris tristique accumsan.
                                                    </p>
                                                    <div className="auth1lnkprce">
                                                        <a href="#" className="cr1fot50">
                                                            Watch Now
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="fcrse_1">
                                                <a href="#" className="fcrse_img">
                                                    <img src={IMAGES.img_cours_sample_1} alt="" />
                                                </a>
                                                <div className="fcrse_content">
                                                    <a href="#" className="crsedt145 mt-15">
                                                        COVID-19 Updates - April 7
                                                    </a>
                                                    <p className="news_des45">
                                                        Ut porttitor mi vel orci cursus, nec elementum neque malesuada. Phasellus
                                                        imperdiet quam gravida pharetra aliquet. Integer vel ligula eget nisl
                                                        dignissim hendrerit.
                                                    </p>
                                                    <div className="auth1lnkprce">
                                                        <a href="#" className="cr1fot50">
                                                            Learn More
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="section3125 mt-50">
                                <h4 className="item_title">Profile Analytics</h4>
                                <div className="la5lo1">
                                    <div className="fcrse_1">
                                        <div className="fcrse_content">
                                            <h6 className="crsedt8145">Current subscribers</h6>
                                            <h3 className="subcribe_title">856</h3>
                                            <div className="allvperf">
                                                <div className="crse-perf-left">View</div>
                                                <div className="crse-perf-right">
                                                    17k
                                                    <span className="analyics_pr">
                                                        <i className="uil uil-arrow-to-bottom"></i>75%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="allvperf">
                                                <div className="crse-perf-left">
                                                    Purchased<span className="per_text">(per hour)</span>
                                                </div>
                                                <div className="crse-perf-right">
                                                    1
                                                    <span className="analyics_pr">
                                                        <i className="uil uil-top-arrow-from-top"></i>100%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="allvperf">
                                                <div className="crse-perf-left">
                                                    Enroll<span className="per_text">(per hour)</span>
                                                </div>
                                                <div className="crse-perf-right">
                                                    50
                                                    <span className="analyics_pr">
                                                        <i className="uil uil-top-arrow-from-top"></i>70%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="auth1lnkprce">
                                                <a href="#" className="cr1fot50">
                                                    Go to profile analytics
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section3125 mt-50">
                                <h4 className="item_title">Submit Courses</h4>
                                <div className="la5lo1">
                                    <div className="fcrse_1">
                                        <div className="fcrse_content">
                                            <div className="upcming_card">
                                                <a href="#" className="crsedt145">
                                                    The Complete JavaScript Course 2020: Build Real Projects!
                                                    <span className="pndng_145">Pending</span>
                                                </a>
                                                <p className="submit-course">
                                                    Submitted<span>1 days ago</span>
                                                </p>
                                                <a href="#" className="delete_link10">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section3125 mt-50">
                                <h4 className="item_title">What's new in Edututs+</h4>
                                <div className="la5lo1">
                                    <div className="fcrse_1">
                                        <div className="fcrse_content">
                                            <a href="#" className="new_links10">
                                                Improved performance on Studio Dashboard
                                            </a>
                                            <a href="#" className="new_links10">
                                                See more Dashboard updates
                                            </a>
                                            <a href="#" className="new_links10">
                                                See issues-at-glance for Live
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
};

export default InstructorDashboard;
