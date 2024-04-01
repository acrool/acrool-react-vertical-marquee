import * as React from 'react';
import {getMediaInfo} from './utils';
import {ulid} from 'ulid';
import log from './log';
import {IBearCarouselProps, IInfo} from './types';
import elClassName from './el-class-name';

import './styles.css';



// debug log switch
const logEnable = {
    componentDidMount: true,
    componentWillUnmount: true,
    shouldComponentUpdate: true,
    checkAndAutoPlay: true,
    onTransitionend: true,
    goToActualIndex: true,
};

interface IState {}

class BearVerticalMarquee extends React.Component<IBearCarouselProps, IState> {
    static defaultProps = {
        data: undefined,
        moveTime: 500,
        isEnableAutoPlay: true,
        isGPURender: true,
        isDebug: false,
        autoPlayTime: 5000
    };

    _verticalMarqueeId = ulid().toLowerCase();

    timer?: any;
    activePage = 0;        // real page location
    activeActualIndex = 0; // real item index location
    info: IInfo = {
        formatElement: [],
        sourceTotal: 0, // Total number of sources
        // 從0開始
        element: {
            total: 0,
            firstIndex: 0,
            lastIndex: 0
        },
        // 0 is the actual starting position (a negative number forward), and the ending value is the last ending position
        actual: {
            minIndex: 0,
            maxIndex: 0,
            firstIndex: 1,
            lastIndex: 1
        },
        // 總頁數
        pageTotal: 0,
    };

    // Ref
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    containerRef: React.RefObject<HTMLUListElement> = React.createRef();
    slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();

