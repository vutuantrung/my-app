import { Link } from 'react-router-dom';
import AppFooter from '../../../Layouts/AppFooter';
import { generateRandomNumber } from '../../../helpers/helpers';
import LiveStreamCard from '../../../components/LiveStreamCard';

const LiveStream = () => {
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

    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8">
                            <div className="section3125">
                                <h4 className="item_title">All Live Streams</h4>
                                <div className="la5lo1">
                                    <div className="row">
                                        {streamDumpData.map((item) => {
                                            return (
                                                <div key={item.id} className="mb-30 col-md-3">
                                                    <LiveStreamCard {...item} />
                                                </div>
                                            );
                                        })}
                                        <div className="col-md-12">
                                            <div className="main-loader mt-20">
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
                        <div className="col-xl-3 col-lg-4">
                            <div className="right_side">
                                <div className="fcrse_3">
                                    <div className="cater_ttle">
                                        <h4>Live Streaming</h4>
                                    </div>
                                    <div className="live_text">
                                        <div className="live_icon">
                                            <i className="uil uil-kayak"></i>
                                        </div>
                                        <div className="live-content">
                                            <p>Set up your channel and stream live to your students</p>
                                            <button
                                                className="live_link"
                                                onClick={() => "window.location.href = 'add_streaming.html';"}
                                            >
                                                Get Started
                                            </button>
                                            <span className="livinfo">Info : This feature only for 'Instructors'.</span>
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

export default LiveStream;
