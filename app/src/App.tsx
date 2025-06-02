import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import './assets/styles/css/style.css';
import './assets/styles/css/vertical-responsive-menu.min.css';
import './assets/styles/css/jquery-steps.css';
import './assets/styles/css/responsive.css';
import './assets/styles/css/night-mode.css';
import './assets/styles/css/instructor-responsive.css';
import './assets/styles/css/instructor-dashboard.css';

import Help from './pages/main/Help/Help';
import Settings from './pages/main/Settings/Settings';

import Explore from './pages/main/Explore/Explore';
import SavedCourses from './pages/main/SavedCourses/SavedCourses';
import ReportHistory from './pages/main/ReportHistory/ReportHistory';
import Feedback from './pages/main/Feedback/Feedback';
import LiveStream from './pages/main/LiveStream/LiveStream';
import LiveOutput from './pages/main/LiveStream/LiveOutput';
import AddStream from './pages/main/LiveStream/AddStream';

import CoursDetails from './pages/main/CourseDetails';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import SignUpSteps from './pages/SignUpSteps/SignUpSteps';

import PaidMembership from './pages/PaidMembership/PaidMembership';
import CheckoutMemberShip from './pages/checkoutMembership';
import Invoice from './pages/invoice';
import ApplyJob from './pages/applyJob';
import BlogSingleView from './pages/blogSingleView';
import SearchResult from './pages/SearchResult/SearchResult';
import Thankyou from './pages/Thankyou/Thankyou';
import CommingSoon from './pages/commingSoon';
import OurBlog from './pages/about/OurBlog';
import CompanyDetails from './pages/about/CompanyDetails';
import Career from './pages/about/Career';
import Press from './pages/about/Press';
import About from './pages/about';
import AboutUs from './pages/about/AboutUs';
import AboutMe from './pages/main/MyInstructorProfile/AboutMe';
import Discussions from './pages/main/MyInstructorProfile/Discussions';
import MyCourses from './pages/main/MyInstructorProfile/MyCourses';
import PurchasedCourses from './pages/main/MyInstructorProfile/PurchasedCourses';
import Subscriptions from './pages/main/MyInstructorProfile/Subscriptions';
import ContactUs from './pages/contactUs/ContactUs';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';
import Main from './pages/main';
import { Error404 } from './pages/errors';
import { Body } from './pages/main/Body';

import AllInstructors from './pages/main/InstructorProfile/AllInstructors';
import Instructor from './pages/instructor/main';
import InstructorCreateCourse from './pages/instructor/createCourse/InstructorCreateCourse';
import InstructorCourses from './pages/instructor/courses/InstructorCourses';
import InstructorDashboard from './pages/instructor/dashboard/InstructorDashboard';
import InstructorAnalyics from './pages/instructor/analyics/InstructorAnalyics';
import InstructorMessages from './pages/instructor/messages/InstructorMessages';
import InstructorNotifications from './pages/instructor/notifications/InstructorNotifications';
import InstructorCertificates from './pages/instructor/certificates/InstructorCertificates';
import InstructorReviews from './pages/instructor/reviews/InstructorReviews';
import InstructorEarning from './pages/instructor/earning/InstructorEarning';
import InstructorPayout from './pages/instructor/payout/InstructorPayout';
import InstructorStatement from './pages/instructor/statement/InstructorStatement';
import InstructorVerification from './pages/instructor/verification/InstructorVerification';
import InstructorProfile from './pages/main/InstructorProfile/InstructorProfile';

import MyInstructorProfileView from './pages/main/MyInstructorProfile';
import CertificateCenter from './pages/certificate/CertificateCenter';
import CertificateStartForm from './pages/certificate/StartForm/CertificateStartForm';
import CertificateFillForm from './pages/certificate/FillForm/CertificateFillForm';
import CertificateTestView from './pages/certificate/TestView/CertificateTestView';
import CertificateTestResult from './pages/certificate/TestResult/CertificateTestResult';
import CardSamples from './pages/main/CardSamples/CardSamples';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import WordCloud from './pages/working/WordCloud/WordCloud';
import PageFilpLayout from './pages/working/PageFilpLayout/PageFilpLayout';

const FoodCart = lazy(() => import('./pages/working/FoodCart/FoodCart'));
const ClipBlinds = lazy(() => import('./pages/working/ClipBlinds/ClipBlinds'));
const MonsterElectrico = lazy(() => import('./pages/working/MonsterElectrico/MonsterElectrico'));
const PerspectiveSlider = lazy(() => import('./pages/working/PerspectiveSlider/PerspectiveSlider'));
const ExpandingFlexCards = lazy(() => import('./pages/working/ExpandingFlexCards/ExpandingFlexCards'));
const SplitShowcase = lazy(() => import('./pages/working/SplitShowcase/SplitShowcase'));
const SplitImage = lazy(() => import('./pages/working/SplitImage/SplitImage'));
const FullImageReveal = lazy(() => import('./pages/working/FullImageReveal/FullImageReveal'));
const MotionRevealSlidesShow = lazy(() => import('./pages/working/MotionRevealSlidesShow/MotionRevealSlidesShow'));
const ImageSlider = lazy(() => import('./pages/working/ImageSlider/ImageSlider'));
const FreewallComponent = lazy(() => import('./pages/working/FreewallComponent/FreewallComponent'));

