import {IBreakpointSetting, TSlidesPerView, IBreakpointSettingActual, IInfo, IPropsBreakpoints, IBearCarouselProps, InitData, EDirection, IAspectRatio} from './types';
import {anyToNumber} from 'bear-jsutils/convert';


/**
 * 取得響應式設定
 * @param props
 */
export function getMediaInfo(props: IBearCarouselProps): {info: IInfo} {

    const {
        data,
    } = props;



    // const divisible = data.length % rwdMedia.slidesPerGroup; // 餘數
    // let sliceData = divisible > 0 ? data.slice(0, data.length - divisible) : data;
    let sliceData = data;
    let sourceTotal = sliceData.length;
    const formatElement = initDataList(
        sliceData,
    );


    const elementTotal = formatElement.length;
    const cloneBeforeTotal = 1;
    const cloneAfterTotal = cloneBeforeTotal;
    const actualMinIndex = 0;
    const actualMaxIndex = elementTotal - 1;



    const info: IInfo = {
        formatElement,
        sourceTotal, // 來源總數
        // 從0開始
        element: {
            total: elementTotal,
            firstIndex: 0,
            lastIndex: elementTotal - 1
        },
        // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
        actual: {
            minIndex: actualMinIndex,
            maxIndex: actualMaxIndex,
            firstIndex: Math.ceil(cloneBeforeTotal),
            lastIndex: Math.ceil(sourceTotal + cloneAfterTotal - 1)
        },
        // 總頁數
        pageTotal: sourceTotal,
    };

    return {
        info,
    };
}


/**
 * 初始化資料
 * @param sourceList
 * @param slidesPerView
 * @param slidesPerGroup
 * @param isLoop
 */
function initDataList(sourceList: Array<any> = [], slidesPerView: TSlidesPerView = 1, slidesPerGroup = 1, isLoop= false): InitData[] {
    const formatList = [];
    let index = 0;
    const formatSlidesPerView = slidesPerView === 'auto' ? 0: Math.ceil(slidesPerView);
    const lastPage = (sourceList.length / slidesPerGroup) - (slidesPerGroup - formatSlidesPerView);

        // 複製最後面, 放在最前面
    const cloneStart = (sourceList.length - formatSlidesPerView);
    for (const row of sourceList.slice(-formatSlidesPerView)) {
        formatList[index] = {
            actualIndex: index,
            matchIndex: formatSlidesPerView + cloneStart + index,
            inPage: lastPage,
            isClone: true,
            element: row.text,
        };
        index += 1;
    }

    let matchFirstIndex = index;
    let pageFirstIndex = 0;
    for (const [sourceIndex, row] of sourceList.entries()) {
        formatList[index] = {
            actualIndex: index,
            matchIndex: index,
            sourceIndex: sourceIndex,
            inPage: Math.ceil((pageFirstIndex + 1) / slidesPerGroup),
            isClone: false,
            onClick: row.onClick,
            element: row.text,
        };
        index += 1;
        pageFirstIndex += 1;
    }

    // 複製前面的(需顯示總數) 放在最後面
    for (const row of sourceList.slice(0, formatSlidesPerView)) {
        formatList[index] = {
            actualIndex: index,
            matchIndex: matchFirstIndex,
            inPage: 1,
            isClone: true,
            element: row.text,
        };
        index += 1;
        matchFirstIndex += 1;
    }
    return formatList;
}


/**
 * 計算 返回角度
 * @param dx
 * @param dy
 */
export function getSlideAngle(dx: number, dy: number): number {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}


/**
 * 取得 transform x 移動參數
 * @param el
 */
export function getTranslateParams(el: HTMLDivElement): {x: number, y: number}{
    const values = el.style.transform.split(/\w+\(|\);?/);
    if (!values[1] || !values[1].length) {
        return {x: 0, y: 0};
    }

    const result = values[1].split(',');
    return {
        x: Number(result[0].replace('px', '')),
        y: Number(result[1].replace('px', '')),
    };
}


/**
 * 根據起點和終點的返回方向
 *
 * 不能用於鎖定, 因為不滑動的會有2的判定
 * @param startX
 * @param startY
 * @param endX
 * @param endY
 *
 * @return 1:向上, 2:向下, 3:向左, 4:向右, 0:未移動
 */
export function getSlideDirection(startX: number, startY: number, endX: number, endY: number): EDirection|undefined{
    const dy = startY - endY;
    const dx = endX - startX;

    //如果滑動距離太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return undefined;
    }
    const angle = getSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        // 向右
        return EDirection.horizontal;
    } else if (angle >= 45 && angle < 135) {
        // 向上
        return EDirection.vertical;
    } else if (angle >= -135 && angle < -45) {
        // 向下
        return EDirection.vertical;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        // 向左
        return EDirection.horizontal;
    }
    return undefined;
}


/**
 * 計算等比例
 * @param aspectRatio
 * @param slidesPerView
 */
export function calcSingleAspectRatio(aspectRatio: IAspectRatio, slidesPerView: number): string{
    const calc = (100 * (aspectRatio.heightRatio / aspectRatio.widthRatio) / slidesPerView).toFixed(2);

    if(aspectRatio.addStaticHeight){
        return `calc(${calc}% + ${aspectRatio.addStaticHeight})`;
    }
    return `${calc}%`;
}

