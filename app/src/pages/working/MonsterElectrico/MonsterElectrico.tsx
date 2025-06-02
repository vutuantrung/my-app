import { useEffect, useState } from 'react';
import PageHeader from '../../../Layouts/PageHeader';

const MonsterElectrico = () => {
    // console.log('MonsterElectrico');
    const [c, setCanvas2D] = useState<any>(null);
    function dist(p1x: number, p1y: number, p2x: number, p2y: number) {
        return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }

    function init(elemid: string) {
        const canvas = document.getElementById(elemid) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas not found');
        }
        const c = canvas.getContext('2d');
        if (!c) {
            throw new Error('Context not found');
        }
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);
        c.fillStyle = 'rgba(30,30,30,1)';
        c.fillRect(0, 0, w, h);

        return { c: c, canvas: canvas };
    }

    window.addEventListener('requestAnimFrame', function () {
        return (
            window.requestAnimationFrame ||
            function (callback: any) {
                window.setTimeout(callback);
            }
        );
    });

    useEffect(() => {
        setCanvas2D(init('canvasME').c);
        const canvas = init('canvasME').canvas;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let mouse: any = { x: false, y: false };
        let last_mouse: any = {};

        let maxl = 300,
            minl = 50,
            n = 30,
            numt = 500,
            tent: any = [],
            target: any = { x: 0, y: 0 },
            last_target: any = {},
            t = 0,
            q = 10;

        canvas.addEventListener(
            'mousemove',
            function (e: any) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            },
            false
        );

        canvas.addEventListener('mouseleave', () => {
            mouse.x = false;
            mouse.y = false;
        });

        // canvas.addEventListener(
        //     'mousedown',
        //     () => {
        //         clicked = true;
        //     },
        //     false
        // );

        // canvas.addEventListener(
        //     'mouseup',
        //     () => {
        //         clicked = false;
        //     },
        //     false
        // );

        function loop() {
            if (c) {
                $(window).on('requestAnimFrame', loop);
                // window.requestAnimFrame(loop);
                c.clearRect(0, 0, w, h);
                draw();
            }
        }

        function draw() {
            if (mouse.x) {
                target.errx = mouse.x - target.x;
                target.erry = mouse.y - target.y;
            } else {
                target.errx = w / 2 + ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.x;
                target.erry = h / 2 + ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.y;
            }

            target.x += target.errx / 10;
            target.y += target.erry / 10;

            t += 0.01;

            c.beginPath();
            c.arc(target.x, target.y, dist(last_target.x, last_target.y, target.x, target.y) + 5, 0, 2 * Math.PI);
            c.fillStyle = 'hsl(210,100%,80%)';
            c.fill();

            for (let i = 0; i < numt; i++) {
                tent[i].move(last_target, target);
                tent[i].show2(target);
            }
            for (let i = 0; i < numt; i++) {
                tent[i].show(target);
            }
            last_target.x = target.x;
            last_target.y = target.y;
        }

        class segment {
            private pos: any;
            private ang: any;
            private nextPos: any;
            private first: any;
            private l: any;

            constructor(parent: any, l: any, a: any, first: any) {
                this.first = first;
                if (first) {
                    this.pos = {
                        x: parent.x,
                        y: parent.y,
                    };
                } else {
                    this.pos = {
                        x: parent.nextPos.x,
                        y: parent.nextPos.y,
                    };
                }
                this.l = l;
                this.ang = a;
                this.nextPos = {
                    x: this.pos.x + this.l * Math.cos(this.ang),
                    y: this.pos.y + this.l * Math.sin(this.ang),
                };
            }
            update(t: any) {
                this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
                this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
                this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
                this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
                this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
            }
            fallback(t: any) {
                this.pos.x = t.x;
                this.pos.y = t.y;
                this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
                this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
            }
            show() {
                c.lineTo(this.nextPos.x, this.nextPos.y);
            }
        }

        class tentacle {
            private t: any;
            private rand: any;
            private segments: any;
            private angle: any;
            private dt: any;
            private x: any;
            private y: any;
            private l: any;
            private n: any;

            constructor(x: any, y: any, l: any, n: any, a: any) {
                this.x = x;
                this.y = y;
                this.l = l;
                this.n = n;
                this.t = {};
                this.rand = Math.random();
                this.segments = [new segment(this, this.l / this.n, 0, true)];
                for (let i = 1; i < this.n; i++) {
                    this.segments.push(new segment(this.segments[i - 1], this.l / this.n, 0, false));
                }
            }
            move(last_target: any, target: any) {
                this.angle = Math.atan2(target.y - this.y, target.x - this.x);
                this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
                this.t = {
                    x: target.x - 0.8 * this.dt * Math.cos(this.angle),
                    y: target.y - 0.8 * this.dt * Math.sin(this.angle),
                };
                if (this.t.x) {
                    this.segments[this.n - 1].update(this.t);
                } else {
                    this.segments[this.n - 1].update(target);
                }
                for (let i = this.n - 2; i >= 0; i--) {
                    this.segments[i].update(this.segments[i + 1].pos);
                }
                if (dist(this.x, this.y, target.x, target.y) <= this.l + dist(last_target.x, last_target.y, target.x, target.y)) {
                    this.segments[0].fallback({ x: this.x, y: this.y });
                    for (let i = 1; i < this.n; i++) {
                        this.segments[i].fallback(this.segments[i - 1].nextPos);
                    }
                }
            }
            show(target: any) {
                if (dist(this.x, this.y, target.x, target.y) <= this.l) {
                    c.globalCompositeOperation = 'lighter';
                    c.beginPath();
                    c.lineTo(this.x, this.y);
                    for (let i = 0; i < this.n; i++) {
                        this.segments[i].show();
                    }
                    c.strokeStyle = 'hsl(' + (this.rand * 60 + 180) + ',100%,' + (this.rand * 60 + 25) + '%)';
                    c.lineWidth = this.rand * 2;
                    c.lineCap = 'round';
                    c.lineJoin = 'round';
                    c.stroke();
                    c.globalCompositeOperation = 'source-over';
                }
            }
            show2(target: any) {
                c.beginPath();
                if (dist(this.x, this.y, target.x, target.y) <= this.l) {
                    c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
                    c.fillStyle = 'white';
                } else {
                    c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
                    c.fillStyle = 'darkcyan';
                }
                c.fill();
            }
        }

        for (let i = 0; i < numt; i++) {
            tent.push(new tentacle(Math.random() * w, Math.random() * h, Math.random() * (maxl - minl) + minl, n, Math.random() * 2 * Math.PI));
        }

        window.addEventListener('resize', function () {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            loop();
        });

        loop();
        setInterval(loop, 1000 / 60);
    }, [c]);

    return (
        <div>
            <PageHeader />
            <canvas id="canvasME"></canvas>
        </div>
    );
};

export default MonsterElectrico;
