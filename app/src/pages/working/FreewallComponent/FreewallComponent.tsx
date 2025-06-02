import { useEffect, useState } from 'react';
import styles from './FreewallComponent.module.css';
import '../../../assets/vendor/Freewall/freewall';
import PageHeader from '../../../Layouts/PageHeader';

const FreewallComponent = () => {
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
            const temp =
                "<div class='cell' style='width:{width}px; height: {height}px; background-color: {color}'><div class='cover'>Demo draggable</div></div>";
            const colour = [
                'rgb(243, 156, 18)',
                'rgb(211, 84, 0)',
                'rgb(0, 106, 63)',
                'rgb(41, 128, 185)',
                'rgb(192, 57, 43)',
                'rgb(135, 0, 0)',
                'rgb(39, 174, 96)',
            ];

            let limitItem = 10;
            for (let i = 0; i < limitItem; ++i) {
                let h = (1 + 3 * Math.random()) << 0;
                let w = (1 + 3 * Math.random()) << 0;
                let color = colour[(colour.length * Math.random()) << 0];
                let html = temp
                    .replace(/\{height\}/g, (h * 150).toString())
                    .replace(/\{width\}/g, (w * 150).toString())
                    .replace('{color}', color);
                $('#freewall').append(html);
            }

            let wall = new (window as any).Freewall('#freewall');
            wall.reset({
                draggable: true,
                selector: '.cell',
                animate: true,
                cellW: 150,
                cellH: 150,
                onResize: function () {
                    wall.refresh();
                },
                onBlockMove: function () {
                    console.log(this);
                },
            });
            wall.fitWidth();
            // for scroll bar appear;
            $(window).trigger('resize');
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);

    return (
        <div>
            <PageHeader />
            <div className={styles['layout']}>
                <div id="freewall" className={styles['free-wall']}></div>
            </div>
        </div>
    );
};

export default FreewallComponent;
