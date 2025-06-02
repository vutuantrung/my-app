import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../../../helpers/helpers';
import AppFooter from '../../../Layouts/AppFooter';

const AllInstructors = () => {
    const dumpData = [
        {
            id: 12351,
            name: 'John Doe',
            category: 'Wordpress & Plugin Tutor',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#', yt: '#' },
            studentNumber: '100K',
            coursNumber: 15,
        },
        {
            id: 7658,
            name: 'Kerstin Cable',
            category: 'Language Learning Coach, Writer, Online Tutor',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#', yt: '#' },
            studentNumber: '14K',
            coursNumber: 12,
        },
        {
            id: 5767,
            name: 'Jose Portilla',
            category: 'Head of Data Science, Pierian Data Inc.',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#', yt: '#' },
            studentNumber: '1M',
            coursNumber: 51,
        },
        {
            id: 2222,
            name: 'Kyle Pew',
            category: 'Microsoft Certified Trainer - 380,000+ Udemy Students',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#' },
            studentNumber: '1M',
            coursNumber: 42,
        },
        {
            id: 1269,
            name: 'Jaysen Batchelor',
            category: 'Illustrator & Designer',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#', yt: '#' },
            studentNumber: '305K',
            coursNumber: 25,
        },
        {
            id: 987,
            name: 'Quinton Batchelor',
            category: 'Photographer & Instructor',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#', yt: '#' },
            studentNumber: '419K',
            coursNumber: 12,
        },
        {
            id: 131,
            name: 'Eli Natoli',
            category: 'Entrepreneur - Passionate Teacher',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { tw: '#', lk: '#', yt: '#' },
            studentNumber: '123K',
            coursNumber: 13,
        },
        {
            id: 2356,
            name: 'Sunny William',
            category: 'Entrepreneur - Passionate Teacher',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#', yt: '#' },
            studentNumber: '2K',
            coursNumber: 8,
        },
        {
            id: 3267,
            name: 'Neha Smith',
            category: 'English Teacher',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', lk: '#', yt: '#' },
            studentNumber: '953K',
            coursNumber: 35,
        },
        {
            id: 236,
            name: 'Sukhwinder Singh',
            category: 'Web Development',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', yt: '#' },
            studentNumber: '12K',
            coursNumber: 21,
        },
        {
            id: 363,
            name: 'Saloni Prabhakar',
            category: 'Photographer',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            socialUrls: { fb: '#', tw: '#', lk: '#' },
            studentNumber: '1K',
            coursNumber: 7,
        },
    ];
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-lg-8">
                            <div className="section3125">
                                <div className="explore_search">
                                    <div className="ui search focus">
                                        <div className="ui left icon input swdh11">
                                            <input className="prompt srch_explore" type="text" placeholder="Search Tutors..." />
                                            <i className="uil uil-search-alt icon icon2"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="_14d25">
                                <div className="row">
                                    {dumpData.map((item) => {
                                        return (
                                            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                                                <div className="fcrse_1 mt-30">
                                                    <div className="tutor_img">
                                                        <Link to={`/instructorProfile/view/${item.id}`}>
                                                            <img src={item.avatar} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="tutor_content_dt">
                                                        <div className="tutor150">
                                                            <Link to={`/instructorProfile/view/${item.id}`}>
                                                                <div className="tutor_name">{item.name}</div>
                                                            </Link>
                                                            <div className="mef78" title="Verify">
                                                                <i className="uil uil-check-circle"></i>
                                                            </div>
                                                        </div>
                                                        <div className="tutor_cate">{item.category}</div>
                                                        <ul className="tutor_social_links">
                                                            {item.socialUrls.fb && (
                                                                <li>
                                                                    <a href={item.socialUrls.fb} className="fb">
                                                                        <i className="fab fa-facebook-f"></i>
                                                                    </a>
                                                                </li>
                                                            )}
                                                            {item.socialUrls.tw && (
                                                                <li>
                                                                    <a href={item.socialUrls.tw} className="tw">
                                                                        <i className="fab fa-twitter"></i>
                                                                    </a>
                                                                </li>
                                                            )}
                                                            {item.socialUrls.lk && (
                                                                <li>
                                                                    <a href={item.socialUrls.lk} className="ln">
                                                                        <i className="fab fa-linkedin-in"></i>
                                                                    </a>
                                                                </li>
                                                            )}
                                                            {item.socialUrls.yt && (
                                                                <li>
                                                                    <a href={item.socialUrls.yt} className="yu">
                                                                        <i className="fab fa-youtube"></i>
                                                                    </a>
                                                                </li>
                                                            )}
                                                        </ul>
                                                        <div className="tut1250">
                                                            <span className="vdt15">{item.studentNumber} Students</span>
                                                            <span className="vdt15">{item.coursNumber} Courses</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="col-md-12">
                                        <div className="main-loader mt-50">
                                            <div className="spinner">
                                                <div className="bounce1"></div>
                                                <div className="bounce2"></div>
                                                <div className="bounce3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};

export default AllInstructors;
