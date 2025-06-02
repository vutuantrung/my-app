import { Link } from 'react-router-dom';

const OurBlog = () => {
    return (
        <>
            <div className="_205ef5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="fcrse_3 mt-50">
                                <ul className="blogleft12">
                                    <li>
                                        <div className="explore_search blg152">
                                            <div className="ui search focus">
                                                <div className="ui left icon input swdh11 swdh15">
                                                    <input className="prompt srch_explore" type="text" placeholder="Search" />
                                                    <i className="uil uil-search-alt icon icon2"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href="#collapse1"
                                            className="category-topics cate-right collapsed"
                                            data-toggle="collapse"
                                            role="button"
                                            aria-expanded="true"
                                            aria-controls="collapse1"
                                        >
                                            Labels
                                        </a>
                                        <div className="collapse" id="collapse1">
                                            <ul className="category-card">
                                                <li>
                                                    <a href="##" className="category-item1 active">
                                                        All
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        Students
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        Instructors
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        Ideas & Opinions
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        Edututs+ News
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        Social Innovation
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <a
                                            href="#collapse2"
                                            className="category-topics cate-right collapsed"
                                            data-toggle="collapse"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapse2"
                                        >
                                            Archive
                                        </a>
                                        <div className="collapse" id="collapse2">
                                            <ul className="category-card">
                                                <li>
                                                    <a href="##" className="category-item1">
                                                        January 2020
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        February 2020
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        March 2020
                                                    </a>
                                                    <a href="##" className="category-item1">
                                                        April 2020
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="socl148">
                                            <button
                                                className="twiter158"
                                                data-href="#"
                                                onClick={() => 'sharingPopup(this);'}
                                                id="twitter-share"
                                            >
                                                <i className="uil uil-twitter ic45"></i>Follow
                                            </button>
                                            <button
                                                className="facebook158"
                                                data-href="#"
                                                onClick={() => 'sharingPopup(this);'}
                                                id="facebook-share"
                                            >
                                                <i className="uil uil-facebook ic45"></i>Follow
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="help_link">
                                            <p>Learn More</p>
                                            <a href="##">Cursus Help Center</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            <div className="blogbg_1 mt-50">
                                <Link to="/blogSingleView/1234" className="hf_img">
                                    <img src="images/blog/img-1.jpg" alt="" />
                                    <div className="course-overlay"></div>
                                </Link>
                                <div className="hs_content">
                                    <div className="vdtodt">
                                        <span className="vdt14">109k views</span>
                                        <span className="vdt14">March 10, 2020</span>
                                    </div>
                                    <Link to="/blogSingleView/1234" className="crse14s title900">
                                        Blog Title Here
                                    </Link>
                                    <p className="blog_des">
                                        Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc
                                        et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor,
                                        vitae fringilla quam interdum mollis arcu.
                                    </p>
                                    <Link to="/blogSingleView/1234" className="view-blog-link">
                                        Read More<i className="uil uil-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="blogbg_1 mt-30">
                                <Link to="/blogSingleView/2222" className="hf_img">
                                    <img src="images/blog/img-2.jpg" alt="" />
                                    <div className="course-overlay"></div>
                                </Link>
                                <div className="hs_content">
                                    <div className="vdtodt">
                                        <span className="vdt14">109k views</span>
                                        <span className="vdt14">March 10, 2020</span>
                                    </div>
                                    <Link to="/blogSingleView/2222" className="crse14s title900">
                                        Blog Title Here
                                    </Link>
                                    <p className="blog_des">
                                        Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc
                                        et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor
                                        interdum mollis arcu interdum mollis arcu.
                                    </p>
                                    <Link to="/blogSingleView/2222" className="view-blog-link">
                                        Read More<i className="uil uil-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="blogbg_1 mt-30">
                                <Link to="/blogSingleView/3333" className="hf_img">
                                    <img src="images/blog/img-3.jpg" alt="" />
                                    <div className="course-overlay"></div>
                                </Link>
                                <div className="hs_content">
                                    <div className="vdtodt">
                                        <span className="vdt14">109k views</span>
                                        <span className="vdt14">March 10, 2020</span>
                                    </div>
                                    <Link to="/blogSingleView/3333" className="crse14s title900">
                                        Blog Title Here
                                    </Link>
                                    <p className="blog_des">
                                        Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc
                                        et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor
                                        interdum mollis arcu.
                                    </p>
                                    <Link to="/blogSingleView/3333" className="view-blog-link">
                                        Read More<i className="uil uil-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="blogbg_1 mt-30">
                                <Link to="/blogSingleView/4444" className="hf_img">
                                    <img src="images/blog/img-4.jpg" alt="" />
                                    <div className="course-overlay"></div>
                                </Link>
                                <div className="hs_content">
                                    <div className="vdtodt">
                                        <span className="vdt14">109k views</span>
                                        <span className="vdt14">March 10, 2020</span>
                                    </div>
                                    <Link to="/blogSingleView/4444" className="crse14s title900">
                                        Blog Title Here
                                    </Link>
                                    <p className="blog_des">
                                        Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc
                                        et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor
                                        interdum mollis arcu.
                                    </p>
                                    <Link to="/blogSingleView/4444" className="view-blog-link">
                                        Read More<i className="uil uil-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="main-p-pagination">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="##" aria-label="Previous">
                                                PREV
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link active" href="##">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="##">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="##">
                                                ...
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="##">
                                                24
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="##" aria-label="Next">
                                                NEXT
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurBlog;
