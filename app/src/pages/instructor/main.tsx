import { Route, Routes } from 'react-router-dom';

// import '../../assets/styles/css/instructor-responsive.css';
// import '../../assets/styles/css/instructor-dashboard.css';

import InstructorDashboard from './dashboard/InstructorDashboard';
import InstructorCourses from './courses/InstructorCourses';
import InstructorCreateCourse from './createCourse/InstructorCreateCourse';
import InstructorMessages from './messages/InstructorMessages';
import InstructorNotifications from './notifications/InstructorNotifications';
import InstructorCertificates from './certificates/InstructorCertificates';
import InstructorReviews from './reviews/InstructorReviews';
import InstructorEarning from './earning/InstructorEarning';
import InstructorPayout from './payout/InstructorPayout';
import InstructorStatement from './statement/InstructorStatement';
import InstructorVerification from './verification/InstructorVerification';
import InstructorAnalyics from './analyics/InstructorAnalyics';
import AppHeader from '../../Layouts/AppHeader';
import PageLeftsideBar from '../../Layouts/PageLeftsideBar';
import { useEffect, useState } from 'react';

const Instructor = () => {
    const [docState, setDocState] = useState('');

    console.log('document.onreadystatechange:', document.readyState);

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
        // console.log('main useEffect', document.readyState, docState);
        if (docState === 'complete') {
            console.log('gonna set ....');

            const querySelector = document.querySelector.bind(document);
            const nav = document.querySelector('.vertical_nav');
            const wrapper = document.querySelector('.wrapper');
            const menu = document.getElementById('js-menu');
            const subnavs = menu!.querySelectorAll('.menu--item__has_sub_menu');

            // Toggle menu click
            (querySelector('.toggle_menu') as any).onclick = function () {
                nav!.classList.toggle('vertical_nav__opened');
                wrapper!.classList.toggle('toggle-content');
            };

            // Minify menu on menu_minifier click
            (querySelector('.collapse_menu') as any).onclick = function () {
                nav!.classList.toggle('vertical_nav__minify');
                wrapper!.classList.toggle('wrapper__minify');

                for (let j = 0; j < subnavs.length; j++) {
                    subnavs[j].classList.remove('menu--subitens__opened');
                }
            };

            // Open Sub Menu
            for (let i = 0; i < subnavs.length; i++) {
                if (subnavs[i].classList.contains('menu--item__has_sub_menu')) {
                    (subnavs[i].querySelector('.menu--link') as any).addEventListener(
                        'click',
                        function (e: any) {
                            for (let j = 0; j < subnavs.length; j++) {
                                if (e.target.offsetParent !== subnavs[j]) {
                                    subnavs[j].classList.remove('menu--subitens__opened');
                                }
                            }
                            e.target.offsetParent.classList.toggle('menu--subitens__opened');
                        },
                        false
                    );
                }
            }
        }
    }, [docState]);

    return (
        <>
            <AppHeader />
            <PageLeftsideBar />
            <div className="wrapper page-footer-padding">
                <Routes>
                    <Route path="dashboard" Component={InstructorDashboard} />
                    <Route path="courses" Component={InstructorCourses} />
                    <Route path="analyics" Component={InstructorAnalyics} />
                    <Route path="createCourse" Component={InstructorCreateCourse} />
                    <Route path="messages" Component={InstructorMessages} />
                    <Route path="notifications" Component={InstructorNotifications} />
                    <Route path="certificates" Component={InstructorCertificates} />
                    <Route path="reviews" Component={InstructorReviews} />
                    <Route path="earning" Component={InstructorEarning} />
                    <Route path="payout" Component={InstructorPayout} />
                    <Route path="statement" Component={InstructorStatement} />
                    <Route path="verification" Component={InstructorVerification} />
                </Routes>
            </div>
        </>
    );
};

export default Instructor;