const App = () => {
    const [docState, setDocState] = useState('');

    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            document.onreadystatechange = () => {
                setDocState(document.readyState);
            };
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
            const nightModeActivated = localStorage.getItem('gmtNightMode');
            if (nightModeActivated) {
                document.documentElement.className += ' night-mode';
            }
        }
    }, [docState]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Main />}>
                    <Route path="" element={<Body />} />

                    <Route path="explore" element={<Explore />} />
                    <Route path="cardSamples" element={<CardSamples />} />
                    <Route path="savedCourses" element={<SavedCourses />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="help" element={<Help />} />
                    <Route path="reportHistory" element={<ReportHistory />} />
                    <Route path="feedback" element={<Feedback />} />

                    <Route path="liveStream" element={<LiveStream />}>
                        <Route path="output/:id" element={<LiveOutput />} />
                        <Route path="add" element={<AddStream />} />
                    </Route>

                    <Route path="instructorProfile">
                        <Route path="all" element={<AllInstructors />} />
                        <Route path="view/:id" element={<InstructorProfile />} />
                    </Route>

                    <Route path="coursDetails/:id" element={<CoursDetails />} />

                    <Route path="myInstructorProfile" element={<MyInstructorProfileView />}>
                        <Route path="aboutMe" element={<AboutMe />} />
                        <Route path="discussions" element={<Discussions />} />
                        <Route path="myCourses" element={<MyCourses />} />
                        <Route path="purchasedCourses" element={<PurchasedCourses />} />
                        <Route path="subscriptions" element={<Subscriptions />} />
                    </Route>
                </Route>

                <Route path="about" element={<About />}>
                    <Route path="aboutUs" element={<AboutUs />} />
                    <Route path="ourBlog" element={<OurBlog />} />
                    <Route path="companyDetails" element={<CompanyDetails />} />
                    <Route path="career" element={<Career />} />
                    <Route path="press" element={<Press />} />
                </Route>

                <Route path="instructor" element={<Instructor />}>
                    <Route path="dashboard" element={<InstructorDashboard />} />
                    <Route path="courses" element={<InstructorCourses />} />
                    <Route path="analyics" element={<InstructorAnalyics />} />
                    <Route path="createCourse" element={<InstructorCreateCourse />} />
                    <Route path="messages" element={<InstructorMessages />} />
                    <Route path="notifications" element={<InstructorNotifications />} />
                    <Route path="certificates" element={<InstructorCertificates />} />
                    <Route path="reviews" element={<InstructorReviews />} />
                    <Route path="earning" element={<InstructorEarning />} />
                    <Route path="payout" element={<InstructorPayout />} />
                    <Route path="statement" element={<InstructorStatement />} />
                    <Route path="verification" element={<InstructorVerification />} />
                </Route>

                <Route path="working">
                    <Route
                        path="monsterelectrico"
                        element={
                            <Suspense>
                                <MonsterElectrico />
                            </Suspense>
                        }
                    />
                    <Route
                        path="perspectiveSlider"
                        element={
                            <Suspense>
                                <PerspectiveSlider />
                            </Suspense>
                        }
                    />
                    <Route
                        path="clipBlinds"
                        element={
                            <Suspense>
                                <ClipBlinds />
                            </Suspense>
                        }
                    />
                    <Route
                        path="expandingFlexCards"
                        element={
                            <Suspense>
                                <ExpandingFlexCards />
                            </Suspense>
                        }
                    />
                    <Route
                        path="foodCart"
                        element={
                            <Suspense>
                                <FoodCart />
                            </Suspense>
                        }
                    />
                    <Route
                        path="splitShowcase"
                        element={
                            <Suspense>
                                <SplitShowcase />
                            </Suspense>
                        }
                    />
                    <Route
                        path="splitImage"
                        element={
                            <Suspense>
                                <SplitImage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="fullImageReveal"
                        element={
                            <Suspense>
                                <FullImageReveal />
                            </Suspense>
                        }
                    />
                    <Route
                        path="motionRevealSlidesShow"
                        element={
                            <Suspense>
                                <MotionRevealSlidesShow />
                            </Suspense>
                        }
                    />
                    <Route
                        path="imageSlider"
                        element={
                            <Suspense>
                                <ImageSlider />
                            </Suspense>
                        }
                    />
                    <Route
                        path="freewall"
                        element={
                            <Suspense>
                                <FreewallComponent />
                            </Suspense>
                        }
                    />
                    <Route
                        path="wordcloud0"
                        element={
                            <Suspense>
                                <WordCloud />
                            </Suspense>
                        }
                    />
                    <Route
                        path="pageFlipLayout"
                        element={
                            <Suspense>
                                <PageFilpLayout />
                            </Suspense>
                        }
                    />
                </Route>

                <Route path="termsOfUse" element={<TermsOfUse />} />
                <Route path="contactUs" element={<ContactUs />} />
                <Route path="shoppingCart" element={<ShoppingCart />} />

                <Route path="certificateCenter" element={<CertificateCenter />} />
                <Route path="certificateStartForm" element={<CertificateStartForm />} />
                <Route path="certificateFillForm" element={<CertificateFillForm />} />
                <Route path="certificateTestView" element={<CertificateTestView />} />
                <Route path="certificateTestResult" element={<CertificateTestResult />} />

                <Route path="signIn" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="signUpSteps" element={<SignUpSteps />} />
                <Route path="paidMembership" element={<PaidMembership />} />
                <Route path="checkoutMembership" element={<CheckoutMemberShip />} />
                <Route path="invoice" element={<Invoice />} />
                <Route path="applyJob/:id" element={<ApplyJob />} />
                <Route path="blogSingleView/:id" element={<BlogSingleView />} />

                <Route path="searchResult" element={<SearchResult />} />
                <Route path="thankyou" element={<Thankyou />} />
                <Route path="commingSoon" element={<CommingSoon />} />
                <Route path="error404" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
