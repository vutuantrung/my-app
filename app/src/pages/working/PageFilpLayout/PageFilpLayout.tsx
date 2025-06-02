import { useEffect, useState } from 'react';
import styles from './PageFilpLayout.module.css';
import { gsap, Expo, Quint } from 'gsap';
import PageHeader from '../../../Layouts/PageHeader';

const PageFilpLayout = () => {
    const [docState, setDocState] = useState('');
    const colors = ['#f6f6f6', '#f0f0f0', '#e3e3e3', '#d7d7d7', '#d0d0d0'];

    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            document.onreadystatechange = () => {
                setDocState(document.readyState);
            };
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
            class PageTurn {
                public DOM: any;
                private config: any;
                private tl: any;

                constructor(el: any, pagesTotal: any) {
                    this.DOM = { el: el };
                    this.config = {
                        // Duration for each page turn animation.
                        duration: 1.6,
                        // Delay between the pages. Need to be tuned correctly together with the duration, so that there are no gaps between the pages, otherwise the content switch would be visible.
                        pagesDelay: 0.15,
                        // Ease for each page turn animation. Needs to be easeInOut
                        ease: Quint.easeInOut,
                    };
                    // Both sides.
                    this.DOM.pagesWrap = {
                        left: this.DOM.el.querySelector(`.${CSS.escape(styles['revealer__item--left'])}`),
                        right: this.DOM.el.querySelector(`.${CSS.escape(styles['revealer__item--right'])}`),
                    };
                    // Create the turning pages.
                    let pagesHTML = '';
                    for (let i = 0; i <= pagesTotal; ++i) {
                        // Setting the color of the turning page based on the colors array
                        // todo: Need to find a better way to do this..
                        const color = colors[i] || colors[0];
                        pagesHTML += `<div class="revealer__item-inner" style="background-color:${color};"></div>`;
                    }
                    this.DOM.pagesWrap.left.innerHTML = this.DOM.pagesWrap.right.innerHTML = pagesHTML;
                    // All the turning pages.
                    this.DOM.pages = {
                        left: Array.from(this.DOM.pagesWrap.left.querySelectorAll(`.${CSS.escape(styles['revealer__item-inner'])}`)),
                        right: Array.from(this.DOM.pagesWrap.right.querySelectorAll(`.${CSS.escape(styles['revealer__item-inner'])}`)),
                    };
                }
                // The pages will be initially translated to the right or left (100% or -100% on the x-axis) and then animated to the opposite side.
                addTween(side: any, direction: any, nmbPages: any) {
                    const pages = this.DOM.pages[side];
                    for (let i = 0, len = nmbPages - 1; i <= len; ++i) {
                        const page = pages[i];
                        this.tl.to(
                            page,
                            this.config.duration,
                            {
                                ease: this.config.ease,
                                startAt: { x: direction === 'next' ? '100%' : '-100%' },
                                x: direction === 'next' ? '-100%' : '100%',
                            },
                            i * this.config.pagesDelay
                        );
                    }
                }
                createTweens(direction: any, nmbPages: any) {
                    this.addTween('left', direction, nmbPages);
                    this.addTween('right', direction, nmbPages);
                }
                turn(direction: any, nmbPages: any, middleAnimationCallback: any) {
                    return new Promise((resolve, reject) => {
                        this.tl = gsap.timeline({ onComplete: resolve, paused: true });
                        // Add a callback for the middle of the animation.
                        if (middleAnimationCallback) {
                            this.tl.call(middleAnimationCallback, (this.config.duration + (nmbPages - 1) * this.config.pagesDelay) / 2);
                        }
                        this.createTweens(direction, nmbPages);
                        this.tl.resume();
                    });
                }
            }
            // Class for a content item.
            class Item {
                public DOM: any;
                private rect: any;

                constructor(el: any) {
                    this.DOM = { el: el };
                    // The inner contains both the image and reveal elements.
                    this.DOM.inner = this.DOM.el.querySelector(`.${CSS.escape(styles['slide__figure-inner'])}`);
                    // The image.
                    this.DOM.image = this.DOM.inner.querySelector(`.${CSS.escape(styles['slide__figure-img'])}`);
                    // The reveal element (element that is on top of the image and moves away to reveal the image).
                    this.DOM.reveal = this.DOM.inner.querySelector(`.${CSS.escape(styles['slide__figure-reveal'])}`);
                    // Title and description.
                    this.DOM.title = this.DOM.el.querySelector(`.${CSS.escape(styles['slide__figure-title'])}`);
                    this.DOM.description = this.DOM.el.querySelector(`.${CSS.escape(styles['slide__figure-description'])}`);

                    const calcRect = () => (this.rect = this.DOM.el.getBoundingClientRect());
                    window.addEventListener('resize', calcRect);
                    calcRect();
                }
                // Gets the side where the item is on the slideshow/viewport (left or right).
                getSide() {
                    // Item´s center point.
                    const center = { x: this.rect.left + this.rect.width / 2, y: this.rect.top + this.rect.height / 2 };
                    return center.x >= winsize.width / 2 ? 'right' : 'left';
                }
            }
            // A slide is the two "pages" that are currently visible.
            class Slide {
                public DOM: any;
                private items: any;
                private tl: any;

                constructor(el: any) {
                    this.DOM = { el: el };
                    // Content item instances.
                    this.items = [];
                    // The figures
                    Array.from(this.DOM.el.querySelectorAll(`.${styles['slide__figure']}`)).forEach((item) => this.items.push(new Item(item)));
                }
                // Show its content items.
                showItems(direction: any) {
                    return new Promise((resolve, reject) => {
                        const duration = 1;
                        const ease = Expo.easeOut;
                        this.tl = gsap.timeline({ onComplete: resolve }).add('begin');
                        for (const item of this.items) {
                            // Animate the main element (translation of the whole item).
                            this.tl.to(
                                item.DOM.el,
                                duration,
                                {
                                    ease: ease,
                                    startAt: { x: direction === 'next' ? 60 : -60, opacity: 1 },
                                    x: '0%',
                                },
                                'begin'
                            );
                            // Animate the rotationZ for the elements that are inside the turning side.
                            if ((direction === 'next' && item.getSide() === 'left') || (direction === 'prev' && item.getSide() === 'right')) {
                                // Animate the perspective element
                                gsap.set(item.DOM.inner, { 'transform-origin': direction === 'next' ? '100% 50%' : '0% 50%' });
                                this.tl.to(
                                    item.DOM.inner,
                                    duration,
                                    {
                                        ease: ease,
                                        startAt: {
                                            rotationY: direction === 'next' ? 30 : -30,
                                            //rotationZ: direction === 'next' ?  5 : -5
                                        },
                                        rotationY: 0.1,
                                        //rotationZ: 0
                                    },
                                    'begin'
                                );
                            }
                            // Animate the reveal element away from the image.
                            this.tl
                                .to(
                                    item.DOM.reveal,
                                    duration,
                                    {
                                        ease: ease,
                                        startAt: { x: '0%' },
                                        x: direction === 'next' ? '-100%' : '100%',
                                    },
                                    'begin'
                                )
                                // Animate the scale of the image.
                                .to(
                                    item.DOM.image,
                                    duration,
                                    {
                                        ease: ease,
                                        startAt: {
                                            scale: 1.5,
                                            //rotationZ: direction === 'next' ?  -5 : 5
                                        },
                                        scale: 1,
                                        //rotationZ: 0
                                    },
                                    'begin'
                                )
                                // Animate the title in.
                                .to(
                                    item.DOM.title,
                                    duration * 0.8,
                                    {
                                        ease: Quart.easeOut,
                                        startAt: { x: direction === 'next' ? 15 : -15, opacity: 0 },
                                        x: '0%',
                                        opacity: 1,
                                    },
                                    'begin+=0.25'
                                )
                                // Animate the description in.
                                .to(
                                    item.DOM.description,
                                    duration * 0.8,
                                    {
                                        ease: Quart.easeOut,
                                        startAt: { x: direction === 'next' ? 20 : -20, opacity: 0 },
                                        x: '0%',
                                        opacity: 1,
                                    },
                                    'begin+=0.3'
                                );
                        }
                    });
                }
                // Reset items after the page turns.
                resetItems() {
                    for (const item of this.items) {
                        gsap.set(item.DOM.el, { opacity: 0 });
                        gsap.set([item.DOM.title, item.DOM.description], { opacity: 0 });
                    }
                }
            }
            class Slideshow {
                public DOM: any;
                private current: any;
                private slides: any;
                private slidesTotal: any;
                private pageturn: any;
                private pagination: any;
                private isAnimating: any;
                private isTocOpen: any;

                constructor(el: any) {
                    this.DOM = { el: el };
                    // Current slide´s index.
                    this.current = 0;
                    // Slide instances.
                    this.slides = [];
                    Array.from(this.DOM.el.querySelectorAll(`.${CSS.escape(styles['slide'])}`)).forEach((slide) =>
                        this.slides.push(new Slide(slide))
                    );
                    this.slidesTotal = this.slides.length;
                    // Set the first slide as current.
                    this.slides[this.current].DOM.el.classList.add(styles['slide--current']);
                    // The page turning animations.
                    this.pageturn = new PageTurn(this.DOM.el.querySelector(`.${CSS.escape(styles['revealer'])}`), this.slidesTotal);
                    // The arrows to navigate the slideshow.
                    this.pagination = {
                        prevCtrl: this.DOM.el.querySelector(`.${CSS.escape(styles['arrow-nav__item--prev'])}`),
                        nextCtrl: this.DOM.el.querySelector(`.${CSS.escape(styles['arrow-nav__item--next'])}`),
                    };
                    // The table of contents element.
                    this.DOM.nav = this.DOM.el.querySelector(`.${CSS.escape(styles['nav'])}`);
                    this.DOM.navCtrl = this.DOM.nav.querySelector(`.${CSS.escape(styles['nav__button'])}`);
                    // ..Its items.
                    this.DOM.tocItems = Array.from(
                        this.DOM.nav.querySelectorAll(`.${CSS.escape(styles['toc'])} > .${CSS.escape(styles['toc__item'])}`)
                    );
                    // Set the first one as current.
                    this.DOM.tocItems[this.current].classList.add(styles['toc__item--current']);
                    // Current chapter name (TOC Item that is selected and visible next to the "index+").
                    this.DOM.chapter = this.DOM.nav.querySelector(`.${CSS.escape(styles['nav__chapter'])}`);
                    // The "book" left/right cover indicators.
                    this.DOM.indicators = Array.from(this.DOM.el.querySelectorAll(`.${styles['slideshow__indicator']}`));
                    // The one on the right side is not visible in the beginning while the one on the left is fully visible.
                    // We will later change this as we turn the pages.
                    gsap.set(this.DOM.indicators[1], { scaleX: 0 });
                    this.initEvents();
                }
                initEvents() {
                    // Clicking on the next and previous arrows will turn the page to right or left.
                    const arrowClickPrevFn = () => this.pagethrough('prev');
                    const arrowClickNextFn = () => this.pagethrough('next');
                    this.pagination.prevCtrl.addEventListener('click', arrowClickPrevFn);
                    this.pagination.nextCtrl.addEventListener('click', arrowClickNextFn);

                    // Clicking the TOC element reveals or hides the TOC.
                    const navClickFn = () => this.toggleToc();
                    this.DOM.navCtrl.addEventListener('click', navClickFn);

                    // Clicking a link inside the TOC to go to a specific page
                    this.DOM.tocItems.forEach((tocItem: any, pos: any) => {
                        tocItem.addEventListener('click', (ev: any) => {
                            ev.preventDefault();
                            this.navigate(pos);
                        });
                    });
                }
                // This function is executed at the middle point of the turning pages animation.
                switchPage(newPagePos: any, direction: any = 'next') {
                    const currentSlide = this.slides[this.current];
                    const upcomingSlide = this.slides[newPagePos];
                    // Set the upcoming slide as current.
                    currentSlide.DOM.el.classList.remove(styles['slide--current']);
                    currentSlide.resetItems();
                    upcomingSlide.DOM.el.style.zIndex = 100;
                    upcomingSlide.showItems(direction).then(() => {
                        upcomingSlide.DOM.el.classList.add(styles['slide--current']);
                        upcomingSlide.DOM.el.style.zIndex = '';
                        this.isAnimating = false;
                    });
                    // Update the side indicators.
                    gsap.to(this.DOM.indicators[0], 0.5, { ease: Expo.easeOut, scaleX: 1 - newPagePos / (this.slidesTotal - 1) });
                    gsap.to(this.DOM.indicators[1], 0.5, { ease: Expo.easeOut, scaleX: newPagePos / (this.slidesTotal - 1) });
                    // Update TOC
                    this.updateToc(newPagePos);
                    // Update current value.
                    this.current = newPagePos;
                    // Update pagination ctrls visibility.
                    this.pagination.nextCtrl.style.visibility = this.current === this.slidesTotal - 1 ? 'hidden' : 'visible';
                    this.pagination.prevCtrl.style.visibility = this.current === 0 ? 'hidden' : 'visible';
                }
                // Go to the next or previous page.
                pagethrough(direction: any) {
                    if (
                        this.isAnimating ||
                        (direction === 'next' && this.current === this.slidesTotal - 1) ||
                        (direction === 'prev' && this.current === 0)
                    ) {
                        return false;
                    }
                    this.isAnimating = true;
                    const newPagePos = direction === 'next' ? this.current + 1 : this.current - 1;
                    this.pageturn.turn(direction, 1, () => this.switchPage(newPagePos, direction));
                }
                // Show or hide the TOC.
                toggleToc() {
                    if (this.isTocOpen) {
                        this.DOM.chapter.style.opacity = 1;
                        this.DOM.nav.classList.remove(styles['nav--open']);
                        gsap.set(this.DOM.tocItems, { opacity: 0 });
                    } else {
                        this.DOM.chapter.style.opacity = 0;
                        this.DOM.nav.classList.add(styles['nav--open']);
                        gsap.to(this.DOM.tocItems, {
                            y: 0,
                            opacity: 1,
                            startAt: { opacity: 0, y: 10 },
                            duration: 1,
                            scale: 0.02,
                            stagger: {
                                // wrap advanced options in an object
                                each: 0.1,
                                ease: Expo.easeOut,
                            },
                        });
                        // gsap.to(
                        //     this.DOM.tocItems,
                        //     1,
                        //     {
                        //         ease: Expo.easeOut,
                        //         startAt: { opacity: 0, y: 10 },
                        //         opacity: 1,
                        //         y: 0,
                        //     },
                        //     0.02
                        // );
                    }
                    this.isTocOpen = !this.isTocOpen;
                }
                // Update the current TOC item.
                updateToc(newpos: any) {
                    this.DOM.tocItems[this.current].classList.remove(styles['toc__item--current']);
                    this.DOM.tocItems[newpos].classList.add(styles['toc__item--current']);
                    this.DOM.chapter.innerHTML = this.DOM.tocItems[newpos].querySelector(`.${CSS.escape(styles['toc__item-title'])}`).innerHTML;
                }
                // Clicking a link inside the TOC will turn as many pages needed and jump to the specified page.
                navigate(newPagePos: any) {
                    if (this.isAnimating || newPagePos === this.current) {
                        return false;
                    }
                    this.isAnimating = true;
                    // Close after clicking.
                    this.toggleToc();
                    const direction = newPagePos > this.current ? 'next' : 'prev';
                    // Turn [this.current-newPagePos] pages.
                    this.pageturn.turn(direction, Math.abs(this.current - newPagePos), () => this.switchPage(newPagePos, direction));
                }
            }

            document.getElementById('wrapper')!.classList.add(styles['js']);
            const supportsCssVars = function () {
                let e;
                let t = document.createElement('style');
                return (
                    (t.innerHTML = 'root: { --tmp-var: bold; }'),
                    document.head.appendChild(t),
                    (e = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))),
                    t.parentNode!.removeChild(t),
                    e
                );
            };
            supportsCssVars() || alert('Please view this demo in a modern browser that supports CSS Variables.');

            // Window sizes.
            let winsize: any;
            const calcWinsize = () => (winsize = { width: window.innerWidth, height: window.innerHeight });
            calcWinsize();
            window.addEventListener('resize', calcWinsize);

            // Initialize the slideshow.
            const slideshow = new Slideshow(document.querySelector(`.${CSS.escape(styles['slideshow'])}`));
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);

    return (
        <div>
            <PageHeader />
            <div id="wrapper" className={styles['wrapper']}>
                <svg className={styles['hidden']}>
                    <symbol id="icon-arrow" viewBox="0 0 24 24">
                        <title>arrow</title>
                        <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
                    </symbol>
                    <symbol id="icon-drop" viewBox="0 0 24 24">
                        <title>drop</title>
                        <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" />
                        <path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
                    </symbol>
                    <svg id="icon-nav" viewBox="0 0 152 63">
                        <title>navarrow</title>
                        <path d="M115.737 29L92.77 6.283c-.932-.92-1.21-2.84-.617-4.281.594-1.443 1.837-1.862 2.765-.953l28.429 28.116c.574.57.925 1.557.925 2.619 0 1.06-.351 2.046-.925 2.616l-28.43 28.114c-.336.327-.707.486-1.074.486-.659 0-1.307-.509-1.69-1.437-.593-1.442-.315-3.362.617-4.284L115.299 35H3.442C2.032 35 .89 33.656.89 32c0-1.658 1.143-3 2.552-3H115.737z" />
                    </svg>
                </svg>
                <main>
                    <p className={styles['message']}>Please view on desktop to see the full layout</p>
                    <div className={styles['slideshow']}>
                        <header className={styles['codrops-header']}>
                            <h1 className={styles['codrops-header__title']}>Modern Page Flip Layout</h1>
                            <div className={styles['codrops-header__links']}>
                                <a href="https://tympanus.net/Development/AnimatedGridPreviews/" title="Previous Demo">
                                    Previous demo
                                </a>
                                <a href="https://tympanus.net/codrops/?p=36406" title="Back to the article">
                                    Article
                                </a>
                                <a href="https://github.com/codrops/PageFlipLayout/" title="Find this project on GitHub">
                                    GitHub
                                </a>
                            </div>
                        </header>
                        <div className={`${styles['slide']} ${styles['slide--layout-1']} ${styles['slide--current']}`}>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/1.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Black cappuccino sugar</h3>
                                    <p className={styles['slide__figure-description']}>Plunger pot dripper crema sit coffee</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/2.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Cup white foam</h3>
                                    <p className={styles['slide__figure-description']}>Mug that steamed to go</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/3.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Aroma mocha</h3>
                                    <p className={styles['slide__figure-description']}>Foam trifecta</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/4.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Seasonal et dripper</h3>
                                    <p className={styles['slide__figure-description']}>Trifecta foam, con panna caffeine</p>
                                </figcaption>
                            </figure>
                            <span className={`${styles['slide__number']} ${styles['slide__number--left']}`}>1</span>
                            <span className={`${styles['slide__number']} ${styles['slide__number--right']}`}>2</span>
                        </div>
                        ``
                        <div className={`${styles['slide']} ${styles['slide--layout-2']}`}>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/5.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Carajillo percolator</h3>
                                    <p className={styles['slide__figure-description']}>White sugar plunger pot half</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/6.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Cortado organic skinny</h3>
                                    <p className={styles['slide__figure-description']}>As aromatic, grinder turkish</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/7.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Qui coffee, americano</h3>
                                    <p className={styles['slide__figure-description']}>Espresso percolator iced rich</p>
                                </figcaption>
                            </figure>
                            <span className={`${styles['slide__number']} ${styles['slide__number--left']}`}>3</span>
                            <span className={`${styles['slide__number']} ${styles['slide__number--right']}`}>4</span>
                        </div>
                        <div className={`${styles['slide']} ${styles['slide--layout-3']}`}>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/8.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>White filter</h3>
                                    <p className={styles['slide__figure-description']}>Breve, brewed ristretto rich arabica</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/9.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Java half and half</h3>
                                    <p className={styles['slide__figure-description']}>Et aged so, sweet cup</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/10.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Steamed et mazagran</h3>
                                    <p className={styles['slide__figure-description']}>As cultivar froth fair trade</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/11.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Coffee mazagran eu</h3>
                                    <p className={styles['slide__figure-description']}>Breve seasonal frappuccino</p>
                                </figcaption>
                            </figure>
                            <span className={`${styles['slide__number']} ${styles['slide__number--left']}`}>5</span>
                            <span className={`${styles['slide__number']} ${styles['slide__number--right']}`}>6</span>
                        </div>
                        <div className={`${styles['slide']} ${styles['slide--layout-4']}`}>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/12.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Kopi-luwak body</h3>
                                    <p className={styles['slide__figure-description']}>Affogato steamed single shot</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/13.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Ut crema eu cultivar</h3>
                                    <p className={styles['slide__figure-description']}>Black flavour qui robusta</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/14.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Sit, in americano iced acerbic</h3>
                                    <p className={styles['slide__figure-description']}>Macchiato whipped, chicory mug</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/15.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>At redeye, white foam extra</h3>
                                    <p className={styles['slide__figure-description']}>Variety black grounds espresso</p>
                                </figcaption>
                            </figure>
                            <span className={`${styles['slide__number']} ${styles['slide__number--left']}`}>7</span>
                            <span className={`${styles['slide__number']} ${styles['slide__number--right']}`}>8</span>
                        </div>
                        <div className={`${styles['slide']} ${styles['slide--layout-5']}`}>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/16.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Aftertaste roast</h3>
                                    <p className={styles['slide__figure-description']}>Instant extra beans decaffeinated</p>
                                </figcaption>
                            </figure>
                            <figure className={styles['slide__figure']}>
                                <div className={styles['slide__figure-inner']}>
                                    <div
                                        className={styles['slide__figure-img']}
                                        style={{ backgroundImage: 'url(/public/assets/images/test/img_cours_sample/17.jpg)' }}
                                    ></div>
                                    <div className={styles['slide__figure-reveal']}></div>
                                </div>
                                <figcaption>
                                    <h3 className={styles['slide__figure-title']}>Brewed sit in instant shop</h3>
                                    <p className={styles['slide__figure-description']}>Blue mountain, java crema</p>
                                </figcaption>
                            </figure>
                            <span className={`${styles['slide__number']} ${styles['slide__number--left']}`}>9</span>
                            <span className={`${styles['slide__number']} ${styles['slide__number--right']}`}>10</span>
                        </div>
                        <div className={styles['revealer']}>
                            <div className={`${styles['revealer__item']} ${styles['revealer__item--left']}`}></div>
                            <div className={`${styles['revealer__item']} ${styles['revealer__item--right']}`}></div>
                        </div>
                        <nav className={styles['arrow-nav']}>
                            <button className={`${styles['arrow-nav__item']} ${styles['arrow-nav__item--prev']}`}>
                                <svg className={`${styles['icon']} ${styles['icon--nav']}`}>
                                    <use xlinkHref="#icon-nav"></use>
                                </svg>
                            </button>
                            <button className={`${styles['arrow-nav__item']} ${styles['arrow-nav__item--next']}`}>
                                <svg className={`${styles['icon']} ${styles['icon--nav']}`}>
                                    <use xlinkHref="#icon-nav"></use>
                                </svg>
                            </button>
                        </nav>
                        <nav className={styles['nav']}>
                            <button className={styles['nav__button']}>
                                <span className={styles['nav__button-text']}>index</span>
                            </button>
                            <h2 className={styles['nav__chapter']}>Riding on a storm</h2>
                            <div className={styles['toc']}>
                                <a className={styles['toc__item']} href="#entry-1">
                                    <span className={styles['toc__item-page']}>01.</span>
                                    <span className={styles['toc__item-title']}>Riding on a storm</span>
                                </a>
                                <a className={styles['toc__item']} href="#entry-2">
                                    <span className={styles['toc__item-page']}>03.</span>
                                    <span className={styles['toc__item-title']}>Guidelines for happiness</span>
                                </a>
                                <a className={styles['toc__item']} href="#entry-3">
                                    <span className={styles['toc__item-page']}>05.</span>
                                    <span className={styles['toc__item-title']}>Freedom fighter</span>
                                </a>
                                <a className={styles['toc__item']} href="#entry-4">
                                    <span className={styles['toc__item-page']}>07.</span>
                                    <span className={styles['toc__item-title']}>Lost and found</span>
                                </a>
                                <a className={styles['toc__item']} href="#entry-5">
                                    <span className={styles['toc__item-page']}>09.</span>
                                    <span className={styles['toc__item-title']}>Fantasies of Wood</span>
                                </a>
                            </div>
                        </nav>
                        <div className={styles['slideshow__indicator']}></div>
                        <div className={styles['slideshow__indicator']}></div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PageFilpLayout;
