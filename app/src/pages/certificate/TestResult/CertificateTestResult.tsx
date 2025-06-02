import { Link } from 'react-router-dom';
import PageHeader from '../../../Layouts/PageHeader';
import AppFooter from '../../../Layouts/AppFooter';

const CertificateTestResult = () => {
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
                                                        Result
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
                                    <h2>Result</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faq1256">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-md-6">
                                <div className="certi_form rght1528">
                                    <div className="test_result_bg">
                                        <ul className="test_result_left">
                                            <li>
                                                <div className="result_dt">
                                                    <i className="uil uil-check right_ans"></i>
                                                    <p>
                                                        Right<span>(15)</span>
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="result_dt">
                                                    <i className="uil uil-times wrong_ans"></i>
                                                    <p>
                                                        Wrong<span>(5)</span>
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="result_dt">
                                                    <h4>15</h4>
                                                    <p>Out of 20</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="result_content">
                                            <h2>Congratulation! Joginder</h2>
                                            <p>You are eligible for this certificate</p>
                                            <a
                                                href="http://gambolthemes.net/html-imgs/certificate.jpg"
                                                className="download_btn"
                                                download="w3logo"
                                                target="_blank"
                                            >
                                                Download Certificate
                                            </a>
                                        </div>
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

export default CertificateTestResult;
