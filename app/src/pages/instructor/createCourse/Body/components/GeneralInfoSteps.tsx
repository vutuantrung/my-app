function GeneralInfoSteps() {
    return (
        <div className="tab-from-content">
            <div className="title-icon">
                <h3 className="title">
                    <i className="uil uil-info-circle"></i>General Information
                </h3>
            </div>
            <div className="course__form">
                <div className="general_info10">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="ui search focus mt-30 lbel25">
                                <label>Course Title*</label>
                                <div className="ui left icon input swdh19">
                                    <input
                                        className="prompt srch_explore"
                                        type="text"
                                        placeholder="Insert your course title."
                                        name="title"
                                        data-purpose="edit-course-title"
                                        maxLength={60}
                                        id="main[title]"
                                    />
                                    <div className="badge_num">60</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="ui search focus mt-30 lbel25">
                                <label>Course Subtitle*</label>
                                <div className="ui left icon input swdh19">
                                    <input
                                        className="prompt srch_explore"
                                        type="text"
                                        placeholder="Insert your course Subtitle."
                                        name="subtitle"
                                        data-purpose="edit-course-title"
                                        maxLength={60}
                                        id="sub[title]"
                                    />
                                    <div className="badge_num2">120</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="course_des_textarea mt-30 lbel25">
                                <label>Course Description*</label>
                                <div className="course_des_bg">
                                    <ul className="course_des_ttle">
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-bold"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-italic"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-list-ul"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-left-to-right-text-direction"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-right-to-left-text-direction"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-list-ui-alt"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-link"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-text-size"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="uil uil-text"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="textarea_dt">
                                        <div className="ui form swdh339">
                                            <div className="field">
                                                <textarea
                                                    rows={5}
                                                    name="description"
                                                    id="id_course_description"
                                                    placeholder="Insert your course description"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="mt-30 lbel25">
                                <label>Language*</label>
                            </div>
                            <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                <option value="">Select Language</option>
                                <option value="1">English</option>
                                <option value="2">Español</option>
                                <option value="3">Português</option>
                                <option value="4">日本語</option>
                                <option value="5">Deutsch</option>
                                <option value="6">Français</option>
                                <option value="7">Türkçe</option>
                                <option value="8">हिन्दी</option>
                                <option value="9">Italiano</option>
                                <option value="10">Polski</option>
                                <option value="11">ภาษาไทย</option>
                                <option value="12">Română</option>
                                <option value="13">Telugu</option>
                                <option value="14">मराठी</option>
                                <option value="15">ਪੰਜਾਬੀ</option>
                            </select>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="mt-30 lbel25">
                                <label>Course Category*</label>
                            </div>
                            <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                <option value="">Select Category</option>
                                <option value="1">Development</option>
                                <option value="2">Business</option>
                                <option value="3">Finance & Accounting</option>
                                <option value="4">IT & Software</option>
                                <option value="5">Office Productivity</option>
                                <option value="6">Personal Development</option>
                                <option value="7">Design</option>
                                <option value="8">Marketing</option>
                                <option value="9">Lifestyle</option>
                                <option value="10">Photography</option>
                                <option value="11">Health & Fitness</option>
                                <option value="12">Music</option>
                                <option value="13">Teaching & Academics</option>
                            </select>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="mt-30 lbel25">
                                <label>Course Subcategory*</label>
                            </div>
                            <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                <option value="">Select Subcategory</option>
                                <option value="1">Javascript</option>
                                <option value="2">Angular</option>
                                <option value="3">React</option>
                                <option value="4">CSS</option>
                                <option value="5">PHP</option>
                                <option value="6">Node.Js</option>
                                <option value="7">WordPress</option>
                                <option value="8">Vue JS</option>
                                <option value="9">Shopify</option>
                                <option value="10">Magento</option>
                                <option value="11">Open Cart </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="price_course">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="price_title">
                                <h4>
                                    <i className="uil uil-dollar-sign-alt"></i>Pricing
                                </h4>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="mt-30 lbel25">
                                <label>Currency*</label>
                            </div>
                            <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                <option value="">USD</option>
                                <option value="1">USD</option>
                                <option value="2">CAD</option>
                                <option value="3">BRL</option>
                                <option value="4">EUR</option>
                                <option value="5">GBP</option>
                                <option value="6">INR</option>
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="mt-30 lbel25">
                                <label>Select*</label>
                            </div>
                            <select className="ui hj145 dropdown cntry152 prompt srch_explore">
                                <option value="">Select</option>
                                <option value="0">Free</option>
                                <option value="1">$24.99 (tier 1)</option>
                                <option value="2">$29.99 (tier 2)</option>
                                <option value="3">$34.99 (tier 3)</option>
                                <option value="4">$39.99 (tier 4)</option>
                                <option value="5">$44.99 (tier 5)</option>
                                <option value="6">$49.99 (tier 6)</option>
                                <option value="7">$54.99 (tier 7)</option>
                                <option value="8">$59.99 (tier 8)</option>
                                <option value="9">$64.99 (tier 9)</option>
                                <option value="10">$69.99 (tier 10)</option>
                                <option value="11">$74.99 (tier 11)</option>
                                <option value="12">$79.99 (tier 12)</option>
                                <option value="13">$84.99 (tier 13)</option>
                                <option value="14">$89.99 (tier 14)</option>
                                <option value="15">$94.99 (tier 15)</option>
                                <option value="16">$99.99 (tier 16)</option>
                                <option value="17">$104.99 (tier 17)</option>
                                <option value="18">$109.99 (tier 18)</option>
                                <option value="19">$114.99 (tier 19)</option>
                                <option value="20">$119.99 (tier 20)</option>
                                <option value="21">$124.99 (tier 21)</option>
                                <option value="22">$129.99 (tier 22)</option>
                                <option value="23">$134.99 (tier 23)</option>
                                <option value="24">$139.99 (tier 24)</option>
                                <option value="25">$144.99 (tier 25)</option>
                                <option value="26">$149.99 (tier 26)</option>
                                <option value="27">$154.99 (tier 27)</option>
                                <option value="28">$159.99 (tier 28)</option>
                                <option value="29">$164.99 (tier 29)</option>
                                <option value="30">$169.99 (tier 30)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralInfoSteps;

//ui hj145 dropdown cntry152 prompt srch_explore
//ui hj145 dropdown cntry152 prompt srch_explore selection
