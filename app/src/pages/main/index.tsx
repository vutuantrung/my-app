import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Body } from './Body';

import LiveStream from './LiveStream/LiveStream';
import Explore from './Explore/Explore';
import SavedCourses from './SavedCourses/SavedCourses';
import Settings from './Settings/Settings';
import Help from './Help/Help';
import ReportHistory from './ReportHistory/ReportHistory';
import Feedback from './Feedback/Feedback';
import InstructorProfile from './InstructorProfile/InstructorProfile';
import CoursDetails from './CourseDetails';

import MyInstructorProfileView from './MyInstructorProfile';
import AboutMe from './MyInstructorProfile/AboutMe';
import Discussions from './MyInstructorProfile/Discussions';
import MyCourses from './MyInstructorProfile/MyCourses';
import PurchasedCourses from './MyInstructorProfile/PurchasedCourses';
import Subscriptions from './MyInstructorProfile/Subscriptions';
import LiveOutput from './LiveStream/LiveOutput';
import AllInstructors from './InstructorProfile/AllInstructors';
import AddStream from './LiveStream/AddStream';
import AppHeader from '../../Layouts/AppHeader';
import AppLeftsideBar from '../../Layouts/AppLeftsideBar';
import CardSamples from './CardSamples/CardSamples';

const Main = () => {
    const [docState, setDocState] = useState('');

    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
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
            <AppLeftsideBar />
            <div className="wrapper app-footer-padding">
                <Routes>
                    <Route path="" Component={Body} />

                    <Route path="cardSamples" Component={CardSamples} />

                    <Route path="explore" Component={Explore} />
                    <Route path="savedCourses" Component={SavedCourses} />
                    <Route path="settings" Component={Settings} />
                    <Route path="help" Component={Help} />
                    <Route path="reportHistory" Component={ReportHistory} />
                    <Route path="feedback" Component={Feedback} />

                    <Route path="liveStream" Component={LiveStream} />
                    <Route path="liveStream/output/:id" Component={LiveOutput} />
                    <Route path="liveStream/add" Component={AddStream} />

                    <Route path="instructorProfile/all" Component={AllInstructors} />
                    <Route path="instructorProfile/view/:id" Component={InstructorProfile} />

                    <Route path="coursDetails/:id" Component={CoursDetails} />

                    <Route path="myInstructorProfile" Component={MyInstructorProfileView}>
                        <Route path="aboutMe" Component={AboutMe} />
                        <Route path="discussions" Component={Discussions} />
                        <Route path="myCourses" Component={MyCourses} />
                        <Route path="purchasedCourses" Component={PurchasedCourses} />
                        <Route path="subscriptions" Component={Subscriptions} />
                    </Route>
                </Routes>
            </div>
        </>
    );
};

export default Main;
