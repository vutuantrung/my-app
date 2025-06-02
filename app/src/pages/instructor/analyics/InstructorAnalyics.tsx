import PageFooter from '../../../Layouts/PageFooter';

const InstructorAnalyics = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-analysis"></i> Analyics
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-sm-6">
                            <div className="card card-mini analysis_card">
                                <div className="card-body">
                                    <h2 className="mb-2">839</h2>
                                    <p>Subscribers</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="barChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                            <div className="card card-mini analysis_card">
                                <div className="card-body">
                                    <h2 className="mb-1">950</h2>
                                    <p>Weekly Visitors</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="dual-line"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                            <div className="card card-mini analysis_card">
                                <div className="card-body">
                                    <h2 className="mb-1">20</h2>
                                    <p>Weekly Sales</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="line"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-md-12">
                            {/* <!-- Sales Graph --> */}
                            <div className="card card-default analysis_card p-0" data-scroll-height="450">
                                <div className="card-header">
                                    <h2>Sales Of The Year</h2>
                                </div>
                                <div className="card-body p-5" style={{ height: '450px' }}>
                                    <canvas id="linechart" className="chartjs"></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {/* <!-- User activity statistics --> */}
                            <div className="card card-default analysis_card p-0" id="user-activity">
                                <div className="row no-gutters">
                                    <div className="col-xl-8">
                                        <div className="border-right">
                                            <div className="card-header justify-content-between">
                                                <h2 className="m-0">User Activity</h2>
                                                <div className="date-range-report ">
                                                    <span></span>
                                                </div>
                                            </div>
                                            <ul
                                                className="nav nav-tabs justify-content-between justify-content-xl-start nav-fill"
                                                role="tablist"
                                            >
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active pb-md-0"
                                                        data-toggle="tab"
                                                        href="#user"
                                                        role="tab"
                                                        aria-selected="true"
                                                    >
                                                        <span className="type-name">User</span>
                                                        <h4 className="views_title d-inline-block mt-2 mr-2 mb-3">5248</h4>
                                                        <span className="text-success1">
                                                            5%
                                                            <i className="uil uil-top-arrow-from-top"></i>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link pb-md-0"
                                                        data-toggle="tab"
                                                        href="#session"
                                                        role="tab"
                                                        aria-selected="false"
                                                    >
                                                        <span className="type-name">Sessions</span>
                                                        <h4 className="views_title d-inline-block mt-2 mr-2 mb-3">638</h4>
                                                        <span className="text-success">
                                                            20%
                                                            <i className="uil uil-top-arrow-from-top"></i>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link pb-md-0"
                                                        data-toggle="tab"
                                                        href="#bounce"
                                                        role="tab"
                                                        aria-selected="false"
                                                    >
                                                        <span className="type-name">Bounce Rate</span>
                                                        <h4 className="views_title d-inline-block mt-2 mr-2 mb-3">36.9%</h4>
                                                        <span className="text-danger">
                                                            7%
                                                            <i className="uil uil-arrow-to-bottom"></i>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link pb-md-0"
                                                        data-toggle="tab"
                                                        href="#session-duration"
                                                        role="tab"
                                                        aria-selected="false"
                                                    >
                                                        <span className="type-name">Session Duration</span>
                                                        <h4 className="views_title d-inline-block mt-2 mr-2 mb-3">4m 49s</h4>
                                                        <span className="text-success">
                                                            15%
                                                            <i className="uil uil-top-arrow-from-top"></i>
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="card-body">
                                                <div className="tab-content" id="myTabContent">
                                                    <div className="tab-pane fade show active" id="user" role="tabpanel">
                                                        <canvas
                                                            id="activity"
                                                            className="chartjs p-4"
                                                            style={{ height: '350px' }}
                                                        ></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex flex-wrap bg-white border-top">
                                                <a href="#" className="text-uppercase py-3 ovrvew-1">
                                                    Audience Overview
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div data-scroll-height="350">
                                            <div className="card-header justify-content-between">
                                                <h2 className="m-0">Current Users</h2>
                                            </div>
                                            <div className="curntusr145">
                                                <p className="my-2">Ave Page views per minute</p>
                                                <h4>09</h4>
                                            </div>
                                            <div className="border-bottom"></div>
                                            <div className="card-body p-5">
                                                <canvas id="currentUser" className="chartjs" style={{ height: '300px' }}></canvas>
                                            </div>
                                            <div className="card-footer d-flex flex-wrap bg-white">
                                                <a href="#" className="text-uppercase py-3 ovrvew-1">
                                                    Audience Overview
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="table-responsive mt-30">
                                <table className="table ucp-table">
                                    <thead className="thead-s">
                                        <tr>
                                            <th className="text-center" scope="col">
                                                Item No.
                                            </th>
                                            <th className="cell-ta" scope="col">
                                                Thumbnail
                                            </th>
                                            <th className="cell-ta" scope="col">
                                                Title
                                            </th>
                                            <th className="text-center" scope="col">
                                                Purchases
                                            </th>
                                            <th className="text-center" scope="col">
                                                Comments
                                            </th>
                                            <th className="text-center" scope="col">
                                                Views
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">001</td>
                                            <td className="cell-ta">
                                                <div className="thumb_img">
                                                    <img src="./assets/images/test/img_cours_sample/1.jpg" alt="" />
                                                </div>
                                            </td>
                                            <td className="cell-ta">Course Title Here</td>
                                            <td className="text-center">70</td>
                                            <td className="text-center">1150</td>
                                            <td className="text-center">1850</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">002</td>
                                            <td className="cell-ta">
                                                <div className="thumb_img">
                                                    <img src="images/courses/img-3.jpg" alt="" />
                                                </div>
                                            </td>
                                            <td className="cell-ta">Course Title Here</td>
                                            <td className="text-center">86</td>
                                            <td className="text-center">2150</td>
                                            <td className="text-center">6850</td>
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

export default InstructorAnalyics;
