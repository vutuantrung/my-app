import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { IMAGES } from '../constants';

const PageHeader = () => {
    const night_mode_switch = useRef<HTMLAnchorElement>(null);
    const onNightModeSwitch = (event: Event) => {
        event.preventDefault();
        document.documentElement.classList.toggle('night-mode');
        if (document.documentElement.classList.contains('night-mode')) {
            localStorage.setItem('gmtNightMode', 'true');
            return;
        }
        localStorage.removeItem('gmtNightMode');
    };

    useEffect(() => {
        ($('.ui.dropdown') as any).dropdown();
        // === Model === //
        ($('.ui.modal') as any).modal({ blurring: true }).modal('show');
        // === Tab === //
        ($('.menu .item') as any).tab();
        // === checkbox Toggle === //
        ($('.ui.checkbox') as any).checkbox();
        // === Toggle === //
        $('.enable.button').on('click', function () {
            ($(this).nextAll('.checkbox') as any).checkbox('enable');
        });

        if (night_mode_switch.current) {
            night_mode_switch.current.addEventListener('click', onNightModeSwitch);
        }

        const headers = $('#accordion .accordion-header');
        const contentAreas = $('#accordion .ui-accordion-content ').hide().first().show().end();
        const expandLink = $('.accordion-expand-all');
        // const inputPayment = $('input[name="paymentmethod"]');

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
        // inputPayment.on('click', function () {
        //     const $value = $(this).attr('value');
        //     $('.return-departure-dts').slideUp();
        //     $('[data-method="' + $value + '"]').slideDown();
        // });
    }, []);
    return (
        <div className="header clearfix">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="back_link">
                            <Link to="/" className="hde151">
                                <div className="hde151">Back To Cursus</div>
                            </Link>
                            <Link to="/" className="hde152">
                                <div className="hde152">Back</div>
                            </Link>
                        </div>
                        <div className="ml_item">
                            <div className="main_logo main_logo15" id="logo">
                                <Link to="/">
                                    <img src={IMAGES.logo} alt="" />
                                </Link>
                                <Link to="/">
                                    <img className="logo-inverse" src={IMAGES.ct_logo} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="header_right pr-0">
                            <ul>
                                <li className="ui top right pointing dropdown">
                                    <a href="##" className="opts_account">
                                        <img src={IMAGES.avatar} alt="" />
                                    </a>
                                    <div className="menu dropdown_account">
                                        <div className="channel_my">
                                            <div className="profile_link">
                                                <img src={IMAGES.avatar} alt="" />
                                                <div className="pd_content">
                                                    <div className="rhte85">
                                                        <h6>Joginder Singh</h6>
                                                        <div className="mef78" title="Verify">
                                                            <i className="uil uil-check-circle"></i>
                                                        </div>
                                                    </div>
                                                    <span>gambol943@gmail.com</span>
                                                </div>
                                            </div>
                                            <Link to="myInstructorProfile" className="dp_link_12">
                                                View Instructor Profile
                                            </Link>
                                        </div>
                                        <div className="night_mode_switch__btn">
                                            <a href="###" id="night-mode" className="btn-night-mode" ref={night_mode_switch}>
                                                <i className="uil uil-moon"></i> Night mode
                                                <span className="btn-night-mode-switch">
                                                    <span className="uk-switch-button"></span>
                                                </span>
                                            </a>
                                        </div>
                                        <Link to="/instructorDashboard" className="item channel_item">
                                            Cursus Dashboard
                                        </Link>
                                        <Link to="/signIn" className="item channel_item">
                                            Sign Out
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PageHeader;
