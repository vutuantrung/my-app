import AppFooter from '../../../Layouts/AppFooter';

const Feedback = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-comment-info-alt"></i> Send Feedback
                            </h2>
                            <div className="row">
                                <div className="col-lg-6 col-md-8">
                                    <div className="ui search focus">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input
                                                className="prompt srch_explore"
                                                type="email"
                                                name="emailaddress"
                                                value=""
                                                id="id_email"
                                                required
                                                maxLength={64}
                                                placeholder="Email address"
                                                onChange={() => {}}
                                            />
                                        </div>
                                    </div>
                                    <div className="ui search focus mt-30">
                                        <div className="ui form swdh30">
                                            <div className="field">
                                                <textarea
                                                    rows={6}
                                                    name="description"
                                                    id="id_about"
                                                    placeholder="Describe your issue or share your ideas"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group1 mt-30">
                                        <label htmlFor="file5">Add Screenshots</label>
                                        <div className="image-upload-wrap">
                                            <input
                                                className="file-upload-input"
                                                id="file5"
                                                type="file"
                                                onChange={() => 'readURL(this);'}
                                                accept="image/*"
                                            />
                                            <div className="drag-text">
                                                <i className="fas fa-cloud-upload-alt"></i>
                                                <h4>Select screenshots to upload</h4>
                                                <p>or drag and drop screenshots</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="save_btn" type="submit">
                                        Send Feedback
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};

export default Feedback;
