import { Link } from 'react-router-dom';

import { generateRandomNumber } from '../../../helpers/helpers';
import InstructorCard from '../../../components/InstructorCard';

export const PopularInstructorsSection = () => {
    const dumpData = [
        {
            id: 12512,
            name: 'John Doe',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Wordpress & Plugin Tutor',
            studentNumber: '100K',
            coursNumber: '15',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 2534,
            name: 'Kerstin Cable',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Language Learning Coach, Writer, Online Tutor',
            studentNumber: '14K',
            coursNumber: '11',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 7123,
            name: 'Jose Portilla',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Head of Data Science, Pierian Data Inc.',
            studentNumber: '1M',
            coursNumber: '25',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 5953,
            name: 'Farhat Amin',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Cookery Coach',
            studentNumber: '1.5K',
            coursNumber: '9',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 126766,
            name: 'Kyle Pew',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            studentNumber: '300K',
            coursNumber: '18',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 66633,
            name: 'Jaysen Batchelor',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Illustrator & Designer',
            studentNumber: '491K',
            coursNumber: '13',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 112233,
            name: 'Quinton Batchelor',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Photographer & Instructor',
            studentNumber: '364K',
            coursNumber: '6',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
        {
            id: 9673,
            name: 'Eli Natoli',
            avatar: `./assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Entrepreneur - Passionate Teacher',
            studentNumber: '615K',
            coursNumber: '16',
            socialLinks: {
                facebookUrl: '#',
                twitterUrl: '#',
                linkedinUrl: '#',
                youtubeUrl: '#',
            },
        },
    ];
    return (
        <div className="section3125 mt-50">
            <h4 className="item_title">Popular Instructors</h4>
            <Link to="instructorProfile/all" className="see150">
                See all
            </Link>
            <div className="la5lo1">
                <div className="owl-carousel top_instrutors owl-theme">
                    {dumpData.map((item) => {
                        return <InstructorCard key={item.id} {...item} />;
                    })}
                </div>
            </div>
        </div>
    );
};
