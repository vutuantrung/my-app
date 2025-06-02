import { IMAGES } from '../../../constants';
import { generateRandomNumber } from '../../../helpers/helpers';

const Discussions = () => {
    return (
        <div className="student_reviews">
            <div className="row">
                <div className="col-lg-12">
                    <div className="review_right">
                        <div className="review_right_heading">
                            <h3>Discussions</h3>
                        </div>
                    </div>
                    <div className="cmmnt_1526">
                        <div className="cmnt_group">
                            <div className="img160">
                                <img src={IMAGES.avatar} alt="" />
                            </div>
                            <textarea className="_cmnt001" placeholder="Add a public comment"></textarea>
                        </div>
                        <button className="cmnt-btn" type="submit">
                            Comment
                        </button>
                    </div>
                    <div className="review_all120">
                        <div className="review_item">
                            <div className="review_usr_dt">
                                <img src={`../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`} alt="" />
                                <div className="rv1458">
                                    <h4 className="tutor_name1">John Doe</h4>
                                    <span className="time_145">2 hour ago</span>
                                </div>
                                <div className="eps_dots more_dropdown">
                                    <a href="#">
                                        <i className="uil uil-ellipsis-v"></i>
                                    </a>
                                    <div className="dropdown-content">
                                        <span>
                                            <i className="uil uil-comment-alt-edit"></i>Edit
                                        </span>
                                        <span>
                                            <i className="uil uil-trash-alt"></i>Delete
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="rvds10">
                                Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante
                                ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.
                            </p>
                            <div className="rpt101">
                                <a href="#" className="report155">
                                    <i className="uil uil-thumbs-up"></i> 10
                                </a>
                                <a href="#" className="report155">
                                    <i className="uil uil-thumbs-down"></i> 1
                                </a>
                                <a href="#" className="report155">
                                    <i className="uil uil-heart"></i>
                                </a>
                                <a href="#" className="report155 ml-3">
                                    Reply
                                </a>
                            </div>
                        </div>
                        <div className="review_reply">
                            <div className="review_item">
                                <div className="review_usr_dt">
                                    <img
                                        src={`../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`}
                                        alt=""
                                    />
                                    <div className="rv1458">
                                        <h4 className="tutor_name1">Rock Doe</h4>
                                        <span className="time_145">1 hour ago</span>
                                    </div>
                                    <div className="eps_dots more_dropdown">
                                        <a href="#">
                                            <i className="uil uil-ellipsis-v"></i>
                                        </a>
                                        <div className="dropdown-content">
                                            <span>
                                                <i className="uil uil-trash-alt"></i>Delete
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="rvds10">Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
                                <div className="rpt101">
                                    <a href="#" className="report155">
                                        <i className="uil uil-thumbs-up"></i> 4
                                    </a>
                                    <a href="#" className="report155">
                                        <i className="uil uil-thumbs-down"></i> 2
                                    </a>
                                    <a href="#" className="report155">
                                        <i className="uil uil-heart"></i>
                                    </a>
                                    <a href="#" className="report155 ml-3">
                                        Reply
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discussions;
