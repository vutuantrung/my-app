import { generateRandomNumber } from '../../../helpers/helpers';
import CourseCardVertical from '../../../components/CourseCardVertical';

export const FeatureCoursesSection = () => {
    const dumpData = [
        {
            id: 15123,
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
            isBestSeller: true,
            theme: `./assets/images/test/img_cours_sample/${generateRandomNumber(1, 18)}.jpg`,
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
        <div className="section3125 mt-50">
            <h4 className="item_title">Featured Courses</h4>
            <a href="all_featured_courses" className="see150">
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
