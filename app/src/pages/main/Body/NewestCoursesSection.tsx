import CourseCardVertical from '../../../components/CourseCardVertical';
import { generateRandomNumber } from '../../../helpers/helpers';

export const NewestCoursesSection = () => {
    const dumpData = [
        {
            id: 1512,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
            tag: 'Web Development | Python',
            author: 'John Doe',
            price: '$10',
            point: 4.5,
            length: '25 hours',
            views: '5M',
            createdDate: '15 days',
        },
        {
            id: 1111,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'The Complete JavaScript Course 2020: Build Real Projects!',
            tag: 'Development | JavaScript',
            author: 'Jassica William',
            price: '$5',
            point: 4.5,
            length: '28 hours',
            views: '109k',
            createdDate: '15 days',
        },
        {
            id: 482,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Beginning C++ Programming - From Beginner to Beyond',
            tag: 'Development | C++',
            author: 'Joginder Singh',
            price: '$13',
            point: 4.5,
            length: '12 hours',
            views: '1M',
            createdDate: '18 days',
        },
        {
            id: 62333,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'The Complete Digital Marketing Course - 12 Courses in 1',
            tag: 'Digital Marketing | Marketing',
            author: 'Poonam Verma',
            price: '$12',
            point: 5,
            length: '16 hours',
            views: '153k',
            createdDate: '18 days',
        },
        {
            id: 723341,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Microsoft Excel - Excel from Beginner to Advanced',
            tag: 'Office Productivity | Excel',
            author: 'Rock William',
            price: '$6',
            point: 4.5,
            length: '1.5 hours',
            views: '53k',
            createdDate: '14 days',
        },
        {
            id: 15167112,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'Angular 8 - The Complete Guide (2020 Edition)',
            tag: 'Development | Angular',
            author: 'John Doe',
            price: '$6',
            point: 5,
            length: '15 hours',
            views: '253k',
            createdDate: '10 days',
        },
        {
            id: 6967,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'WordPress for Beginners: Create a Website Step by Step',
            tag: 'Design | Wordpress',
            author: 'Sabnam SIngh',
            price: '$18',
            point: 5,
            length: '5.4 hours',
            views: '109k',
            createdDate: '15 days',
        },
        {
            id: 26123,
            isBestSeller: false,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
            name: 'CSS - The Complete Guide 2020 (incl. Flexbox, Grid & Sass)',
            tag: 'Design | CSS',
            author: 'Jashanpreet Singh',
            price: '$10',
            point: 4,
            length: '23 hours',
            views: '196k',
            createdDate: '1 month',
        },
    ];
    return (
        <div className="section3125 mt-30">
            <h4 className="item_title">Newest Courses</h4>
            <a href="all_newest_courses.html" className="see150">
                See all
            </a>
            <div className="la5lo1">
                <div className="owl-carousel featured_courses owl-theme">
                    {dumpData.map((item) => {
                        return <CourseCardVertical key={item.id} {...item} />;
                    })}
                </div>
            </div>
        </div>
    );
};
