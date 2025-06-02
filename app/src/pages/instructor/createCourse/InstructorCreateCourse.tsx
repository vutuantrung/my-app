import { useEffect, useState } from 'react';

import CreateCoursSteps from './Body/CreateCoursSteps';
import PageFooter from '../../../Layouts/PageFooter';

const InstructorCreateCourse = () => {
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
            ($('.ui.dropdown') as any).dropdown();

            ($('#add-course-tab') as any).steps({
                onFinish: function () {
                    alert('Wizard Completed');
                },
            });
        }
    }, [docState]);

    return (
        <>
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
        </>
    );
};

export default InstructorCreateCourse;