    constructor(props: IBearCarouselProps) {
        super(props);

        // @ts-ignore
        this.slideItemRefs['current'] = [];
        // @ts-ignore
        this.pageRefs['current'] = [];

        const {info} = getMediaInfo(props);
        this.info = info;

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        const containerRef = this.containerRef?.current;
        if (containerRef) {
            // Move to the correct position for the first time
            if(this.info.pageTotal > 0){
                this.goToPage(1, false);
            }


            window.addEventListener('focus', this._onWindowFocus, false);
            window.addEventListener('blur', this._onWindowBlur, false);

            // End of moving animation (Need to return to the position, to be fake)
        }
    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) log.printInText('[componentWillUnmount]');
        if (this.timer) clearTimeout(this.timer);

    }


    /***
     * Optimized rendering
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: IBearCarouselProps, nextState: IState) {

        const {data, ...otherParams} = this.props;
        const {data: nextData, ...nextOtherProps} = nextProps;

        const oldKey = data?.map((row) => row.key).join('_');
        const nextKey = nextData?.map((row) => row.key).join('_');
        if (oldKey !== nextKey) {
            if(this.props.isDebug && logEnable.shouldComponentUpdate) log.printInText('[shouldComponentUpdate] true');

            const {info} = getMediaInfo(nextProps);
            this.info = info;

            // reset page position
            const $this = this;
            setTimeout(() => {
                $this.goToPage(1, false);
            }, 0);


            return true;
        }

        return false;
    }

    /**
     * browser focus check auto play
     * @private
     */
    _onWindowFocus = (): void => {
        this._checkAndAutoPlay();
    };


    /**
     * browser blur clean auto play timer
     * @private
     */
    _onWindowBlur = (): void => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };



    /**
     * Check and autoplay feature
     */
    _checkAndAutoPlay = (): void => {
        const {autoPlayTime} = this.props;
        if(this.props.isDebug && logEnable.checkAndAutoPlay) log.printInText(`[_checkAndAutoPlay] autoPlayTime: ${autoPlayTime}`);


        // Clear the last timer
        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (autoPlayTime > 0 && this.info.pageTotal > 1) {
            this.timer = setTimeout(() => {
                this.toNext();
            }, autoPlayTime);
        }
    };


    /**
     * get next page
     */
    getNextPage = (): number => {
        return this.activePage + 1;
    };


    /**
     * Get virtual index
     */
    checkActualIndexInRange = (slideIndex: number): boolean => {
        return slideIndex <= this.info.actual.maxIndex && slideIndex >= this.info.actual.minIndex;
    };


    /**
     * go to next page
     */
    toNext = (): void => {

        const formatElement = this.info?.formatElement ? this.info.formatElement : [];

        if (formatElement[this.activeActualIndex].isClone) {
            this.goToActualIndex(formatElement[this.activeActualIndex].matchIndex, false);
            this.goToActualIndex(this.activeActualIndex);

        } else {
            // 正常移動到下一頁
            this.goToActualIndex(this.activeActualIndex + 1);

        }
    };


    /**
     * go to page
     * ex: slideView: 2, slideGroup: 2, total: 4
     * page1 -> (1-1) * 2) + 1 + (firstIndex -1) = 1
     */
    goToPage = (page: number, isUseAnimation = true): void => {
        this.goToActualIndex((page-1) + 1 + (this.info.actual.firstIndex - 1), isUseAnimation);
    };


    /**
     * Get the target item distance width(px)
     * @param slideIndex
     */
    _getMoveDistance = (slideIndex: number): number => {

        if (this.slideItemRefs.current) {
            const slideItemRef = this.slideItemRefs.current[slideIndex];
            if (slideItemRef) {
                // const movePx = -dom.clientWidth * slideIndex;
                const movePx = -slideItemRef.offsetTop;
                return movePx;
            }
        }

        return 0;
    };

    /**
     * Go to the actual location
     */
    goToActualIndex = (slideIndex: number, isUseAnimation = true) => {
        const {moveTime} = this.props;

        if(this.props.isDebug && logEnable.goToActualIndex) log.printInText(`[goToActualIndex] slideIndex: ${slideIndex}, isUseAnimation: ${isUseAnimation}`);


        if (Math.ceil(slideIndex) !== slideIndex) {
            throw Error(`slideIndex(${slideIndex}) can't has floating .xx`);
        }

        // 檢查:
        // 1. 移動是否在範圍內
        if (this.checkActualIndexInRange(slideIndex)) {
            // 套用目前位置
            this.activeActualIndex = slideIndex;

            // 計算目前正在第幾頁頁數
            this.activePage = 1;
            if (typeof this.info.formatElement[this.activeActualIndex] !== 'undefined') {
                this.activePage = this.info.formatElement[this.activeActualIndex].inPage;
            }


            // 移動EL位置
            const position = this._getMoveDistance(this.activeActualIndex);
            const containerRef = this.containerRef?.current;
            if (containerRef) {
                containerRef.style.visibility = 'visible';
                containerRef.style.transitionDuration = isUseAnimation
                    ? `${moveTime}ms`
                    : '0ms';
                containerRef.style.transform = `translate(0px, ${position}px)`;
            }


            // 提供是否為第一頁/最後一頁的判斷屬性
            const rootRef = this.rootRef?.current;
            if (rootRef) {
                if (this.activePage === 1) {
                    rootRef.setAttribute('data-position', this.activePage === this.info.pageTotal ? 'hidden' : 'first');

                }else{
                    rootRef.setAttribute('data-position', this.activePage === this.info.pageTotal ? 'last': '');
                }
            }

            // 更改顯示在第幾個 (父元件使用可判定樣式設定)
            const slideItemRefs = this.slideItemRefs?.current;
            if(slideItemRefs){
                slideItemRefs
                    .forEach((row, index) => {
                        if (index === this.activeActualIndex) {
                            row.setAttribute('data-active', 'true');
                        } else if (row) {
                            row.removeAttribute('data-active');
                        }
                    });
            }

            // 結束移動後再繼續自動模式
            this._checkAndAutoPlay();
        }
    };



    render() {
        const {style, className, isDebug, isGPURender} = this.props;

        return (
            <div
                data-vertial-marquee-id={this._verticalMarqueeId}
                style={style}
                className={[className, elClassName.root].join(' ').trim()}
                data-gpu-render={isGPURender ? 'true':undefined}
                data-actual={`${this.info.actual.minIndex},${this.info.actual.firstIndex}-${this.info.actual.lastIndex},${this.info.actual.maxIndex}`}
                data-debug={isDebug ? 'true':undefined}
                ref={this.rootRef}
            >

                <div className={elClassName.content}>
                    <ul
                        ref={this.containerRef}
                        className={elClassName.container}
                    >
                        {this.info.formatElement.map((row, i) => (
                            <li
                                key={`vertical-marquee_${i}`}
                                className={elClassName.slideItem}
                                ref={(el: any) => {
                                    // @ts-ignore
                                    this.slideItemRefs.current[i] = el;
                                    return false;
                                }}
                                data-active={
                                    row.actualIndex === this.activeActualIndex ? true : undefined
                                }
                                data-actual={row.actualIndex}
                                data-match={row.isClone ? row.matchIndex : undefined}
                                data-page={row.inPage}
                                data-source={row.sourceIndex}
                                data-is-clone={row.isClone ? true : undefined}
                                data-click={typeof row.onClick !== 'undefined'}
                                onClick={row.onClick}
                            >
                                <div className={elClassName.slideItemText} dangerouslySetInnerHTML={{__html: row.element}}/>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        );
    }
}


export default BearVerticalMarquee;


