import React from 'react';

function CoursContentStep() {
    return (
        <div className="tab-from-content">
            <div className="title-icon">
                <h3 className="title">
                    <i className="uil uil-film"></i>Course Content
                </h3>
            </div>
            <div className="course__form">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="extra_info">
                            <h4 className="part__title">New Course Content</h4>
                        </div>
                        <div className="view_info10">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="ui search focus mt-30 lbel25">
                                        <label>Course Content Title*</label>
                                        <div className="ui left icon input swdh19">
                                            <input
                                                className="prompt srch_explore"
                                                type="text"
                                                placeholder="Insert your course content title."
                                                name="title"
                                                data-purpose="edit-course-title"
                                                maxLength={60}
                                                id="Content[title]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="lecture_title">
                                        <h4>Add Lecture</h4>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="ui search focus mt-30 lbel25">
                                        <label>Lecture Title*</label>
                                        <div className="ui left icon input swdh19">
                                            <input
                                                className="prompt srch_explore"
                                                type="text"
                                                placeholder="Insert your lecture title."
                                                name="title"
                                                data-purpose="edit-course-title"
                                                maxLength={60}
                                                id="lecture[title]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="part_input mt-30 lbel25">
                                        <label>File*</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile06" />
                                                <label className="custom-file-label" htmlFor="inputGroupFile06">
                                                    No Choose file - (Pdf, Video)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="ui search focus mt-30 lbel25">
                                        <label>Sort</label>
                                        <div className="ui left icon input swdh19">
                                            <input
                                                className="prompt srch_explore"
                                                type="number"
                                                name="sort"
                                                min="0"
                                                max="100"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="course_des_textarea mt-30 lbel25">
                                        <label>Description*</label>
                                        <div className="course_des_bg">
                                            <ul className="course_des_ttle">
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-bold"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-italic"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-list-ul"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-left-to-right-text-direction"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-right-to-left-text-direction"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-list-ui-alt"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-link"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-text-size"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-text"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="textarea_dt">
                                                <div className="ui form swdh339">
                                                    <div className="field">
                                                        <textarea
                                                            rows={5}
                                                            name="description"
                                                            id="id_part_description"
                                                            placeholder="Insert your course part description"
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-6">
                                    <div className="ui search focus mt-30 lbel25">
                                        <label>Volume*</label>
                                        <div className="ui left icon input swdh19 swdh95">
                                            <input
                                                className="prompt srch_explore"
                                                type="number"
                                                min="0"
                                                name="size"
                                                required
                                                placeholder="0"
                                            />
                                            <div className="badge_mb">MB</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-6">
                                    <div className="ui search focus mt-30 lbel25">
                                        <label>Duration*</label>
                                        <div className="ui left icon input swdh19 swdh55">
                                            <input
                                                className="prompt srch_explore"
                                                type="number"
                                                min="0"
                                                name="duration"
                                                required
                                                placeholder="0"
                                            />
                                            <div className="badge_min">Minutes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12">
                                    <button className="part_btn_save prt-sv" type="submit">
                                        Save Lecture
                                    </button>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="table-responsive mt-50 mb-0">
                                        <table className="table ucp-table">
                                            <thead className="thead-s">
                                                <tr>
                                                    <th className="text-center" scope="col">
                                                        Lecture
                                                    </th>
                                                    <th className="cell-ta">Title</th>
                                                    <th className="text-center" scope="col">
                                                        Volume
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Duration
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Page
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        File
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Controls
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className="cell-ta">Lecture Content Title</td>
                                                    <td className="text-center">25</td>
                                                    <td className="text-center">6</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">
                                                        <a href="#">Video</a>
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
                                                    <td className="text-center">2</td>
                                                    <td className="cell-ta">Lecture Content Title</td>
                                                    <td className="text-center">25</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">3</td>
                                                    <td className="text-center">
                                                        <a href="#">File</a>
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
                                <div className="col-lg-12 col-md-12">
                                    <div className="save_content">
                                        <button className="save_content_btn" type="submit">
                                            Save Course Content
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive mt-30">
                <table className="table ucp-table" id="content-table">
                    <thead className="thead-s">
                        <tr>
                            <th className="text-center" scope="col">
                                Content
                            </th>
                            <th className="cell-ta">Title</th>
                            <th className="text-center" scope="col">
                                lectures
                            </th>
                            <th className="text-center" scope="col">
                                Volume
                            </th>
                            <th className="text-center" scope="col">
                                Duration
                            </th>
                            <th className="text-center" scope="col">
                                Upload Date
                            </th>
                            <th className="text-center" scope="col">
                                Files
                            </th>
                            <th className="text-center" scope="col">
                                Controls
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">1</td>
                            <td className="cell-ta">Course Content Title</td>
                            <td className="text-center">5</td>
                            <td className="text-center">50</td>
                            <td className="text-center">15</td>
                            <td className="text-center">6 April 2019</td>
                            <td className="text-center">
                                <a href="#">View</a>
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
    );
}

export default CoursContentStep;
