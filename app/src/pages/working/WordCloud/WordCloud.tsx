import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { useEffect, useState } from 'react';

const WordCloud = () => {
    const [option, setOption] = useState({
        tooltip: {},
        series: [
            {
                type: 'wordCloud',
                // size of the grid in pixels for marking the availability of the canvas
                // the larger the grid size, the bigger the gap between words.
                gridSize: 40,
                sizeRange: [30, 100],
                rotationRange: [0, 0],
                rotationStep: 180,

                // Available presents are circle (default), cardioid (apple or heart shape curve, the most known polar equation),
                // diamond (alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.
                shape: 'pentagon',
                width: '100%',
                height: '80%',
                shrinkToFit: true,
                layoutAnimation: true,
                textStyle: {
                    color: function () {
                        return (
                            'rgb(' +
                            [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') +
                            ')'
                        );
                    },
                },
                emphasis: {
                    textStyle: {
                        shadowBlur: 10,
                        shadowColor: '#333',
                    },
                },
                data: [
                    {
                        name: 'Already Over',
                        value: 10000,
                        textStyle: {
                            color: 'white',
                        },
                        emphasis: {
                            textStyle: {
                                color: 'blue',
                            },
                        },
                    },
                    {
                        name: 'now',
                        value: 4055,
                    },
                    {
                        name: 'know',
                        value: 2467,
                    },
                    {
                        name: 'reaching',
                        value: 2244,
                    },
                    {
                        name: 'nothing',
                        value: 1898,
                    },
                    {
                        name: 'letting',
                        value: 1484,
                    },
                    {
                        name: 'fall',
                        value: 1112,
                    },
                    {
                        name: 'give',
                        value: 965,
                    },
                    {
                        name: 'loving',
                        value: 847,
                    },
                    {
                        name: 'go',
                        value: 582,
                    },
                    {
                        name: 'left',
                        value: 555,
                    },
                    {
                        name: 'lose',
                        value: 550,
                    },
                    {
                        name: 'everything',
                        value: 462,
                    },
                    {
                        name: 'never',
                        value: 366,
                    },
                    {
                        name: 'breaking',
                        value: 360,
                    },
                    {
                        name: 'slowly',
                        value: 282,
                    },
                    {
                        name: 'all',
                        value: 273,
                    },
                    {
                        name: 'here',
                        value: 273,
                    },
                    {
                        name: 'skin',
                        value: 273,
                    },
                    {
                        name: 'you',
                        value: 273,
                    },
                    {
                        name: 'resist',
                        value: 273,
                    },
                    {
                        name: 'again',
                        value: 273,
                    },
                    {
                        name: 'suffocating',
                        value: 273,
                    },
                    {
                        name: 'defense',
                        value: 273,
                    },
                    {
                        name: 'cost',
                        value: 273,
                    },
                    {
                        name: 'fading',
                        value: 265,
                    },
                ],
            },
        ],
    });

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
        const chart = echarts.init(document.getElementById('wordCloud0'), null);
        chart.setOption(option);
        window.onresize = () => chart.resize;
    }, [docState, option]);

    return <div id="wordCloud0" style={{ width: '100%', height: '100%', margin: 0, zIndex: 10 }}></div>;
};

export default WordCloud;
