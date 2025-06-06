// created by Minh Nguyen;
// version 1.0.6;

(function ($) {

    // for zeptojs;
    $.isNumeric == null && ($.isNumeric = function (src) {
        return src != null && src.constructor === Number;
    });

    $.isFunction == null && ($.isFunction = function (src) {
        return src != null && src instanceof Function;
    });

    let $W = $(window);
    let $D = $(document);

    let layoutManager = {
        // default setting;
        defaultConfig: {
            animate: false,
            cellW: 100, // function(container) {return 100;}
            cellH: 100, // function(container) {return 100;}
            delay: 0, // slowdown active block;
            engine: 'giot',
            fixSize: null, // resize + adjust = fill gap;
            //fixSize: 0, resize but keep ratio = no fill gap;
            //fixSize: 1, no resize + no adjust = no fill gap;
            gutterX: 15, // width spacing between blocks;
            gutterY: 15, // height spacing between blocks;
            keepOrder: false,
            selector: '> div',
            draggable: false,
            cacheSize: true, // caches the original size of block;
            rightToLeft: false,
            bottomToTop: false,
            onGapFound: function () { },
            onComplete: function () { },
            onResize: function () { },
            onBlockDrag: function () { },
            onBlockMove: function () { },
            onBlockDrop: function () { },
            onBlockReady: function () { },
            onBlockFinish: function () { },
            onBlockActive: function () { },
            onBlockResize: function () { }
        },
        plugin: {},
        totalGrid: 1,
        transition: false,
        loadBlock: function (item, setting) {
            let runtime = setting.runtime;
            let gutterX = runtime.gutterX;
            let gutterY = runtime.gutterY;
            let cellH = runtime.cellH;
            let cellW = runtime.cellW;
            let block = null;
            let $item = $(item);
            let active = $item.data("active");
            let fixPos = $item.attr('data-position');
            let fixSize = parseInt($item.attr('data-fixSize'));
            let blockId = runtime.lastId++ + '-' + runtime.totalGrid;

            //ignore dragging block;
            if ($item.hasClass('fw-float')) return null;
            $item.attr({ id: blockId, 'data-delay': item.index });

            //remove animation for speed render;
            if (setting.animate && this.transition) {
                this.setTransition(item, "");
            }

            isNaN(fixSize) && (fixSize = null);
            (fixSize == null) && (fixSize = setting.fixSize);
            let makeRound = (!fixSize) ? "round" : "ceil";
            // store original size;

            $item.attr('data-height') == null && $item.attr('data-height', $item.height());
            $item.attr('data-width') == null && $item.attr('data-width', $item.width());
            let height = 1 * $item.attr('data-height');
            let width = 1 * $item.attr('data-width');

            if (!setting.cacheSize) {
                item.style.width = "";
                width = $item.width();

                item.style.height = "";
                height = $item.height();
            }

            let col = !width ? 0 : Math[makeRound]((width + gutterX) / cellW);
            let row = !height ? 0 : Math[makeRound]((height + gutterY) / cellH);

            // estimate size;
            if (!fixSize && setting.cellH === 'auto') {
                $item.width(cellW * col - gutterX);
                item.style.height = "";
                height = $item.height();
                row = !height ? 0 : Math.round((height + gutterY) / cellH);
            }

            if (!fixSize && setting.cellW === 'auto') {
                $item.height(cellH * row - gutterY);
                item.style.width = "";
                width = $item.width();
                col = !width ? 0 : Math.round((width + gutterX) / cellW);
            }

            // for none resize block;
            if ((fixSize != null) && (col > runtime.limitCol || row > runtime.limitRow)) {
                block = null;
            } else {
                // get smallest width and smallest height of block;
                // using for image runtime;
                row && row < runtime.minHoB && (runtime.minHoB = row);
                col && col < runtime.minWoB && (runtime.minWoB = col);

                // get biggest width and biggest height of block;
                row > runtime.maxHoB && (runtime.maxHoB = row);
                col > runtime.maxWoB && (runtime.maxWoB = col);

                width === 0 && (col = 0);
                height === 0 && (row = 0);

                block = {
                    resize: false,
                    id: blockId,
                    width: col,
                    height: row,
                    fixSize: fixSize
                };

                // for fix position;
                if (fixPos) {
                    fixPos = fixPos.split("-");
                    block.y = 1 * fixPos[0];
                    block.x = 1 * fixPos[1];
                    block.width = fixSize != null ? col : Math.min(col, runtime.limitCol - block.x);
                    block.height = fixSize != null ? row : Math.min(row, runtime.limitRow - block.y);
                    let holeId = block.y + "-" + block.x + "-" + block.width + "-" + block.height;
                    if (active) {
                        runtime.holes[holeId] = {
                            id: block.id,
                            top: block.y,
                            left: block.x,
                            width: block.width,
                            height: block.height
                        };
                        this.setBlock(block, setting);
                    } else {
                        delete runtime.holes[holeId];
                    }

                }
            }

            // for css animation;
            if ($item.attr("data-state") == null) {
                $item.attr("data-state", "init");
            } else {
                $item.attr("data-state", "move");
            }

            setting.onBlockReady.call(item, block, setting);

            return (fixPos && active) ? null : block;
        },
        setBlock: function (block, setting) {
            let runtime = setting.runtime;
            let gutterX = runtime.gutterX;
            let gutterY = runtime.gutterY;
            let height = block.height;
            let width = block.width;
            let cellH = runtime.cellH;
            let cellW = runtime.cellW;
            let x = block.x;
            let y = block.y;

            if (setting.rightToLeft) {
                x = runtime.limitCol - x - width;
            }
            if (setting.bottomToTop) {
                y = runtime.limitRow - y - height;
            }

            let realBlock = {
                fixSize: block.fixSize,
                resize: block.resize,
                top: y * cellH,
                left: x * cellW,
                width: cellW * width - gutterX,
                height: cellH * height - gutterY
            };

            realBlock.top = 1 * realBlock.top.toFixed(2);
            realBlock.left = 1 * realBlock.left.toFixed(2);
            realBlock.width = 1 * realBlock.width.toFixed(2);
            realBlock.height = 1 * realBlock.height.toFixed(2);

            //runtime.length += 1;
            block.id && (runtime.blocks[block.id] = realBlock);

            // for append feature;
            return realBlock;
        },
        showBlock: function (item, setting) {
            let runtime = setting.runtime;
            let method = setting.animate && !this.transition ? 'animate' : 'css';
            let block = runtime.blocks[item.id];
            let $item = $(item);
            let self = this;
            let start = $item.attr("data-state") != "move";
            let trans = start ? "width 0.5s, height 0.5s" : "top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s";

            item.delay && clearTimeout(item.delay);
            //ignore dragging block;
            if ($item.hasClass('fw-float')) return;

            // kill the old transition;
            self.setTransition(item, "");
            item.style.position = "absolute";
            setting.onBlockActive.call(item, block, setting);

            function action() {
                // start to arrange;
                start && $item.attr("data-state", "start");
                // add animation by using css3 transition;
                if (setting.animate && self.transition) {
                    self.setTransition(item, trans);
                }

                runtime.length -= 1;

                // for hidden block;
                if (!block) {
                    //let position = $item.position(); <= make speed so slow;
                    let height = parseInt(item.style.height) || 0;
                    let width = parseInt(item.style.width) || 0;
                    let left = parseInt(item.style.left) || 0;
                    let top = parseInt(item.style.top) || 0;
                    $item[method]({
                        left: left + width / 2,
                        top: top + height / 2,
                        width: 0,
                        height: 0,
                        opacity: 0
                    });
                } else {
                    if (block.fixSize) {
                        block.height = 1 * $item.attr("data-height");
                        block.width = 1 * $item.attr("data-width");
                    }

                    $item["css"]({
                        opacity: 1,
                        width: block.width,
                        height: block.height
                    });

                    // for animating by javascript;
                    $item[method]({
                        top: block.top,
                        left: block.left
                    });

                    if ($item.attr('data-nested') != null) {
                        self.nestedGrid(item, setting);
                    }
                }

                setting.onBlockFinish.call(item, block, setting);

                if (runtime.length == 0) {
                    let duration = setting.animate ? 500 : 0;
                    item.delay = setTimeout(function () {
                        setting.onComplete.call(item, block, setting);
                    }, duration);
                }
            }

            block && block.resize && setting.onBlockResize.call(item, block, setting);

            setting.delay > 0 ? (item.delay = setTimeout(action, setting.delay * $item.attr("data-delay"))) : action();
        },
        nestedGrid: function (item, setting) {
            let innerWall, $item = $(item), runtime = setting.runtime;
            let gutterX = $item.attr("data-gutterX") || setting.gutterX;
            let gutterY = $item.attr("data-gutterY") || setting.gutterY;
            let method = $item.attr("data-method") || "fitZone";
            let nested = $item.attr('data-nested') || "> div";
            let cellH = $item.attr("data-cellH") || setting.cellH;
            let cellW = $item.attr("data-cellW") || setting.cellW;
            let block = runtime.blocks[item.id];

            if (block) {
                innerWall = new Freewall($item);
                innerWall.reset({
                    cellH: cellH,
                    cellW: cellW,
                    gutterX: 1 * gutterX,
                    gutterY: 1 * gutterY,
                    selector: nested,
                    cacheSize: false
                });

                switch (method) {
                    case "fitHeight":
                        innerWall[method](block.height);
                        break;
                    case "fitWidth":
                        innerWall[method](block.width);
                        break;
                    case "fitZone":
                        innerWall[method](block.width, block.height);
                        break;
                    default: break;
                }
            }
        },
        adjustBlock: function (block, setting) {
            let runtime = setting.runtime;
            let gutterX = runtime.gutterX;
            let gutterY = runtime.gutterY;
            let $item = $("#" + block.id);
            let cellH = runtime.cellH;
            let cellW = runtime.cellW;

            if (setting.cellH == 'auto') {
                $item.width(block.width * cellW - gutterX);
                $item[0].style.height = "";
                block.height = Math.round(($item.height() + gutterY) / cellH);
            }
        },
        adjustUnit: function (width, height, setting) {
            let gutterX = setting.gutterX;
            let gutterY = setting.gutterY;
            let runtime = setting.runtime;
            let cellW = setting.cellW;
            let cellH = setting.cellH;

            $.isFunction(cellW) && (cellW = cellW(width));
            cellW = 1 * cellW;
            !$.isNumeric(cellW) && (cellW = 1);

            $.isFunction(cellH) && (cellH = cellH(height));
            cellH = 1 * cellH;
            !$.isNumeric(cellH) && (cellH = 1);

            if ($.isNumeric(width)) {
                // adjust cell width via container;
                cellW < 1 && (cellW = cellW * width);

                // estimate total columns;
                let limitCol = Math.max(1, Math.floor(width / cellW));

                // adjust unit size for fit width;
                if (!$.isNumeric(gutterX)) {
                    gutterX = (width - limitCol * cellW) / Math.max(1, (limitCol - 1));
                    gutterX = Math.max(0, gutterX);
                }

                limitCol = Math.floor((width + gutterX) / cellW);
                runtime.cellW = (width + gutterX) / Math.max(limitCol, 1);
                runtime.cellS = runtime.cellW / cellW;
                runtime.gutterX = gutterX;
                runtime.limitCol = limitCol;
            }

            if ($.isNumeric(height)) {
                // adjust cell height via container;
                cellH < 1 && (cellH = cellH * height);

                // estimate total rows;
                let limitRow = Math.max(1, Math.floor(height / cellH));

                // adjust size unit for fit height;
                if (!$.isNumeric(gutterY)) {
                    gutterY = (height - limitRow * cellH) / Math.max(1, (limitRow - 1));
                    gutterY = Math.max(0, gutterY);
                }

                limitRow = Math.floor((height + gutterY) / cellH);
                runtime.cellH = (height + gutterY) / Math.max(limitRow, 1);
                runtime.cellS = runtime.cellH / cellH;
                runtime.gutterY = gutterY;
                runtime.limitRow = limitRow;
            }

            if (!$.isNumeric(width)) {
                // adjust cell width via cell height;
                cellW < 1 && (cellW = runtime.cellH);
                runtime.cellW = cellW != 1 ? cellW * runtime.cellS : 1;
                runtime.gutterX = gutterX;
                runtime.limitCol = 666666;
            }

            if (!$.isNumeric(height)) {
                // adjust cell height via cell width;
                cellH < 1 && (cellH = runtime.cellW);
                runtime.cellH = cellH != 1 ? cellH * runtime.cellS : 1;
                runtime.gutterY = gutterY;
                runtime.limitRow = 666666;
            }

            runtime.keepOrder = setting.keepOrder;
        },
        resetGrid: function (runtime) {
            runtime.blocks = {};
            runtime.length = 0;
            runtime.cellH = 0;
            runtime.cellW = 0;
            runtime.lastId = 1;
            runtime.matrix = {};
            runtime.totalCol = 0;
            runtime.totalRow = 0;
        },
        setDraggable: function (item, option) {
            let isTouch = false;
            let config = {
                startX: 0, //start clientX;
                startY: 0,
                top: 0,
                left: 0,
                handle: null,
                onDrop: function () { },
                onDrag: function () { },
                onStart: function () { }
            };

            $(item).each(function () {
                let setting = $.extend({}, config, option);
                let handle = setting.handle || this;
                let ele = this;
                let $E = $(ele);
                let $H = $(handle);

                let posStyle = $E.css("position");
                posStyle !== "absolute" && $E.css("position", "relative");


                function mouseDown(evt) {
                    evt.stopPropagation();
                    evt = evt.originalEvent;

                    if (evt.touches) {
                        isTouch = true;
                        evt = evt.changedTouches[0];
                    }

                    if (evt.button != 2 && evt.which != 3) {
                        setting.onStart.call(ele, evt);

                        setting.startX = evt.clientX;
                        setting.startY = evt.clientY;
                        setting.top = parseInt($E.css("top")) || 0;
                        setting.left = parseInt($E.css("left")) || 0;

                        $D.bind("mouseup touchend", mouseUp);
                        $D.bind("mousemove touchmove", mouseMove);
                    }

                    return false;
                };


                function mouseMove(evt) {
                    evt = evt.originalEvent;
                    isTouch && (evt = evt.changedTouches[0]);

                    $E.css({
                        top: setting.top - (setting.startY - evt.clientY),
                        left: setting.left - (setting.startX - evt.clientX)
                    });

                    setting.onDrag.call(ele, evt);
                };

                function mouseUp(evt) {
                    evt = evt.originalEvent;
                    isTouch && (evt = evt.changedTouches[0]);

                    setting.onDrop.call(ele, evt);

                    $D.unbind("mouseup touchend", mouseUp);
                    $D.unbind("mousemove touchmove", mouseMove);
                };

                // ignore drag drop on text field;
                $E.find("iframe, form, input, textarea, .ignore-drag")
                    .each(function () {
                        $(this).on("touchstart mousedown", function (evt) {
                            evt.stopPropagation();
                        });
                    });

                $D.unbind("mouseup touchend", mouseUp);
                $D.unbind("mousemove touchmove", mouseMove);
                $H.unbind("mousedown touchstart").bind("mousedown touchstart", mouseDown);

            });
        },
        setTransition: function (item, trans) {
            let style = item.style;
            let $item = $(item);

            // remove animation;
            if (!this.transition && $item.stop) {
                $item.stop();
            } else if (style.webkitTransition != null) {
                style.webkitTransition = trans;
            } else if (style.MozTransition != null) {
                style.MozTransition = trans;
            } else if (style.msTransition != null) {
                style.msTransition = trans;
            } else if (style.OTransition != null) {
                style.OTransition = trans;
            } else {
                style.transition = trans;
            }
        },
        getFreeArea: function (t, l, runtime) {
            let maxY = Math.min(t + runtime.maxHoB, runtime.limitRow);
            let maxX = Math.min(l + runtime.maxWoB, runtime.limitCol);
            let minX = maxX;
            let minY = maxY;
            let matrix = runtime.matrix;

            // find limit zone by horizon;
            for (let y = t; y < minY; ++y) {
                for (let x = l; x < maxX; ++x) {
                    if (matrix[y + '-' + x]) {
                        (l < x && x < minX) && (minX = x);
                    }
                }
            }

            // find limit zone by vertical;
            for (let y = t; y < maxY; ++y) {
                for (let x = l; x < minX; ++x) {
                    if (matrix[y + '-' + x]) {
                        (t < y && y < minY) && (minY = y);
                    }
                }
            }

            return {
                top: t,
                left: l,
                width: minX - l,
                height: minY - t
            };

        },
        setWallSize: function (runtime, container) {
            let totalRow = runtime.totalRow;
            let totalCol = runtime.totalCol;
            let gutterY = runtime.gutterY;
            let gutterX = runtime.gutterX;
            let cellH = runtime.cellH;
            let cellW = runtime.cellW;
            let totalWidth = Math.max(0, cellW * totalCol - gutterX);
            let totalHeight = Math.max(0, cellH * totalRow - gutterY);

            container.attr({
                'data-total-col': totalCol,
                'data-total-row': totalRow,
                'data-wall-width': Math.ceil(totalWidth),
                'data-wall-height': Math.ceil(totalHeight)
            });

            if (runtime.limitCol < runtime.limitRow) {
                // do not set height with nesting grid;
                !container.attr("data-height") && container.height(Math.ceil(totalHeight));
            }
        }
    };



    let engine = {
        // Giot just a person name;
        giot: function (items, setting) {
            let runtime = setting.runtime,
                row = runtime.limitRow,
                col = runtime.limitCol,
                x = 0,
                y = 0,
                maxX = runtime.totalCol,
                maxY = runtime.totalRow,
                wall = {},
                holes = runtime.holes,
                block = null,
                matrix = runtime.matrix,
                bigLoop = Math.max(col, row),
                freeArea = null,
                misBlock = null,
                fitWidth = col < row ? 1 : 0,
                lastBlock = null,
                smallLoop = Math.min(col, row);

            // fill area with top, left, width, height;
            function fillMatrix(id, t, l, w, h) {
                for (let y = t; y < t + h;) {
                    for (let x = l; x < l + w;) {
                        matrix[y + '-' + x] = id;
                        ++x > maxX && (maxX = x);
                    }
                    ++y > maxY && (maxY = y);
                }
            }

            // set holes on the wall;
            for (let i in holes) {
                if (holes.hasOwnProperty(i)) {
                    fillMatrix(holes[i]["id"] || true, holes[i]['top'], holes[i]['left'], holes[i]['width'], holes[i]['height']);
                }
            }


            for (let b = 0; b < bigLoop; ++b) {
                if (!items.length) break;
                fitWidth ? (y = b) : (x = b);
                lastBlock = null;

                for (let s = 0; s < smallLoop; ++s) {
                    if (!items.length) break;
                    block = null;
                    fitWidth ? (x = s) : (y = s);
                    if (runtime.matrix[y + '-' + x]) continue;
                    freeArea = layoutManager.getFreeArea(y, x, runtime);

                    // trying resize last block to fit free area;
                    if (setting.fixSize == null) {
                        // resize near block to fill gap;
                        if (lastBlock && !fitWidth && runtime.minHoB > freeArea.height) {
                            lastBlock.height += freeArea.height;
                            lastBlock.resize = true;
                            fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                            layoutManager.setBlock(lastBlock, setting);
                            continue;
                        } else if (lastBlock && fitWidth && runtime.minWoB > freeArea.width) {
                            lastBlock.width += freeArea.width;
                            lastBlock.resize = true;
                            fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                            layoutManager.setBlock(lastBlock, setting);
                            continue;
                        }
                    }

                    // get the next block to keep order;
                    if (runtime.keepOrder) {
                        block = items.shift();
                        block.resize = true;
                    } else {
                        // find a suitable block to fit gap;
                        for (let i = 0; i < items.length; ++i) {
                            if (items[i].height > freeArea.height) continue;
                            if (items[i].width > freeArea.width) continue;
                            block = items.splice(i, 1)[0];
                            break;
                        }

                        // trying resize the other block to fit gap;
                        if (block == null && setting.fixSize == null) {
                            // get other block fill to gap;
                            for (let i = 0; i < items.length; ++i) {
                                if (items[i]['fixSize'] != null) continue;
                                block = items.splice(i, 1)[0];
                                block.resize = true;
                                break;
                            }

                        }
                    }


                    if (block != null) {
                        // resize block with free area;
                        if (block.resize) {
                            if (fitWidth) {
                                block.width = freeArea.width;
                                if (setting.cellH == 'auto') {
                                    layoutManager.adjustBlock(block, setting);
                                }
                                // for fitZone;
                                block.height = Math.min(block.height, freeArea.height);
                            } else {
                                block.height = freeArea.height;
                                // for fitZone;
                                block.width = Math.min(block.width, freeArea.width);
                            }
                        }

                        wall[block.id] = {
                            id: block.id,
                            x: x,
                            y: y,
                            width: block.width,
                            height: block.height,
                            resize: block.resize,
                            fixSize: block.fixSize
                        };

                        // keep success block for next round;
                        lastBlock = wall[block.id];

                        fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                        layoutManager.setBlock(lastBlock, setting);
                    } else {
                        // get expect area;
                        let misBlock = {
                            x: x,
                            y: y,
                            fixSize: 0
                        };
                        if (fitWidth) {
                            misBlock.width = freeArea.width;
                            misBlock.height = 0;
                            let lastX = x - 1;
                            let lastY = y;

                            while (matrix[lastY + '-' + lastX]) {
                                matrix[lastY + '-' + x] = true;
                                misBlock.height += 1;
                                lastY += 1;
                            }
                        } else {
                            misBlock.height = freeArea.height;
                            misBlock.width = 0;
                            let lastY = y - 1;
                            let lastX = x;

                            while (matrix[lastY + '-' + lastX]) {
                                matrix[y + '-' + lastX] = true;
                                misBlock.width += 1;
                                lastX += 1;
                            }
                        }
                        setting.onGapFound(layoutManager.setBlock(misBlock, setting), setting);
                    }
                }

            }

            runtime.matrix = matrix;
            runtime.totalRow = maxY;
            runtime.totalCol = maxX;
        }
    };



    function Freewall(selector) {

        let container = $(selector);
        if (container.css('position') == 'static') {
            container.css('position', 'relative');
        }
        let MAX = Number.MAX_VALUE;
        let klass = this;
        // increase the instance index;
        layoutManager.totalGrid += 1;

        let setting = $.extend({}, layoutManager.defaultConfig);
        let runtime = {
            arguments: null,
            blocks: {}, // store all items;
            events: {}, // store custome events;
            matrix: {},
            holes: {}, // forbidden zone;

            cellW: 0,
            cellH: 0, // unit adjust;
            cellS: 1, // unit scale;

            filter: '', // filter selector;
            lastId: 0,
            length: 0,

            maxWoB: 0, // max width of block;
            maxHoB: 0,
            minWoB: MAX,
            minHoB: MAX, // min height of block;

            running: 0, // flag to check layout arranging;

            gutterX: 15,
            gutterY: 15,

            totalCol: 0,
            totalRow: 0,

            limitCol: 666666, // maximum column;
            limitRow: 666666,

            sortFunc: null,
            keepOrder: false
        };
        setting.runtime = runtime;
        runtime.totalGrid = layoutManager.totalGrid;

        // check browser support transition;
        let bodyStyle = document.body.style;
        if (!layoutManager.transition) {
            (bodyStyle.webkitTransition != null ||
                bodyStyle.MozTransition != null ||
                bodyStyle.msTransition != null ||
                bodyStyle.OTransition != null ||
                bodyStyle.transition != null) &&
                (layoutManager.transition = true);
        }


        function setDraggable(item) {

            let gutterX = runtime.gutterX;
            let gutterY = runtime.gutterY;
            let cellH = runtime.cellH;
            let cellW = runtime.cellW;
            let $item = $(item);
            let handle = $item.find($item.attr("data-handle"));
            layoutManager.setDraggable(item, {
                handle: handle[0],
                onStart: function (event) {
                    if (setting.animate && layoutManager.transition) {
                        layoutManager.setTransition(this, "");
                    }
                    $item.css('z-index', 9999).addClass('fw-float');

                    setting.onBlockDrag.call(item, event);
                },
                onDrag: function (event, tracker) {
                    let position = $item.position();
                    let top = Math.round(position.top / cellH);
                    let left = Math.round(position.left / cellW);
                    let width = Math.round($item.width() / cellW);
                    let height = Math.round($item.height() / cellH);
                    top = Math.min(Math.max(0, top), runtime.limitRow - height);
                    left = Math.min(Math.max(0, left), runtime.limitCol - width);
                    klass.setHoles({ top: top, left: left, width: width, height: height });
                    klass.refresh();

                    setting.onBlockMove.call(item, event);
                },
                onDrop: function (event) {
                    let position = $item.position();
                    let top = Math.round(position.top / cellH);
                    let left = Math.round(position.left / cellW);
                    let width = Math.round($item.width() / cellW);
                    let height = Math.round($item.height() / cellH);
                    top = Math.min(Math.max(0, top), runtime.limitRow - height);
                    left = Math.min(Math.max(0, left), runtime.limitCol - width);

                    $item.removeClass('fw-float');
                    $item.css({
                        zIndex: "auto",
                        top: top * cellH,
                        left: left * cellW
                    });

                    //check old drag element;
                    let x, y, key, oldDropId;
                    for (y = 0; y < height; ++y) {
                        for (x = 0; x < width; ++x) {
                            key = (y + top) + "-" + (x + left);
                            oldDropId = runtime.matrix[key];
                            if (oldDropId && oldDropId !== true) {
                                $("#" + oldDropId).removeAttr("data-position");
                            }
                        }
                    }

                    runtime.holes = {};

                    $item.attr({
                        "data-width": $item.width(),
                        "data-height": $item.height(),
                        "data-position": top + "-" + left
                    });

                    klass.refresh();

                    setting.onBlockDrop.call(item, event);
                }
            });
        }


        $.extend(klass, {

            addCustomEvent: function (name, func) {
                let events = runtime.events;
                name = name.toLowerCase();
                !events[name] && (events[name] = []);
                func.eid = events[name].length;
                events[name].push(func);
                return this;
            },

            appendBlock: function (items) {
                let allBlock = $(items).appendTo(container);
                let block = null;
                let activeBlock = [];

                if (runtime.arguments) {

                    if ($.isFunction(runtime.sortFunc)) {
                        allBlock.sort(runtime.sortFunc);
                    }

                    allBlock.each(function (index, item) {
                        item.index = ++index;
                        block = layoutManager.loadBlock(item, setting);
                        block && activeBlock.push(block);
                    });

                    engine[setting.engine](activeBlock, setting);

                    layoutManager.setWallSize(runtime, container);

                    runtime.length = allBlock.length;

                    allBlock.each(function (index, item) {
                        layoutManager.showBlock(item, setting);
                        if (setting.draggable || item.getAttribute('data-draggable')) {
                            setDraggable(item);
                        }
                    });
                }
            },
            /*
            add one or more blank area (hole) on layout;
            example:

                wall.appendHoles({
                    top: 10,
                    left: 36,
                    width: 2,
                    height: 6
                });

                wall.appendHoles([
                    {
                        top: 16,
                        left: 16,
                        width: 8,
                        height: 2
                    },
                    {
                        top: 10,
                        left: 36,
                        width: 2,
                        height: 6
                    }
                ]);

            */
            appendHoles: function (holes) {
                let newHoles = [].concat(holes), h = {}, i;
                for (let i = 0; i < newHoles.length; ++i) {
                    h = newHoles[i];
                    runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h;
                }
                return this;
            },

            container: container,

            destroy: function () {
                let allBlock = container.find(setting.selector).removeAttr('id'),
                    block = null,
                    activeBlock = [];

                allBlock.each(function (index, item) {
                    let $item = $(item);
                    let width = 1 * $item.attr('data-width') || "";
                    let height = 1 * $item.attr('data-height') || "";
                    $item.width(width).height(height).css({
                        position: 'static'
                    });
                });
            },

            fillHoles: function (holes) {
                if (arguments.length === 0) {
                    runtime.holes = {};
                } else {
                    let newHoles = [].concat(holes), h = {}, i;
                    for (let i = 0; i < newHoles.length; ++i) {
                        h = newHoles[i];
                        delete runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height];
                    }
                }
                return this;
            },

            filter: function (filter) {
                runtime.filter = filter;
                if (runtime.arguments) {
                    this.refresh();
                }
                return this;
            },

            fireEvent: function (name, object, setting) {
                let events = runtime.events;
                name = name.toLowerCase();
                if (events[name] && events[name].length) {
                    for (let i = 0; i < events[name].length; ++i) {
                        events[name][i].call(this, object, setting);
                    }
                }
                return this;
            },

            fitHeight: function (height) {

                this.fitZone('auto', height ? height : container.height() || $W.height());

                runtime.arguments = arguments;
            },

            fitWidth: function (width) {

                this.fitZone(width ? width : container.width() || $W.width(), 'auto');

                runtime.arguments = arguments;
            },

            fitZone: function (width, height) {
                let allBlock = container.find(setting.selector).removeAttr('id'),
                    block = null,
                    activeBlock = [];

                height = height ? height : container.height() || $W.height();
                width = width ? width : container.width() || $W.width();

                runtime.arguments = arguments;

                layoutManager.resetGrid(runtime);

                layoutManager.adjustUnit(width, height, setting);

                if (runtime.filter) {
                    allBlock.data('active', 0);
                    allBlock.filter(runtime.filter).data('active', 1);
                } else {
                    allBlock.data('active', 1);
                }

                if ($.isFunction(runtime.sortFunc)) {
                    allBlock.sort(runtime.sortFunc);
                }

                allBlock.each(function (index, item) {
                    let $item = $(item);
                    item.index = ++index;
                    block = layoutManager.loadBlock(item, setting);
                    block && $item.data("active") && activeBlock.push(block);
                });

                klass.fireEvent('onGridReady', container, setting);

                engine[setting.engine](activeBlock, setting);

                layoutManager.setWallSize(runtime, container);

                klass.fireEvent('onGridArrange', container, setting);

                runtime.length = allBlock.length;

                allBlock.each(function (index, item) {
                    layoutManager.showBlock(item, setting);
                    if (setting.draggable || item.getAttribute('data-draggable')) {
                        setDraggable(item);
                    }
                });
            },

            /*
            set block with special position, the top and left are multiple of unit width/height;
            example:

                wall.fixPos({
                    top: 0,
                    left: 0,
                    block: $('.free')
                });
            */
            fixPos: function (option) {
                $(option.block).attr({ 'data-position': option.top + "-" + option.left });
                return this;
            },

            /*
            set block with special size, the width and height are multiple of unit width/height;
            example:

                wall.fixSize({
                    height: 5,
                    width: 2,
                    block: $('.free')
                });
            */
            fixSize: function (option) {
                option.height != null && $(option.block).attr({ 'data-height': option.height });
                option.width != null && $(option.block).attr({ 'data-width': option.width });
                return this;
            },

            prepend: function (items) {
                container.prepend(items);
                if (runtime.arguments) {
                    this.refresh();
                }
                return this;
            },

            refresh: function () {
                console.log('in refresh');
                const params = arguments.length ? arguments : runtime.arguments;
                // const oldArg = runtime.arguments;
                // console.log(oldArg);
                const method = this.fitWidth;
                method.apply(this, Array.prototype.slice.call(params, 0));
                return this;
            },

            /*
            custom layout setting;
            example:

                wall.reset({
                    selector: '.brick',
                    animate: true,
                    cellW: 160,
                    cellH: 160,
                    delay: 50,
                    onResize: function() {
                        wall.fitWidth();
                    }
                });
            */
            reset: function (option) {
                $.extend(setting, option);
                return this;
            },

            /*
            create one or more blank area (hole) on layout;
            example:

                wall.setHoles({
                    top: 2,
                    left: 2,
                    width: 2,
                    height: 2
                });
            */

            setHoles: function (holes) {
                let newHoles = [].concat(holes), h = {}, i;
                runtime.holes = {};
                for (let i = 0; i < newHoles.length; ++i) {
                    h = newHoles[i];
                    runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h;
                }
                return this;
            },
            /*
            sort items by using array sort function;
            example:

                wall.sortBy(function(itemA, itemB) {
                    return $(itemA).width() - $(itemB).width();
                });
            */
            sortBy: function (func) {
                runtime.sortFunc = func;
                if (runtime.arguments) {
                    this.refresh();
                }
                return this;
            },

            unFilter: function () {
                delete runtime.filter;
                this.refresh();
                return this;
            }
        });

        container.attr('data-min-width', Math.floor($W.width() / 80) * 80);
        // execute plugins;
        for (let i in layoutManager.plugin) {
            if (layoutManager.plugin.hasOwnProperty(i)) {
                layoutManager.plugin[i].call(klass, setting, container);
            }
        }

        // setup resize event;
        $W.resize(function () {
            if (runtime.running) return;
            runtime.running = 1;
            setTimeout(function () {
                runtime.running = 0;
                setting.onResize.call(klass, container);
            }, 122);
            container.attr('data-min-width', Math.floor($W.width() / 80) * 80);
        });
    };

    /*
    add default setting;
    example:

        Freewall.addConfig({
            offsetLeft: 0
        });
    */
    Freewall.addConfig = function (newConfig) {
        // add default setting;
        $.extend(layoutManager.defaultConfig, newConfig);
    };


    /*
    support create new arrange algorithm;
    example:

        Freewall.createEngine({
            slice: function(items, setting) {
                // slice engine;
            }
        });
    */
    Freewall.createEngine = function (engineData) {
        // create new engine;
        $.extend(engine, engineData);
    };

    /*
    support create new plugin;
    example:

        Freewall.createPlugin({
            centering: function(setting, container) {
                console.log(this);
                console.log(setting);
            }
        })l
    */
    Freewall.createPlugin = function (pluginData) {
        // register new plugin;
        $.extend(layoutManager.plugin, pluginData);
    };

    /*
    support access helper function;
    example:

        Freewall.getMethod('setBlock')(block, setting);
    */
    Freewall.getMethod = function (method) {
        // get helper method;
        return layoutManager[method];
    };

    window.Freewall = window.freewall = Freewall;

})(window.Zepto || window.jQuery);
