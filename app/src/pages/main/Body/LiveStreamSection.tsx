import { Link } from 'react-router-dom';

import { generateRandomNumber } from '../../../helpers/helpers';
import LiveStreamCard from '../../../components/LiveStreamCard';

export const LiveStreamSection = (props: any) => {
    const dumpData = [
        {
            id: 12723,
            isLive: true,
            name: 'John Doe',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 8435,
            isLive: true,
            name: 'Jassica',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 72334,
            isLive: true,
            name: 'Edututs+',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 72315,
            isLive: true,
            name: 'Joginder Singh',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 6231,
            isLive: true,
            name: 'Zoena',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 5625,
            isLive: true,
            name: 'Ridhima',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 72317,
            isLive: true,
            name: 'Albert Dua',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 87314,
            isLive: true,
            name: 'Amritpal',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
        {
            id: 12161,
            isLive: true,
            name: 'Jimmy',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
        },
    ];
    return (
        <div className="section3125">
            <h4 className="item_title">Live Streams</h4>
            <Link to="liveStream" className="see150">
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
    );
};
