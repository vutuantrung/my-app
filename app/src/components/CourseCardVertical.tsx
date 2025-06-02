import { Link } from 'react-router-dom';

const CourseCardVertical = (courseInfor: any) => {
    return (
        <div className="item">
            <div className="fcrse_1 mb-20">
                <Link to={`coursDetails/${courseInfor.id}`} className="fcrse_img">
                    <img src={courseInfor.theme} alt="" />
                    <div className="course-overlay">
                        <div>
                            {courseInfor.isBestSeller && <div className="badge_seller">Bestseller</div>}
                            {courseInfor.point > 4.5 && (
                                <div className="crse_reviews">
                                    <i className="uil uil-star"></i>
                                    {courseInfor.point.toFixed(1)}
                                </div>
                            )}
                        </div>
                        <span className="play_btn1">
                            <i className="uil uil-play"></i>
                        </span>
                        <div className="crse_timer">{courseInfor.length}</div>
                    </div>
                </Link>
                <div className="fcrse_content">
                    <div className="eps_dots more_dropdown">
                        <a href="#">
                            <i className="uil uil-ellipsis-v"></i>
                        </a>
                        <div className="dropdown-content">
                            <span>
                                <i className="uil uil-share-alt"></i>Share
                            </span>
                            <span>
                                <i className="uil uil-heart"></i>Save
                            </span>
                            <span>
                                <i className="uil uil-ban"></i>Not Interested
                            </span>
                            <span>
                                <i className="uil uil-windsock"></i>Report
                            </span>
                        </div>
                    </div>
                    <div className="vdtodt">
                        <span className="vdt14">{courseInfor.views} views</span>
                        <span className="vdt14">{courseInfor.createdDate} ago</span>
                    </div>
                    <Link to={`coursDetails/${courseInfor.id}`} className="crse14s">
                        {courseInfor.name}
                    </Link>
                    <a href="#" className="crse-cate">
                        {courseInfor.tag}
                    </a>
                    <div className="auth1lnkprce">
                        <p className="cr1fot">
                            By <a href="#">{courseInfor.author}</a>
                        </p>
                        <div className="prce142">{courseInfor.price}</div>
                        <button className="shrt-cart-btn" title="cart">
                            <i className="uil uil-shopping-cart-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCardVertical;
