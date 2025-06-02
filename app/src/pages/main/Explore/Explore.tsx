import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppFooter from '../../../Layouts/AppFooter';
import { generateRandomNumber } from '../../../helpers/helpers';
import LiveStreamCard from '../../../components/LiveStreamCard';

const Explore = () => {
    useEffect(() => {
        const navText = ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"];
        const carouselOptions = {
            loop: true,
            nav: true,
            dots: false,
            navText: navText,
        };

        ($('.ui.dropdown') as any).dropdown();
        // === Model === //
        ($('.ui.modal') as any).modal({ blurring: true }).modal('show');
        // === Tab === //
        ($('.menu .item') as any).tab();
        // === checkbox Toggle === //
        ($('.ui.checkbox') as any).checkbox();
        // === Toggle === //
        $('.enable.button').on('click', function () {
            ($(this).nextAll('.checkbox') as any).checkbox('enable');
        });

        // Home Live Stream
        ($('.live_stream') as any).owlCarousel({
            ...carouselOptions,
            items: 10,
            margin: 10,
            responsive: {
                0: { items: 2 },
                600: { items: 3 },
                1000: { items: 3 },
                1200: { items: 5 },
                1400: { items: 6 },
            },
        });
        /*Floating Code for Iframe Start*/
        if (
            $(
                'iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"],iframe[src*="https://player.vimeo.com/"]'
            ).length > 0
        ) {
            /*Wrap (all code inside div) all vedio code inside div*/
            $('iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"]').wrap(
                "<div class='iframe-parent-class'></div>"
            );
            /*main code of each (particular) vedio*/
            $('iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"]').each(function (index) {
                /*Floating js Start*/
                const windows = $(window);
                const iframeWrap = $(this).parent();
                const iframe = $(this);
                const iframeHeight = iframe.outerHeight();
                windows.on('scroll', function () {
                    const windowScrollTop = windows.scrollTop();
                    const iframeBottom = iframeHeight! + iframeWrap.offset()!.top;

                    if (windowScrollTop! > iframeBottom) {
                        iframeWrap.height(iframeHeight!);
                        iframe.addClass('stuck');
                        $('.scrolldown').css({ display: 'none' });
                    } else {
                        iframeWrap.height('auto');
                        iframe.removeClass('stuck');
                    }
                });
                /*Floating js End*/
            });
        }
    }, []);
    const streamDumpData = [
        {
            name: 'John Doe',
            id: 23456,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Jassica',
            id: 3424,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Edututs+',
            id: 5742,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Joginder Singh',
            id: 12453,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Zoena',
            id: 3645,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Albert Dua',
            id: 1235,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Ridhima',
            id: 3463,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Amritpal',
            id: 63756,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Jimmy',
            id: 24572,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Quinton Batchelor',
            id: 4234,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Eli Natoli',
            id: 32452,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Jaysen Batchelor',
            id: 7456,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Farhat Amin',
            id: 432,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Kyle Pew',
            id: 23567,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Kerstin Cable',
            id: 7357,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
        {
            name: 'Jose Portilla',
            id: 235,
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            isLive: true,
        },
    ];
    const courseDumpData = [
        {
            id: 123412,
            name: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
            category: 'Web Development | Python',
            price: '$10',
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            thumbs: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            isBestSeller: false,
            points: '',
            length: '22 hours',
            views: '11',
            publishedDate: '5 days',
            author: 'John Doe',
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
                                            <input
                                                className="prompt srch_explore"
                                                type="text"
                                                placeholder="Search for Tuts Videos, Tutors, Tests and more.."
                                                style={{ paddingLeft: '60px' }}
                                            />
                                            <i className="uil uil-search-alt icon icon2"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="section3125 mb-15 mt-50">
                                <h4 className="item_title">Live Streams</h4>
                                <a href="live_streams.html" className="see150">
                                    See all
                                </a>
                                <div className="la5lo1">
                                    <div className="owl-carousel live_stream owl-theme">
                                        {streamDumpData.map((item) => {
                                            return <LiveStreamCard key={item.id} {...item} />;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
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
                                                                {item.isBestSeller && (
                                                                    <div className="badge_seller">Bestseller</div>
                                                                )}
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

export default Explore;
