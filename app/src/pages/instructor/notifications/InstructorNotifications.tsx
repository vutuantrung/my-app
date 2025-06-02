import PageFooter from '../../../Layouts/PageFooter';
import { IMAGES } from '../../../constants';

const InstructorNotifications = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-bell"></i> Notifications
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <a href="#" className="setting_noti">
                                Notification Setting
                            </a>
                            <div className="all_msg_bg">
                                <div className="channel_my item all__noti5">
                                    <div className="profile_link">
                                        <img src={IMAGES.avatar} alt="" />
                                        <div className="pd_content">
                                            <h6>Rock William</h6>
                                            <p className="noti__text5">
                                                Like Your Comment On Video <strong>How to create sidebar menu</strong>.
                                            </p>
                                            <span className="nm_time">2 min ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="channel_my item all__noti5">
                                    <div className="profile_link">
                                        <img src={IMAGES.avatar} alt="" />
                                        <div className="pd_content">
                                            <h6>Jassica Smith</h6>
                                            <p className="noti__text5">
                                                Added New Review In Video <strong>Full Stack PHP Developer</strong>.
                                            </p>
                                            <span className="nm_time">12 min ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="channel_my item all__noti5">
                                    <div className="profile_link">
                                        <img src={IMAGES.avatar} alt="" />
                                        <div className="pd_content">
                                            <p className="noti__text5"> Your Membership Activated.</p>
                                            <span className="nm_time">20 min ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="channel_my item all__noti5">
                                    <div className="profile_link">
                                        <img src={IMAGES.avatar} alt="" />
                                        <div className="pd_content">
                                            <p className="noti__text5">
                                                {' '}
                                                Your Course Approved Now.{' '}
                                                <a href="#" className="crse_bl">
                                                    How to create sidebar menu
                                                </a>
                                                .
                                            </p>
                                            <span className="nm_time">20 min ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageFooter />
        </>
    );
};

export default InstructorNotifications;
