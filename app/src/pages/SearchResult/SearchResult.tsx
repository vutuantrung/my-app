import { Link } from 'react-router-dom';

import { generateRandomNumber } from '../../helpers/helpers';

import '../../assets/styles/css/style.css';
import PageHeader from '../../Layouts/PageHeader';
import AppFooter from '../../Layouts/AppFooter';

const SearchResult = () => {
    const topic = [
        { name: 'SEO', count: 428 },
        { name: 'PHP', count: 1526 },
        { name: 'Wordpress Pro', count: 452 },
        { name: 'WooCommerce', count: 161 },
        { name: 'Bootstrap', count: 1265 },
        { name: 'Web Development', count: 7123 },
        { name: 'Web Design', count: 1261 },
        { name: 'Digital Marketing', count: 121 },
        { name: 'E-commerce', count: 612 },
        { name: 'Wordpress Themes', count: 1218 },
        { name: 'Wordpress Plugins', count: 1125 },
        { name: 'Wordpress Hosting', count: 2912 },
        { name: 'Elementor', count: 712 },
        { name: 'Wordpress for Ecommerce', count: 6123 },
    ];
    const levels = [
        { name: 'All Levels', count: 5102 },
        { name: 'Beginner', count: 3151 },
        { name: 'Intermediate', count: 1412 },
        { name: 'Expert', count: 539 },
    ];
    const languages = [
        { name: 'English', count: 610 },
        { name: 'Español', count: 215 },
        { name: 'Português', count: 265 },
        { name: '日本語', count: 511 },
        { name: 'Deutsch', count: 151 },
        { name: 'Français', count: 216 },
        { name: 'Türkçe', count: 11 },
        { name: 'हिन्दी', count: 8 },
        { name: 'Italiano', count: 167 },
        { name: 'Polski', count: 123 },
        { name: 'ภาษาไทย', count: 61 },
        { name: 'Română', count: 119 },
        { name: 'Telugu', count: 2 },
        { name: 'मराठी', count: 12 },
    ];
    const prices = [
        { name: 'Paid', count: 5122 },
        { name: 'Free', count: 3112 },
    ];
    const features = [
        { name: 'Captions', count: 1215 },
        { name: 'Quizzes', count: 211 },
        { name: 'Coding Exercises', count: 623 },
        { name: 'Practice Tests', count: 1112 },
    ];
    const ratings = [
        { name: '5.0 & up', stars: 5, count: 1251 },
        { name: '4.0 & up', stars: 4, count: 2151 },
        { name: '3.0 & up', stars: 3, count: 3512 },
        { name: '2.0 & up', stars: 2, count: 4122 },
    ];
    const videoDurations = [
        { name: '0-2 Hours', count: 8121 },
        { name: '3-6 Hours', count: 6241 },
        { name: '7-18 Hours', count: 3121 },
        { name: '19+ Hours', count: 621 },
    ];
    const closeCaptions = [
        { name: 'English', count: 5121 },
        { name: 'Español', count: 1242 },
        { name: 'Português', count: 121 },
        { name: '日本語', count: 3411 },
        { name: 'Deutsch', count: 152 },
        { name: 'Français', count: 512 },
        { name: 'Türkçe', count: 6 },
        { name: 'हिन्दी', count: 12 },
    ];
    const dumpData = [
        {
            id: 15123,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
            tag: 'Web Development | Python',
            author: 'John Doe',
            price: '$10',
            point: 4.5,
            views: '5M',
            length: '25 hours',
            createdDate: '15 days',
        },
        {
            id: 1267,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'The Complete JavaScript Course 2020: Build Real Projects!',
            tag: 'Development | JavaScript',
            author: 'Jassica William',
            price: '$10',
            point: 4.5,
            views: '109k',
            length: '25 hours',
            createdDate: '15 days',
        },
        {
            id: 612,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Beginning C++ Programming - From Beginner to Beyond',
            tag: 'Development | C++',
            author: 'Joginder Singh',
            price: '$13',
            point: 4.5,
            views: '1M',
            length: '12 hours',
            createdDate: '18 days',
        },
        {
            id: 1281,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'The Complete Digital Marketing Course - 12 Courses in 1',
            tag: 'Digital Marketing | Marketing',
            author: 'Poonam Verma',
            price: '$12',
            point: 5,
            views: '153k',
            length: '16 hours',
            createdDate: '18 days',
        },
        {
            id: 9452,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Microsoft Excel - Excel from Beginner to Advanced',
            tag: 'Office Productivity | Excel',
            author: 'Rock William',
            price: '$6',
            point: 4.5,
            views: '53K',
            length: '1.5 hours',
            createdDate: '14 days',
        },
        {
            id: 11111,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Angular 8 - The Complete Guide (2020 Edition)',
            tag: 'Development | Angular',
            author: 'John Doe',
            price: '$6',
            point: 5,
            views: '253K',
            length: '15 hours',
            createdDate: '10 days',
        },
        {
            id: 83111,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'WordPress for Beginners: Create a Website Step by Step',
            tag: 'Design | Wordpress',
            author: 'Sabnam Singh',
            price: '$18',
            point: 5,
            views: '109k',
            length: '5.4 hours',
            createdDate: '15 days',
        },
        {
            id: 6666,
            isFeaturedCours: true,
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'CSS - The Complete Guide 2020 (incl. Flexbox, Grid & Sass)',
            tag: 'Design | CSS',
            author: 'Jashanpreet Singh',
            price: '$10',
            point: 4,
            views: '196k',
            length: '23 hours',
            createdDate: '1 month',
        },
    ];
    return (
        <>
            <PageHeader />
            <div className="wrapper _bg4586 _new89 app-footer-padding">
                <div className="_215b15">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title125">
                                    <div className="titleleft">
                                        <div className="ttl121">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item">
                                                        <Link to="/">Home</Link>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        Search Results
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="titleright">
                                        <div className="explore_search">
                                            <div className="ui search focus">
                                                <div className="ui left icon input swdh11 swdh15">
                                                    <input className="prompt srch_explore" type="text" placeholder="Search" />
                                                    <i className="uil uil-search-alt icon icon2"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="title126">
                                    <h2>Search Results</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sa4d25 mb4d25">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-3 col-md-4">
                                <div className="section3125 hstry142">
                                    <div className="result_stitles">
                                        <div className="rs6t_title">Filters</div>
                                        <div className="filter_selector">
                                            <div className="ui inline dropdown flt145">
                                                <div className="text">Sort</div>
                                                <i className="dropdown icon"></i>
                                                <div className="menu">
                                                    <div className="item">Most Relevant</div>
                                                    <div className="item">Most Reviewed</div>
                                                    <div className="item">Highest Rated</div>
                                                    <div className="item">Newest</div>
                                                    <div className="item">Lowest Price</div>
                                                    <div className="item">Highest Price</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tb_145">
                                        <div className="panel-group accordion" id="accordionfilter">
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingOne">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseOne"
                                                            href="#collapseOne"
                                                            aria-expanded="false"
                                                            aria-controls="collapseOne"
                                                        >
                                                            Topic
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapseOne"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingOne"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {topic.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingTwo">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseTwo"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapseTwo"
                                                        >
                                                            Level
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapseTwo"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingTwo"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {levels.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingThree">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseThree"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapseThree"
                                                        >
                                                            Language
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapseThree"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingThree"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {languages.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingfour">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapsefour"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapsefour"
                                                        >
                                                            Price
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapsefour"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingfour"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {prices.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingfive">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapsefive"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapsefive"
                                                        >
                                                            Features
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapsefive"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingfive"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {features.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingsix">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapsesix"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapsesix"
                                                        >
                                                            Rating
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapsesix"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingsix"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                <div className="ui form checkbox_sign">
                                                                    {ratings.map((item) => {
                                                                        return (
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label className="rating_filter">
                                                                                        {[...Array(item.stars)].map((_) => (
                                                                                            <i className="uil uil-star"></i>
                                                                                        ))}
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingseven">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseseven"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapseseven"
                                                        >
                                                            Video Duration
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapseseven"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingseven"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {videoDurations.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                            <div className="panel panel-default">
                                                <div className="panel-heading" id="headingeight">
                                                    <div className="panel-title10">
                                                        <a
                                                            className="collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseeight"
                                                            href="##"
                                                            aria-expanded="false"
                                                            aria-controls="collapseeight"
                                                        >
                                                            Close Caption
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    id="collapseeight"
                                                    className="panel-collapse collapse"
                                                    aria-labelledby="headingeight"
                                                    data-parent="#accordionfilter"
                                                >
                                                    <div className="panel-body">
                                                        <div className="ui form">
                                                            <div className="grouped fields">
                                                                {closeCaptions.map((item) => {
                                                                    return (
                                                                        <div key={item.name} className="ui form checkbox_sign">
                                                                            <div className="inline field">
                                                                                <div className="ui checkbox mncheck">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        tabIndex={0}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <label>
                                                                                        {item.name}
                                                                                        <span className="filter__counter">
                                                                                            ({item.count})
                                                                                        </span>
                                                                                    </label>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="_14d25 mb-20">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4 className="mhs_title">{dumpData.length} Results</h4>
                                            {dumpData.map((item) => {
                                                return (
                                                    <div key={item.id} className="fcrse_1 mt-30">
                                                        <Link to={`/coursDetails/${item.id}`}>
                                                            <div className="hf_img">
                                                                <img src={item.thumbs} alt="" />
                                                                <div className="course-overlay">
                                                                    <div className="badge_seller">Bestseller</div>
                                                                    {item.point && (
                                                                        <div className="crse_reviews">
                                                                            <i className="uil uil-star"></i>
                                                                            {item.point}
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
                                                                <a href="##">
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
                                                                <span className="vdt14">{item.createdDate} ago</span>
                                                            </div>
                                                            <Link to={`/coursDetails/${item.id}`}>
                                                                <div className="crse14s title900">{item.name}</div>
                                                            </Link>
                                                            <a href="##" className="crse-cate">
                                                                {item.tag}
                                                            </a>
                                                            <div className="purchased_badge">Purchased</div>
                                                            <div className="auth1lnkprce">
                                                                <p className="cr1fot">
                                                                    By <a href="##">{item.author}</a>
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
            </div>
        </>
    );
};

export default SearchResult;
