import { useEffect, useState } from 'react';
import styles from './SplitImage.module.css';
import { gsap, Power1 } from 'gsap';
import PageHeader from '../../../Layouts/PageHeader';

const SplitImage = () => {
    const [docState, setDocState] = useState('');
    const OPTIONS = {
        imgSrc: '../../../../assets/images/test/bgHorizontal/bg.jpg',
        containerName: 'placeholder',
        rows: 5,
        columns: 6,
        margin: 1.5,
        animTime: 0.3,
    };

    function gridImage() {
        // const r = OPTIONS.rows;
        // const c = OPTIONS.columns;
        // let margin = OPTIONS.margin;

        const placeholder = document.getElementsByClassName(styles[OPTIONS.containerName])[0];
        const container = document.createElement('div');
        container.className = styles['gridContainer'];
        placeholder.appendChild(container);

        let gridTile;

        const w = container.offsetWidth / OPTIONS.columns - OPTIONS.margin;
        const h = container.offsetHeight / OPTIONS.rows - OPTIONS.margin;
        let arr = [];

        for (let i = 0, l = OPTIONS.rows * OPTIONS.columns; i < l; i++) {
            gridTile = document.createElement('div');
            gridTile.className = styles['gridTile'];
            gridTile.style.backgroundImage = 'url(' + OPTIONS.imgSrc + ')';

            arr = [
                (w + OPTIONS.margin) * (i % OPTIONS.columns),
                (h + OPTIONS.margin) * Math.floor(i / OPTIONS.columns),
                (w + OPTIONS.margin) * (i % OPTIONS.columns) + w - OPTIONS.margin,
                (h + OPTIONS.margin) * Math.floor(i / OPTIONS.columns),
                (w + OPTIONS.margin) * (i % OPTIONS.columns) + w - OPTIONS.margin,
                (h + OPTIONS.margin) * Math.floor(i / OPTIONS.columns) + h - OPTIONS.margin,
                (w + OPTIONS.margin) * (i % OPTIONS.columns),
                (h + OPTIONS.margin) * Math.floor(i / OPTIONS.columns) + h - OPTIONS.margin,
            ];

            const polygonVal = `polygon(${arr[0]}px ${arr[1]}px, ${arr[2]}px ${arr[3]}px, ${arr[4]}px ${arr[5]}px, ${arr[6]}px ${arr[7]}px)`;
            gsap.set(gridTile, { webkitClipPath: polygonVal, clipPath: polygonVal });

            container.appendChild(gridTile);

            fixTilePosition(gridTile, i, null);
        }

        placeholder.addEventListener('mouseover', function (e) {
            let allTiles = (e!.currentTarget! as any).querySelectorAll(`.${styles['gridTile']}`);
            for (let t = 0, le = allTiles.length; t < le; t++) {
                gsap.to(allTiles[t], OPTIONS.animTime, {
                    css: { backgroundPosition: '0px 0px' },
                    ease: Power1.easeOut,
                });
            }
        });

        placeholder.addEventListener('mouseleave', function (e) {
            let allTiles = (e!.currentTarget! as any).querySelectorAll(`.${styles['gridTile']}`);
            for (let ti = 0, len = allTiles.length; ti < len; ti++) {
                fixTilePosition(allTiles[ti], ti, OPTIONS.animTime);
            }
        });

        function fixTilePosition(tile: any, ind: number, time: any) {
            if (time == null) time = 0;
            let centr, centrCol, centrRow, offsetW, offsetH, left, top;

            centr = Math.floor((OPTIONS.columns * OPTIONS.rows) / 2);
            centrCol = Math.ceil(centr / OPTIONS.columns);
            centrRow = Math.ceil(centr / OPTIONS.rows);

            offsetW = w / centrCol;
            offsetH = h / centrRow;

            left = Math.round(((ind % OPTIONS.columns) - centrCol + 1) * offsetW);
            top = Math.round((Math.floor(ind / OPTIONS.columns) - centrRow + 1) * offsetH);

            gsap.to(tile, time, {
                css: { backgroundPosition: left + 'px ' + top + 'px' },
                ease: Power1.easeOut,
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
            gridImage();
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);
    return (
        <div>
            <PageHeader />
            <div className={styles['wrapper']}>
                <div className={styles['placeholder']}></div>
            </div>
        </div>
    );
};

export default SplitImage;
