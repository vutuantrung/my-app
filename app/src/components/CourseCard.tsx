import { Link } from 'react-router-dom';

const CourseCard = (item: any) => {
    return (
        <div key={item.id} className="col-lg-3 col-md-4">
            <div className="fcrse_1 mt-30">
                <Link to={`/coursDetails/${item.id}`}>
                    <div className="fcrse_img">
                        <img src={item.thumbs} alt="" />
                        <div className="course-overlay">
                            {item.isBestSeller && <div className="badge_seller">Bestseller</div>}
                            {item.points && (
                                <div className="crse_reviews">
                                    <i className="uil uil-star"></i>
                                    {item.points}
                                </div>
                            )}
                            <span className="play_btn1">
                                <i className="uil uil-play"></i>
                            </span>
                            <div className="crse_timer">{item.length}</div>
                        </div>
                    </div>
                </Link>
                <div className="fcrse_content">
                    <div className="eps_dots more_dropdown">
                        <a href="/#">
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
                        <span className="vdt14">{`${item.views} views`}</span>
                        <span className="vdt14">{`${item.publishedDate} ago`}</span>
                    </div>
                    <Link to={`coursDetails/${item.id}`}>
                        <div className="crse14s">{item.name}</div>
                    </Link>
                    <a href="/#" className="crse-cate">
                        {item.category}
                    </a>
                    <div className="auth1lnkprce">
                        <p className="cr1fot">
                            By <a href="/#">{item.author}</a>
                        </p>
                        <div className="prce142">{item.price}</div>
                        <button className="shrt-cart-btn" title="cart">
                            <i className="uil uil-shopping-cart-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
