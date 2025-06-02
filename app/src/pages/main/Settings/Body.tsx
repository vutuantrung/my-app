import { useEffect } from 'react';
import AppFooter from '../../../Layouts/AppFooter';
import { COUNTRIES } from '../../../constants';

const Body = () => {
    useEffect(() => {
        const headers = $('#accordion .accordion-header');
        const contentAreas = $('#accordion .ui-accordion-content').hide().first().show().end();
        const expandLink = $('.accordion-expand-all');
        const inputPayment = $('input[name="paymentmethod"]');

        // add the accordion functionality
        headers.on('click', function () {
            contentAreas.slideUp();
            $(this).next().slideDown();
            expandLink.text('Expand all').data('isAllOpen', false);
            return false;
        });

        // hook up the expand/collapse all
        expandLink.on('click', function () {
            const isAllOpen = !$(this).data('isAllOpen');
            // console.log({ isAllOpen: isAllOpen, contentAreas: contentAreas })
            contentAreas[isAllOpen ? 'slideDown' : 'slideUp']();
            expandLink.text(isAllOpen ? 'Collapse All' : 'Expand all').data('isAllOpen', isAllOpen);
        });

        // Payment Method Accordion
        inputPayment.on('click', function () {
            console.log('inputPayment', inputPayment);
            const $value = $(this).attr('value');
            $('.return-departure-dts').slideUp();
            $('[data-method="' + $value + '"]').slideDown();
        });
    }, []);
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="st_title">
                                <i className="uil uil-cog"></i> Setting
                            </h2>
                            <div className="setting_tabs">
                                <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="pills-account-tab"
                                            data-toggle="pill"
                                            href="#pills-account"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Account
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-notification-tab"
                                            data-toggle="pill"
                                            href="#pills-notification"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Notification
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-privacy-tab"
                                            data-toggle="pill"
                                            href="#pills-privacy"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Privacy
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-bllingpayment-tab"
                                            data-toggle="pill"
                                            href="#pills-bllingpayment"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Billing and Payouts
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-api-tab"
                                            data-toggle="pill"
                                            href="#pills-api"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            API Clients
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-closeaccount-tab"
                                            data-toggle="pill"
                                            href="#pills-closeaccount"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Close Account
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="pills-account"
                                    role="tabpanel"
                                    aria-labelledby="pills-account-tab"
                                >
                                    <div className="account_setting">
                                        <h4>Your Cursus Account</h4>
                                        <p>
                                            This is your public presence on Cursus. You need a account to upload your paid
                                            courses, comment on courses, purchased by students, or earning.
                                        </p>
                                        <div className="basic_profile">
                                            <div className="basic_ptitle">
                                                <h4>Basic Profile</h4>
                                                <p>Add information about yourself</p>
                                            </div>
                                            <div className="basic_form">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            onChange={() => {}}
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="name"
                                                                            id="id[name]"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="First Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            onChange={() => {}}
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="surname"
                                                                            id="id[surname]"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Last Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            onChange={() => {}}
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="headline"
                                                                            id="id_headline"
                                                                            required
                                                                            maxLength={60}
                                                                            placeholder="Headline"
                                                                        />
                                                                        <div
                                                                            className="form-control-counter"
                                                                            data-purpose="form-control-counter"
                                                                        >
                                                                            36
                                                                        </div>
                                                                    </div>
                                                                    <div className="help-block">
                                                                        Add a professional headline like, "Engineer at Cursus" or
                                                                        "Architect."
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui form swdh30">
                                                                        <div className="field">
                                                                            <textarea
                                                                                rows={3}
                                                                                name="description"
                                                                                id="id_about"
                                                                                placeholder="Write a little description about you..."
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="help-block">
                                                                        Links and coupon codes are not permitted in this section.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="divider-1"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basic_profile1">
                                            <div className="basic_ptitle">
                                                <h4>Profile Links</h4>
                                            </div>
                                            <div className="basic_form">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon labeled input swdh11 swdh31">
                                                                        <div className="ui label lb12">https://</div>
                                                                        <input
                                                                            onChange={() => {}}
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="site"
                                                                            id="id_site"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="yoursite.com"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon labeled input swdh11 swdh31">
                                                                        <div className="ui label lb12">http://facebook.com/</div>
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="facebooklink"
                                                                            id="id_facebook"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Facebook Profile"
                                                                        />
                                                                    </div>
                                                                    <div className="help-block">
                                                                        Add your Facebook username (e.g. johndoe).
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon labeled input swdh11 swdh31">
                                                                        <div className="ui label lb12">http://twitter.com/</div>
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="twitterlink"
                                                                            id="id_twitter"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Twitter Profile"
                                                                        />
                                                                    </div>
                                                                    <div className="help-block">
                                                                        Add your Twitter username (e.g. johndoe).
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon labeled input swdh11 swdh31">
                                                                        <div className="ui label lb12">
                                                                            http://www.linkedin.com/
                                                                        </div>
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="linkedinlink"
                                                                            id="id_linkedin"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Linkedin Profile"
                                                                        />
                                                                    </div>
                                                                    <div className="help-block">
                                                                        Input your LinkedIn resource id (e.g. in/johndoe).
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon labeled input swdh11 swdh31">
                                                                        <div className="ui label lb12">
                                                                            http://www.youtube.com/
                                                                        </div>
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="youtubelink"
                                                                            id="id_youtube"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Youtube Profile"
                                                                        />
                                                                    </div>
                                                                    <div className="help-block">
                                                                        Input your Youtube username (e.g. johndoe).
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="save_btn" type="submit">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-notification"
                                    role="tabpanel"
                                    aria-labelledby="pills-notification-tab"
                                >
                                    <div className="account_setting">
                                        <h4>Notifications - Choose when and how to be notified</h4>
                                        <p>Select push and email notifications you'd like to receive</p>
                                        <div className="basic_profile">
                                            <div className="basic_form">
                                                <div className="nstting_content">
                                                    <div className="basic_ptitle">
                                                        <h4>Choose when and how to be notified</h4>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss1" checked onChange={() => {}} />
                                                        <label>Subscriptions</label>
                                                        <p className="ml5">
                                                            Notify me about activity from the profiles I'm subscribed to
                                                        </p>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss2" onChange={() => {}} />
                                                        <label>Recommended Courses</label>
                                                        <p className="ml5">
                                                            Notify me of courses I might like based on what I watch
                                                        </p>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss3" onChange={() => {}} />
                                                        <label>Activity on my comments</label>
                                                        <p className="ml5">
                                                            Notify me about activity on my comments on others’ courses
                                                        </p>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss4" checked onChange={() => {}} />
                                                        <label>Replies to my comments</label>
                                                        <p className="ml5">Notify me about replies to my comments</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider-1 mb-50"></div>
                                        <div className="basic_profile">
                                            <div className="basic_form">
                                                <div className="nstting_content">
                                                    <div className="basic_ptitle">
                                                        <h4>Email notifications</h4>
                                                        <p>
                                                            Your emails are sent to gambol943@gmail.com. To unsubscribe from an
                                                            email, click the "Unsubscribe" link at the bottom of it.{' '}
                                                            <a href="#">Learn more</a> about emails from Edututs+.
                                                        </p>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss5" checked onChange={() => {}} />
                                                        <label>
                                                            Send me emails about my Cursus activity and updates I requested
                                                        </label>
                                                        <p className="ml5">
                                                            If this setting is turned off, Cursus may still send you messages
                                                            regarding your account, required service announcements, legal
                                                            notifications, and privacy matters
                                                        </p>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss6" onChange={() => {}} />
                                                        <label>
                                                            Promotions, course recommendations, and helpful resources from Cursus.
                                                        </label>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss7" onChange={() => {}} />
                                                        <label>
                                                            Announcements from instructors whose course(s) I’m enrolled in.
                                                        </label>
                                                        <p className="ml5">
                                                            To adjust this preference by course, leave this box checked and go to
                                                            the course dashboard and click on "Options" to opt in or out of
                                                            specific announcements.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="save_btn" type="submit">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-privacy"
                                    role="tabpanel"
                                    aria-labelledby="pills-privacy-tab"
                                >
                                    <div className="account_setting">
                                        <h4>Privacy</h4>
                                        <p>Modify your privacy settings here.</p>
                                        <div className="basic_profile">
                                            <div className="basic_form">
                                                <div className="nstting_content">
                                                    <div className="basic_ptitle">
                                                        <h4>Profile page settings</h4>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss8" checked onChange={() => {}} />
                                                        <label>Show your profile on search engines</label>
                                                    </div>
                                                    <div className="ui toggle checkbox _1457s2">
                                                        <input type="checkbox" name="stream_ss9" onChange={() => {}} />
                                                        <label>Show courses you're taking on your profile page</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="save_btn" type="submit">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-bllingpayment"
                                    role="tabpanel"
                                    aria-labelledby="pills-bllingpayment-tab"
                                >
                                    <div className="account_setting">
                                        <h4>Billing and Payouts</h4>
                                        <p>
                                            Want to charge for a course? Provide your payment info and opt in for our promotional
                                            programs
                                        </p>
                                        <div className="basic_form">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="basic_ptitle mt-30">
                                                        <h4>Billing Address</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="name"
                                                                        value="Joginder"
                                                                        id="id[name1]"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="First Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="surname"
                                                                        value="Singh"
                                                                        id="id[surname1]"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="Last Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="academyname"
                                                                        value="Gambolthemes"
                                                                        id="id_academy"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="Academy Name"
                                                                    />
                                                                </div>
                                                                <div className="help-block">
                                                                    If you want your invoices addressed to a academy. Leave blank
                                                                    to use your full name.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui fluid search selection dropdown focus mt-30 cntry152">
                                                                <input
                                                                    type="hidden"
                                                                    name="country"
                                                                    className="prompt srch_explore"
                                                                />
                                                                <i className="dropdown icon"></i>
                                                                <div className="default text">Select Country</div>
                                                                <div className="menu">
                                                                    <div className="item" data-value="af">
                                                                        <i className="af flag"></i>Afghanistan
                                                                    </div>
                                                                    <div className="item" data-value="ax">
                                                                        <i className="ax flag"></i>Aland Islands
                                                                    </div>
                                                                    <div className="item" data-value="al">
                                                                        <i className="al flag"></i>Albania
                                                                    </div>
                                                                    <div className="item" data-value="dz">
                                                                        <i className="dz flag"></i>Algeria
                                                                    </div>
                                                                    <div className="item" data-value="as">
                                                                        <i className="as flag"></i>American Samoa
                                                                    </div>
                                                                    <div className="item" data-value="ad">
                                                                        <i className="ad flag"></i>Andorra
                                                                    </div>
                                                                    <div className="item" data-value="ao">
                                                                        <i className="ao flag"></i>Angola
                                                                    </div>
                                                                    <div className="item" data-value="ai">
                                                                        <i className="ai flag"></i>Anguilla
                                                                    </div>
                                                                    <div className="item" data-value="ag">
                                                                        <i className="ag flag"></i>Antigua
                                                                    </div>
                                                                    <div className="item" data-value="ar">
                                                                        <i className="ar flag"></i>Argentina
                                                                    </div>
                                                                    <div className="item" data-value="am">
                                                                        <i className="am flag"></i>Armenia
                                                                    </div>
                                                                    <div className="item" data-value="aw">
                                                                        <i className="aw flag"></i>Aruba
                                                                    </div>
                                                                    <div className="item" data-value="au">
                                                                        <i className="au flag"></i>Australia
                                                                    </div>
                                                                    <div className="item" data-value="at">
                                                                        <i className="at flag"></i>Austria
                                                                    </div>
                                                                    <div className="item" data-value="az">
                                                                        <i className="az flag"></i>Azerbaijan
                                                                    </div>
                                                                    <div className="item" data-value="bs">
                                                                        <i className="bs flag"></i>Bahamas
                                                                    </div>
                                                                    <div className="item" data-value="bh">
                                                                        <i className="bh flag"></i>Bahrain
                                                                    </div>
                                                                    <div className="item" data-value="bd">
                                                                        <i className="bd flag"></i>Bangladesh
                                                                    </div>
                                                                    <div className="item" data-value="bb">
                                                                        <i className="bb flag"></i>Barbados
                                                                    </div>
                                                                    <div className="item" data-value="by">
                                                                        <i className="by flag"></i>Belarus
                                                                    </div>
                                                                    <div className="item" data-value="be">
                                                                        <i className="be flag"></i>Belgium
                                                                    </div>
                                                                    <div className="item" data-value="bz">
                                                                        <i className="bz flag"></i>Belize
                                                                    </div>
                                                                    <div className="item" data-value="bj">
                                                                        <i className="bj flag"></i>Benin
                                                                    </div>
                                                                    <div className="item" data-value="bm">
                                                                        <i className="bm flag"></i>Bermuda
                                                                    </div>
                                                                    <div className="item" data-value="bt">
                                                                        <i className="bt flag"></i>Bhutan
                                                                    </div>
                                                                    <div className="item" data-value="bo">
                                                                        <i className="bo flag"></i>Bolivia
                                                                    </div>
                                                                    <div className="item" data-value="ba">
                                                                        <i className="ba flag"></i>Bosnia
                                                                    </div>
                                                                    <div className="item" data-value="bw">
                                                                        <i className="bw flag"></i>Botswana
                                                                    </div>
                                                                    <div className="item" data-value="bv">
                                                                        <i className="bv flag"></i>Bouvet Island
                                                                    </div>
                                                                    <div className="item" data-value="br">
                                                                        <i className="br flag"></i>Brazil
                                                                    </div>
                                                                    <div className="item" data-value="vg">
                                                                        <i className="vg flag"></i>British Virgin Islands
                                                                    </div>
                                                                    <div className="item" data-value="bn">
                                                                        <i className="bn flag"></i>Brunei
                                                                    </div>
                                                                    <div className="item" data-value="bg">
                                                                        <i className="bg flag"></i>Bulgaria
                                                                    </div>
                                                                    <div className="item" data-value="bf">
                                                                        <i className="bf flag"></i>Burkina Faso
                                                                    </div>
                                                                    <div className="item" data-value="mm">
                                                                        <i className="mm flag"></i>Burma
                                                                    </div>
                                                                    <div className="item" data-value="bi">
                                                                        <i className="bi flag"></i>Burundi
                                                                    </div>
                                                                    <div className="item" data-value="tc">
                                                                        <i className="tc flag"></i>Caicos Islands
                                                                    </div>
                                                                    <div className="item" data-value="kh">
                                                                        <i className="kh flag"></i>Cambodia
                                                                    </div>
                                                                    <div className="item" data-value="cm">
                                                                        <i className="cm flag"></i>Cameroon
                                                                    </div>
                                                                    <div className="item" data-value="ca">
                                                                        <i className="ca flag"></i>Canada
                                                                    </div>
                                                                    <div className="item" data-value="cv">
                                                                        <i className="cv flag"></i>Cape Verde
                                                                    </div>
                                                                    <div className="item" data-value="ky">
                                                                        <i className="ky flag"></i>Cayman Islands
                                                                    </div>
                                                                    <div className="item" data-value="cf">
                                                                        <i className="cf flag"></i>Central African Republic
                                                                    </div>
                                                                    <div className="item" data-value="td">
                                                                        <i className="td flag"></i>Chad
                                                                    </div>
                                                                    <div className="item" data-value="cl">
                                                                        <i className="cl flag"></i>Chile
                                                                    </div>
                                                                    <div className="item" data-value="cn">
                                                                        <i className="cn flag"></i>China
                                                                    </div>
                                                                    <div className="item" data-value="cx">
                                                                        <i className="cx flag"></i>Christmas Island
                                                                    </div>
                                                                    <div className="item" data-value="cc">
                                                                        <i className="cc flag"></i>Cocos Islands
                                                                    </div>
                                                                    <div className="item" data-value="co">
                                                                        <i className="co flag"></i>Colombia
                                                                    </div>
                                                                    <div className="item" data-value="km">
                                                                        <i className="km flag"></i>Comoros
                                                                    </div>
                                                                    <div className="item" data-value="cg">
                                                                        <i className="cg flag"></i>Congo Brazzaville
                                                                    </div>
                                                                    <div className="item" data-value="cd">
                                                                        <i className="cd flag"></i>Congo
                                                                    </div>
                                                                    <div className="item" data-value="ck">
                                                                        <i className="ck flag"></i>Cook Islands
                                                                    </div>
                                                                    <div className="item" data-value="cr">
                                                                        <i className="cr flag"></i>Costa Rica
                                                                    </div>
                                                                    <div className="item" data-value="ci">
                                                                        <i className="ci flag"></i>Cote Divoire
                                                                    </div>
                                                                    <div className="item" data-value="hr">
                                                                        <i className="hr flag"></i>Croatia
                                                                    </div>
                                                                    <div className="item" data-value="cu">
                                                                        <i className="cu flag"></i>Cuba
                                                                    </div>
                                                                    <div className="item" data-value="cy">
                                                                        <i className="cy flag"></i>Cyprus
                                                                    </div>
                                                                    <div className="item" data-value="cz">
                                                                        <i className="cz flag"></i>Czech Republic
                                                                    </div>
                                                                    <div className="item" data-value="dk">
                                                                        <i className="dk flag"></i>Denmark
                                                                    </div>
                                                                    <div className="item" data-value="dj">
                                                                        <i className="dj flag"></i>Djibouti
                                                                    </div>
                                                                    <div className="item" data-value="dm">
                                                                        <i className="dm flag"></i>Dominica
                                                                    </div>
                                                                    <div className="item" data-value="do">
                                                                        <i className="do flag"></i>Dominican Republic
                                                                    </div>
                                                                    <div className="item" data-value="ec">
                                                                        <i className="ec flag"></i>Ecuador
                                                                    </div>
                                                                    <div className="item" data-value="eg">
                                                                        <i className="eg flag"></i>Egypt
                                                                    </div>
                                                                    <div className="item" data-value="sv">
                                                                        <i className="sv flag"></i>El Salvador
                                                                    </div>
                                                                    <div className="item" data-value="gb">
                                                                        <i className="gb flag"></i>England
                                                                    </div>
                                                                    <div className="item" data-value="gq">
                                                                        <i className="gq flag"></i>Equatorial Guinea
                                                                    </div>
                                                                    <div className="item" data-value="er">
                                                                        <i className="er flag"></i>Eritrea
                                                                    </div>
                                                                    <div className="item" data-value="ee">
                                                                        <i className="ee flag"></i>Estonia
                                                                    </div>
                                                                    <div className="item" data-value="et">
                                                                        <i className="et flag"></i>Ethiopia
                                                                    </div>
                                                                    <div className="item" data-value="eu">
                                                                        <i className="eu flag"></i>European Union
                                                                    </div>
                                                                    <div className="item" data-value="fk">
                                                                        <i className="fk flag"></i>Falkland Islands
                                                                    </div>
                                                                    <div className="item" data-value="fo">
                                                                        <i className="fo flag"></i>Faroe Islands
                                                                    </div>
                                                                    <div className="item" data-value="fj">
                                                                        <i className="fj flag"></i>Fiji
                                                                    </div>
                                                                    <div className="item" data-value="fi">
                                                                        <i className="fi flag"></i>Finland
                                                                    </div>
                                                                    <div className="item" data-value="fr">
                                                                        <i className="fr flag"></i>France
                                                                    </div>
                                                                    <div className="item" data-value="gf">
                                                                        <i className="gf flag"></i>French Guiana
                                                                    </div>
                                                                    <div className="item" data-value="pf">
                                                                        <i className="pf flag"></i>French Polynesia
                                                                    </div>
                                                                    <div className="item" data-value="tf">
                                                                        <i className="tf flag"></i>French Territories
                                                                    </div>
                                                                    <div className="item" data-value="ga">
                                                                        <i className="ga flag"></i>Gabon
                                                                    </div>
                                                                    <div className="item" data-value="gm">
                                                                        <i className="gm flag"></i>Gambia
                                                                    </div>
                                                                    <div className="item" data-value="ge">
                                                                        <i className="ge flag"></i>Georgia
                                                                    </div>
                                                                    <div className="item" data-value="de">
                                                                        <i className="de flag"></i>Germany
                                                                    </div>
                                                                    <div className="item" data-value="gh">
                                                                        <i className="gh flag"></i>Ghana
                                                                    </div>
                                                                    <div className="item" data-value="gi">
                                                                        <i className="gi flag"></i>Gibraltar
                                                                    </div>
                                                                    <div className="item" data-value="gr">
                                                                        <i className="gr flag"></i>Greece
                                                                    </div>
                                                                    <div className="item" data-value="gl">
                                                                        <i className="gl flag"></i>Greenland
                                                                    </div>
                                                                    <div className="item" data-value="gd">
                                                                        <i className="gd flag"></i>Grenada
                                                                    </div>
                                                                    <div className="item" data-value="gp">
                                                                        <i className="gp flag"></i>Guadeloupe
                                                                    </div>
                                                                    <div className="item" data-value="gu">
                                                                        <i className="gu flag"></i>Guam
                                                                    </div>
                                                                    <div className="item" data-value="gt">
                                                                        <i className="gt flag"></i>Guatemala
                                                                    </div>
                                                                    <div className="item" data-value="gw">
                                                                        <i className="gw flag"></i>Guinea-Bissau
                                                                    </div>
                                                                    <div className="item" data-value="gn">
                                                                        <i className="gn flag"></i>Guinea
                                                                    </div>
                                                                    <div className="item" data-value="gy">
                                                                        <i className="gy flag"></i>Guyana
                                                                    </div>
                                                                    <div className="item" data-value="ht">
                                                                        <i className="ht flag"></i>Haiti
                                                                    </div>
                                                                    <div className="item" data-value="hm">
                                                                        <i className="hm flag"></i>Heard Island
                                                                    </div>
                                                                    <div className="item" data-value="hn">
                                                                        <i className="hn flag"></i>Honduras
                                                                    </div>
                                                                    <div className="item" data-value="hk">
                                                                        <i className="hk flag"></i>Hong Kong
                                                                    </div>
                                                                    <div className="item" data-value="hu">
                                                                        <i className="hu flag"></i>Hungary
                                                                    </div>
                                                                    <div className="item" data-value="is">
                                                                        <i className="is flag"></i>Iceland
                                                                    </div>
                                                                    <div className="item" data-value="in">
                                                                        <i className="in flag"></i>India
                                                                    </div>
                                                                    <div className="item" data-value="io">
                                                                        <i className="io flag"></i>Indian Ocean Territory
                                                                    </div>
                                                                    <div className="item" data-value="id">
                                                                        <i className="id flag"></i>Indonesia
                                                                    </div>
                                                                    <div className="item" data-value="ir">
                                                                        <i className="ir flag"></i>Iran
                                                                    </div>
                                                                    <div className="item" data-value="iq">
                                                                        <i className="iq flag"></i>Iraq
                                                                    </div>
                                                                    <div className="item" data-value="ie">
                                                                        <i className="ie flag"></i>Ireland
                                                                    </div>
                                                                    <div className="item" data-value="il">
                                                                        <i className="il flag"></i>Israel
                                                                    </div>
                                                                    <div className="item" data-value="it">
                                                                        <i className="it flag"></i>Italy
                                                                    </div>
                                                                    <div className="item" data-value="jm">
                                                                        <i className="jm flag"></i>Jamaica
                                                                    </div>
                                                                    <div className="item" data-value="jp">
                                                                        <i className="jp flag"></i>Japan
                                                                    </div>
                                                                    <div className="item" data-value="jo">
                                                                        <i className="jo flag"></i>Jordan
                                                                    </div>
                                                                    <div className="item" data-value="kz">
                                                                        <i className="kz flag"></i>Kazakhstan
                                                                    </div>
                                                                    <div className="item" data-value="ke">
                                                                        <i className="ke flag"></i>Kenya
                                                                    </div>
                                                                    <div className="item" data-value="ki">
                                                                        <i className="ki flag"></i>Kiribati
                                                                    </div>
                                                                    <div className="item" data-value="kw">
                                                                        <i className="kw flag"></i>Kuwait
                                                                    </div>
                                                                    <div className="item" data-value="kg">
                                                                        <i className="kg flag"></i>Kyrgyzstan
                                                                    </div>
                                                                    <div className="item" data-value="la">
                                                                        <i className="la flag"></i>Laos
                                                                    </div>
                                                                    <div className="item" data-value="lv">
                                                                        <i className="lv flag"></i>Latvia
                                                                    </div>
                                                                    <div className="item" data-value="lb">
                                                                        <i className="lb flag"></i>Lebanon
                                                                    </div>
                                                                    <div className="item" data-value="ls">
                                                                        <i className="ls flag"></i>Lesotho
                                                                    </div>
                                                                    <div className="item" data-value="lr">
                                                                        <i className="lr flag"></i>Liberia
                                                                    </div>
                                                                    <div className="item" data-value="ly">
                                                                        <i className="ly flag"></i>Libya
                                                                    </div>
                                                                    <div className="item" data-value="li">
                                                                        <i className="li flag"></i>Liechtenstein
                                                                    </div>
                                                                    <div className="item" data-value="lt">
                                                                        <i className="lt flag"></i>Lithuania
                                                                    </div>
                                                                    <div className="item" data-value="lu">
                                                                        <i className="lu flag"></i>Luxembourg
                                                                    </div>
                                                                    <div className="item" data-value="mo">
                                                                        <i className="mo flag"></i>Macau
                                                                    </div>
                                                                    <div className="item" data-value="mk">
                                                                        <i className="mk flag"></i>Macedonia
                                                                    </div>
                                                                    <div className="item" data-value="mg">
                                                                        <i className="mg flag"></i>Madagascar
                                                                    </div>
                                                                    <div className="item" data-value="mw">
                                                                        <i className="mw flag"></i>Malawi
                                                                    </div>
                                                                    <div className="item" data-value="my">
                                                                        <i className="my flag"></i>Malaysia
                                                                    </div>
                                                                    <div className="item" data-value="mv">
                                                                        <i className="mv flag"></i>Maldives
                                                                    </div>
                                                                    <div className="item" data-value="ml">
                                                                        <i className="ml flag"></i>Mali
                                                                    </div>
                                                                    <div className="item" data-value="mt">
                                                                        <i className="mt flag"></i>Malta
                                                                    </div>
                                                                    <div className="item" data-value="mh">
                                                                        <i className="mh flag"></i>Marshall Islands
                                                                    </div>
                                                                    <div className="item" data-value="mq">
                                                                        <i className="mq flag"></i>Martinique
                                                                    </div>
                                                                    <div className="item" data-value="mr">
                                                                        <i className="mr flag"></i>Mauritania
                                                                    </div>
                                                                    <div className="item" data-value="mu">
                                                                        <i className="mu flag"></i>Mauritius
                                                                    </div>
                                                                    <div className="item" data-value="yt">
                                                                        <i className="yt flag"></i>Mayotte
                                                                    </div>
                                                                    <div className="item" data-value="mx">
                                                                        <i className="mx flag"></i>Mexico
                                                                    </div>
                                                                    <div className="item" data-value="fm">
                                                                        <i className="fm flag"></i>Micronesia
                                                                    </div>
                                                                    <div className="item" data-value="md">
                                                                        <i className="md flag"></i>Moldova
                                                                    </div>
                                                                    <div className="item" data-value="mc">
                                                                        <i className="mc flag"></i>Monaco
                                                                    </div>
                                                                    <div className="item" data-value="mn">
                                                                        <i className="mn flag"></i>Mongolia
                                                                    </div>
                                                                    <div className="item" data-value="me">
                                                                        <i className="me flag"></i>Montenegro
                                                                    </div>
                                                                    <div className="item" data-value="ms">
                                                                        <i className="ms flag"></i>Montserrat
                                                                    </div>
                                                                    <div className="item" data-value="ma">
                                                                        <i className="ma flag"></i>Morocco
                                                                    </div>
                                                                    <div className="item" data-value="mz">
                                                                        <i className="mz flag"></i>Mozambique
                                                                    </div>
                                                                    <div className="item" data-value="na">
                                                                        <i className="na flag"></i>Namibia
                                                                    </div>
                                                                    <div className="item" data-value="nr">
                                                                        <i className="nr flag"></i>Nauru
                                                                    </div>
                                                                    <div className="item" data-value="np">
                                                                        <i className="np flag"></i>Nepal
                                                                    </div>
                                                                    <div className="item" data-value="an">
                                                                        <i className="an flag"></i>Netherlands Antilles
                                                                    </div>
                                                                    <div className="item" data-value="nl">
                                                                        <i className="nl flag"></i>Netherlands
                                                                    </div>
                                                                    <div className="item" data-value="nc">
                                                                        <i className="nc flag"></i>New Caledonia
                                                                    </div>
                                                                    <div className="item" data-value="pg">
                                                                        <i className="pg flag"></i>New Guinea
                                                                    </div>
                                                                    <div className="item" data-value="nz">
                                                                        <i className="nz flag"></i>New Zealand
                                                                    </div>
                                                                    <div className="item" data-value="ni">
                                                                        <i className="ni flag"></i>Nicaragua
                                                                    </div>
                                                                    <div className="item" data-value="ne">
                                                                        <i className="ne flag"></i>Niger
                                                                    </div>
                                                                    <div className="item" data-value="ng">
                                                                        <i className="ng flag"></i>Nigeria
                                                                    </div>
                                                                    <div className="item" data-value="nu">
                                                                        <i className="nu flag"></i>Niue
                                                                    </div>
                                                                    <div className="item" data-value="nf">
                                                                        <i className="nf flag"></i>Norfolk Island
                                                                    </div>
                                                                    <div className="item" data-value="kp">
                                                                        <i className="kp flag"></i>North Korea
                                                                    </div>
                                                                    <div className="item" data-value="mp">
                                                                        <i className="mp flag"></i>Northern Mariana Islands
                                                                    </div>
                                                                    <div className="item" data-value="no">
                                                                        <i className="no flag"></i>Norway
                                                                    </div>
                                                                    <div className="item" data-value="om">
                                                                        <i className="om flag"></i>Oman
                                                                    </div>
                                                                    <div className="item" data-value="pk">
                                                                        <i className="pk flag"></i>Pakistan
                                                                    </div>
                                                                    <div className="item" data-value="pw">
                                                                        <i className="pw flag"></i>Palau
                                                                    </div>
                                                                    <div className="item" data-value="ps">
                                                                        <i className="ps flag"></i>Palestine
                                                                    </div>
                                                                    <div className="item" data-value="pa">
                                                                        <i className="pa flag"></i>Panama
                                                                    </div>
                                                                    <div className="item" data-value="py">
                                                                        <i className="py flag"></i>Paraguay
                                                                    </div>
                                                                    <div className="item" data-value="pe">
                                                                        <i className="pe flag"></i>Peru
                                                                    </div>
                                                                    <div className="item" data-value="ph">
                                                                        <i className="ph flag"></i>Philippines
                                                                    </div>
                                                                    <div className="item" data-value="pn">
                                                                        <i className="pn flag"></i>Pitcairn Islands
                                                                    </div>
                                                                    <div className="item" data-value="pl">
                                                                        <i className="pl flag"></i>Poland
                                                                    </div>
                                                                    <div className="item" data-value="pt">
                                                                        <i className="pt flag"></i>Portugal
                                                                    </div>
                                                                    <div className="item" data-value="pr">
                                                                        <i className="pr flag"></i>Puerto Rico
                                                                    </div>
                                                                    <div className="item" data-value="qa">
                                                                        <i className="qa flag"></i>Qatar
                                                                    </div>
                                                                    <div className="item" data-value="re">
                                                                        <i className="re flag"></i>Reunion
                                                                    </div>
                                                                    <div className="item" data-value="ro">
                                                                        <i className="ro flag"></i>Romania
                                                                    </div>
                                                                    <div className="item" data-value="ru">
                                                                        <i className="ru flag"></i>Russia
                                                                    </div>
                                                                    <div className="item" data-value="rw">
                                                                        <i className="rw flag"></i>Rwanda
                                                                    </div>
                                                                    <div className="item" data-value="sh">
                                                                        <i className="sh flag"></i>Saint Helena
                                                                    </div>
                                                                    <div className="item" data-value="kn">
                                                                        <i className="kn flag"></i>Saint Kitts and Nevis
                                                                    </div>
                                                                    <div className="item" data-value="lc">
                                                                        <i className="lc flag"></i>Saint Lucia
                                                                    </div>
                                                                    <div className="item" data-value="pm">
                                                                        <i className="pm flag"></i>Saint Pierre
                                                                    </div>
                                                                    <div className="item" data-value="vc">
                                                                        <i className="vc flag"></i>Saint Vincent
                                                                    </div>
                                                                    <div className="item" data-value="ws">
                                                                        <i className="ws flag"></i>Samoa
                                                                    </div>
                                                                    <div className="item" data-value="sm">
                                                                        <i className="sm flag"></i>San Marino
                                                                    </div>
                                                                    <div className="item" data-value="gs">
                                                                        <i className="gs flag"></i>Sandwich Islands
                                                                    </div>
                                                                    <div className="item" data-value="st">
                                                                        <i className="st flag"></i>Sao Tome
                                                                    </div>
                                                                    <div className="item" data-value="sa">
                                                                        <i className="sa flag"></i>Saudi Arabia
                                                                    </div>
                                                                    <div className="item" data-value="sn">
                                                                        <i className="sn flag"></i>Senegal
                                                                    </div>
                                                                    <div className="item" data-value="cs">
                                                                        <i className="cs flag"></i>Serbia
                                                                    </div>
                                                                    <div className="item" data-value="rs">
                                                                        <i className="rs flag"></i>Serbia
                                                                    </div>
                                                                    <div className="item" data-value="sc">
                                                                        <i className="sc flag"></i>Seychelles
                                                                    </div>
                                                                    <div className="item" data-value="sl">
                                                                        <i className="sl flag"></i>Sierra Leone
                                                                    </div>
                                                                    <div className="item" data-value="sg">
                                                                        <i className="sg flag"></i>Singapore
                                                                    </div>
                                                                    <div className="item" data-value="sk">
                                                                        <i className="sk flag"></i>Slovakia
                                                                    </div>
                                                                    <div className="item" data-value="si">
                                                                        <i className="si flag"></i>Slovenia
                                                                    </div>
                                                                    <div className="item" data-value="sb">
                                                                        <i className="sb flag"></i>Solomon Islands
                                                                    </div>
                                                                    <div className="item" data-value="so">
                                                                        <i className="so flag"></i>Somalia
                                                                    </div>
                                                                    <div className="item" data-value="za">
                                                                        <i className="za flag"></i>South Africa
                                                                    </div>
                                                                    <div className="item" data-value="kr">
                                                                        <i className="kr flag"></i>South Korea
                                                                    </div>
                                                                    <div className="item" data-value="es">
                                                                        <i className="es flag"></i>Spain
                                                                    </div>
                                                                    <div className="item" data-value="lk">
                                                                        <i className="lk flag"></i>Sri Lanka
                                                                    </div>
                                                                    <div className="item" data-value="sd">
                                                                        <i className="sd flag"></i>Sudan
                                                                    </div>
                                                                    <div className="item" data-value="sr">
                                                                        <i className="sr flag"></i>Suriname
                                                                    </div>
                                                                    <div className="item" data-value="sj">
                                                                        <i className="sj flag"></i>Svalbard
                                                                    </div>
                                                                    <div className="item" data-value="sz">
                                                                        <i className="sz flag"></i>Swaziland
                                                                    </div>
                                                                    <div className="item" data-value="se">
                                                                        <i className="se flag"></i>Sweden
                                                                    </div>
                                                                    <div className="item" data-value="ch">
                                                                        <i className="ch flag"></i>Switzerland
                                                                    </div>
                                                                    <div className="item" data-value="sy">
                                                                        <i className="sy flag"></i>Syria
                                                                    </div>
                                                                    <div className="item" data-value="tw">
                                                                        <i className="tw flag"></i>Taiwan
                                                                    </div>
                                                                    <div className="item" data-value="tj">
                                                                        <i className="tj flag"></i>Tajikistan
                                                                    </div>
                                                                    <div className="item" data-value="tz">
                                                                        <i className="tz flag"></i>Tanzania
                                                                    </div>
                                                                    <div className="item" data-value="th">
                                                                        <i className="th flag"></i>Thailand
                                                                    </div>
                                                                    <div className="item" data-value="tl">
                                                                        <i className="tl flag"></i>Timorleste
                                                                    </div>
                                                                    <div className="item" data-value="tg">
                                                                        <i className="tg flag"></i>Togo
                                                                    </div>
                                                                    <div className="item" data-value="tk">
                                                                        <i className="tk flag"></i>Tokelau
                                                                    </div>
                                                                    <div className="item" data-value="to">
                                                                        <i className="to flag"></i>Tonga
                                                                    </div>
                                                                    <div className="item" data-value="tt">
                                                                        <i className="tt flag"></i>Trinidad
                                                                    </div>
                                                                    <div className="item" data-value="tn">
                                                                        <i className="tn flag"></i>Tunisia
                                                                    </div>
                                                                    <div className="item" data-value="tr">
                                                                        <i className="tr flag"></i>Turkey
                                                                    </div>
                                                                    <div className="item" data-value="tm">
                                                                        <i className="tm flag"></i>Turkmenistan
                                                                    </div>
                                                                    <div className="item" data-value="tv">
                                                                        <i className="tv flag"></i>Tuvalu
                                                                    </div>
                                                                    <div className="item" data-value="ug">
                                                                        <i className="ug flag"></i>Uganda
                                                                    </div>
                                                                    <div className="item" data-value="ua">
                                                                        <i className="ua flag"></i>Ukraine
                                                                    </div>
                                                                    <div className="item" data-value="ae">
                                                                        <i className="ae flag"></i>United Arab Emirates
                                                                    </div>
                                                                    <div className="item" data-value="us">
                                                                        <i className="us flag"></i>United States
                                                                    </div>
                                                                    <div className="item" data-value="uy">
                                                                        <i className="uy flag"></i>Uruguay
                                                                    </div>
                                                                    <div className="item" data-value="um">
                                                                        <i className="um flag"></i>Us Minor Islands
                                                                    </div>
                                                                    <div className="item" data-value="vi">
                                                                        <i className="vi flag"></i>Us Virgin Islands
                                                                    </div>
                                                                    <div className="item" data-value="uz">
                                                                        <i className="uz flag"></i>Uzbekistan
                                                                    </div>
                                                                    <div className="item" data-value="vu">
                                                                        <i className="vu flag"></i>Vanuatu
                                                                    </div>
                                                                    <div className="item" data-value="va">
                                                                        <i className="va flag"></i>Vatican City
                                                                    </div>
                                                                    <div className="item" data-value="ve">
                                                                        <i className="ve flag"></i>Venezuela
                                                                    </div>
                                                                    <div className="item" data-value="vn">
                                                                        <i className="vn flag"></i>Vietnam
                                                                    </div>
                                                                    <div className="item" data-value="wf">
                                                                        <i className="wf flag"></i>Wallis and Futuna
                                                                    </div>
                                                                    <div className="item" data-value="eh">
                                                                        <i className="eh flag"></i>Western Sahara
                                                                    </div>
                                                                    <div className="item" data-value="ye">
                                                                        <i className="ye flag"></i>Yemen
                                                                    </div>
                                                                    <div className="item" data-value="zm">
                                                                        <i className="zm flag"></i>Zambia
                                                                    </div>
                                                                    <div className="item" data-value="zw">
                                                                        <i className="zw flag"></i>Zimbabwe
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="addressname"
                                                                        value="#1234, Sks Nagar, Near MBD Mall, 141001 Ludhiana, Punjab, India"
                                                                        id="id_address1"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="Address Line 1"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="addressname2"
                                                                        id="id_address2"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="Address Line 2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="city"
                                                                        value="Ludhiana"
                                                                        id="id_city"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="City"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="state"
                                                                        value="Punjab"
                                                                        id="id_state"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="State / Province / Region"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="zip"
                                                                        value="141001"
                                                                        id="id_zip"
                                                                        required
                                                                        maxLength={64}
                                                                        placeholder="Zip / Postal Code"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="ui search focus mt-30">
                                                                <div className="ui left icon input swdh11 swdh19">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        className="prompt srch_explore"
                                                                        type="text"
                                                                        name="phone"
                                                                        value="+911234567890"
                                                                        id="id_phone"
                                                                        required
                                                                        maxLength={12}
                                                                        placeholder="Phone Number"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider-1 mb-50"></div>
                                        <div className="basic_form">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="basic_ptitle">
                                                        <h4>Exclusive Sales</h4>
                                                        <p>
                                                            Sell more of your exclusive products of this type (equal to the amount
                                                            on the left) to get % cut from further exclusive sales.
                                                        </p>
                                                    </div>
                                                    <div className="billing-percentages">
                                                        <div className="billing-percentages-progress-bar">
                                                            <ul className="billing-percentages-progress-bar__labels">
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label billing-percentages-progress-bar__label_zero-level">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$0</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            50%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$2,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            53%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$8,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            55%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$18,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            58%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$40,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            62%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$75,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            70%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$100,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            80%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basic_form mt-50">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="basic_ptitle">
                                                        <h4>Non-Exclusive Sales</h4>
                                                        <p>
                                                            Sell more of your non-exclusive products of this type (equal to the
                                                            amount on the left) to get 70% cut from every non-exclusive sales.
                                                        </p>
                                                    </div>
                                                    <div className="billing-percentages">
                                                        <div className="billing-percentages-progress-bar">
                                                            <ul className="billing-percentages-progress-bar__labels">
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label billing-percentages-progress-bar__label_zero-level">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$0</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$2,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$8,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$18,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$40,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$75,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="billing-percentages-progress-bar__label">
                                                                        <span className="billing-percentages-progress-bar__profit t5">
                                                                            <strong className="format-currency ">$100,000</strong>
                                                                        </span>
                                                                        <span className="billing-percentages-progress-bar__percent t5">
                                                                            30%
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider-1 mb-50"></div>
                                        <div className="basic_form mt-50">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="basic_ptitle">
                                                        <h4>Withrawal Method</h4>
                                                    </div>
                                                    <div className="rpt100 mt-30">
                                                        <ul className="radio--group-inline-container_1">
                                                            <li>
                                                                <div className="radio-item_1">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        id="paypal1"
                                                                        value="payal"
                                                                        name="paymentmethod"
                                                                        type="radio"
                                                                        data-minimum="50.0"
                                                                    />
                                                                    <label htmlFor="paypal1" className="radio-label_1">
                                                                        Paypal
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="radio-item_1">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        id="payoneer1"
                                                                        value="payoneer"
                                                                        name="paymentmethod"
                                                                        type="radio"
                                                                        data-minimum="50.0"
                                                                    />
                                                                    <label htmlFor="payoneer1" className="radio-label_1">
                                                                        Payoneer
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="radio-item_1">
                                                                    <input
                                                                        onChange={() => {}}
                                                                        id="swift1"
                                                                        value="swift"
                                                                        name="paymentmethod"
                                                                        type="radio"
                                                                        data-minimum="500.0"
                                                                    />
                                                                    <label htmlFor="swift1" className="radio-label_1">
                                                                        Swift
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="form-group return-departure-dts" data-method="payal">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="pymnt_title">
                                                                    <h4>Your PayPal Account</h4>
                                                                    <span>Minimum - $50.00</span>
                                                                    <p>
                                                                        Get paid by credit or debit card, PayPal transfer or even
                                                                        via bank account in just a few clicks. All you need is
                                                                        your email address or mobile number.{' '}
                                                                        <a href="#">More about PayPal</a> |{' '}
                                                                        <a href="#">Create an account</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="email"
                                                                            name="emailaddress"
                                                                            id="id_email"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Email address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-20">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="email"
                                                                            name="cemailaddress"
                                                                            id="id_emailc"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Confirm email address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button className="save_payout_btn" type="submit">
                                                                    Set Payout Account
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group return-departure-dts" data-method="payoneer">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="pymnt_title">
                                                                    <h4>Your Payoneer Account</h4>
                                                                    <span>Minimum - $50.00</span>
                                                                    <p>
                                                                        Payoneer Prepaid MasterCard® or Global Bank Transfer
                                                                        (Payoneer) offers an easy, convenient and cost effective
                                                                        way to get paid. <a href="#">More about Payoneer </a> |{' '}
                                                                        <a href="#">Payoneer FAQs</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="email"
                                                                            name="emailaddress1"
                                                                            id="id_email1"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Email address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-20">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="email"
                                                                            name="cemailaddress1"
                                                                            id="id_emailc1"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Confirm email address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button className="save_payout_btn" type="submit">
                                                                    Set Payout Account
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group return-departure-dts" data-method="swift">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="pymnt_title">
                                                                    <h4>Your SWIFT Account</h4>
                                                                    <span>Minimum - $500.00</span>
                                                                    <p>
                                                                        SWIFT (International Transfer) get paid directly into your
                                                                        bank account. Connected with over 9000 banking
                                                                        organisations, security institutions and customers in more
                                                                        than 200 countries <a href="#">More about SWIFT</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4">
                                                                <div className="ui search focus mt-30">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="fullname"
                                                                            id="id_fullname"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Full Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-15">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="uraddress"
                                                                            id="id_address4"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Your Address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui fluid search selection dropdown focus mt-15 cntry152">
                                                                    <input
                                                                        type="hidden"
                                                                        name="country"
                                                                        className="prompt srch_explore"
                                                                    />
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="default text">Select Country</div>

                                                                    <div className="menu">
                                                                        {COUNTRIES.map((item) => {
                                                                            return (
                                                                                <div
                                                                                    key={item.val}
                                                                                    className="item"
                                                                                    data-value="af"
                                                                                >
                                                                                    <i className={item.val + '  flag'}></i>
                                                                                    {item.name}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-15">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="swiftcode"
                                                                            id="id_swiftcode"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Swift-Code"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-15">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="banknumber"
                                                                            id="id_banknumber"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Back Account Number"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-15">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="bankname"
                                                                            id="id_bankname"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Back Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="ui search focus mt-15">
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="address5"
                                                                            id="id_address5"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Back Address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button className="save_payout_btn" type="submit">
                                                                    Set Payout Account
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="save_btn" type="submit">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-api" role="tabpanel" aria-labelledby="pills-api-tab">
                                    <div className="account_setting">
                                        <h4>Affiliate API</h4>
                                        <p>
                                            The Cursus Affiliate API exposes functionalities of Cursus to help developers build
                                            client applications and integrations with Cursus. <br />
                                            To see more details, please visit <a href="#">Cursus Affiliate API</a>
                                        </p>
                                    </div>
                                    <button className="api_btn">Request Affiliate API Client</button>
                                    <div className="nt_apt">
                                        <i className="uil uil-info-circle"></i> You don't have any API clients yet.
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-closeaccount"
                                    role="tabpanel"
                                    aria-labelledby="pills-closeaccount-tab"
                                >
                                    <div className="account_setting">
                                        <h4>Close account</h4>
                                        <p>
                                            <strong>Warning:</strong> If you close your account, you will be unsubscribed from all
                                            your 5 courses, and will lose access forever.
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="ui search focus mt-30">
                                                <div className="ui left icon input swdh11 swdh19">
                                                    <input
                                                        className="prompt srch_explore"
                                                        type="password"
                                                        name="yourassword"
                                                        id="id_yourpassword"
                                                        required
                                                        maxLength={64}
                                                        placeholder="Enter Your Password"
                                                    />
                                                </div>
                                                <div className="help-block">Are you sure you want to close your account?</div>
                                            </div>
                                            <button className="save_payout_btn mbs20" type="submit">
                                                Close Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};

export default Body;
