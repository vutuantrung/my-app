import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../../../helpers/helpers';

const PurchasedCourses = () => {
    const courseDumpData = [
        {
            id: 123412,
            name: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
            category: 'Web Development | Python',
            price: '$10',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: true,
            points: '4.5',
            length: '25 hours',
            views: '109k',
            publishedDate: '15 days',
            author: 'John Doe',
        },
        {
            id: 2345,
            name: 'The Complete JavaScript Course 2020: Build Real Projects!',
            category: 'Development | JavaScript',
            price: '$5',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: true,
            points: '4.5',
            length: '28 hours',
            views: '5M',
            publishedDate: '15 days',
            author: 'John Doe',
        },
        {
            id: 6452,
            name: 'WordPress Development - Themes, Plugins & Gutenberg',
            category: 'Design | Wordpress',
            price: '$14',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: false,
            points: '5.0',
            length: '21 hours',
            views: '200',
            publishedDate: '4 days',
            author: 'John Doe',
        },
        {
            id: 125,
            name: 'The Complete Digital Marketing Course - 12 Courses in 1',
            category: 'Digital Marketing | Marketing',
            price: '$12',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: true,
            points: '5.0',
            length: '1 hour',
            views: '153K',
            publishedDate: '3 months',
            author: 'John Doe',
        },
        {
            id: 351,
            name: 'The Complete Node.js Developer Course (3rd Edition)',
            category: 'Development | Node.js',
            price: '$3',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: false,
            points: '',
            length: '30 hours',
            views: '20',
            publishedDate: '1 day',
            author: 'John Doe',
        },
    ];
    return (
        <div className="tab-pane fade show" id="nav-purchased" role="tabpanel">
            <div className="_htg451">
                <div className="_htg452">
                    <h3>Purchased Courses</h3>
                    <div className="row">
                        <div className="col-md-9">
                            {courseDumpData.map((item) => {
                                return (
                                    <div key={item.id} className="fcrse_1 mt-30">
                                        <Link to={`/coursDetails/${item.id}`}>
                                            <div className="hf_img">
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
                                        <div className="hs_content">
                                            <div className="eps_dots eps_dots10 more_dropdown">
                                                <a href="#">
                                                    <i className="uil uil-ellipsis-v"></i>
                                                </a>
                                                <div className="dropdown-content">
                                                    <span>
                                                        <i className="uil uil-download-alt"></i>Download
                                                    </span>
                                                    <span>
                                                        <i className="uil uil-trash-alt"></i>Delete
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="vdtodt">
                                                <span className="vdt14">{item.views} views</span>
                                                <span className="vdt14">{item.publishedDate} ago</span>
                                            </div>
                                            <Link to={`/coursDetails/${item.id}`}>
                                                <div className="crse14s title900">{item.name}</div>
                                            </Link>
                                            <a href="#" className="crse-cate">
                                                {item.category}
                                            </a>
                                            <div className="purchased_badge">Purchased</div>
                                            <div className="auth1lnkprce">
                                                <p className="cr1fot">
                                                    By <a href="#">{item.author}</a>
                                                </p>
                                                <div className="prce142">{item.price}</div>
                                                <button className="shrt-cart-btn" title="cart">
                                                    <i className="uil uil-shopping-cart-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PurchasedCourses;
