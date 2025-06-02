import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../../Layouts/PageHeader';
import AppFooter from '../../../Layouts/AppFooter';

const CertificateStartForm = () => {
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
                                                    <li className="breadcrumb-item">
                                                        <Link to="/certificateCenter">Certification Center</Link>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        Certification Fill Form
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="titleright">
                                        <a href="certification_center.html" className="blog_link">
                                            <i className="uil uil-angle-double-left"></i>Back to Certification Center
                                        </a>
                                    </div>
                                </div>
                                <div className="title126">
                                    <h2>Certification Fill Form</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faq1256">
                    <div className="container">
                        <div className="row justify-content-lg-center justify-content-md-center">
                            <div className="col-lg-6 col-md-8">
                                <div className="certi_form">
                                    <div className="sign_form">
                                        <h2>Fill in before you start:</h2>
                                        <form>
                                            <div className="ui search focus mt-40">
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
                                                    />
                                                </div>
                                            </div>
                                            <div className="ui search focus mt-15">
                                                <div className="ui left icon input swdh11 swdh19">
                                                    <input
                                                        className="prompt srch_explore"
                                                        type="email"
                                                        name="emailaddress"
                                                        value=""
                                                        id="id_email"
                                                        required
                                                        maxLength={64}
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="ui search focus mt-15">
                                                <div className="ui left icon input swdh11 swdh19">
                                                    <input
                                                        className="prompt srch_explore"
                                                        type="text"
                                                        name="phonenumber"
                                                        value=""
                                                        id="id_phonenumber"
                                                        required
                                                        maxLength={10}
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="category_cop">
                                                <h4>Select Category</h4>
                                                <div className="panel-groupaccordion" id="accordiontest">
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" id="headingOne">
                                                            <div className="panel-title10">
                                                                <a
                                                                    className="collapsed"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapseOne"
                                                                    href="#"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapseOne"
                                                                >
                                                                    Development
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="collapseOne"
                                                            className="panel-collapse collapse"
                                                            aria-labelledby="headingOne"
                                                            data-parent="#accordiontest"
                                                        >
                                                            <div className="panel-body">
                                                                <div className="ui form">
                                                                    <div className="grouped fields">
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>WordPress</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>HTML CSS</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Full Time</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>MotoCMS 3</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Joomla</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Full Time</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>OpenCart</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Joomla Pro</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>WordPress Pro</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>WordPress Elementor</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>WordPress Elementor Pro</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>PrestaShop</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" id="headingTwo">
                                                            <div className="panel-title10">
                                                                <a
                                                                    className="collapsed"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapseTwo"
                                                                    href="#"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapseTwo"
                                                                >
                                                                    Finance & Accounting
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="collapseTwo"
                                                            className="panel-collapse collapse"
                                                            aria-labelledby="headingTwo"
                                                            data-parent="#accordiontest"
                                                        >
                                                            <div className="panel-body">
                                                                <div className="ui form">
                                                                    <div className="grouped fields">
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Accounting</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Finance Fundamentals</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Bookkeeping</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Political Science</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Finance</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Cryptocurrency</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" id="headingThree">
                                                            <div className="panel-title10">
                                                                <a
                                                                    className="collapsed"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapseThree"
                                                                    href="#"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapseThree"
                                                                >
                                                                    Design
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="collapseThree"
                                                            className="panel-collapse collapse"
                                                            aria-labelledby="headingThree"
                                                            data-parent="#accordiontest"
                                                        >
                                                            <div className="panel-body">
                                                                <div className="ui form">
                                                                    <div className="grouped fields">
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Adobe Photoshop</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Adobe Illustrator</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Adobe After Effects</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Adobe InDesign</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Unity</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Drawing</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Game Development Fundamentals</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>3D Modeling</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Motion Graphics</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>2D Animation</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>T-Shirt Design</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" id="headingfour">
                                                            <div className="panel-title10">
                                                                <a
                                                                    className="collapsed"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapsefour"
                                                                    href="#"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapsefour"
                                                                >
                                                                    Marketing
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="collapsefour"
                                                            className="panel-collapse collapse"
                                                            aria-labelledby="headingfour"
                                                            data-parent="#accordiontest"
                                                        >
                                                            <div className="panel-body">
                                                                <div className="ui form">
                                                                    <div className="grouped fields">
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Google Ads (Adwords)</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Google Ads (AdWords) Certification</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Social Marketing</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Email Marketing</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Business Strategy</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>SEO</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>PPC Advertising</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Blogging</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" id="headingfive">
                                                            <div className="panel-title10">
                                                                <a
                                                                    className="collapsed"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapsefive"
                                                                    href="#"
                                                                    aria-expanded="false"
                                                                    aria-controls="collapsefive"
                                                                >
                                                                    Teaching & Academics
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="collapsefive"
                                                            className="panel-collapse collapse"
                                                            aria-labelledby="headingfive"
                                                            data-parent="#accordiontest"
                                                        >
                                                            <div className="panel-body">
                                                                <div className="ui form">
                                                                    <div className="grouped fields">
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Math</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Humanities</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Engineering</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Science</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Social Science</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>English Language</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field fltr-radio">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>German Language</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Sign Language</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>French Language</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>Spanish Language</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>English Grammar</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="field">
                                                                            <div className="ui radio checkbox">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="example2"
                                                                                    tabIndex={0}
                                                                                    className="hidden"
                                                                                />
                                                                                <label>IELTS</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="testtrm145">
                                                By signing up, you agree to our <a href="#">Privacy Policy</a> and{' '}
                                                <a href="#">Terms and Conditions</a>.
                                            </p>
                                            <button className="login-btn" type="submit">
                                                Lets Go
                                            </button>
                                        </form>
                                        <p className="questrm145">
                                            Please be ready to answer <span>20 questions</span> within <span>1 hours</span>.
                                        </p>
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

export default CertificateStartForm;
