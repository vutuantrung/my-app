import PageFooter from '../../../Layouts/PageFooter';
import { IMAGES } from '../../../constants';

const InstructorMessages = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-comments"></i> Messages
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="all_msg_bg">
                                <div className="row no-gutters">
                                    <div className="col-xl-4 col-lg-5 col-md-12">
                                        <div className="msg_search">
                                            <div className="ui search focus">
                                                <div className="ui left icon input swdh11 swdh15">
                                                    <input
                                                        className="prompt srch_explore"
                                                        type="text"
                                                        placeholder="Search Messages..."
                                                    />
                                                    <i className="uil uil-search-alt icon icon8"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="simplebar-content-wrapper">
                                            <div className="group_messages">
                                                <div className="chat__message__dt active">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">2</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">John Doe</span>
                                                        </p>
                                                        <p className="user-status-text">
                                                            Hi! Sir, How are you. I ask you one thing please explain it this video
                                                            price.
                                                        </p>
                                                        <p className="user-status-time floaty">7 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">3</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Kerstin Cable</span>
                                                        </p>
                                                        <p className="user-status-text">
                                                            Hello, I paid you video tutorial but did not play error 404.
                                                        </p>
                                                        <p className="user-status-time floaty">8 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">1</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Jose Portilla</span>
                                                        </p>
                                                        <p className="user-status-text">Thanks Sir, Such a nice video.</p>
                                                        <p className="user-status-time floaty">15 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">7</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Farhat Amin</span>
                                                        </p>
                                                        <p className="user-status-text">
                                                            Hi! Sir, this is a purchase key CFKX12536ERUJSKLL
                                                        </p>
                                                        <p className="user-status-time floaty">22 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">12</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Kyle Pew</span>
                                                        </p>
                                                        <p className="user-status-text">Pls! Upload .NET Course</p>
                                                        <p className="user-status-time floaty">2 days ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Eli Natoli</span>
                                                        </p>
                                                        <p className="user-status-text">
                                                            Hi Sir thank you very very much for bootstrap full course.
                                                        </p>
                                                        <p className="user-status-time floaty">5 days ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">6</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Jaysen Batchelor</span>
                                                        </p>
                                                        <p className="user-status-text">Thank you! Sir</p>
                                                        <p className="user-status-time floaty">7 days ago</p>
                                                    </div>
                                                </div>
                                                <div className="chat__message__dt">
                                                    <div className="user-status">
                                                        <div className="user-avatar">
                                                            <img src={IMAGES.avatar_instructor_0} alt="" />
                                                            <div className="msg__badge">1</div>
                                                        </div>
                                                        <p className="user-status-title">
                                                            <span className="bold">Quinton Batchelor</span>
                                                        </p>
                                                        <p className="user-status-text">Hey!</p>
                                                        <p className="user-status-time floaty">13 days ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-7 col-md-12">
                                        <div className="chatbox_right">
                                            <div className="chat_header">
                                                <div className="user-status">
                                                    <div className="user-avatar">
                                                        <img src={IMAGES.avatar_instructor_0} alt="" />
                                                    </div>
                                                    <p className="user-status-title">
                                                        <span className="bold">John Doe</span>
                                                    </p>
                                                    <p className="user-status-tag online">Online</p>
                                                    <div className="user-status-time floaty eps_dots eps_dots5 more_dropdown">
                                                        <a href="#">
                                                            <i className="uil uil-ellipsis-h"></i>
                                                        </a>
                                                        <div className="dropdown-content">
                                                            <span>
                                                                <i className="uil uil-trash-alt"></i>Delete
                                                            </span>
                                                            <span>
                                                                <i className="uil uil-ban"></i>Block
                                                            </span>
                                                            <span>
                                                                <i className="uil uil-windsock"></i>Report
                                                            </span>
                                                            <span>
                                                                <i className="uil uil-volume-mute"></i>Mute
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="messages-line simplebar-content-wrapper2 scrollstyle_4">
                                                <div className="mCustomScrollbar">
                                                    <div className="main-message-box ta-right">
                                                        <div className="message-dt">
                                                            <div className="message-inner-dt">
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                                                    rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                                                                    felis porttitor.
                                                                </p>
                                                            </div>
                                                            <span>Sat, April 10, 1:08 PM</span>
                                                        </div>
                                                    </div>
                                                    <div className="main-message-box st3">
                                                        <div className="message-dt st3">
                                                            <div className="message-inner-dt">
                                                                <p>Cras ultricies ligula.</p>
                                                            </div>
                                                            <span>5 minutes ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="main-message-box ta-right">
                                                        <div className="message-dt">
                                                            <div className="message-inner-dt">
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                                                    rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                                                                    felis porttitor.
                                                                </p>
                                                            </div>
                                                            <span>Sat, April 10, 1:08 PM</span>
                                                        </div>
                                                    </div>
                                                    <div className="main-message-box st3">
                                                        <div className="message-dt st3">
                                                            <div className="message-inner-dt">
                                                                <p>Lorem ipsum dolor sit amet</p>
                                                            </div>
                                                            <span>2 minutes ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="main-message-box ta-right">
                                                        <div className="message-dt">
                                                            <div className="message-inner-dt">
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                                                    rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                                                                    felis porttitor.
                                                                </p>
                                                            </div>
                                                            <span>Sat, April 10, 1:08 PM</span>
                                                        </div>
                                                    </div>
                                                    <div className="main-message-box st3">
                                                        <div className="message-dt st3">
                                                            <div className="message-inner-dt">
                                                                <p>....</p>
                                                            </div>
                                                            <span>Typing...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="message-send-area">
                                                <form>
                                                    <div className="mf-field">
                                                        <div className="ui search focus input__msg">
                                                            <div className="ui left icon input swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    id="chat-widget-message-text-2"
                                                                    name="chat_widget_message_text_2"
                                                                    placeholder="Write a message..."
                                                                />
                                                            </div>
                                                        </div>
                                                        <button className="add_msg" type="submit">
                                                            <i className="uil uil-message"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
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

export default InstructorMessages;
