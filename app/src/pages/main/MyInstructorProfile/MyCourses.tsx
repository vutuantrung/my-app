import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../../../helpers/helpers';

const MyCourses = () => {
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
        {
            id: 6234,
            name: 'WordPress for Beginners: Create a Website Step by Step',
            category: 'Design | Wordpress',
            price: '$18',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: true,
            points: '5.0',
            length: '5.4 hours',
            views: '109k',
            publishedDate: '15 days',
            author: 'John Doe',
        },
        {
            id: 62342,
            name: 'CSS - The Complete Guide 2020 (incl. Flexbox, Grid & Sass)',
            category: 'Design | CSS',
            price: '$10',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: true,
            points: '4.0',
            length: '23 hours',
            views: '196K',
            publishedDate: '1 month',
            author: 'John Doe',
        },
        {
            id: 6346,
            name: 'Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex)',
            category: 'Development | Vue JS',
            price: '$10',
            thumbs: `../assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: false,
            points: '',
            length: '22 hours',
            views: '11',
            publishedDate: '5 days',
            author: 'John Doe',
        },
    ];
    return (
        <div className="crse_content">
            <h3>My courses (8)</h3>
            <div className="_14d25">
                <div className="row">
                    {courseDumpData.map((item) => {
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
                                            <span className="vdt14">{item.views} views</span>
                                            <span className="vdt14">{item.publishedDate} ago</span>
                                        </div>
                                        <Link to={`coursDetails/${item.id}`}>
                                            <div className="crse14s">{item.name}</div>
                                        </Link>
                                        <a href="#" className="crse-cate">
                                            {item.category}
                                        </a>
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyCourses;
