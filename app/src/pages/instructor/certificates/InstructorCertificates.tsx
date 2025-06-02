import { Link } from 'react-router-dom';
import PageFooter from '../../../Layouts/PageFooter';

const InstructorCertificates = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-award"></i> My Certificates
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mt-10">
                                <div className="card_dash1">
                                    <div className="card_dash_left1">
                                        <i className="uil uil-award"></i>
                                        <h1>Jump Into New Certificate</h1>
                                    </div>
                                    <div className="card_dash_right1">
                                        <Link to="/certificateCenter">
                                            <button className="create_btn_dash">New Certificate</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-cerificate">
                                    <div className="table-responsive">
                                        <table className="table ucp-table" id="content-table">
                                            <thead className="thead-s">
                                                <tr>
                                                    <th className="text-center" scope="col">
                                                        Item No.
                                                    </th>
                                                    <th scope="col">Title</th>
                                                    <th className="text-center" scope="col">
                                                        Marks
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Out Of
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Upload Date
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Certificate
                                                    </th>
                                                    <th className="text-center" scope="col">
                                                        Controls
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className="cell-ta">WordPress Certificate</td>
                                                    <td className="text-center">15</td>
                                                    <td className="text-center">20</td>
                                                    <td className="text-center">6 April 2019</td>
                                                    <td className="text-center">
                                                        <a
                                                            href="http://gambolthemes.net/html-imgs/certificate.jpg"
                                                            target="_blank"
                                                        >
                                                            View
                                                        </a>
                                                    </td>
                                                    <td className="text-center">
                                                        <a href="#" title="Delete" className="gray-s">
                                                            <i className="uil uil-trash-alt"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">2</td>
                                                    <td className="cell-ta">WordPress Pro Certificate</td>
                                                    <td className="text-center">14</td>
                                                    <td className="text-center">20</td>
                                                    <td className="text-center">4 April 2019</td>
                                                    <td className="text-center">
                                                        <a
                                                            href="http://gambolthemes.net/html-imgs/certificate.jpg"
                                                            target="_blank"
                                                        >
                                                            View
                                                        </a>
                                                    </td>
                                                    <td className="text-center">
                                                        <a href="#" title="Delete" className="gray-s">
                                                            <i className="uil uil-trash-alt"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">3</td>
                                                    <td className="cell-ta">HTML CSS Certificate</td>
                                                    <td className="text-center">18</td>
                                                    <td className="text-center">20</td>
                                                    <td className="text-center">3 April 2019</td>
                                                    <td className="text-center">
                                                        <a
                                                            href="http://gambolthemes.net/html-imgs/certificate.jpg"
                                                            target="_blank"
                                                        >
                                                            View
                                                        </a>
                                                    </td>
                                                    <td className="text-center">
                                                        <a href="#" title="Delete" className="gray-s">
                                                            <i className="uil uil-trash-alt"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default InstructorCertificates;
