import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants';

import AppFooter from '../../Layouts/AppFooter';
import PageHeader from '../../Layouts/PageHeader';

const ShoppingCart = () => {
    return (
        <>
            <PageHeader />
            <div className="wrapper _bg4586 _new89">
                <div className="_215b15">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title125">
                                    <div className="titleleft">
                                        <div className="ttl121">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item">
                                                        <Link to="/">Home</Link>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        Shopping Cart
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="title126">
                                    <h2>Shopping Cart</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb4d25">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="fcrse_1">
                                    <a href="course_detail_view.html" className="hf_img">
                                        <img className="cart_img" src={IMAGES.img_cours_sample_1} alt="" />
                                    </a>
                                    <div className="hs_content">
                                        <div className="eps_dots eps_dots10 more_dropdown">
                                            <a href="#">
                                                <i className="uil uil-times"></i>
                                            </a>
                                        </div>
                                        <a href="course_detail_view.html" className="crse14s title900 pt-2">
                                            The Web Developer Bootcamp
                                        </a>
                                        <a href="#" className="crse-cate">
                                            Web Development | Python
                                        </a>
                                        <div className="auth1lnkprce">
                                            <p className="cr1fot">
                                                By <a href="#">John Doe</a>
                                            </p>
                                            <div className="prce142">$10</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="membership_chk_bg rght1528">
                                    <div className="checkout_title">
                                        <h4>Total</h4>
                                        <img src="images/line.svg" alt="" />
                                    </div>
                                    <div className="order_dt_section">
                                        <div className="order_title">
                                            <h4>Orignal Price</h4>
                                            <div className="order_price">$15</div>
                                        </div>
                                        <div className="order_title">
                                            <h6>Discount Price</h6>
                                            <div className="order_price">$5</div>
                                        </div>
                                        <div className="order_title">
                                            <h2>Total</h2>
                                            <div className="order_price5">$10</div>
                                        </div>
                                        <div className="coupon_code">
                                            <p>Learn now is applied.</p>
                                            <div className="coupon_input">
                                                <div className="ui search focus mt-15">
                                                    <div className="ui left icon input swdh11 swdh19">
                                                        <input
                                                            className="prompt srch_explore"
                                                            type="text"
                                                            name="couponcode"
                                                            id="id_coupon_code"
                                                            required
                                                            maxLength={6}
                                                            placeholder="Enter Coupon Code"
                                                        />
                                                    </div>
                                                    <button className="code-apply-btn" type="submit">
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="chck-btn22">
                                            Checkout Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AppFooter />
            </div>
        </>
    );
};

export default ShoppingCart;
