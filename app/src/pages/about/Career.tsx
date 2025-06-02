import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants';
import { useEffect } from 'react';
import { generateRandomNumber } from '../../helpers/helpers';

const Career = () => {
    useEffect(() => {
        const carouselOptions = {
            loop: true,
            nav: true,
            dots: false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
        };

        // features Careers
        ($('.feature_careers') as any).owlCarousel({
            ...carouselOptions,
            items: 4,
            margin: 20,
            responsive: {
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 },
                1200: { items: 1 },
                1400: { items: 1 },
            },
        });
    });
    return (
        <>
            <div className="_215zd5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="story125">
                                <iframe
                                    src="https://www.youtube.com/embed/TKnufs85hXk"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="test"
                                ></iframe>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="title484">
                                <h2>Working at Cursus</h2>
                                <img className="line-title" src={IMAGES.line} alt="" />
                                <p>
                                    Phasellus ex mauris, rhoncus quis posuere sit amet, ultricies nec lorem. Vivamus vestibulum
                                    porta urna, in placerat lectus facilisis sit amet. Vestibulum non mauris augue. Maecenas arcu
                                    magna, aliquam imperdiet tempor nec, lobortis ac erat. Aliquam vel magna tortor. Cras ornare,
                                    enim eu tristique tristique, orci nisl blandit mi, at dignissim velit leo nec metus.
                                </p>
                                <a href="#cr458" className="joblink">
                                    Check Out Our Open Roles
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_215td5">
                <div className="container">
                    <div className="branches_all">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section3125">
                                    <div className="la5lo1">
                                        <div className="owl-carousel feature_careers owl-theme">
                                            <div className="item">
                                                <div className="career_item">
                                                    <div className="career_item_img">
                                                        <img
                                                            src={`../assets/images/test/avatar_instructor/${generateRandomNumber(
                                                                1,
                                                                25
                                                            )}.jpg`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h4>We are learners</h4>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim
                                                        in turpis consequat tempor sed id neque. Nam at felis et elit auctor
                                                        accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac
                                                        sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a,
                                                        vulputate ligula.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="career_item">
                                                    <div className="career_item_img">
                                                        <img
                                                            src={`../assets/images/test/avatar_instructor/${generateRandomNumber(
                                                                1,
                                                                25
                                                            )}.jpg`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h4>We are navigators</h4>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim
                                                        in turpis consequat tempor sed id neque. Nam at felis et elit auctor
                                                        accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac
                                                        sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a,
                                                        vulputate ligula.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="career_item">
                                                    <div className="career_item_img">
                                                        <img
                                                            src={`../assets/images/test/avatar_instructor/${generateRandomNumber(
                                                                1,
                                                                25
                                                            )}.jpg`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h4>We are global</h4>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim
                                                        in turpis consequat tempor sed id neque. Nam at felis et elit auctor
                                                        accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac
                                                        sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a,
                                                        vulputate ligula.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="career_item">
                                                    <div className="career_item_img">
                                                        <img
                                                            src={`../assets/images/test/avatar_instructor/${generateRandomNumber(
                                                                1,
                                                                25
                                                            )}.jpg`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h4>We make an impact</h4>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim
                                                        in turpis consequat tempor sed id neque. Nam at felis et elit auctor
                                                        accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac
                                                        sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a,
                                                        vulputate ligula.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_215zd5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title589 text-center">
                                <h2>Benefits</h2>
                                <p>
                                    Cursus culture is something special, and to complement and support that culture we have some
                                    amazing benefits.
                                </p>
                                <img className="line-title" src={IMAGES.line} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-location-pin-alt"></i>
                                <h4>Work from anywhere</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-plane-departure"></i>
                                <h4>Work and Travel</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-adjust-half"></i>
                                <h4>Flexible Hours</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-kid"></i>
                                <h4>Purchasing Leave</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-rss-interface"></i>
                                <h4>Social Events</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-flower"></i>
                                <h4>Wellness Program</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-feedback"></i>
                                <h4>Mentoring Program</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3  col-sm-6">
                            <div className="feature125">
                                <i className="uil uil-anchor"></i>
                                <h4>Fundraising</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat
                                    tempor sed id neque. Nam at felis et elit auctor accumsan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_215td5" id="cr458">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title589 mb-20 text-center">
                                <h2>Open Roles</h2>
                                <p>
                                    Cursus is a fast growing company and we're expanding both our Punjab office and international
                                    offices.
                                </p>
                                <img className="line-title" src={IMAGES.line} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="apply_job_link mt-30">
                                <h4>Algorithm Engineer</h4>
                                <span>India</span>
                                <div className="apply_job_link_right">
                                    <Link to="/applyJob/1111" className="career_lnk5">
                                        Learn More and Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="apply_job_link mt-30">
                                <h4>Chief Technology Officer</h4>
                                <span>India</span>
                                <div className="apply_job_link_right">
                                    <Link to="/applyJob/2222" className="career_lnk5">
                                        Learn More and Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="apply_job_link mt-30">
                                <h4>Customer Growth & Marketing Analyst</h4>
                                <span>India</span>
                                <div className="apply_job_link_right">
                                    <Link to="/applyJob/3333" className="career_lnk5">
                                        Learn More and Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="apply_job_link mt-30">
                                <h4>Data Engineer</h4>
                                <span>India</span>
                                <div className="apply_job_link_right">
                                    <Link to="/applyJob/4444" className="career_lnk5">
                                        Learn More and Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="apply_job_link mt-30">
                                <h4>iOS Developer - Edututs+ San Francisco, CA</h4>
                                <span>San Francisco, CA</span>
                                <div className="apply_job_link_right">
                                    <Link to="/applyJob/5555" className="career_lnk5">
                                        Learn More and Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="apply_job_link mt-30">
                                <h4>Senior UX Designer</h4>
                                <span>India</span>
                                <div className="apply_job_link_right">
                                    <Link to="/applyJob/6666" className="career_lnk5">
                                        Learn More and Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Career;
