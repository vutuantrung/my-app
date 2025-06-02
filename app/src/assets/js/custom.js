// === Dropdown === //
import $ from 'jquery';

$('.ui.dropdown').dropdown();
// === Model === //
$('.ui.modal').modal({ blurring: true }).modal('show');
// === Tab === //
$('.menu .item').tab();
// === checkbox Toggle === //
$('.ui.checkbox').checkbox();
// === Toggle === //
$('.enable.button').on('click', function () {
    $(this).nextAll('.checkbox').checkbox('enable');
});

// Home Live Stream
$('.live_stream').owlCarousel({
    items: 10,
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive: {
        0: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 3,
        },
        1200: {
            items: 5,
        },
        1400: {
            items: 6,
        },
    },
});
// Featured Courses home
$('.featured_courses').owlCarousel({
    items: 10,
    loop: false,
    margin: 20,
    nav: true,
    dots: false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 1,
        },
        1200: {
            items: 2,
        },
        1400: {
            items: 3,
        },
    },
});
// Featured Courses home
$('.top_instrutors').owlCarousel({
    items: 10,
    loop: false,
    margin: 20,
    nav: true,
    dots: false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 1,
        },
        1200: {
            items: 2,
        },
        1400: {
            items: 3,
        },
    },
});
// Student Says
$('.Student_says').owlCarousel({
    items: 10,
    loop: false,
    margin: 30,
    nav: true,
    dots: false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 2,
        },
        1200: {
            items: 3,
        },
        1400: {
            items: 3,
        },
    },
});
// features Careers
$('.feature_careers').owlCarousel({
    items: 4,
    loop: false,
    margin: 20,
    nav: true,
    dots: false,
    navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
        1200: {
            items: 1,
        },
        1400: {
            items: 1,
        },
    },
});

/*Floating Code for Iframe Start*/
if (
    $(
        'iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"],iframe[src*="https://player.vimeo.com/"]'
    ).length > 0
) {
    /*Wrap (all code inside div) all vedio code inside div*/
    $('iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"]').wrap(
        "<div class='iframe-parent-class'></div>"
    );
    /*main code of each (particular) vedio*/
    $('iframe[src*="https://www.youtube.com/embed/"],iframe[src*="https://player.vimeo.com/"]').each(function (index) {
        /*Floating js Start*/
        const windows = $(window);
        const iframeWrap = $(this).parent();
        const iframe = $(this);
        const iframeHeight = iframe.outerHeight();
        // const iframeElement = iframe.get(0);
        windows.on('scroll', function () {
            const windowScrollTop = windows.scrollTop();
            const iframeBottom = iframeHeight + iframeWrap.offset().top;
            //alert(iframeBottom);

            if (windowScrollTop > iframeBottom) {
                iframeWrap.height(iframeHeight);
                iframe.addClass('stuck');
                $('.scrolldown').css({ display: 'none' });
            } else {
                iframeWrap.height('auto');
                iframe.removeClass('stuck');
            }
        });
        /*Floating js End*/
    });
}

const headers = $('#accordion .accordion-header');
const contentAreas = $('#accordion .ui-accordion-content ').hide().first().show().end();
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
    const $value = $(this).attr('value');
    $('.return-departure-dts').slideUp();
    $('[data-method="' + $value + '"]').slideDown();
});
