import { useEffect, useState } from 'react';

import { LiveStreamSection } from './LiveStreamSection';
import { FeatureCoursesSection } from './FeatureCoursesSection';
import { NewestCoursesSection } from './NewestCoursesSection';
import { GuildsSection } from './GuildsSection';
import { PopularInstructorsSection } from './PopularInstructorsSection';
import { RightSideBar } from './RightSideBar';
import { StudentThoughtsSection } from './StudentThoughtsSection';
import AppFooter from '../../../Layouts/AppFooter';
import Earth from '../../../components/Earth';
import CardAlexruix3 from '../../../components/Cards/CardAlexruix3';
import BubbleAvatars from '../../../components/BubbleAvatars';
import BubbleAvatars2 from '../../../components/BubbleAvatars2';
import WordCloud from '../../working/WordCloud/WordCloud';

export const Body = () => {
    const [docState, setDocState] = useState('');

    useEffect(() => {
        console.log(document.readyState);
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            setTimeout(() => {
                console.log(document.readyState);
                setDocState(document.readyState);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        const carouselOptions = {
            loop: true,
            nav: true,
            dots: false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
        };

        if (docState === 'complete') {
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
            // Featured Courses home
            ($('.featured_courses') as any).owlCarousel({
                ...carouselOptions,
                items: 10,
                margin: 20,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 1 },
                    1200: { items: 2 },
                    1400: { items: 3 },
                },
            });
            // Featured Courses home
            ($('.top_instrutors') as any).owlCarousel({
                ...carouselOptions,
                items: 10,
                margin: 20,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 1 },
                    1200: { items: 2 },
                    1400: { items: 3 },
                },
            });
            // Student Says
            ($('.Student_says') as any).owlCarousel({
                ...carouselOptions,
                items: 10,
                margin: 30,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 2 },
                    1200: { items: 3 },
                    1400: { items: 3 },
                },
            });
        }
    }, [docState]);
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8" style={{ paddingRight: "0px" }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <BubbleAvatars />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', height: '400px' }}>
                                <WordCloud />
                            </div>
                            <LiveStreamSection />
                            <FeatureCoursesSection />
                            <NewestCoursesSection />
                            <GuildsSection />
                            <PopularInstructorsSection />
                        </div>

                        <div className="col-xl-3 col-lg-4">
                            <RightSideBar />
                        </div>

                        <div className="col-xl-12 col-lg-12" style={{ padding: "0px" }}>
                            <StudentThoughtsSection />
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};
