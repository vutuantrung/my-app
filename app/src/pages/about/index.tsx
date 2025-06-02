import { Route, NavLink, Routes } from 'react-router-dom';

import AboutUs from './AboutUs';
import OurBlog from './OurBlog';
import Career from './Career';
import Press from './Press';
import CompanyDetails from './CompanyDetails';
import PageHeader from '../../Layouts/PageHeader';
import AppFooter from '../../Layouts/AppFooter';

const About = () => {
    return (
        <>
            <PageHeader />
            <div className="wrapper _bg4586 _new89 app-footer-padding">
                <div className="_215cd2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="course_tabs">
                                    <nav>
                                        <div className="nav nav-tabs tab_crse  justify-content-center">
                                            <NavLink to="aboutUs" className="nav-item nav-link">
                                                About
                                            </NavLink>
                                            <NavLink to="ourBlog" className="nav-item nav-link">
                                                Blog
                                            </NavLink>
                                            <NavLink to="companyDetails" className="nav-item nav-link">
                                                Company
                                            </NavLink>
                                            <NavLink to="career" className="nav-item nav-link">
                                                Careers
                                            </NavLink>
                                            <NavLink to="press" className="nav-item nav-link">
                                                Press
                                            </NavLink>
                                        </div>
                                    </nav>
                                </div>
                                <div className="title129 mt-35 mb-35">
                                    <h2>What others are saying</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path="" Component={AboutUs} />
                    <Route path="aboutUs" Component={AboutUs} />
                    <Route path="ourBlog" Component={OurBlog} />
                    <Route path="companyDetails" Component={CompanyDetails} />
                    <Route path="career" Component={Career} />
                    <Route path="press" Component={Press} />
                </Routes>
                <AppFooter />
            </div>
        </>
    );
};

export default About;
