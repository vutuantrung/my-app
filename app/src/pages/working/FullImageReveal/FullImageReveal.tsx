import styles from './FullImageReveal.module.css';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
import imagesLoaded from 'imagesloaded';

import PageHeader from '../../../Layouts/PageHeader';

const getRandomFloat = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

const getMousePos = (e: any) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy };
};

const FullImageReveal = () => {
    const [docState, setDocState] = useState('');
    const [allowTilt, setAllowTilt] = useState(true);

    class GridItem {
        public DOM: any;
        constructor(el: any) {
            this.DOM = { el: el };
            this.DOM.inner = Array.from(this.DOM.el.children);
        }
        toggle(action: any) {
            this.DOM.inner.forEach((inner: any) => {
                const speed = getRandomFloat(1, 1.5);
                gsap.to(inner, speed, {
                    delay: 0.2,
                    ease: 'Quint.easeInOut',
                    y:
                        action === 'hide'
                            ? this.constructor.name === 'Thumb'
                                ? -1 * window.innerHeight - 30
                                : -1 * window.innerHeight - 30 + inner.offsetHeight / 2
                            : 0,
                });

                // scale the "more/back" box as it moves.
                if (this.constructor.name !== 'Thumb') {
                    gsap.to(inner, speed / 2, {
                        delay: 0.2,
                        ease: 'Quint.easeIn',
                        scaleY: 2.5,
                    });
                    gsap.to(inner, speed / 2, {
                        delay: 0.2 + speed / 2,
                        ease: 'Quint.easeOut',
                        scaleY: 1,
                    });
                }
            });

            // the more box text animation (switch from "more" to "back").
            if (this.constructor.name === 'GridItem') {
                gsap.to(this.DOM.el.querySelector(`.${styles['grid__toggle-more']}`), action === 'hide' ? 0.2 : 0.4, {
                    delay: action === 'hide' ? 0.2 : 1,
                    ease: action === 'hide' ? 'Quad.easeIn' : 'Quad.easeOut',
                    startAt: action === 'hide' ? {} : { opacity: 0, y: '-150%' },
                    y: action === 'hide' ? '-150%' : '0%',
                    opacity: action === 'hide' ? 0 : 1,
                });

                gsap.to(this.DOM.el.querySelector(`.${styles['grid__toggle-back']}`), action === 'hide' ? 0.4 : 0.2, {
                    delay: action === 'hide' ? 1 : 0.2,
                    ease: action === 'hide' ? 'Quad.easeOut' : 'Quad.easeIn',
                    startAt: action === 'hide' ? { opacity: 0, y: '50%' } : {},
                    y: action === 'hide' ? '0%' : '50%',
                    opacity: action === 'hide' ? 1 : 0,
                });
            }
        }
    }

    class Thumb extends GridItem {
        private tiltconfig: any;
        private mousetime: any;

        private mouseenterFn: any;
        private mousemoveFn: any;
        private mouseleaveFn: any;

        constructor(el: any) {
            super(el);
            this.DOM.tilt = {};
            this.DOM.tilt.title = this.DOM.el.querySelector(`.${styles['grid__item-title']}`);
            this.DOM.tilt.number = this.DOM.el.querySelector(`.${styles['grid__item-number']}`);
            this.DOM.tilt.img = this.DOM.el.querySelector(`.${styles['grid__item-number']} > .${styles['grid__item-bg']}`);

            this.tiltconfig = {
                title: { translation: { x: [-8, 8], y: [4, -4] } },
                number: { translation: { x: [-5, 5], y: [-12, 0] } },
                img: { translation: { x: [-8, 8], y: [6, -6] } },
            };
            this.initEvents();
        }
        // tilt when mouse moving a thumb.
        initEvents() {
            let enter = false;
            this.mouseenterFn = () => {
                if (enter) {
                    enter = false;
                }
                clearTimeout(this.mousetime);
                this.mousetime = setTimeout(() => (enter = true), 80);
            };
            this.mousemoveFn = (ev: any) =>
                requestAnimationFrame(() => {
                    if (!enter) return;
                    this.tilt(ev);
                });
            this.mouseleaveFn = () =>
                requestAnimationFrame(() => {
                    if (!enter || !allowTilt) return;
                    enter = false;
                    clearTimeout(this.mousetime);
                    this.resetTilt();
                });
            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        tilt(ev: any) {
            if (!allowTilt) return;
            const mousepos = getMousePos(ev);
            // Document scrolls.
            const docScrolls = {
                left: document.body.scrollLeft + document.documentElement.scrollLeft,
                top: document.body.scrollTop + document.documentElement.scrollTop,
            };
            const bounds = this.DOM.el.getBoundingClientRect();
            // Mouse position relative to the main element (this.DOM.el).
            const relmousepos = {
                x: mousepos.x - bounds.left - docScrolls.left,
                y: mousepos.y - bounds.top - docScrolls.top,
            };

            // Movement settings for the tilt elements.
            for (let key in this.DOM.tilt) {
                let t = this.tiltconfig[key].translation;
                gsap.to(this.DOM.tilt[key], 1, {
                    //ease: 'Expo.easeInOut',
                    x: ((t.x[1] - t.x[0]) / bounds.width) * relmousepos.x + t.x[0],
                    y: ((t.y[1] - t.y[0]) / bounds.height) * relmousepos.y + t.y[0],
                });
            }
        }
        // mouseleave: reset positions.
        resetTilt() {
            for (let key in this.DOM.tilt) {
                gsap.to(this.DOM.tilt[key], 2, {
                    x: 0,
                    y: 0,
                });
            }
        }
    }

    class Grid {
        public DOM: any;
        private thumbs: any;
        private movable: any;
        private current: any;
        private isGridHidden: any;
        private isAnimating: any;

        constructor() {
            this.DOM = { grid: document.querySelector(`.${CSS.escape(styles['grid--thumbs'])}`) };
            // the 4 thumbs
            this.DOM.thumbs = Array.from(
                this.DOM.grid.querySelectorAll(`.${CSS.escape(styles['grid__item'])}:not(.${CSS.escape(styles['grid__item--more'])})`)
            );
            this.thumbs = [];
            this.DOM.thumbs.forEach((thumb: any) => this.thumbs.push(new Thumb(thumb)));
            // the more/back box
            this.DOM.moreCtrl = this.DOM.grid.querySelector(`.${CSS.escape(styles['grid__item--more'])}`);
            const more = new GridItem(this.DOM.moreCtrl);
            // all the elements that are going to move up/down (thumbs + more/back button)
            this.movable = [...this.thumbs, more];
            // the colorful revealer element/panel that appears behind the images when showing/hiding a project
            this.DOM.revealer = document.querySelector(`.${CSS.escape(styles['revealer'])}`);
            // the fullview container and its items
            this.DOM.fullview = document.querySelector(`.${CSS.escape(styles['fullview'])}`);
            this.DOM.fullviewItems = this.DOM.fullview.querySelectorAll(`.${CSS.escape(styles['fullview__item'])}`);
            // current thumb/project index
            this.current = -1;
            // init/bind events
            this.initEvents();
        }
        initEvents() {
            // clicking a thumb will trigger the animation (show the project).
            this.DOM.thumbs.forEach((thumb: any, pos: any) => {
                thumb.addEventListener('click', () => {
                    this.current = pos;
                    this.showProject();
                });
            });

            // clicking the back button (the more/back box) will hide the project and reveal back the grid.
            this.DOM.moreCtrl.addEventListener('click', () => {
                if (!this.isGridHidden) return;
                this.hideProject();
            });

            // when resizing the window we need to reset the grid items translation positions (if the fullview is shown).
            window.addEventListener('resize', () => {
                // winsize = {width: window.innerWidth, height: window.innerHeight};
                if (this.isGridHidden) {
                    this.movable.forEach((item: any) => {
                        Array.from(item.DOM.el.children).forEach((child: any) => {
                            gsap.set(child, {
                                y:
                                    item.constructor.name === 'Thumb'
                                        ? -1 * window.innerHeight - 30
                                        : -1 * window.innerHeight - 30 + child.offsetHeight / 2,
                            });
                        });
                    });
                }
            });
        }
        showProject() {
            this.toggleProject('show');
        }
        hideProject() {
            this.toggleProject('hide');
        }
        toggleProject(action: any) {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.isGridHidden = action === 'show';
            setAllowTilt(!this.isGridHidden);
            this.showRevealer().then(() => {
                this.DOM.fullviewItems[this.current].style.opacity = this.isGridHidden ? 1 : 0;
                this.DOM.fullview.style.opacity = this.isGridHidden ? 1 : 0;
                this.DOM.fullview.style.pointerEvents = this.isGridHidden ? 'auto' : 'none';
                this.hideRevealer(this.isGridHidden ? 'up' : 'down');
                this.isAnimating = false;
            });
            this.movable.forEach((item: any) => {
                item.toggle(this.isGridHidden ? 'hide' : 'show');
                item.DOM.el.style.pointerEvents = this.isGridHidden ? 'none' : 'auto';
            });
        }
        showRevealer() {
            return this.toggleRevealer('show', null);
        }
        hideRevealer(dir: any) {
            return this.toggleRevealer('hide', dir);
        }
        toggleRevealer(action: any, dir: any) {
            return new Promise((resolve, reject) => {
                // change revealer color
                if (action === 'show') {
                    this.DOM.revealer.style.backgroundColor = this.movable[this.current].DOM.el.dataset.revealerColor;
                }
                // animate the revealer up or down.
                gsap.to(this.DOM.revealer, action === 'show' ? 1 : 1, {
                    ease: action === 'show' ? 'Quint.easeInOut' : 'Quint.easeOut',
                    y: action === 'show' ? '-100%' : dir === 'up' ? '-200%' : '0%',
                    onComplete: resolve,
                });
            });
        }
    }

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

            imagesLoaded(
                document.querySelectorAll(`.${CSS.escape(styles['fullview__item'])}.${CSS.escape(styles['grid__item-bg'])}`),
                { background: true },
                () => document.body.classList.remove(styles['loading'])
            );

            new Grid();
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
                <div className="loading">
                    <main className={styles['main_div']}>
                        <div className={styles['message']}>View on a larger screen to see the effect</div>
                        <div className={styles['fullview']}>
                            <div className={`${styles['fullview__item']} ${styles['fullview__item_1']}`}>
                                <span className={styles['fullview__item-number']}>01</span>
                                <div className={styles['fullview__item-titlewrap']}>
                                    <h3 className={styles['fullview__item-title']}>Patterns of nature</h3>
                                    <p className={styles['fullview__item-description']}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                    </p>
                                    <span className={styles['fullview__item-more']}>more</span>
                                </div>
                            </div>
                            <div className={`${styles['fullview__item']} ${styles['fullview__item_2']}`}>
                                <span className={styles['fullview__item-number']}>02</span>
                                <div className={styles['fullview__item-titlewrap']}>
                                    <h3 className={styles['fullview__item-title']}>Shapes from the future</h3>
                                    <p className={styles['fullview__item-description']}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                    </p>
                                    <span className={styles['fullview__item-more']}>more</span>
                                </div>
                            </div>
                            <div className={`${styles['fullview__item']} ${styles['fullview__item_3']}`}>
                                <span className={styles['fullview__item-number']}>03</span>
                                <div className={styles['fullview__item-titlewrap']}>
                                    <h3 className={styles['fullview__item-title']}>Black revelations</h3>
                                    <p className={styles['fullview__item-description']}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                    </p>
                                    <span className={styles['fullview__item-more']}>more</span>
                                </div>
                            </div>
                            <div className={`${styles['fullview__item']} ${styles['fullview__item_4']}`}>
                                <span className={styles['fullview__item-number']}>04</span>
                                <div className={styles['fullview__item-titlewrap']}>
                                    <h3 className={styles['fullview__item-title']}>Silence and noise</h3>
                                    <p className={styles['fullview__item-description']}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                    </p>
                                    <span className={styles['fullview__item-more']}>more</span>
                                </div>
                            </div>
                            <h3 className={styles['fullview__title']}>Andrew Jacobsen</h3>
                        </div>
                        <div className={styles['revealer']}></div>
                        <div className={`${styles['grid']} ${styles['grid--thumbs']}`}>
                            <div className={styles['grid__item']} data-revealer-color="#8779d2">
                                <h3 className={styles['grid__item-title']}>
                                    <span>Patterns of nature</span>
                                </h3>
                                <span className={styles['grid__item-number']}>
                                    <span>01</span>
                                </span>
                                <div className={styles['grid__item-imgwrap']}>
                                    <img className={styles['grid__item-img']} src={`../assets/images/test/thumb1.jpg`} alt="" />
                                    <div className={`${styles['grid__item-bg']} ${styles['grid__item-bg_1']}`}></div>
                                </div>
                            </div>
                            <div className={styles['grid__item']} data-revealer-color="#79a5d2">
                                <h3 className={styles['grid__item-title']}>
                                    <span>Shapes from the future</span>
                                </h3>
                                <span className={styles['grid__item-number']}>
                                    <span>02</span>
                                </span>
                                <div className={styles['grid__item-imgwrap']}>
                                    <img className={styles['grid__item-img']} src={`../assets/images/test/thumb2.jpg`} alt="" />
                                    <div className={`${styles['grid__item-bg']} ${styles['grid__item-bg_2']}`}></div>
                                </div>
                            </div>
                            <div className={styles['grid__item']} data-revealer-color="#79d2bd">
                                <h3 className={styles['grid__item-title']}>
                                    <span>Black revelations</span>
                                </h3>
                                <span className={styles['grid__item-number']}>
                                    <span>03</span>
                                </span>
                                <div className={styles['grid__item-imgwrap']}>
                                    <img className={styles['grid__item-img']} src={`../assets/images/test/thumb3.jpg`} alt="" />
                                    <div className={`${styles['grid__item-bg']} ${styles['grid__item-bg_3']}`}></div>
                                </div>
                            </div>
                            <div className={styles['grid__item']} data-revealer-color="#d2a279">
                                <h3 className={styles['grid__item-title']}>
                                    <span>Silence and noise</span>
                                </h3>
                                <span className={styles['grid__item-number']}>
                                    <span>04</span>
                                </span>
                                <div className={styles['grid__item-imgwrap']}>
                                    <img className={styles['grid__item-img']} src={`../assets/images/test/thumb4.jpg`} alt="" />
                                    <div className={`${styles['grid__item-bg']} ${styles['grid__item-bg_4']}`}></div>
                                </div>
                            </div>
                            <div className={`${styles['grid__item']} ${styles['grid__item--more']}`}>
                                <button className={styles['grid__toggle']}>
                                    <span className={`${styles['grid__toggle-inner']} ${styles['grid__toggle-more']}`}>
                                        <span className={styles['grid__toggle-text']}>more</span>
                                        <svg className={`${styles['grid__toggle-icon']} ${styles['grid__toggle-icon--more']}`}>
                                            <use xlinkHref="#icon-plus"></use>
                                        </svg>
                                    </span>
                                    <span className={`${styles['grid__toggle-inner']} ${styles['grid__toggle-back']}`}>
                                        <span className={styles['grid__toggle-text']}>back</span>
                                        <svg className={styles['grid__toggle-icon']}>
                                            <use xlinkHref="#icon-arrowdown"></use>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default FullImageReveal;
