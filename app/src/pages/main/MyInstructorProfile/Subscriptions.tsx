import { generateRandomNumber } from '../../../helpers/helpers';

const Subscriptions = () => {
    const dumpData = [
        {
            id: 1231,
            name: 'John Doe',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Wordpress & Plugin Tutor',
            numberStudents: '100K',
            numberCourses: '15',
        },
        {
            id: 452,
            name: 'Kerstin Cable',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Language Learning Coach, Writer, Online Tutor',
            numberStudents: '14K',
            numberCourses: '11',
        },
        {
            id: 7333,
            name: 'Jose Portilla',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Head of Data Science, Pierian Data Inc.',
            numberStudents: '1M',
            numberCourses: '25',
        },
        {
            id: 222,
            name: 'Jose Martin',
            avatar: `../assets/images/test/avatar_instructor/${generateRandomNumber(1, 25)}.jpg`,
            className: 'Developer',
            numberStudents: '121K',
            numberCourses: '12',
        },
    ];
    return (
        <div className="tab-pane fade show" id="nav-subscriptions" role="tabpanel">
            <div className="_htg451">
                <div className="_htg452">
                    <h3>Subscriptions</h3>
                    <div className="row">
                        {dumpData.map((item) => {
                            return (
                                <div key={item.id} className="col-lg-3 col-md-4">
                                    <div className="fcrse_1 mt-30">
                                        <div className="tutor_img">
                                            <a href="#">
                                                <img src={item.avatar} alt="" />
                                            </a>
                                        </div>
                                        <div className="tutor_content_dt">
                                            <div className="tutor150">
                                                <a href="#" className="tutor_name">
                                                    {item.name}
                                                </a>
                                                <div className="mef78" title="Verify">
                                                    <i className="uil uil-check-circle"></i>
                                                </div>
                                            </div>
                                            <div className="tutor_cate">{item.className}</div>
                                            <ul className="tutor_social_links">
                                                <li>
                                                    <button className="sbbc145">Subscribed</button>
                                                </li>
                                                <li>
                                                    <button className="sbbc146">
                                                        <i className="uil uil-bell"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="tut1250">
                                                <span className="vdt15">{item.numberStudents} Students</span>
                                                <span className="vdt15">{item.numberCourses} Courses</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;
