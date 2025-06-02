import PageFooter from '../../../Layouts/PageFooter';

const InstructorPayout = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-wallet"></i> Payout
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="top_countries mt-30">
                                <div className="top_countries_title">
                                    <h2>Next payout</h2>
                                </div>
                                <div className="payout_content">
                                    <span>
                                        <strong>$4568.50</strong>
                                    </span>
                                    <div className="payout__via">
                                        <strong>via Payoneer</strong>
                                    </div>
                                    <p>
                                        <small className="payout__small-notification">
                                            Your payout will be processed on <strong>April 15, 2020</strong>
                                        </small>
                                    </p>
                                </div>
                            </div>
                            <div className="top_countries mt-30">
                                <div className="top_countries_title">
                                    <h2>Payout account</h2>
                                </div>
                                <div className="payout_content">
                                    <img src="images/payoneer.svg" alt="" />
                                    <div className="payout__added">
                                        <strong>Added:</strong>
                                        01 Mar 2020
                                    </div>
                                    <p>
                                        <a href="#" className="payout__btn">
                                            Set Account
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="table-responsive mt-30">
                                <table className="table ucp-table earning__table">
                                    <thead className="thead-s">
                                        <tr>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Payout Method</th>
                                            <th scope="col">Date Processed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>$2550.54</td>
                                            <td>Payoneer</td>
                                            <td>15 Mar 2020</td>
                                        </tr>
                                        <tr>
                                            <td>$1950.14</td>
                                            <td>Payoneer</td>
                                            <td>15 Feb 2020</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageFooter />
        </>
    );
};

export default InstructorPayout;
