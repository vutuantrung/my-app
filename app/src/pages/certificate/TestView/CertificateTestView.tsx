import { Link } from 'react-router-dom';
import PageHeader from '../../../Layouts/PageHeader';
import AppFooter from '../../../Layouts/AppFooter';

const CertificateTestView = () => {
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
                                                        WordPress Test View
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
                                    <h2>WordPress Test View</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faq1256">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="certi_form rght1528">
                                    <div className="test_timer_bg">
                                        <ul className="test_timer_left">
                                            <li>
                                                <div className="timer_time">
                                                    <h4>20</h4>
                                                    <p>Questions</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="timer_time">
                                                    <h4 id="timer">60</h4>
                                                    <p>Minutes</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-6">
                                <div className="certi_form">
                                    <div className="all_ques_lest">
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 1 :-</span>
                                                What is the name of the first page you encounter after logging into your web page?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example1" tabIndex={0} className="hidden" />
                                                            <label>Dashboard</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example1" tabIndex={0} className="hidden" />
                                                            <label>Security question page</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example1" tabIndex={0} className="hidden" />
                                                            <label>WP upgrade option</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example1" tabIndex={0} className="hidden" />
                                                            <label>WPAdmin</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 2 :-</span>
                                                what is Wordpress?
                                            </div>
                                            <div className="ui search focus mt-15">
                                                <div className="ui form swdh30">
                                                    <div className="field">
                                                        <textarea
                                                            rows={5}
                                                            name="answer"
                                                            id="id_answer"
                                                            placeholder="Pls explain"
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 3 :-</span>
                                                How can you get involved with WordPress?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example2" tabIndex={0} className="hidden" />
                                                            <label>Attend Word Camp</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example2" tabIndex={0} className="hidden" />
                                                            <label>Edit the Codex (documentation)</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example2" tabIndex={0} className="hidden" />
                                                            <label>Help in the Forums</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example2" tabIndex={0} className="hidden" />
                                                            <label>All of these</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 4 :-</span>
                                                What ways to use WordPress?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example3" tabIndex={0} className="hidden" />
                                                            <label>Arcade</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example3" tabIndex={0} className="hidden" />
                                                            <label>Blog</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example3" tabIndex={0} className="hidden" />
                                                            <label>Content Management System (CMS)</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example3" tabIndex={0} className="hidden" />
                                                            <label>All of the above</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 5 :-</span>
                                                What case we cannot recommend WordPress to our client?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example4" tabIndex={0} className="hidden" />
                                                            <label>If client is working on non-CMS base project</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example4" tabIndex={0} className="hidden" />
                                                            <label>If site wants complex or innovative e-commerce</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example4" tabIndex={0} className="hidden" />
                                                            <label>In case of enterprise intranet solution</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example4" tabIndex={0} className="hidden" />
                                                            <label>All of the above</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 6 :-</span>
                                                Which relational database does WordPress use?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example5" tabIndex={0} className="hidden" />
                                                            <label>MySQL</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example5" tabIndex={0} className="hidden" />
                                                            <label>Oracle</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example5" tabIndex={0} className="hidden" />
                                                            <label>PostgresSQL</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example5" tabIndex={0} className="hidden" />
                                                            <label>MS SQLServer</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 7 :-</span>
                                                What are the rules that you have to follow for WordPress plugin development?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example6" tabIndex={0} className="hidden" />
                                                            <label>Create a unique name</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example6" tabIndex={0} className="hidden" />
                                                            <label>Create the plugin’s folder</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example6" tabIndex={0} className="hidden" />
                                                            <label>
                                                                Create a sub-folder for PHP files, translations, and assets
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example6" tabIndex={0} className="hidden" />
                                                            <label>All of these</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 8 :-</span>
                                                What are the steps you can take if your WordPress file is hacked?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example7" tabIndex={0} className="hidden" />
                                                            <label>Install security plugins like WP security</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example7" tabIndex={0} className="hidden" />
                                                            <label>Re-install the latest version of WordPress</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example7" tabIndex={0} className="hidden" />
                                                            <label>Change password and user-ids for all your users</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example7" tabIndex={0} className="hidden" />
                                                            <label>All of the above</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 9 :-</span>
                                                What is a WordPress taxonomy?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example8" tabIndex={0} className="hidden" />
                                                            <label>Category</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example8" tabIndex={0} className="hidden" />
                                                            <label>Tag</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example8" tabIndex={0} className="hidden" />
                                                            <label>Link Category</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example8" tabIndex={0} className="hidden" />
                                                            <label>Post Formats</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example8" tabIndex={0} className="hidden" />
                                                            <label>All of the above</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 10 :-</span>
                                                In WordPress, what is the user role with the highest privilege level?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example9" tabIndex={0} className="hidden" />
                                                            <label>Administrator</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example9" tabIndex={0} className="hidden" />
                                                            <label>Author</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example9" tabIndex={0} className="hidden" />
                                                            <label>Editor</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input type="radio" name="example9" tabIndex={0} className="hidden" />
                                                            <label>Contributor</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 11 :-</span>
                                                What are rules to follow in WordPress plugin development?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example10"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Find a unique name</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example10"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Setup a prefix (related to your brand)</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example10"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Create the plugin’s folder</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example10"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>All of the above</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 12 :-</span>
                                                What is Gravatar?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example11"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>A Plugin</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example11"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Globally Recognized Image or Photo</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example11"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>CMS</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 13 :-</span>
                                                Types of post format available in Wordpress.
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example12"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>10</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example12"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>11</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example12"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>9</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example12"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>6</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 14 :-</span>
                                                How many number of tables in wordpress database available?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example13"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>18</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example13"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>9</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example13"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>6</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example13"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>12</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 15 :-</span>
                                                How many free plug self hosted that work on wordpress only?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example14"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>2,000</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example14"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>10,000</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example14"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>30,000</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 16 :-</span>
                                                Is Multilingual sites are allowed in Wordpress?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example15"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Yes</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example15"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 17 :-</span>
                                                What is name of configuration file in WordPress ?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example16"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>header.php</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example16"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>wp-settings.php</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example16"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>wp-config.php</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example16"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>page.php</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 18 :-</span>
                                                What is a permalink?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example17"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>A popular WordPress Plugin</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example17"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>The numeric IP address of your WordPress site</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example17"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>The complete URL of your WordPress site</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example17"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Part of your WordPress URL which you set</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 19 :-</span>
                                                How many templates can one theme contain?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example18"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>One</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example18"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Max Ten</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example18"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Max 20</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example18"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Unlimited</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ques_item">
                                            <div className="ques_title">
                                                <span>Ques 20 :-</span>
                                                In which programming language WordPress is written?
                                            </div>
                                            <div className="ui form">
                                                <div className="grouped fields">
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example19"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Java</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example19"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Node</label>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example19"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Php</label>
                                                        </div>
                                                    </div>
                                                    <div className="field fltr-radio">
                                                        <div className="ui radio checkbox">
                                                            <input
                                                                type="radio"
                                                                name="example19"
                                                                tabIndex={0}
                                                                className="hidden"
                                                            />
                                                            <label>Javascript</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="test_submit_btn" type="submit">
                                        Submit Test
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

export default CertificateTestView;
