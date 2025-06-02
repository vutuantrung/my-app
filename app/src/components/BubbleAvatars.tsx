import './BubbleAvatars.css';
import { useEffect, useState } from 'react';

const BubbleAvatars = () => {
    const [docState, setDocState] = useState('');
    const COLORS = [
        '3C67EA',
        '242D48',
        'A136B4',
        '5C5AC6',
        '2BBDCB',
        '14A687',
        'DB3743',
        'FFBB16',
        '2BBDCB',
        '413EA7',
        'EB4A61',
        'FFA437',
        '00A8EC',
        'F7E64F',
        '00C8B2',
        '546775',
        'B31C1C',
    ];

    const AVATARS = [
        'https://cdn.pixabay.com/photo/2015/07/09/00/29/woman-837156_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/06/24/02/56/art-2436545_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/12/23/18/man-1253004_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/03/52/man-1867175_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_1280.jpg',
        'https://cdn.pixabay.com/photo/2019/11/03/05/36/portrait-4597853_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/10/10/girl-1868930_1280.jpg',
        'https://cdn.pixabay.com/photo/2019/12/21/21/15/man-4711375_1280.jpg',
    ];

    function render() {
        let list = document.getElementById('avatar_bubbles');
        for (let i = 0; i < 70; i += 1) {
            const bubble = document.createElement('div');
            bubble.setAttribute('class', 'bubble bubble' + (i + 1));
            const colorIdx = Math.floor(Math.random() * 17);
            bubble.style.background = '#' + COLORS[colorIdx];
            list?.appendChild(bubble);
        }
    }

    //Sorts bubbles from largest to smallest and allocates with avatars starting from largest
    function addAvatars() {
        let bubblesNodeList = document.querySelectorAll('.bubble');
        let bubblesArr = [];
        for (let i = 0; i < bubblesNodeList.length; i += 1) {
            bubblesArr.push(bubblesNodeList[i]);
        }
        bubblesArr.sort((a, b) => b.clientWidth - a.clientWidth);
        for (let i = 0; i < AVATARS.length; i += 1) {
            const bubble = bubblesArr[i] as HTMLElement;
            bubble.style.background = '#fff';
            bubble.style.cursor = 'pointer';

            const img = document.createElement('img');
            img.setAttribute('src', AVATARS[i]);
            img.setAttribute('alt', "User's avatar");
            bubble.appendChild(img);
        }
    }

    function shuffleArray(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function setupBackground() {
        const MAX_BUBBLES_BG = 30;
        let element = document.getElementById('avatar_bubbles');
        for (let i = 0; i < MAX_BUBBLES_BG; i++) {
            const bubble = document.createElement('div');
            bubble.setAttribute('class', 'bubble_bg bubble_bg-' + (i + 1));
            element?.appendChild(bubble);
        }

        for (let i = 0; i < MAX_BUBBLES_BG; i++) {
            let size = Math.random() * 15 + 50;
            let left = Math.random() * window.innerWidth - size;
            let y = Math.random() * 500 + 40;
            let color = '#' + Math.floor(Math.random() * 16777215).toString(16);

            $('.bubble_bg-' + i)
                .height(size)
                .width(size)
                .css({
                    position: 'absolute',
                    background: color,
                    left: left,
                    top: y,
                    'z-index': -9,
                    'border-radius': 100,
                });
        }
    }

    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
            render();
            shuffleArray(AVATARS);
            addAvatars();
            setupBackground();
        }
    }, [docState]);

    return (
        <div id="avatar_bubbles_wrapper">
            <div id="avatar_bubbles"></div>
        </div>
    );
};

export default BubbleAvatars;
