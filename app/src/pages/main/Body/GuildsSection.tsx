import { ICONS } from '../../../constants';

export const GuildsSection = () => {
    return (
        <div className="section3126">
            <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                        <div className="value_icon">
                            <img src={ICONS.history} alt="" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="value_content">
                            <h4>Go at your own pace</h4>
                            <p>Enjoy lifetime access to courses on Edututs+'s website</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                        <div className="value_icon">
                            <img src={ICONS.user_check} alt="" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="value_content">
                            <h4>Learn from industry experts</h4>
                            <p>Select from top instructors around the world</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                        <div className="value_icon">
                            <img src={ICONS.play_circle} alt="" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="value_content">
                            <h4>Find video courses on almost any topic</h4>
                            <p>Build your library for your career and personal growth</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                        <div className="value_icon">
                            <img src={ICONS.presentation_graph} alt="" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="value_content">
                            <h4>100,000 online courses</h4>
                            <p>Explore a variety of fresh topics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
