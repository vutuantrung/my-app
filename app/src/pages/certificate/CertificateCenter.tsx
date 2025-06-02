import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants';
import PageHeader from '../../Layouts/PageHeader';
import AppFooter from '../../Layouts/AppFooter';

const CertificateCenter = () => {
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
    }, []);
    return (
        <>
            <PageHeader />
            <div className="wrapper _bg4586 _new89 app-footer-padding">
                <div className="_215certibg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cert_banner_text">
                                    <h1>Certification Center</h1>
                                    <p>For Students and Instructors</p>
                                    <ul className="certi_icons">
                                        <li>
                                            <a href="#" className="edttslogo">
                                                <img src={IMAGES.logo1} alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <div className="edttsplus">
                                                <img src={IMAGES.plus} alt="" />
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#" className="edttslogo1">
                                                <img src={IMAGES.certicon} alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                    <Link to="/certificateStartForm">
                                        <button className="certi-btn">Start Certification</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="_215xd5">
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="title889">
                                        <h2>Find Certificate</h2>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="ui search focus mt-30">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input
                                                className="prompt srch_explore"
                                                type="text"
                                                name="cerificate[number]"
                                                value=""
                                                id="id_cerificate[number]"
                                                required
                                                maxLength={10}
                                                placeholder="# Number"
                                                onChange={() => {}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="ui search focus mt-30">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input
                                                className="prompt srch_explore"
                                                type="text"
                                                name="fullname"
                                                value=""
                                                id="id_fullname"
                                                required
                                                maxLength={64}
                                                placeholder="Full Name"
                                                onChange={() => {}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <select className="ui hj145 dropdown cntry152 prompt srch_explore mt-30">
                                        <option value="">Select Category</option>
                                        <option value="1">Development</option>
                                        <option value="2">Finance & Accounting</option>
                                        <option value="3">Design</option>
                                        <option value="4">Marketing</option>
                                        <option value="5">Teaching & Academics</option>
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <button className="login-btn" type="submit">
                                        Find Certificate
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="_215td5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title589">
                                    <h2>Our Certification</h2>
                                    <p>We prepared tests for the most popular categories and get cerificate</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="catey-tabs">
                                    <ul className="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                id="pills-development-tab"
                                                data-toggle="pill"
                                                href="#pills-development"
                                                role="tab"
                                                aria-controls="pills-development"
                                                aria-selected="true"
                                            >
                                                Development
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="pills-accounting-tab"
                                                data-toggle="pill"
                                                href="#pills-accounting"
                                                role="tab"
                                                aria-controls="pills-accounting"
                                                aria-selected="false"
                                            >
                                                Finance & Accounting
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="pills-design-tab"
                                                data-toggle="pill"
                                                href="#pills-design"
                                                role="tab"
                                                aria-controls="pills-design"
                                                aria-selected="false"
                                            >
                                                Design
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="pills-marketing-tab"
                                                data-toggle="pill"
                                                href="#pills-marketing"
                                                role="tab"
                                                aria-controls="pills-marketing"
                                                aria-selected="false"
                                            >
                                                Marketing
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="pills-teaching-tab"
                                                data-toggle="pill"
                                                href="#pills-teaching"
                                                role="tab"
                                                aria-controls="pills-teaching"
                                                aria-selected="false"
                                            >
                                                Teaching & Academics
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-development"
                                            role="tabpanel"
                                            aria-labelledby="pills-development-tab"
                                        >
                                            <div className="certicates">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            WordPress
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            HTML CSS
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            MotoCMS 3
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Joomla
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            OpenCart
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Joomla Pro
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            WordPress Pro
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            WordPress Elementor
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            WordPress Elementor Pro
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            PrestaShop
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-accounting"
                                            role="tabpanel"
                                            aria-labelledby="pills-accounting-tab"
                                        >
                                            <div className="certicates">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Accounting
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Finance Fundamentals
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Bookkeeping
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Political Science
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Finance
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Cryptocurrency
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-design"
                                            role="tabpanel"
                                            aria-labelledby="pills-design-tab"
                                        >
                                            <div className="certicates">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Adobe Photoshop
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Adobe Illustrator
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Adobe After Effects
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Adobe InDesign
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Unity
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Drawing
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Game Development Fundamentals
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            3D Modeling
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Motion Graphics
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            2D Animation
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            T-Shirt Design
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-marketing"
                                            role="tabpanel"
                                            aria-labelledby="pills-marketing-tab"
                                        >
                                            <div className="certicates">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Google Ads (Adwords)
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Google Ads (AdWords) Certification
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Social Marketing
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Email Marketing
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Business Strategy
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            SEO
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            PPC Advertising
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Blogging
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-teaching"
                                            role="tabpanel"
                                            aria-labelledby="pills-teaching-tab"
                                        >
                                            <div className="certicates">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Math
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Humanities
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Engineering
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Science
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Social Science
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            English Language
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            German Language
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Sign Language
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            IELTS
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            French Language
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            Spanish Language
                                                        </a>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <a href="#" className="certilink__152">
                                                            English Grammar
                                                        </a>
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
                <div className="_485td5">
                    <div className="container">
                        <div className="row justify-content-lg-center justify-content-md-center">
                            <div className="col-lg-12">
                                <div className="titleceti89">
                                    <h2>Who Can Get Benefit From This?</h2>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-6">
                                <div className="who_get">
                                    <div className="who_img">
                                        <img src="images/cerificate_center/student.svg" alt="" />
                                    </div>
                                    <h4>Students</h4>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-6">
                                <div className="who_get">
                                    <div className="who_img">
                                        <img src="images/cerificate_center/instructor.svg" alt="" />
                                    </div>
                                    <h4>Instructor</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="_215td5">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-lg-12">
                                <div className="title589">
                                    <h2>What Will You Get?</h2>
                                    <p>Cursus company, which confirms your skills and knowledge of Certification</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="knowledge_dts">
                                    <p>
                                        Morbi eget elit eget turpis varius mollis eget vel massa. Donec porttitor, sapien eget
                                        commodo vulputate, erat felis aliquam dolor, non condimentum libero dolor vel ipsum. Sed
                                        porttitor nisi eget nulla ullamcorper eleifend. Fusce tristique sapien nisi, vel feugiat
                                        neque luctus sit amet. Quisque consequat quis turpis in mattis. Maecenas eget mollis nisl.
                                        Cras porta dapibus est, quis malesuada ex iaculis at. Vestibulum egestas tortor in urna
                                        tempor, in fermentum lectus bibendum. In leo leo, bibendum at pharetra at, tincidunt in
                                        nulla. In vel malesuada nulla, sed tincidunt neque. Phasellus at massa vel sem aliquet
                                        sodales non in magna. Ut tempus ipsum sagittis neque cursus euismod. Vivamus luctus
                                        elementum tortor, ac aliquet dolor vehicula et. Nulla vehicula pharetra lacus ornare
                                        gravida. Vivamus mollis ullamcorper dui quis gravida. Aenean pulvinar pulvinar arcu a
                                        suscipit.
                                    </p>
                                    <button className="knowledge_btn" onClick={() => "window.location.href = '#';"}>
                                        Knowledge Base
                                    </button>
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

export default CertificateCenter;
