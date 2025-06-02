import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IMAGES } from '../../../constants';
import { generateRandomNumber } from '../../../helpers/helpers';
import AppFooter from '../../../Layouts/AppFooter';
import LiveStreamCard from '../../../components/LiveStreamCard';

const LiveOutput = () => {
    const dumpData = [
        {
            id: 12723,
            isLive: true,
            name: 'John Doe',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 8435,
            isLive: true,
            name: 'Jassica',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 72334,
            isLive: true,
            name: 'Edututs+',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 72315,
            isLive: true,
            name: 'Joginder Singh',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 6231,
            isLive: true,
            name: 'Zoena',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 5625,
            isLive: true,
            name: 'Ridhima',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 72317,
            isLive: true,
            name: 'Albert Dua',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 87314,
            isLive: true,
            name: 'Amritpal',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 12161,
            isLive: true,
            name: 'Jimmy',
            avatar: `../../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
    ];

    useEffect(() => {
        const carouselOptions = {
            loop: true,
            nav: true,
            dots: false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
        };
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
    }, []);
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8">
                            <div className="section3125">
                                <div className="live1452">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/34Na4j8AVgA?si=5zzQUKQorF6hFn5A"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="user_dt5">
                                    <div className="user_dt_left">
                                        <div className="live_user_dt">
                                            <div className="user_img5">
                                                <img src={IMAGES.avatar} alt="" />
                                            </div>
                                            <div className="user_cntnt">
                                                <h4>Jassica William</h4>
                                                <button className="subscribe-btn">Subscribe</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_dt_right">
                                        <ul>
                                            <li>
                                                <a href="##" className="lkcm152">
                                                    <i className="uil uil-eye"></i>
                                                    <span>1452</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="##" className="lkcm152">
                                                    <i className="uil uil-thumbs-up"></i>
                                                    <span>100</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="##" className="lkcm152">
                                                    <i className="uil uil-thumbs-down"></i>
                                                    <span>20</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="##" className="lkcm152">
                                                    <i className="uil uil-share-alt"></i>
                                                    <span>9</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4">
                            <div className="right_side">
                                <div className="fcrse_3">
                                    <div className="cater_ttle">
                                        <h4>Live Chat</h4>
                                    </div>
                                    <div className="live_chat">
                                        <div className="chat1">
                                            <p>
                                                <a href="#">John Doe</a>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Donec aliquet molestie leo ac pellentesque
                                            </p>
                                            <p>
                                                <a href="#">Poonam</a>Class aptent taciti sociosqu ad litora torquent per conubia
                                                nostra
                                            </p>
                                            <p>
                                                <a href="#">Jass</a>Nulla sollicitudin nec nisi at pellentesque. Cras fringilla
                                                est et sem tempor
                                            </p>
                                            <p>
                                                <a href="#">Albert Smith</a>Pellentesque ultricies risus sit amet congue euismod
                                            </p>
                                            <p>
                                                <a href="#">Jassica William</a>Nullam efficitur tristique consequat
                                            </p>
                                            <p>
                                                <a href="#">Joy Dua</a>Proin sed leo eleifend,
                                            </p>
                                            <p>
                                                <a href="#">Zoena Singh</a>Aliquam dignissim elementum sem id rutrum
                                            </p>
                                            <p>
                                                <a href="#">Amritpal Singh</a>Fusce a elit at libero sollicitudin tincidunt
                                            </p>
                                            <p>
                                                <a href="#">Johnson</a>Ut laoreet lobortis ornare
                                            </p>
                                            <p>
                                                <a href="#">Jashan</a>Sed pretium erat eu turpis condimentum
                                            </p>
                                        </div>
                                    </div>
                                    <div className="live_comment">
                                        <input className="live_input" type="text" placeholder="Say Something..." />
                                        <button className="btn_live">
                                            <i className="uil uil-message"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="section3125 mb-15 mt-20">
                                <h4 className="item_title">Live Streams</h4>
                                <Link to="/liveStream" className="see150">
                                    See all
                                </Link>
                                <div className="la5lo1">
                                    <div className="owl-carousel live_stream owl-theme">
                                        {dumpData.map((item) => {
                                            return <LiveStreamCard key={item.id} {...item} />;
                                        })}
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

export default LiveOutput;
