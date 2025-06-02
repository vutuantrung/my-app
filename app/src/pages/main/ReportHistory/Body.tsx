import AppFooter from '../../../Layouts/AppFooter';

const Body = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-windsock"></i> Report history
                            </h2>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="report_history">
                                        <h4>Thanks for reporting</h4>
                                        <p>
                                            Any member of the Edututs+ community can flag content to us that they believe violates
                                            our Community Guidelines. When something is flagged, it’s not automatically taken
                                            down. Flagged content is reviewed in line with the following guidelines:
                                        </p>
                                        <ul>
                                            <li>
                                                <p>
                                                    Content that violates our <a href="#">Community Guidelines</a> is removed from
                                                    Edututs+.
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    Content that may not be appropriate for all younger audiences may be
                                                    age-restricted.
                                                </p>
                                            </li>
                                        </ul>
                                        <a href="#" className="lnk586">
                                            Learn more about reporting content on Edututs+.
                                        </a>
                                        <span>You haven't submitted any reports.</span>
                                    </div>
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

export default Body;
