import styles from './BubbleAvatars2.module.css';
import { useEffect, useState } from 'react';

const BubbleAvatars2 = () => {
    const [docState, setDocState] = useState('');

    useEffect(() => {
        console.log(document.readyState);
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            setTimeout(() => {
                console.log(document.readyState);
                setDocState(document.readyState);
            }, 1000);
        }
    }, []);

    function touching(margin: number) {
        let result = false;
        $('.tag').each(function () {
            let t1 = $(this);
            let t1radius = (t1 as any).width() / 2;
            let t1x = (t1 as any).offset().left + t1radius;
            let t1y = (t1 as any).offset().top + t1radius;

            $('.tag')
                .not(t1)
                .each(function () {
                    let t2 = $(this);
                    let t2radius = (t2 as any).width() / 2;
                    let t2x = (t2 as any).offset().left + t2radius;
                    let t2y = (t2 as any).offset().top + t2radius;
                    let dist = Math.sqrt((t2x - t1x) * (t2x - t1x) + (t2y - t1y) * (t2y - t1y));

                    if (t1radius && t2radius && dist < t1radius + t2radius + margin) {
                        result = true;
                    }
                });
        });
        return result;
    } //touching

    useEffect(() => {
        console.log(docState);
        if (docState === 'complete') {
            const tagNodeList = document.querySelectorAll('.tag');
            console.log('[tagNodeList]', tagNodeList);
            $('.tag').each(function (idx) {
                console.log(idx);
                do {
                    let container = $(this).parent();
                    let diam = Math.round(Math.random() * 75 + 50);
                    let top = Math.round(Math.random() * ((container as any).height() - diam));
                    let left = Math.round(Math.random() * ((container as any).width() - diam));
                    let bg =
                        '#' +
                        ((Math.random() * 128 + 32) << 0).toString(16) +
                        ((Math.random() * 128 + 32) << 0).toString(16) +
                        ((Math.random() * 128 + 32) << 0).toString(16);

                    $(this)
                        .css({
                            top: top,
                            left: left,
                            width: diam,
                            font: diam / 5 + 'px verdana',
                            lineHeight: diam + 'px',
                            background: bg,
                        })
                        .html('tag ' + (idx + 1));
                } while (touching(20));
            });
        }
    }, [docState]);

    return (
        <>
            <div id={styles['tags-cloud']}>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
                <div className="tag"></div>
            </div>
        </>
    );
};

export default BubbleAvatars2;
