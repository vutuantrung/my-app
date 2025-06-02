import React from 'react';

function ViewStep() {
    return (
        <div className="tab-from-content">
            <div className="title-icon">
                <h3 className="title">
                    <i className="uil uil-image-upload"></i>View
                </h3>
            </div>
            <div className="course__form">
                <div className="view_info10">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="view_all_dt">
                                <div className="view_img_left">
                                    <div className="view__img">
                                        <img src="images/courses/add_img.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="view_img_right">
                                    <h4>Cover Image</h4>
                                    <p>
                                        Upload your course image here. It must meet our course image quality standards to be
                                        accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                                        image.
                                    </p>
                                    <div className="upload__input">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile04" />
                                                <label className="custom-file-label" htmlFor="inputGroupFile04">
                                                    No Choose file
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="view_all_dt">
                                <div className="view_img_left">
                                    <div className="view__img">
                                        <img src="images/courses/add_video.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="view_img_right">
                                    <h4>Promotional Video</h4>
                                    <p>
                                        Students who watch a well-made promo video are 5X more likely to enroll in your course.
                                        We've seen that statistic go up to 10X for exceptionally awesome videos. Learn how to make
                                        yours awesome!
                                    </p>
                                    <div className="upload__input">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile05" />
                                                <label className="custom-file-label" htmlFor="inputGroupFile05">
                                                    No Choose file
                                                </label>
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
    );
}

export default ViewStep;
