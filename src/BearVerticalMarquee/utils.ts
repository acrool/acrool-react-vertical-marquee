import {IInfo, IBearCarouselProps, InitData} from './types';


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
 */
function initDataList(sourceList: Array<any> = []): InitData[] {
    const formatList = [];
    let index = 0;
    const formatSlidesPerView = 1;
    const lastPage = sourceList.length;

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
            inPage: pageFirstIndex + 1,
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

