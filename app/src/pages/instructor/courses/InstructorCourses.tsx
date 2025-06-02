import { Link } from 'react-router-dom';
import { IMAGES } from '../../../constants';
import PageFooter from '../../../Layouts/PageFooter';

const InstructorCourses = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-book-alt"></i>Courses
                            </h2>
                        </div>
                        <div className="col-md-12">
                            <div className="card_dash1">
                                <div className="card_dash_left1">
                                    <i className="uil uil-book-alt"></i>
                                    <h1>Jump Into Course Creation</h1>
                                </div>
                                <div className="card_dash_right1">
                                    <Link to="/instructor/createCourse">
                                        <button className="create_btn_dash">Create Your Course</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="my_courses_tabs">
                                <ul className="nav nav-pills my_crse_nav" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="pills-my-courses-tab"
                                            data-toggle="pill"
                                            href="#pills-my-courses"
                                            role="tab"
                                            aria-controls="pills-my-courses"
                                            aria-selected="true"
                                        >
                                            <i className="uil uil-book-alt"></i>My Courses
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-my-purchases-tab"
                                            data-toggle="pill"
                                            href="#pills-my-purchases"
                                            role="tab"
                                            aria-controls="pills-my-purchases"
                                            aria-selected="false"
                                        >
                                            <i className="uil uil-download-alt"></i>My Purchases
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-upcoming-courses-tab"
                                            data-toggle="pill"
                                            href="#pills-upcoming-courses"
                                            role="tab"
                                            aria-controls="pills-upcoming-courses"
                                            aria-selected="false"
                                        >
                                            <i className="uil uil-upload-alt"></i>Upcoming Courses
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-discount-tab"
                                            data-toggle="pill"
                                            href="#pills-discount"
                                            role="tab"
                                            aria-controls="pills-discount"
                                            aria-selected="false"
                                        >
                                            <i className="uil uil-tag-alt"></i>Discounts
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-promotions-tab"
                                            data-toggle="pill"
                                            href="#pills-promotions"
                                            role="tab"
                                            aria-controls="pills-promotions"
                                            aria-selected="false"
                                        >
                                            <i className="uil uil-megaphone"></i>Promotions
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-my-courses" role="tabpanel">
                                        <div className="table-responsive mt-30">
                                            <table className="table ucp-table">
                                                <thead className="thead-s">
                                                    <tr>
                                                        <th className="text-center" scope="col">
                                                            Item No.
                                                        </th>
                                                        <th>Title</th>
                                                        <th className="text-center" scope="col">
                                                            Publish Date
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Sales
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Parts
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Category
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Status
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">IT-001</td>
                                                        <td>Course Title Here</td>
                                                        <td className="text-center">06 April 2020 | 08:31</td>
                                                        <td className="text-center">15</td>
                                                        <td className="text-center">5</td>
                                                        <td className="text-center">
                                                            <a href="#">Web Development</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Active</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">IT-002</td>
                                                        <td>Course Title Here</td>
                                                        <td className="text-center">05 April 2020 | 05:15</td>
                                                        <td className="text-center">30</td>
                                                        <td className="text-center">3</td>
                                                        <td className="text-center">
                                                            <a href="#">Graphic Design</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Active</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">IT-003</td>
                                                        <td>Course Title</td>
                                                        <td className="text-center">03 April 2020 | 01:30</td>
                                                        <td className="text-center">14</td>
                                                        <td className="text-center">5</td>
                                                        <td className="text-center">
                                                            <a href="#">Bootstrap</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Active</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">IT-004</td>
                                                        <td>Course Title Here</td>
                                                        <td className="text-center">02 April 2020 | 05:15</td>
                                                        <td className="text-center">110</td>
                                                        <td className="text-center">9</td>
                                                        <td className="text-center">
                                                            <a href="#">Game Development</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Active</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">IT-002</td>
                                                        <td>Course Title Here</td>
                                                        <td className="text-center">28 March 2020 | 05:15</td>
                                                        <td className="text-center">185</td>
                                                        <td className="text-center">10</td>
                                                        <td className="text-center">
                                                            <a href="#">C++</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Active</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-my-purchases" role="tabpanel">
                                        <div className="table-responsive mt-30">
                                            <table className="table ucp-table">
                                                <thead className="thead-s">
                                                    <tr>
                                                        <th className="text-center" scope="col">
                                                            Item No.
                                                        </th>
                                                        <th className="cell-ta" scope="col">
                                                            Title
                                                        </th>
                                                        <th className="cell-ta" scope="col">
                                                            Vendor
                                                        </th>
                                                        <th className="cell-ta" scope="col">
                                                            Category
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Delivery Type
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Price
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Purchase Date
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">001</td>
                                                        <td className="cell-ta">Course Title Here</td>
                                                        <td className="cell-ta">
                                                            <a href="#">Zoena Singh</a>
                                                        </td>
                                                        <td className="cell-ta">
                                                            <a href="#">Web Development</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Download</b>
                                                        </td>
                                                        <td className="text-center">$15</td>
                                                        <td className="text-center">25 March 2020</td>
                                                        <td className="text-center">
                                                            <a href="#" title="Download" className="gray-s">
                                                                <i className="uil uil-download-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                            <a href="#" title="Print" className="gray-s">
                                                                <i className="uil uil-print"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">002</td>
                                                        <td className="cell-ta">Course Title Here</td>
                                                        <td className="cell-ta">
                                                            <a href="#">Rock William</a>
                                                        </td>
                                                        <td className="cell-ta">
                                                            <a href="#">C++</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <b className="course_active">Download</b>
                                                        </td>
                                                        <td className="text-center">$20</td>
                                                        <td className="text-center">20 March 2020</td>
                                                        <td className="text-center">
                                                            <a href="#" title="Download" className="gray-s">
                                                                <i className="uil uil-download-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                            <a href="#" title="Print" className="gray-s">
                                                                <i className="uil uil-print"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-upcoming-courses" role="tabpanel">
                                        <div className="table-responsive mt-30">
                                            <table className="table ucp-table">
                                                <thead className="thead-s">
                                                    <tr>
                                                        <th className="text-center" scope="col">
                                                            Item No.
                                                        </th>
                                                        <th className="cell-ta">Title</th>
                                                        <th className="text-center" scope="col">
                                                            Thumbnail
                                                        </th>
                                                        <th className="text-center">Category</th>
                                                        <th className="text-center">Price</th>
                                                        <th className="text-center">Date</th>
                                                        <th className="text-center" scope="col">
                                                            Status
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">01</td>
                                                        <td className="cell-ta">Course Title Here</td>
                                                        <td className="text-center">
                                                            <a href="#">View</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#">Web Development</a>
                                                        </td>
                                                        <td className="text-center">$15</td>
                                                        <td className="text-center">9 April 2020</td>
                                                        <td className="text-center">
                                                            <b className="course_active">Pending</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">02</td>
                                                        <td className="cell-ta">Course Title Here</td>
                                                        <td className="text-center">
                                                            <a href="#">View</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#">Graphic Design</a>
                                                        </td>
                                                        <td className="text-center">$12</td>
                                                        <td className="text-center">8 April 2020</td>
                                                        <td className="text-center">
                                                            <b className="course_active">Pending</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">03</td>
                                                        <td className="cell-ta">Course Title Here</td>
                                                        <td className="text-center">
                                                            <a href="#">View</a>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#">Photography</a>
                                                        </td>
                                                        <td className="text-center">$6</td>
                                                        <td className="text-center">7 April 2020</td>
                                                        <td className="text-center">
                                                            <b className="course_active">Pending</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-discount" role="tabpanel">
                                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                            <div className="panel panel-default">
                                                <div className="panel-heading" role="tab" id="headingOne">
                                                    <div className="panel-title adcrse1250">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-parent="#accordion"
                                                            href="#collapseOne"
                                                            aria-expanded="false"
                                                            aria-controls="collapseOne"
                                                        >
                                                            New Discount
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapseOne"
                                                    className="panel-collapse collapse"
                                                    role="tabpanel"
                                                    aria-labelledby="headingOne"
                                                >
                                                    <div className="panel-body adcrse_body">
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="discount_form">
                                                                    <div className="row">
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="mt-20 lbel25">
                                                                                <label>Course*</label>
                                                                            </div>
                                                                            <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                                                                <option value="">Select Course</option>
                                                                                <option value="1">Course Title Here</option>
                                                                                <option value="2">Course Title Here</option>
                                                                                <option value="3">Course Title Here</option>
                                                                                <option value="4">Course Title Here</option>
                                                                                <option value="5">Course Title Here</option>
                                                                                <option value="6">Course Title Here</option>
                                                                                <option value="7">Course Title Here</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="ui search focus mt-20 lbel25">
                                                                                <label>Discount Amount</label>
                                                                                <div className="ui left icon input swdh19">
                                                                                    <input
                                                                                        className="prompt srch_explore"
                                                                                        type="number"
                                                                                        name="off"
                                                                                        required
                                                                                        min="1"
                                                                                        max="99"
                                                                                        placeholder="Percent (eg. 20 for 20%)"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="ui search focus mt-20 lbel25">
                                                                                <label>Start Date</label>
                                                                                <div className="ui left icon input swdh19">
                                                                                    <input
                                                                                        className="prompt srch_explore datepicker-here"
                                                                                        type="text"
                                                                                        data-language="en"
                                                                                        placeholder="dd/mm/yyyy"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="ui search focus mt-20 lbel25">
                                                                                <label>End Date</label>
                                                                                <div className="ui left icon input swdh19">
                                                                                    <input
                                                                                        className="prompt srch_explore datepicker-here"
                                                                                        type="text"
                                                                                        data-language="en"
                                                                                        placeholder="dd/mm/yyyy"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <button className="discount_btn" type="submit">
                                                                                Save Changes
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive mt-30">
                                            <table className="table ucp-table">
                                                <thead className="thead-s">
                                                    <tr>
                                                        <th className="text-center" scope="col">
                                                            Item No.
                                                        </th>
                                                        <th className="cell-ta">Course</th>
                                                        <th className="text-center" scope="col">
                                                            Start Date
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            End Date
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Discount
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Status
                                                        </th>
                                                        <th className="text-center" scope="col">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">01</td>
                                                        <td className="cell-ta">Course Title Here</td>
                                                        <td className="text-center">02 November 2019</td>
                                                        <td className="text-center">19 November 2019</td>
                                                        <td className="text-center">20%</td>
                                                        <td className="text-center">
                                                            <b className="course_active">Active</b>
                                                        </td>
                                                        <td className="text-center">
                                                            <a href="#" title="Edit" className="gray-s">
                                                                <i className="uil uil-edit-alt"></i>
                                                            </a>
                                                            <a href="#" title="Delete" className="gray-s">
                                                                <i className="uil uil-trash-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-promotions"
                                        role="tabpanel"
                                        aria-labelledby="pills-promotions-tab"
                                    >
                                        <div className="promotion_tab mb-10">
                                            <img src={IMAGES.promotion} alt="" />
                                            <h4>Baby promotion plan is activated!</h4>
                                            <p>By activating promotion plans you can improve course views and sales.</p>
                                            <button className="plan_link_btn" onClick={() => "window.location.href = '#';"}>
                                                Change New Plan
                                            </button>
                                        </div>
                                    </div>
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

export default InstructorCourses;
