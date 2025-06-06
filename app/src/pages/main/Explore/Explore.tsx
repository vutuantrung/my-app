import styles from './Explore.module.css';

import { useEffect, useState } from 'react';

import AppFooter from '../../../Layouts/AppFooter';
import { generateRandomNumber } from '../../../helpers/helpers';
import LiveStreamCard from '../../../components/LiveStreamCard';
import CourseCard from '../../../components/CourseCard';
import SearchingCard from '../../../components/SearchingCard';

const Explore = () => {
    const [searchingModelName, setSearchingModelName] = useState<string>('');
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
            $('iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"],iframe[src*="https://player.vimeo.com/"]')
                .length > 0
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

    async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const modelName = event.currentTarget.value.trim();
            // Checking in javdatabase if image exists
            if (modelName) {
                setSearchingModelName(modelName);
                let queryName = !modelName.includes(' ') ? modelName : modelName.split(' ').join('-').toLowerCase();
                console.log(`Searching for model: ${queryName}`);

                // Todo: search in sqlite database
                const modelData = null;
                if (!modelData) {
                    const isJavDatabaseExists = await checkJavDatabaseExists(modelName);
                    const isJJGirlsExists = await checkJJGirlseExists(modelName);
                    console.log(`Model Name: ${modelName}`);
                    console.log(`JavDatabase Exists: ${isJavDatabaseExists}`);
                    console.log(`JJGirls Exists: ${isJJGirlsExists}`);
                    if (isJavDatabaseExists) {
                        fetch(`http://localhost:3001/api/scrape?modelName=${queryName}`)
                            .then((res) => {
                                console.log(res.ok);
                                return res;
                            })
                            .then((html) => console.log(html))
                            .catch((err) => console.error('Fetch error:', err));
                    }
                }
            }
        }
    }

    function checkJavDatabaseExists(modelName: string): Promise<boolean> {
        return new Promise((resolve) => {
            const imageUrl = `https://www.javdatabase.com/idolimages/full/${modelName}.webp`;
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                resolve(true);
            };
            img.onerror = () => {
                resolve(false);
            };
        });
    }

    function checkJJGirlseExists(modelName: string): Promise<boolean> {
        return new Promise((resolve) => {
            const imageUrl = `https://jjgirls.com/japanese/${modelName}/1/${modelName}-1.jpg`;
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                resolve(true);
            };
            img.onerror = () => {
                resolve(false);
            };
        });
    }

    const searchResult = [
        {
            name: 'nodoka-sakuraha',
            country: 'japan',
            height: 155,
            measurement: '90-57-88',
            dob: '1999-02-14',
            metadata: 'jjgirls, javdatabase',
            saved: false,
        },
        {
            name: 'hikaru-nagi',
            country: 'japan',
            height: 162,
            measurement: '105-59-88',
            dob: '1997-04-06',
            metadata: 'javdatabase',
            saved: true,
        },
        {
            name: 'eimi-fukada',
            country: 'japan',
            height: 158,
            measurement: '85-59-91',
            dob: '1998-03-18',
            metadata: 'jjgirls, javdatabase',
            saved: true,
        },
    ];

    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-lg-8">
                            <div className="ui search focus">
                                <div className="ui left icon input swdh11">
                                    <input
                                        onKeyDown={handleKeyDown}
                                        className="prompt srch_explore"
                                        type="text"
                                        placeholder="Search for model name..."
                                    />
                                    <i
                                        className="uil uil-search-alt icon icon2"
                                        style={{ width: '35px', height: '30px', padding: '25px 0px 25px 20px' }}
                                    ></i>
                                </div>
                            </div>
                            <div className={styles['search-result']} style={{ display: 'flex', flexDirection: 'row' }}>
                                {searchResult.length > 0 &&
                                    searchResult.map((item, index) => {
                                        return <SearchingCard key={item.name} {...item} />;
                                    })}
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
                                    {courseDumpData.map((item) => (
                                        <CourseCard key={item.id} {...item} />
                                    ))}
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
