import PageFooter from '../../../Layouts/PageFooter';

const InstructorStatement = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-file-alt"></i> Statements
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-7">
                            <div className="top_countries mt-30">
                                <div className="top_countries_title">
                                    <h2>Earnings</h2>
                                </div>
                                <div className="statement_content">
                                    <p className="tt-body">Your sales earnings over the last 30 days</p>
                                    <table className="statement-summary__table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <p className="t-heading">My funds</p>
                                                </th>
                                                <th>
                                                    <p className="t-heading">Earnings</p>
                                                </th>
                                                <th>
                                                    <p className="t-heading">Edututs+ Fees</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="statement-summary__funds">
                                                    <p className="js-earnings__instructor-funds-wrapper">
                                                        <span className=""></span>
                                                        <span className="js-earnngs__instructor-funds t-currency">$289.64</span>
                                                    </p>
                                                </td>
                                                <td className="statement-summary__earnings">
                                                    <p className="js-earnings__earnings-wrapper">
                                                        <span className="tt__earning">+</span>
                                                        <span className="js-earnings__earnings t-currency">$458.00</span>
                                                    </p>
                                                </td>
                                                <td className="statement-summary__fees">
                                                    <p className="js-earnings__fees-wrapper">
                                                        <span className="tt__earning">-</span>
                                                        <span className="js-earnings__fees t-currency">$154.86</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5">
                            <div className="top_countries mt-30">
                                <div className="top_countries_title">
                                    <h2>View Invoices</h2>
                                </div>
                                <div className="statement_invoice_content">
                                    <div className="date_selector mt-0">
                                        <div className="ui selection dropdown skills-search vchrt-dropdown invoice-dropdown">
                                            <input name="date" type="hidden" value="default" />
                                            <i className="dropdown icon d-icon"></i>
                                            <div className="text">Monthly Invoices</div>
                                            <div className="menu">
                                                <div className="item" data-value="0">
                                                    April 2020
                                                </div>
                                                <div className="item" data-value="1">
                                                    March 2020
                                                </div>
                                            </div>
                                        </div>
                                        <button className="st_download_btn">
                                            <i className="uil uil-download-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <ul className="more_options_tt">
                                <li>
                                    <button className="more_items_14 active">This Month</button>
                                </li>
                                <li>
                                    <button className="more_items_14">Last Month</button>
                                </li>
                                <li>
                                    <div className="explore_search">
                                        <div className="ui search focus">
                                            <div className="ui left icon input swdh11 swdh15">
                                                <input
                                                    className="prompt srch_explore"
                                                    type="text"
                                                    placeholder="Document Number"
                                                />
                                                <i className="uil uil-search-alt icon icon8"></i>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="table-responsive mt-30">
                                <table className="table ucp-table earning__table">
                                    <thead className="thead-s">
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Fees</th>
                                            <th scope="col">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>13 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>12 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>11 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>9 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7 Apr 2020</td>
                                            <td>123456</td>
                                            <td>Sale</td>
                                            <td>Course Title Here</td>
                                            <td>$10</td>
                                            <td>-$5</td>
                                            <td>
                                                <a href="#">View</a>
                                            </td>
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

export default InstructorStatement;
