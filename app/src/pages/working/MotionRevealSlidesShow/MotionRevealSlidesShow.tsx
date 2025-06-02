import { useEffect, useState } from 'react';
import PageHeader from '../../../Layouts/PageHeader';
import styles from './MotionRevealSlidesShow.module.css';
import { gsap, Expo } from 'gsap';

const MotionRevealSlidesShow = () => {
    const [docState, setDocState] = useState('');

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
            class Slide {
                public DOM: any;
                private config: any;

                constructor(el: any) {
                    this.DOM = { el: el };
                    // The image conteiner.
                    this.DOM.imgWrap = this.DOM.el.querySelector(`.${CSS.escape(styles['slide__img-wrap'])}`);
                    // The revealer element (the element with the same color of the body that covers the image).
                    this.DOM.revealer = this.DOM.imgWrap.querySelector(`.${CSS.escape(styles['slide__img-reveal'])}`);
                    // The title element.
                    this.DOM.title = this.DOM.el.querySelector(`.${CSS.escape(styles['slide__title'])}`);
                    // The slide´s number element
                    this.DOM.number = this.DOM.el.querySelector(`${CSS.escape(styles['slide__number'])}`);
                    // The large preview elements (also an image and revealer for the cover/uncover effect)
                    this.DOM.preview = {
                        imgWrap: this.DOM.el.querySelector(`.${CSS.escape(styles['preview__img-wrap'])}`),
                        revealer: this.DOM.el.querySelector(
                            `.${CSS.escape(styles['preview__img-wrap'])} > .${CSS.escape(styles['preview__img-reveal'])}`
                        ),
                        title: this.DOM.el.querySelector(`.${CSS.escape(styles['preview__title'])}`),
                        content: this.DOM.el.querySelector(`.${CSS.escape(styles['preview__content'])}`),
                    };

                    // Some config values.
                    this.config = {
                        animation: {
                            duration: 0.6,
                            ease: Expo.easeOut,
                        },
                    };
                }
                // Sets the current class.
                setCurrent(isCurrent = true) {
                    this.DOM.el.classList[isCurrent ? 'add' : 'remove'](styles['slide--current']);
                }
                // Hide the slide.
                hide(direction: any) {
                    return this.toggle('hide', direction);
                }
                // Show the slide.
                show(direction: any) {
                    return this.toggle('show', direction);
                }
                // Show/Hide the slide.
                toggle(action: any, direction: any) {
                    // Hide/Show revealer on top of the image and move the image, title and number.
                    return new Promise((resolve, reject) => {
                        let revealerOpts: any = {
                            delay: action === 'hide' ? 0 : this.config.animation.duration / 2,
                            ease: this.config.animation.ease,
                            onComplete: resolve,
                        };

                        const commonOpts = {
                            delay: action === 'hide' ? 0 : this.config.animation.duration / 2,
                            ease: this.config.animation.ease,
                            opacity: action === 'hide' ? 0 : 1,
                        };
                        let imgOpts: any = Object.assign({}, commonOpts);
                        let numberOpts: any = Object.assign({}, commonOpts);
                        let titleOpts: any = Object.assign({}, commonOpts);

                        if (direction === 'left' || direction === 'right') {
                            revealerOpts.startAt = action === 'hide' ? { x: direction === 'left' ? '-100%' : '100%', y: '0%' } : { x: '0%', y: '0%' };
                            revealerOpts.x = action === 'hide' ? '0%' : direction === 'left' ? '100%' : '-100%';
                            imgOpts.startAt = action === 'show' ? { opacity: 0, x: direction === 'left' ? '-20%' : '20%' } : {};
                            imgOpts.x = action === 'hide' ? (direction === 'left' ? '20%' : '-20%') : '0%';
                            titleOpts.startAt = action === 'show' ? { opacity: 1, scale: 0.2, x: direction === 'left' ? '-200%' : '200%' } : {};
                            titleOpts.x = action === 'hide' ? (direction === 'left' ? '200%' : '-200%') : '0%';
                            titleOpts.scale = action === 'hide' ? 0.2 : 1;
                            numberOpts.startAt = action === 'show' ? { opacity: 1, x: direction === 'left' ? '-50%' : '50%' } : {};
                            numberOpts.x = action === 'hide' ? (direction === 'left' ? '50%' : '-50%') : '0%';
                        } else {
                            revealerOpts.startAt = action === 'hide' ? { x: '0%', y: direction === 'down' ? '-100%' : '100%' } : { x: '0%', y: '0%' };
                            revealerOpts.y = action === 'hide' ? '0%' : direction === 'down' ? '100%' : '-100%';
                            imgOpts.startAt = action === 'show' ? { opacity: 1, y: direction === 'down' ? '-10%' : '10%' } : {};
                            imgOpts.y = action === 'hide' ? (direction === 'down' ? '10%' : '-10%') : '0%';
                            titleOpts.ease = this.config.animation.ease;
                            titleOpts.startAt = action === 'show' ? { opacity: 1, y: direction === 'down' ? '-100%' : '100%' } : {};
                            titleOpts.y = action === 'hide' ? (direction === 'down' ? '100%' : '-100%') : '0%';
                        }

                        // Toggling the revealer.
                        gsap.to(this.DOM.revealer, this.config.animation.duration, revealerOpts);
                        // Moving & fading the image (wrappper).
                        gsap.to(this.DOM.imgWrap, this.config.animation.duration, imgOpts);
                        // Moving & fading the title and number.
                        gsap.to(this.DOM.title, this.config.animation.duration * 1.5, titleOpts);
                        gsap.to(this.DOM.number, this.config.animation.duration, numberOpts);
                    });
                }
                // Hide the preview element.
                hidePreview(delay: any) {
                    return this.togglePreview('hide');
                }
                // Show the preview element.
                showPreview(delay: any) {
                    return this.togglePreview('show');
                }
                // Show/Hide the preview.
                togglePreview(action: any) {
                    return new Promise((resolve, reject) => {
                        // Hide/Show revealer.
                        gsap.to(this.DOM.preview.revealer, this.config.animation.duration, {
                            delay: action === 'hide' ? 0 : this.config.animation.duration / 2,
                            ease: this.config.animation.ease,
                            startAt: action === 'hide' ? { x: '0%', y: '-100%' } : { x: '0%', y: '0%' },
                            y: action === 'hide' ? '0%' : '-100%',
                            onComplete: resolve,
                        });
                        // Move and fade the image wrapper.
                        gsap.to(this.DOM.preview.imgWrap, this.config.animation.duration, {
                            delay: action === 'hide' ? 0 : this.config.animation.duration / 2,
                            ease: this.config.animation.ease,
                            startAt: action === 'hide' ? {} : { opacity: 0, y: '20%' },
                            y: action === 'hide' ? '20%' : '0%',
                            opacity: action === 'hide' ? 0 : 1,
                        });
                        // Move and fade the title and content.
                        gsap.to([this.DOM.preview.title, this.DOM.preview.content], this.config.animation.duration, {
                            delay: action === 'hide' ? 0 : this.config.animation.duration / 2,
                            ease: this.config.animation.ease,
                            startAt: action === 'hide' ? {} : { opacity: 0, y: '200%' },
                            y: action === 'hide' ? '200%' : '0%',
                            opacity: action === 'hide' ? 0 : 1,
                        });
                    });
                }
            }
            class Slideshow {
                public DOM: any;
                private slides: any;
                private slidesTotal: any;
                private current: any;
                private isAnimating: any;

                constructor(el: any) {
                    this.DOM = { el: el };
                    // Navigation controls (prev, next and preview ctrls)
                    this.DOM.prevCtrl = this.DOM.el.querySelector(`.${CSS.escape(styles['slidenav__item--prev'])}`);
                    this.DOM.nextCtrl = this.DOM.el.querySelector(`.${CSS.escape(styles['slidenav__item--next'])}`);
                    this.DOM.previewCtrl = this.DOM.el.querySelector(`.${CSS.escape(styles['slidenav__preview'])}`);
                    // The slides.
                    this.slides = [];
                    Array.from(this.DOM.el.querySelectorAll(`.${CSS.escape(styles['slide'])}`)).forEach((slideEl) =>
                        this.slides.push(new Slide(slideEl))
                    );
                    // The total number of slides.
                    this.slidesTotal = this.slides.length;
                    // Current slide position.
                    this.current = 0;
                    // initialize the slideshow.
                    this.init();
                }
                // init: set the current slide and initialize some events..
                init() {
                    this.slides[this.current].setCurrent();
                    this.initEvents();
                }
                initEvents() {
                    this.DOM.prevCtrl.addEventListener('click', () => this.prev());
                    this.DOM.nextCtrl.addEventListener('click', () => this.next());
                    this.DOM.previewCtrl.addEventListener('click', (ev: any) => {
                        if (this.isAnimating) return;
                        if (ev.target.classList.contains(styles['slidenav__preview--open'])) {
                            ev.target.classList.remove(styles['slidenav__preview--open']);
                            this.exitPreview();
                        } else {
                            ev.target.classList.add(styles['slidenav__preview--open']);
                            this.enterPreview();
                        }
                    });
                }
                prev() {
                    this.navigate('left');
                }
                next() {
                    this.navigate('right');
                }
                enterPreview() {
                    console.log('enterPreview');
                    this.togglePreview('enter');
                }
                exitPreview() {
                    this.togglePreview('exit');
                }
                togglePreview(action: any) {
                    // If animating return.
                    if (this.isAnimating) return;
                    this.isAnimating = true;

                    const processing =
                        action === 'enter'
                            ? [this.slides[this.current].hide('up'), this.slides[this.current].showPreview()]
                            : [this.slides[this.current].show('down'), this.slides[this.current].hidePreview()];

                    // Hide the next/prev controls.
                    this.toggleNavCtrls(action);

                    Promise.all(processing).then(() => (this.isAnimating = false));
                }
                toggleNavCtrls(action: any) {
                    gsap.to([this.DOM.prevCtrl, this.DOM.nextCtrl], 0.5, {
                        ease: Expo.easeOut,
                        opacity: action === 'enter' ? 0 : 1,
                        onStart: () => {
                            this.DOM.prevCtrl.style.pointerEvents = this.DOM.nextCtrl.style.pointerEvents = action === 'enter' ? 'none' : 'auto';
                        },
                    });
                }
                // Navigate the slideshow.
                navigate(direction: any) {
                    // If animating return.
                    if (this.isAnimating) return;
                    this.isAnimating = true;

                    const nextSlidePos =
                        direction === 'right'
                            ? this.current < this.slidesTotal - 1
                                ? this.current + 1
                                : 0
                            : this.current > 0
                            ? this.current - 1
                            : this.slidesTotal - 1;

                    Promise.all([this.slides[this.current].hide(direction), this.slides[nextSlidePos].show(direction)]).then(() => {
                        // Update current.
                        this.slides[this.current].setCurrent(false);
                        this.current = nextSlidePos;
                        this.isAnimating = false;
                        this.slides[this.current].setCurrent();
                    });
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
            <div id="wrapper" className={`${styles['wrapper']}`}>
                <main className={styles['main_div']}>
                    <div className={styles['slideshow']}>
                        <div className={styles['slide']}>
                            <div className={styles['preview']}>
                                <div className={styles['preview__img-wrap']}>
                                    <div className={`${styles['preview__img']} ${styles['preview__img_0']}`}></div>
                                    <div className={styles['preview__img-reveal']}></div>
                                </div>
                                <h3 className={styles['preview__title']}>Carmino Burano</h3>
                                <div className={styles['preview__content']}>
                                    <p>
                                        You’re not your job. You’re not how much money you have in the bank. You’re not the car you drive. You’re not
                                        the contents of your wallet. You’re not your f***ing khakis. You’re the all-singing, all-dancing crap of the
                                        world. What do you want? Wanna go back to the s*** job, f***in’ condo world, watching sitcoms? F*** you, I
                                        won’t do it. Fifth rule: one fight at a time, fellas.
                                    </p>
                                </div>
                            </div>
                            <div className={styles['slide__img-wrap']}>
                                <div className={`${styles['slide__img']} ${styles['slide__img_0']}`}></div>{' '}
                                <div className={styles['slide__img-reveal']}></div>
                            </div>
                            <span className={styles['slide__number']}>#01</span>
                            <h3 className={styles['slide__title']}>Carmino</h3>
                        </div>
                        <div className={styles['slide']}>
                            <div className={styles['preview']}>
                                <div className={styles['preview__img-wrap']}>
                                    <div className={`${styles['preview__img']} ${styles['preview__img_1']}`}></div>
                                    <div className={styles['preview__img-reveal']}></div>
                                </div>
                                <h3 className={styles['preview__title']}>Jackardi Jack</h3>
                                <div className={styles['preview__content']}>
                                    <p>
                                        You’re not your job. You’re not how much money you have in the bank. You’re not the car you drive. You’re not
                                        the contents of your wallet. You’re not your f***ing khakis. You’re the all-singing, all-dancing crap of the
                                        world. What do you want? Wanna go back to the s*** job, f***in’ condo world, watching sitcoms? F*** you, I
                                        won’t do it. Fifth rule: one fight at a time, fellas.
                                    </p>
                                </div>
                            </div>
                            <div className={styles['slide__img-wrap']}>
                                <div className={`${styles['slide__img']} ${styles['slide__img_1']}`}></div>{' '}
                                <div className={styles['slide__img-reveal']}></div>
                            </div>
                            <span className={styles['slide__number']}>#02</span>
                            <h3 className={styles['slide__title']}>Jackardi</h3>
                        </div>
                        <div className={styles['slide']}>
                            <div className={styles['preview']}>
                                <div className={styles['preview__img-wrap']}>
                                    <div className={`${styles['preview__img']} ${styles['preview__img_2']}`}></div>
                                    <div className={styles['preview__img-reveal']}></div>
                                </div>
                                <h3 className={styles['preview__title']}>Hostabili Hell</h3>
                                <div className={styles['preview__content']}>
                                    <p>
                                        You’re not your job. You’re not how much money you have in the bank. You’re not the car you drive. You’re not
                                        the contents of your wallet. You’re not your f***ing khakis. You’re the all-singing, all-dancing crap of the
                                        world. What do you want? Wanna go back to the s*** job, f***in’ condo world, watching sitcoms? F*** you, I
                                        won’t do it. Fifth rule: one fight at a time, fellas.
                                    </p>
                                </div>
                            </div>
                            <div className={styles['slide__img-wrap']}>
                                <div className={`${styles['slide__img']} ${styles['slide__img_2']}`}></div>{' '}
                                <div className={styles['slide__img-reveal']}></div>
                            </div>
                            <span className={styles['slide__number']}>#03</span>
                            <h3 className={styles['slide__title']}>Hostabili</h3>
                        </div>
                        <div className={styles['slide']}>
                            <div className={styles['preview']}>
                                <div className={styles['preview__img-wrap']}>
                                    <div className={`${styles['preview__img']} ${styles['preview__img_3']}`}></div>
                                    <div className={styles['preview__img-reveal']}></div>
                                </div>
                                <h3 className={styles['preview__title']}>Tellawa Tell</h3>
                                <div className={styles['preview__content']}>
                                    <p>
                                        You’re not your job. You’re not how much money you have in the bank. You’re not the car you drive. You’re not
                                        the contents of your wallet. You’re not your f***ing khakis. You’re the all-singing, all-dancing crap of the
                                        world. What do you want? Wanna go back to the s*** job, f***in’ condo world, watching sitcoms? F*** you, I
                                        won’t do it. Fifth rule: one fight at a time, fellas.
                                    </p>
                                </div>
                            </div>
                            <div className={styles['slide__img-wrap']}>
                                <div className={`${styles['slide__img']} ${styles['slide__img_3']}`}></div>
                                <div className={styles['slide__img-reveal']}></div>
                            </div>
                            <span className={styles['slide__number']}>#04</span>
                            <h3 className={styles['slide__title']}>Tellawa</h3>
                        </div>
                        <div className={styles['slide']}>
                            <div className={styles['preview']}>
                                <div className={styles['preview__img-wrap']}>
                                    <div className={`${styles['preview__img']} ${styles['preview__img_4']}`}></div>
                                    <div className={styles['preview__img-reveal']}></div>
                                </div>
                                <h3 className={styles['preview__title']}>Lochnox Lox</h3>
                                <div className={styles['preview__content']}>
                                    <p>
                                        You’re not your job. You’re not how much money you have in the bank. You’re not the car you drive. You’re not
                                        the contents of your wallet. You’re not your f***ing khakis. You’re the all-singing, all-dancing crap of the
                                        world. What do you want? Wanna go back to the s*** job, f***in’ condo world, watching sitcoms? F*** you, I
                                        won’t do it. Fifth rule: one fight at a time, fellas.
                                    </p>
                                </div>
                            </div>
                            <div className={styles['slide__img-wrap']}>
                                <div className={`${styles['slide__img']} ${styles['slide__img_4']}`}></div>{' '}
                                <div className={styles['slide__img-reveal']}></div>
                            </div>
                            <span className={styles['slide__number']}>#05</span>
                            <h3 className={styles['slide__title']}>Lochnox</h3>
                        </div>
                        <nav className={styles['slidenav']}>
                            <button className={`${styles['slidenav__item']} ${styles['slidenav__item--prev']}`}>Previous</button>
                            <button className={`${styles['slidenav__item']} ${styles['slidenav__item--next']}`}>Next</button>
                            <button className={styles['slidenav__preview']}>
                                <svg className={`${styles['icon']} ${styles['icon--caret']}`}>
                                    <use xlinkHref="#icon-caret"></use>
                                </svg>
                            </button>
                        </nav>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MotionRevealSlidesShow;
