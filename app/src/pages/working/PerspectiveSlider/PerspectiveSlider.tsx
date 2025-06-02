import { useEffect, useState } from 'react';
import styles from './PerspectiveSlider.module.css';
import PageHeader from '../../../Layouts/PageHeader';

const PerspectiveSlider = () => {
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
        function lerp({ x, y }: any, { x: targetX, y: targetY }: any) {
            const fraction = 0.1;
            x += (targetX - x) * fraction;
            y += (targetY - y) * fraction;
            return { x, y };
        }

        function autoSlide(slider: any) {
            requestAnimationFrame(() => {
                slider.next();
            });

            timer = setTimeout(autoSlide, 5000);
        }

        function stopAutoSlide() {
            clearTimeout(timer);

            this.removeEventListener('touchstart', stopAutoSlide);
            this.removeEventListener('mousemove', stopAutoSlide);
        }

        class Slider {
            private el: any;
            private contentEl: any;

            private IMG_CLASS: any;
            private TEXT_CLASS: any;
            private ACTIVE_IMG_CLASS: any;
            private ACTIVE_TEXT_CLASS: any;

            private activeImg: any;
            private activeText: any;
            private images: any;
            private length: any;
            private lastX: any;
            private lastY: any;
            private targetX: any;
            private targetY: any;
            private halfWidth: any;
            private halfHeight: any;
            private zDistance: any;

            private isMobile: any;
            private inTransit: boolean = false;
            public className: any;
            private mouseWatched: any;
            private animationRunning: any;
            private animationStopped: any;

            constructor(el: any) {
                const imgClass = (this.IMG_CLASS = 'slider__images-item');
                const textClass = (this.TEXT_CLASS = 'slider__text-item');
                const activeImgClass = (this.ACTIVE_IMG_CLASS = `${imgClass}--active`);
                const activeTextClass = (this.ACTIVE_TEXT_CLASS = `${textClass}--active`);

                this.el = el;
                this.contentEl = document.getElementById('slider-content');
                this.onMouseMove = this.onMouseMove.bind(this);

                // taking advantage of the live nature of 'getElement...' methods
                this.activeImg = el.getElementsByClassName(styles[activeImgClass]);
                this.activeText = el.getElementsByClassName(styles[activeTextClass]);
                this.images = el.getElementsByTagName('img');

                document.getElementById('slider-dots')!.addEventListener('click', this.onDotClick.bind(this));
                document.getElementById('left')!.addEventListener('click', this.prev.bind(this));
                document.getElementById('right')!.addEventListener('click', this.next.bind(this));

                window.addEventListener('resize', this.onResize.bind(this));

                this.onResize();

                this.length = this.images.length;
                this.lastX = this.lastY = this.targetX = this.targetY = 0;
            }
            onResize() {
                const htmlStyles = getComputedStyle(document.documentElement);
                const mobileBreakpoint = htmlStyles.getPropertyValue('--mobile-bkp');

                const isMobile = (this.isMobile = matchMedia(`only screen and (max-width: ${mobileBreakpoint})`).matches);

                this.halfWidth = window.innerWidth / 2;
                this.halfHeight = window.innerHeight / 2;
                this.zDistance = htmlStyles.getPropertyValue('--z-distance');

                if (!isMobile && !this.mouseWatched) {
                    this.mouseWatched = true;
                    this.el.addEventListener('mousemove', this.onMouseMove);
                    this.el.style.setProperty('--img-prev', `url(${this.images[+this.activeImg[0].dataset.id - 1].src})`);
                    this.contentEl.style.setProperty('transform', `translateZ(${this.zDistance})`);
                } else if (isMobile && this.mouseWatched) {
                    this.mouseWatched = false;
                    this.el.removeEventListener('mousemove', this.onMouseMove);
                    this.contentEl.style.setProperty('transform', 'none');
                }
            }
            getMouseCoefficients({ pageX, pageY }: any = {}) {
                const halfWidth = this.halfWidth;
                const halfHeight = this.halfHeight;
                const xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
                const yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;

                return { xCoeff, yCoeff };
            }

            onMouseMove({ pageX, pageY }: { pageX: any; pageY: any }) {
                this.targetX = pageX;
                this.targetY = pageY;

                if (!this.animationRunning) {
                    this.animationRunning = true;
                    this.runAnimation();
                }
            }

            runAnimation() {
                if (this.animationStopped) {
                    this.animationRunning = false;
                    return;
                }

                const maxX = 10;
                const maxY = 10;

                const newPos = lerp({ x: this.lastX, y: this.lastY }, { x: this.targetX, y: this.targetY });

                const { xCoeff, yCoeff } = this.getMouseCoefficients({ pageX: newPos.x, pageY: newPos.y });

                this.lastX = newPos.x;
                this.lastY = newPos.y;

                this.positionImage({ xCoeff, yCoeff });

                this.contentEl.style.setProperty(
                    'transform',
                    `
                        translateZ(${this.zDistance})
                        rotateX(${maxY * yCoeff}deg)
                        rotateY(${maxX * xCoeff}deg)
                    `
                );

                if (this.reachedFinalPoint) {
                    this.animationRunning = false;
                } else {
                    requestAnimationFrame(this.runAnimation.bind(this));
                }
            }
            get reachedFinalPoint() {
                const lastX = ~~this.lastX;
                const lastY = ~~this.lastY;
                const targetX = this.targetX;
                const targetY = this.targetY;

                return (
                    (lastX === targetX || lastX - 1 === targetX || lastX + 1 === targetX) &&
                    (lastY === targetY || lastY - 1 === targetY || lastY + 1 === targetY)
                );
            }
            positionImage({ xCoeff, yCoeff }: any) {
                const maxImgOffset = 1;
                const currentImage = this.activeImg[0].children[0];

                currentImage.style.setProperty(
                    'transform',
                    `
                        translateX(${maxImgOffset * -xCoeff}em)
                        translateY(${maxImgOffset * yCoeff}em)
                    `
                );
            }
            onDotClick({ target }: any) {
                if (this.inTransit) return;

                const dot = target.closest('.slider__nav-dot');

                if (!dot) return;

                const nextId = dot.dataset.id;
                const currentId = this.activeImg[0].dataset.id;

                if (currentId === nextId) return;

                this.startTransition(nextId);
            }
            transitionItem(nextId: any) {
                function onImageTransitionEnd(e: any) {
                    e.stopPropagation();

                    nextImg.classList.remove(styles[transitClass]);

                    self.inTransit = false;

                    this.className = styles[imgClass];
                    this.removeEventListener('transitionend', onImageTransitionEnd);
                }

                const self = this;
                const el = this.el;
                const currentImg = this.activeImg[0];
                const currentId = currentImg.dataset.id;
                const imgClass = this.IMG_CLASS;
                const textClass = this.TEXT_CLASS;
                const activeImgClass = this.ACTIVE_IMG_CLASS;
                const activeTextClass = this.ACTIVE_TEXT_CLASS;
                const subActiveClass = `${imgClass}--subactive`;
                const transitClass = `${imgClass}--transit`;
                const nextImg = el.querySelector(`.${styles[imgClass]}[data-id='${nextId}']`);
                const nextText = el.querySelector(`.${styles[textClass]}[data-id='${nextId}']`);

                let outClass = '';
                let inClass = '';

                this.animationStopped = true;

                nextText.classList.add(styles[activeTextClass]);

                el.style.setProperty('--from-left', nextId);

                currentImg.classList.remove(styles[activeImgClass]);
                currentImg.classList.add(styles[subActiveClass]);

                if (currentId < nextId) {
                    outClass = `${imgClass}--next`;
                    inClass = `${imgClass}--prev`;
                } else {
                    outClass = `${imgClass}--prev`;
                    inClass = `${imgClass}--next`;
                }

                nextImg.classList.add(styles[outClass]);

                requestAnimationFrame(() => {
                    nextImg.classList.add(styles[transitClass], styles[activeImgClass]);
                    nextImg.classList.remove(styles[outClass]);

                    this.animationStopped = false;
                    this.positionImage(this.getMouseCoefficients());

                    currentImg.classList.add(styles[transitClass], styles[inClass]);
                    currentImg.addEventListener('transitionend', onImageTransitionEnd);
                });

                if (!this.isMobile) this.switchBackgroundImage(nextId);
            }
            startTransition(nextId: any) {
                function onTextTransitionEnd(e: any) {
                    if (!e.pseudoElement) {
                        e.stopPropagation();

                        requestAnimationFrame(() => {
                            self.transitionItem(nextId);
                        });

                        this.removeEventListener('transitionend', onTextTransitionEnd);
                    }
                }
                if (this.inTransit) return;

                const activeText = this.activeText[0];
                const backwardsClass = `${this.TEXT_CLASS}--backwards`;
                const self = this;

                this.inTransit = true;

                activeText.classList.add(styles[backwardsClass]);
                activeText.classList.remove(styles[this.ACTIVE_TEXT_CLASS]);
                activeText.addEventListener('transitionend', onTextTransitionEnd);

                requestAnimationFrame(() => {
                    activeText.classList.remove(styles[backwardsClass]);
                });
            }
            next() {
                if (this.inTransit) return;

                let nextId = +this.activeImg[0].dataset.id + 1;

                if (nextId > this.length) nextId = 1;
                this.startTransition(nextId);
            }
            prev() {
                if (this.inTransit) return;

                let nextId = +this.activeImg[0].dataset.id - 1;

                if (nextId < 1) nextId = this.length;

                this.startTransition(nextId);
            }
            switchBackgroundImage(nextId: any) {
                function onBackgroundTransitionEnd(e: any) {
                    if (e.target === this) {
                        this.style.setProperty('--img-prev', imageUrl);
                        this.classList.remove(styles[bgClass]);
                        this.removeEventListener('transitionend', onBackgroundTransitionEnd);
                    }
                }

                const bgClass = 'slider--bg-next';
                const el = this.el;
                const imageUrl = `url(${this.images[+nextId - 1].src})`;

                el.style.setProperty('--img-next', imageUrl);
                el.addEventListener('transitionend', onBackgroundTransitionEnd);
                el.classList.add(styles[bgClass]);
            }
        }

        let timer: any = 0;
        if (docState === 'complete') {
            const sliderEl = document.getElementById('slider');
            if (!sliderEl) {
                throw new Error('Slider not found');
            }
            const slider = new Slider(sliderEl);

            // ------------------ Demo stuff ------------------------ //

            sliderEl.addEventListener('mousemove', stopAutoSlide);
            sliderEl.addEventListener('touchstart', stopAutoSlide);

            timer = setTimeout(() => {
                autoSlide(slider);
            }, 2000);
        }
    }, [docState]);

    return (
        <div>
            <PageHeader />
            <div className={styles['wrapper']}>
                <div className={`${styles['slider']}`} id="slider">
                    <div className={styles['slider__content']} id="slider-content">
                        <div className={styles['slider__images']}>
                            <div className={`${styles['slider__images-item']} ${styles['slider__images-item--active']}`} data-id="1">
                                <img src="../assets/images/test/bgHorizontal/奈汐酱Nice.jpg" alt="" />
                            </div>
                            <div className={`${styles['slider__images-item']}`} data-id="2">
                                <img src="../assets/images/test/bgHorizontal/笑芳香沁写真.jpg" alt="" />
                            </div>
                            <div className={`${styles['slider__images-item']}`} data-id="3">
                                <img src="../assets/images/test/bgHorizontal/HaneAme.jpg" alt="" />
                            </div>
                            <div className={`${styles['slider__images-item']}`} data-id="4">
                                <img src="../assets/images/test/bgHorizontal/Byoru.jpg" alt="" />
                            </div>
                            <div className={`${styles['slider__images-item']}`} data-id="5">
                                <img src="../assets/images/test/bgHorizontal/Azami.jpg" alt="" />
                            </div>
                        </div>
                        <div className={styles['slider__text']}>
                            <div className={`${styles['slider__text-item']} ${styles['slider__text-item--active']}`} data-id="1">
                                <div className={styles['slider__text-item-head']}>
                                    <h3>奈汐酱Nice</h3>
                                </div>
                                <div className={styles['slider__text-item-info']}>
                                    <p>“And into the forest I go, to lose my mind and find my soul”</p>
                                </div>
                            </div>
                            <div className={`${styles['slider__text-item']}`} data-id="2">
                                <div className={styles['slider__text-item-head']}>
                                    <h3>笑芳香沁写真</h3>
                                </div>
                                <div className={styles['slider__text-item-info']}>
                                    <p>“Mist to mist, drops to drops. For water thou art, and unto water shalt thou return”</p>
                                </div>
                            </div>
                            <div className={`${styles['slider__text-item']}`} data-id="3">
                                <div className={styles['slider__text-item-head']}>
                                    <h3>Hane Ame</h3>
                                </div>
                                <div className={styles['slider__text-item-info']}>
                                    <p>“Go to the edge of the cliff and jump off. Build your wings on the way down”</p>
                                </div>
                            </div>
                            <div className={`${styles['slider__text-item']}`} data-id="4">
                                <div className={styles['slider__text-item-head']}>
                                    <h3>Byoru</h3>
                                </div>
                                <div className={styles['slider__text-item-info']}>
                                    <p>“What are men to rocks and mountains?”</p>
                                </div>
                            </div>
                            <div className={`${styles['slider__text-item']}`} data-id="5">
                                <div className={styles['slider__text-item-head']}>
                                    <h3>Azami</h3>
                                </div>
                                <div className={styles['slider__text-item-info']}>
                                    <p>“On all the peaks lies peace”</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['slider__nav']}>
                        <div className={styles['slider__nav-arrows']}>
                            <div className={`${styles['slider__nav-arrow']} ${styles['slider__nav-arrow--left']}`} id="left">
                                to left
                            </div>
                            <div className={`${styles['slider__nav-arrow']} ${styles['slider__nav-arrow--right']}`} id="right">
                                to right
                            </div>
                        </div>
                        <div className={styles['slider__nav-dots']} id="slider-dots">
                            <div className={`${styles['slider__nav-dot']} ${styles['slider__nav-dot--active']}`} data-id="1"></div>
                            <div className={styles['slider__nav-dot']} data-id="2"></div>
                            <div className={styles['slider__nav-dot']} data-id="3"></div>
                            <div className={styles['slider__nav-dot']} data-id="4"></div>
                            <div className={styles['slider__nav-dot']} data-id="5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PerspectiveSlider;
