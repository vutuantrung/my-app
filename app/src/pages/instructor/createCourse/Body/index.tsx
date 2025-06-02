import PageFooter from '../../../../Layouts/PageFooter';
import CreateCoursSteps from './CreateCoursSteps';

const Body = () => {
    return (
        <div className="wrapper page-footer-padding">
            <div className="sa4d25">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-analysis"></i> Create New Course
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <CreateCoursSteps />
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
};

export default Body;
