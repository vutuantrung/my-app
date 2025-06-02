import PageFooter from '../../../Layouts/PageFooter';
import { IMAGES } from '../../../constants';

const InstructorVerification = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-check-circle"></i> Verification
                            </h2>
                        </div>
                    </div>
                    <div className="row justify-content-xl-center justify-content-lg-center justify-content-md-center">
                        <div className="col-xl-6 col-lg-8 col-md-8">
                            <div className="verification_content">
                                <img src={IMAGES.verified_account} alt="" />
                                <h4>Verification with Edututs+</h4>
                                <p>
                                    Praesent sed sapien gravida, tempus nunc nec, euismod turpis. Mauris quis scelerisque arcu.
                                    Quisque et aliquet nisl, id placerat est. Morbi quis imperdiet nulla.
                                </p>
                                <ul className="alert_verification">
                                    <li>
                                        <div className="required_group">
                                            <div className="edututs_required_img">
                                                <i className="uil uil-dashboard"></i>
                                            </div>
                                            <div className="edututs_required">
                                                <span>
                                                    <strong>14 subscribers</strong>
                                                </span>
                                                <span>500 required</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="required_group">
                                            <div className="edututs_required_img">
                                                <i className="uil uil-dashboard"></i>
                                            </div>
                                            <div className="edututs_required">
                                                <span>
                                                    <strong>10 public watch hours</strong>
                                                </span>
                                                <span>1,500 required</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="apply_verify_text">
                                    <i className="uil uil-check-circle"></i>We'll send you an email when you're eligible to apply
                                </div>
                                <div className="verification_form">
                                    <h4>Verify Your ID</h4>
                                    <form>
                                        <div className="ui search focus mt-50 lbel25">
                                            <label>Course Title*</label>
                                            <div className="ui left icon input swdh19">
                                                <input
                                                    className="prompt srch_explore"
                                                    type="text"
                                                    placeholder="Full Name"
                                                    name="fullname"
                                                    maxLength={60}
                                                    id="full[name]"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="part_input mt-30 lbel25">
                                            <label>Upload Document*</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="inputGroupFile06" />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile06">
                                                        No Choose
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="verify_submit_btn" type="submit">
                                            Submit Now
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageFooter />
        </>
    );
};

export default InstructorVerification;
