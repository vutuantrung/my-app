import GeneralInfoSteps from './components/GeneralInfoSteps';
import ViewStep from './components/ViewStep';
import CoursContentStep from './components/CoursContentStep';
import ExtraInfoStep from './components/ExtraInfoStep';

export default function CreateCoursSteps() {
    return (
        <div className="col-12">
            <div className="course_tabs_1">
                <div id="add-course-tab" className="step-app">
                    <ul className="step-steps">
                        <li className="active">
                            <a href="#tab_step1">
                                <span className="number"></span>
                                <span className="step-name">General Information</span>
                            </a>
                        </li>
                        <li>
                            <a href="#tab_step2">
                                <span className="number"></span>
                                <span className="step-name">View</span>
                            </a>
                        </li>
                        <li>
                            <a href="#tab_step3">
                                <span className="number"></span>
                                <span className="step-name">Course Content</span>
                            </a>
                        </li>
                        <li>
                            <a href="#tab_step4">
                                <span className="number"></span>
                                <span className="step-name">Extra Information</span>
                            </a>
                        </li>
                    </ul>
                    <div className="step-content">
                        <div className="step-tab-panel step-tab-info active" id="tab_step1">
                            <GeneralInfoSteps />
                        </div>

                        <div className="step-tab-panel step-tab-gallery" id="tab_step2">
                            <ViewStep />
                        </div>

                        <div className="step-tab-panel step-tab-location" id="tab_step3">
                            <CoursContentStep />
                        </div>

                        <div className="step-tab-panel step-tab-amenities" id="tab_step4">
                            <ExtraInfoStep />
                        </div>
                    </div>
                    <div className="step-footer step-tab-pager">
                        <button data-direction="prev" className="btn btn-default steps_btn">
                            PREVIOUS
                        </button>
                        <button data-direction="next" className="btn btn-default steps_btn">
                            Next
                        </button>
                        <button data-direction="finish" className="btn btn-default steps_btn">
                            Submit for Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
